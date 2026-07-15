'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import PaymentModal from '@/components/PaymentModal';
import PawaPayModal from '@/components/PawaPayModal';
import Faq, { faqJsonLd } from '@/components/Faq';
import {
  initializePayment,
  processPayment,
  requiresPayment,
  parseFeeAmount,
  extractCurrency,
  PaymentResult,
  PaymentSession,
} from '@/lib/payment';

const SMARTEVENT_API = '/api/smartevent';

const registrationFaq = [
  { q: 'What is included in my registration fee?', a: 'Access to all conference sessions, panels, and the Deal Room for the selected category, plus refreshments and conference materials. Specific inclusions vary by registration category — see each category card for its fee and closing date.' },
  { q: 'Can I register for virtual attendance?', a: 'Where the event is set up as hybrid, you can choose virtual attendance during registration and follow all sessions online.' },
  { q: 'What payment methods are accepted?', a: 'Visa / MasterCard (online payment), PawaPay mobile money, and bank transfer, depending on the registration category selected.' },
  { q: 'Can I add a site visit to my registration?', a: 'Yes, an optional site visit can be added for a flat fee of USD 70 during the registration form.' },
  { q: 'Who do I contact if I have a payment or registration issue?', a: 'Email info@netkigali.com or use the WhatsApp button on this site for a faster response.' },
];

function decodeHtml(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}

interface RegistrationCategory {
  id: number;
  name_english: string;
  name_french: string;
  fee: string;
  early_payment_date: string;
  end_date: string;
}

interface FormInputOption {
  id: number;
  contentEnglish: string;
  contentFrench: string;
}

interface FormInput {
  inputcode: string;
  nameEnglish: string;
  nameFrench: string;
  is_mandatory: 'YES' | 'NO';
  allow_other: 'YES' | 'NO';
  inputtype: { id: number; name: string };
}

interface FormInputGroup {
  group: { id: number; name: string; nameFrench: string };
  inputs: Array<{ input: FormInput; options: FormInputOption[]; value: string }>;
}

interface FormValues {
  [key: string]: string | string[];
}

async function smartEventPost<T>(endpoint: string, formData: FormData): Promise<T> {
  const res = await fetch(`${SMARTEVENT_API}${endpoint}`, { method: 'POST', body: formData });
  return res.json();
}

async function smartEventJson<T>(endpoint: string, body: object): Promise<T> {
  const formData = new FormData();
  Object.entries(body).forEach(([k, v]) => formData.append(k, String(v)));
  const res = await fetch(`${SMARTEVENT_API}${endpoint}`, { method: 'POST', body: formData });
  return res.json();
}

export default function RegistrationPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [eventType, setEventType] = useState<'HYBRID' | 'PHYSICAL' | 'VIRTUAL' | null>(null);
  const [attendanceType, setAttendanceType] = useState<'PHYSICAL' | 'VIRTUAL' | null>(null);
  const [categories, setCategories] = useState<RegistrationCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<RegistrationCategory | null>(null);
  const [formGroups, setFormGroups] = useState<FormInputGroup[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState<FormValues>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [badgeId, setBadgeId] = useState('');
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [paymentRequired, setPaymentRequired] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPawapayModal, setShowPawapayModal] = useState(false);
  const [paymentSession, setPaymentSession] = useState<PaymentSession | null>(null);
  const [paymentData, setPaymentData] = useState({ orderId: '', paymentToken: '', paymentSession: '', transactionId: '' });

  useEffect(() => { loadRegistrationPage(); }, []);

  async function loadRegistrationPage() {
    setLoading(true);
    try {
      const res = await fetch(`${SMARTEVENT_API}/Registration-Page-Api`, { method: 'GET' });
      const data = await res.json();
      const type: 'HYBRID' | 'PHYSICAL' | 'VIRTUAL' = data?.event_description?.event_type || 'PHYSICAL';
      setEventType(type);
      if (type !== 'HYBRID') {
        setAttendanceType(type);
        await loadCategories(type);
      }
    } catch {
      setError('Failed to load registration page');
    }
    setLoading(false);
  }

  async function loadCategories(type: 'PHYSICAL' | 'VIRTUAL') {
    setLoading(true);
    try {
      const data = await smartEventJson<{ data: RegistrationCategory[] }>('/Display-Registration-Categories', {
        attendence: type,
        operation: 'get-categories',
      });
      setCategories(data.data || []);
    } catch {
      setError('Failed to load categories');
    }
    setLoading(false);
  }

  async function selectAttendance(type: 'PHYSICAL' | 'VIRTUAL') {
    setAttendanceType(type);
    await loadCategories(type);
  }

  async function selectCategory(category: RegistrationCategory) {
    setSelectedCategory(category);
    setLoading(true);
    const needsPayment = requiresPayment(category.fee);
    setPaymentRequired(needsPayment);
    if (needsPayment) {
      setPaymentData(prev => ({ ...prev, orderId: `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 11)}` }));
    }
    try {
      const data = await smartEventJson<{ data: FormInputGroup[] }>('/Display-Categories-Form-Inputs', {
        category: category.id,
        attendence: attendanceType!,
        operation: 'get-form-inputs',
      });
      const groups = data.data || [];
      setFormGroups(groups);
      setCurrentStep(0);

      // Default the site-visit add-on to "No" so a choice is always selected.
      const siteVisit = groups
        .flatMap(g => g.inputs)
        .find(({ input }) => input.inputcode === 'input_id_355' || input.nameEnglish.toLowerCase().includes('site visit'));
      const noOption = siteVisit?.options.find(o => o.contentEnglish.trim().toLowerCase().startsWith('no'));
      if (siteVisit && noOption) {
        setFormValues(prev => ({ ...prev, [siteVisit.input.inputcode]: noOption.contentEnglish }));
      }
    } catch {
      setError('Failed to load registration form');
    }
    setLoading(false);
  }

  const validateStep = useCallback(() => {
    const currentGroup = formGroups[currentStep];
    if (!currentGroup) return true;

    const errors: string[] = [];
    const fieldErrs: Record<string, string> = {};

    currentGroup.inputs.forEach(({ input }) => {
      const value = formValues[input.inputcode];
      const isEmpty = !value || (Array.isArray(value) && value.length === 0) || (typeof value === 'string' && value.trim() === '');

      if (input.is_mandatory === 'YES' && isEmpty) {
        const msg = `${input.nameEnglish} is required`;
        errors.push(msg);
        fieldErrs[input.inputcode] = msg;
        return;
      }

      if (!isEmpty && typeof value === 'string') {
        if (input.inputtype.id === 5) {
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            const msg = `${input.nameEnglish} must be a valid email address`;
            errors.push(msg);
            fieldErrs[input.inputcode] = msg;
          }
        }
        if (input.inputtype.id === 12) {
          if (!/^[\d\s+()-]+$/.test(value) || value.replace(/\D/g, '').length < 7) {
            const msg = `${input.nameEnglish} must be a valid phone number`;
            errors.push(msg);
            fieldErrs[input.inputcode] = msg;
          }
        }
      }
    });

    setFormErrors(errors);
    setFieldErrors(fieldErrs);

    if (errors.length > 0) {
      document.querySelector('form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    return errors.length === 0;
  }, [currentStep, formGroups, formValues]);

  function handleInputChange(inputCode: string, value: string | string[]) {
    setFormValues(prev => ({ ...prev, [inputCode]: value }));
    if (fieldErrors[inputCode]) {
      setFieldErrors(prev => { const n = { ...prev }; delete n[inputCode]; return n; });
    }
  }

  function nextStep() {
    if (validateStep()) {
      setFormErrors([]);
      setFieldErrors({});
      setCurrentStep(prev => Math.min(prev + 1, formGroups.length - 1));
    }
  }

  function prevStep() {
    setFormErrors([]);
    setFieldErrors({});
    setCurrentStep(prev => Math.max(prev - 1, 0));
  }

  // Persists the registration to SmartEvent. Called after payment succeeds
  // (Mastercard or PawaPay) or directly for bank-transfer / free registrations.
  // `payment` carries whatever reference the gateway produced.
  async function finalizeRegistration(payment: {
    orderId?: string;
    paymentToken?: string;
    paymentSession?: string;
    transactionId?: string;
  }) {
    if (!selectedCategory) return;
    setSubmitting(true);
    try {
      const delegateData: Array<{ input_code: string; input_type: string; input_value: string; input_name: string }> = [];
      const submitForm = new FormData();

      formGroups.forEach(group => {
        group.inputs.forEach(({ input }) => {
          const value = formValues[input.inputcode];
          if (value) {
            const valueStr = Array.isArray(value) ? value.join(', ') : value;
            delegateData.push({
              input_code: input.inputcode,
              input_type: String(input.inputtype.id),
              input_value: valueStr,
              input_name: input.nameEnglish,
            });
            if (input.inputcode === 'input_id_52307') submitForm.append('registration_email', valueStr);
            if (input.inputcode === 'input_id_21576') submitForm.append('first_name', valueStr);
            if (input.inputcode === 'input_id_35129') submitForm.append('last_name', valueStr);
          }
        });
      });

      submitForm.append('delegate_data', JSON.stringify(delegateData));
      submitForm.append('ticket_id', String(selectedCategory.id));
      submitForm.append('attendence_type', attendanceType || 'PHYSICAL');
      submitForm.append('user_language', 'english');
      submitForm.append('accompanied', 'NO');
      submitForm.append('registration_type', 'single');

      // Grand total stored with the registration: base category fee plus the
      // flat USD 70 site-visit surcharge when selected. No other discounts or
      // add-ons are applied.
      const grandTotal = parseFeeAmount(selectedCategory.fee) + (siteVisitSelected ? 70 : 0);
      submitForm.append('grand_total', String(grandTotal));

      if (siteVisitSelected) {
        submitForm.append('extrafee', JSON.stringify({ input_id: 355, amount: 70, currency: 'USD' }));
      }

      submitForm.append('order_id', payment.orderId || '');
      submitForm.append('payment_token', payment.paymentToken || '');
      submitForm.append('payment_session', payment.paymentSession || '');
      submitForm.append('acknowleadgment', payment.transactionId || '');

      const result = await smartEventPost<{ success?: boolean; message?: string | string[]; registration_number?: string | number }>('/Register-Delegate', submitForm);

      if (result.success !== false) {
        // The badge / registration number returned by SmartEvent.
        if (result.registration_number != null && result.registration_number !== '') {
          setBadgeId(String(result.registration_number));
        }
        setSubmitted(true);

        // Best-effort: mirror Deal Room & VIP Dinner delegates into NEXORA.
        // The server route owns the category gate; never blocks the success UI.
        try {
          void fetch('/api/nexora/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: (formValues['input_id_52307'] as string) || '',
              firstName: (formValues['input_id_21576'] as string) || '',
              lastName: (formValues['input_id_35129'] as string) || '',
              categoryId: selectedCategory.id,
            }),
          });
        } catch { /* non-blocking */ }
      } else {
        const msg = Array.isArray(result.message) ? result.message : [result.message || 'Registration failed'];
        setFormErrors(msg);
      }
    } catch {
      setFormErrors(['Failed to submit registration. Please try again.']);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateStep()) return;
    if (!selectedCategory) { setFormErrors(['Please select a category']); return; }

    setFormErrors([]);

    const isBankTransfer = Object.values(formValues).some(
      v => typeof v === 'string' && v.toLowerCase().includes('bank transfer')
    );
    // Which gateway (if any) handles this submission — driven by the selected
    // payment method. Bank transfer / free categories save directly.
    const gateway = paymentRequired && !isBankTransfer ? selectedGateway : 'none';

    // PawaPay: open the mobile-money modal; the registration is saved from its
    // onSuccess callback once the deposit completes.
    if (gateway === 'pawapay') {
      setShowPawapayModal(true);
      return;
    }

    // Mastercard: run the embedded checkout, then save with the payment result.
    if (gateway === 'mastercard') {
      setSubmitting(true);
      try {
        setProcessingPayment(true);
        const customerEmail = (formValues['input_id_52307'] as string) || '';
        const firstName = (formValues['input_id_21576'] as string) || '';
        const lastName = (formValues['input_id_35129'] as string) || '';

        if (!customerEmail) {
          setFormErrors(['Email is required for payment processing']);
          setSubmitting(false);
          setProcessingPayment(false);
          return;
        }

        const totalAmount = parseFeeAmount(selectedCategory.fee) + (siteVisitSelected ? 70 : 0);
        const currency = extractCurrency(selectedCategory.fee);

        const session = await initializePayment({
          orderId: paymentData.orderId,
          amount: totalAmount,
          currency,
          categoryName: decodeHtml(selectedCategory.name_english),
          categoryId: selectedCategory.id,
          attendenceType: attendanceType || 'PHYSICAL',
          customerEmail,
          customerName: `${firstName} ${lastName}`.trim(),
        });

        if (!session) {
          setFormErrors(['Failed to initialize payment. Please try again.']);
          setSubmitting(false);
          setProcessingPayment(false);
          return;
        }

        setPaymentSession(session);
        setShowPaymentModal(true);
        setProcessingPayment(false);

        const paymentResult: PaymentResult = await processPayment(session, {
          orderId: paymentData.orderId,
          amount: totalAmount,
          currency,
          categoryName: decodeHtml(selectedCategory.name_english),
        });

        setShowPaymentModal(false);

        if (!paymentResult.success) {
          setFormErrors([paymentResult.error || 'Payment was not completed. Please try again.']);
          setSubmitting(false);
          return;
        }

        await finalizeRegistration({
          orderId: paymentResult.orderId,
          paymentToken: paymentResult.paymentToken || '',
          paymentSession: paymentResult.paymentSession || '',
          transactionId: paymentResult.transactionId || '',
        });
      } catch {
        setFormErrors(['Failed to process payment. Please try again.']);
        setSubmitting(false);
        setProcessingPayment(false);
      }
      return;
    }

    // Bank transfer / free: save directly.
    await finalizeRegistration({});
  }

  function renderInput(input: FormInput, options: FormInputOption[], value: string) {
    const inputValue = formValues[input.inputcode] || value || '';
    const isRequired = input.is_mandatory === 'YES';
    const hasError = !!fieldErrors[input.inputcode];
    const base = 'w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:outline-none';
    const errorClass = hasError ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-primary-500/30 focus:border-primary-500';

    switch (input.inputtype.id) {
      case 2:
        return (
          <>
            <select
              id={input.inputcode}
              value={inputValue as string}
              onChange={e => handleInputChange(input.inputcode, e.target.value)}
              className={`${base} ${errorClass} bg-white appearance-none pr-10 cursor-pointer`}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7A8D' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.75rem center',
                backgroundSize: '1.1rem',
              }}
              required={isRequired}
            >
              <option value="">Select...</option>
              {options.map(opt => (
                <option key={opt.id} value={opt.contentEnglish}>
                  {opt.contentEnglish === 'Online Payment' ? 'Visa / MasterCard' : opt.contentEnglish}
                </option>
              ))}
            </select>
            {hasError && <p className="mt-1 text-sm text-red-600">{fieldErrors[input.inputcode]}</p>}
          </>
        );
      case 4:
        return (
          <>
            <input type="date" id={input.inputcode} value={inputValue as string} onChange={e => handleInputChange(input.inputcode, e.target.value)} className={`${base} ${errorClass}`} required={isRequired} />
            {hasError && <p className="mt-1 text-sm text-red-600">{fieldErrors[input.inputcode]}</p>}
          </>
        );
      case 5:
        return (
          <>
            <input type="email" id={input.inputcode} value={inputValue as string} onChange={e => handleInputChange(input.inputcode, e.target.value)} className={`${base} ${errorClass}`} required={isRequired} />
            {hasError && <p className="mt-1 text-sm text-red-600">{fieldErrors[input.inputcode]}</p>}
          </>
        );
      case 8:
        return (
          <>
            <input type="number" id={input.inputcode} value={inputValue as string} onChange={e => handleInputChange(input.inputcode, e.target.value)} className={`${base} ${errorClass}`} required={isRequired} />
            {hasError && <p className="mt-1 text-sm text-red-600">{fieldErrors[input.inputcode]}</p>}
          </>
        );
      case 10:
        return (
          <>
            <div className={hasError ? 'p-2 border-2 border-red-500 rounded-lg' : ''}>
              <div className="flex flex-wrap gap-2">
                {options.map(opt => {
                  const selected = inputValue === opt.contentEnglish;
                  return (
                    <label
                      key={opt.id}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm cursor-pointer transition-colors"
                      style={{
                        borderColor: selected ? 'var(--navy)' : '#d1d5db',
                        background: selected ? 'rgba(27,58,92,0.06)' : '#fff',
                        color: selected ? 'var(--navy)' : 'var(--text)',
                        fontWeight: selected ? 600 : 400,
                      }}
                    >
                      <input type="radio" name={input.inputcode} value={opt.contentEnglish} checked={selected} onChange={e => handleInputChange(input.inputcode, e.target.value)} className="w-4 h-4 accent-primary-500" required={isRequired} />
                      <span>{opt.contentEnglish}</span>
                    </label>
                  );
                })}
              </div>
            </div>
            {hasError && <p className="mt-1 text-sm text-red-600">{fieldErrors[input.inputcode]}</p>}
          </>
        );
      case 12:
        return (
          <>
            <input type="tel" id={input.inputcode} value={inputValue as string} onChange={e => handleInputChange(input.inputcode, e.target.value)} className={`${base} ${errorClass}`} required={isRequired} />
            {hasError && <p className="mt-1 text-sm text-red-600">{fieldErrors[input.inputcode]}</p>}
          </>
        );
      case 15:
        return (
          <>
            <textarea id={input.inputcode} value={inputValue as string} onChange={e => handleInputChange(input.inputcode, e.target.value)} rows={4} className={`${base} ${errorClass}`} required={isRequired} />
            {hasError && <p className="mt-1 text-sm text-red-600">{fieldErrors[input.inputcode]}</p>}
          </>
        );
      case 16:
        return (
          <>
            <div className={hasError ? 'p-3 border-2 border-red-500 rounded-lg space-y-2' : 'space-y-2'}>
              {options.map(opt => (
                <label key={opt.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={opt.contentEnglish}
                    checked={Array.isArray(inputValue) ? inputValue.includes(opt.contentEnglish) : inputValue === opt.contentEnglish}
                    onChange={e => {
                      const current = Array.isArray(inputValue) ? inputValue : inputValue ? [inputValue] : [];
                      handleInputChange(input.inputcode, e.target.checked ? [...current, e.target.value] : current.filter(v => v !== e.target.value));
                    }}
                    className="w-4 h-4"
                  />
                  <span>{opt.contentEnglish}</span>
                </label>
              ))}
            </div>
            {hasError && <p className="mt-1 text-sm text-red-600">{fieldErrors[input.inputcode]}</p>}
          </>
        );
      case 17:
        return <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">{input.nameEnglish}</p>;
      default:
        return (
          <>
            <input type="text" id={input.inputcode} value={inputValue as string} onChange={e => handleInputChange(input.inputcode, e.target.value)} className={`${base} ${errorClass}`} required={isRequired} />
            {hasError && <p className="mt-1 text-sm text-red-600">{fieldErrors[input.inputcode]}</p>}
          </>
        );
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: 'var(--light)' }}>
        <div className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-lg w-full">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--navy)', fontFamily: 'var(--font-poppins),sans-serif' }}>
              Registration {paymentData.transactionId ? 'and Payment' : ''} Successful!
            </h2>
            <p className="mb-6" style={{ color: 'var(--muted)' }}>
              Thank you for registering for CBFF SME Forum 2026. You will receive a confirmation email shortly.
            </p>
            {badgeId && (
              <div className="mb-6 p-4 rounded-lg border" style={{ background: 'rgba(201,151,43,0.08)', borderColor: 'rgba(201,151,43,0.35)' }}>
                <p className="text-xs uppercase tracking-wide font-semibold" style={{ color: 'var(--gold)' }}>Registration number</p>
                <p className="text-2xl font-bold font-mono mt-1" style={{ color: 'var(--navy)' }}>{badgeId}</p>
                <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>Please keep this for check-in.</p>
              </div>
            )}
            {paymentData.transactionId && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-left">
                <h3 className="text-sm font-semibold text-green-800 mb-3">Payment Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transaction ID:</span>
                    <span className="font-mono font-medium">{paymentData.transactionId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-mono font-medium">{paymentData.orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="text-green-600 font-medium">Paid</span>
                  </div>
                </div>
              </div>
            )}
            <Link href="/" className="inline-block mt-6 px-6 py-3 rounded-lg text-white font-semibold transition-colors" style={{ background: 'var(--navy)' }}>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const siteVisitInputCode = formGroups
    .flatMap(g => g.inputs)
    .find(({ input }) =>
      input.inputcode === 'input_id_355' ||
      input.nameEnglish.toLowerCase().includes('site visit')
    )?.input.inputcode ?? null;

  const siteVisitSelected =
    siteVisitInputCode !== null &&
    typeof formValues[siteVisitInputCode] === 'string' &&
    (formValues[siteVisitInputCode] as string).trim().toLowerCase().startsWith('yes');

  // Selected payment method drives which gateway runs on submit. "Online
  // Payment" (shown as "Visa / MasterCard") → Mastercard; "PawaPay" → PawaPay.
  const paymentMethodInput = formGroups
    .flatMap(g => g.inputs)
    .find(({ input }) => input.nameEnglish.toLowerCase().includes('payment method'));
  const paymentMethodValue = paymentMethodInput
    ? String(formValues[paymentMethodInput.input.inputcode] || '')
    : '';
  const selectedGateway: 'mastercard' | 'pawapay' | 'none' =
    /pawapay/i.test(paymentMethodValue)
      ? 'pawapay'
      : /online payment|visa|mastercard/i.test(paymentMethodValue)
        ? 'mastercard'
        : 'none';

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--light)' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, var(--navy2) 0%, var(--navy) 100%)', padding: '120px 24px 60px' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-poppins),sans-serif', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 700, marginBottom: 12 }}>
            CBFF SME FORUM 2026
          </p>
          <h1 style={{ fontFamily: 'var(--font-poppins),sans-serif', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, color: 'var(--white)', lineHeight: 1.2, maxWidth: 700 }}>
            Conference Registration
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', marginTop: 12, fontSize: 16, maxWidth: 600 }}>
            Register to attend the Congo Basin Forest Finance SME Forum 2026.
          </p>
        </div>
      </div>

      <div className="flex-1" style={{ maxWidth: 1160, margin: '0 auto', width: '100%', padding: '48px 24px' }}>
        {loading ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <div className="animate-spin w-12 h-12 border-4 border-t-transparent rounded-full mx-auto mb-4" style={{ borderColor: 'var(--navy)', borderTopColor: 'transparent' }}></div>
            <p style={{ color: 'var(--muted)' }}>Loading registration form...</p>
          </div>
        ) : error ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button onClick={loadRegistrationPage} className="px-6 py-2 rounded-lg text-white" style={{ background: 'var(--navy)' }}>
              Try Again
            </button>
          </div>
        ) : eventType === 'HYBRID' && !attendanceType ? (
          /* Attendance Type Selection */
          <div className="bg-white rounded-xl shadow p-8">
            <h2 className="text-xl font-semibold text-center mb-6" style={{ fontFamily: 'var(--font-poppins),sans-serif', color: 'var(--navy)' }}>
              Select Your Attendance Type
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {(['PHYSICAL', 'VIRTUAL'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => selectAttendance(type)}
                  className="p-6 border-2 border-gray-200 rounded-xl hover:shadow-lg transition-all text-center"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(27,58,92,0.1)' }}>
                    {type === 'PHYSICAL' ? (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--navy)' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    ) : (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--navy)' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--navy)', fontFamily: 'var(--font-poppins),sans-serif' }}>
                    {type === 'PHYSICAL' ? 'Physical Attendance' : 'Virtual Attendance'}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--muted)' }}>
                    {type === 'PHYSICAL' ? 'Attend the event in person at the venue' : 'Attend the event online from anywhere'}
                  </p>
                </button>
              ))}
            </div>
          </div>
        ) : !selectedCategory ? (
          /* Category Selection */
          <div className="bg-white rounded-xl shadow p-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold" style={{ fontFamily: 'var(--font-poppins),sans-serif', color: 'var(--navy)' }}>
                Select Registration Category
              </h2>
              {eventType === 'HYBRID' && (
                <button onClick={() => setAttendanceType(null)} className="text-sm" style={{ color: 'var(--blue)' }}>
                  Change attendance type
                </button>
              )}
            </div>
            <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
              All registration fees are listed in <strong>USD</strong>. For support or payment questions, contact{' '}
              <a href="mailto:info@netkigali.com" style={{ color: 'var(--blue)' }}>info@netkigali.com</a>.
            </p>
            {categories.length === 0 ? (
              <p className="text-center py-8" style={{ color: 'var(--muted)' }}>No registration categories available at this time.</p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map(category => {
                  const isFree = !requiresPayment(category.fee);
                  return (
                    <div key={category.id} className="border-2 rounded-xl p-6 hover:shadow-lg transition-all relative overflow-hidden flex flex-col h-full" style={{ borderColor: 'var(--border)' }}>
                      {isFree && (
                        <div className="absolute top-0 right-0 text-white text-xs font-bold px-3 py-1 rounded-bl-lg" style={{ background: '#16a34a' }}>
                          FREE
                        </div>
                      )}
                      <h3 className="text-lg font-semibold mb-2 min-h-14 pr-12" style={{ color: 'var(--navy)', fontFamily: 'var(--font-poppins),sans-serif' }}>
                        {decodeHtml(category.name_english)}
                      </h3>
                      <p className="text-2xl font-bold mb-3" style={{ color: isFree ? '#16a34a' : 'var(--gold)' }}>
                        {category.fee}
                      </p>
                      <p className="text-sm mb-5" style={{ color: 'var(--muted)' }}>
                        {category.early_payment_date ? `Early bird ends: ${category.early_payment_date}` : `Registration closes: ${category.end_date}`}
                      </p>
                      <button
                        onClick={() => selectCategory(category)}
                        className="w-full py-2 rounded-lg text-white font-semibold transition-colors mt-auto"
                        style={{ background: isFree ? '#16a34a' : 'var(--navy)' }}
                      >
                        Register
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* Registration Form */
          <div className="bg-white rounded-xl shadow overflow-hidden">
            {/* Step tabs */}
            {formGroups.length > 1 && (
              <div className="px-6 py-4 border-b bg-gray-50 flex gap-2 overflow-x-auto">
                {formGroups.map((group, index) => (
                  <button
                    key={group.group.id}
                    onClick={() => { if (index < currentStep) setCurrentStep(index); }}
                    className="flex-1 text-center px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors"
                    style={{
                      background: index === currentStep ? 'var(--navy)' : index < currentStep ? 'rgba(27,58,92,0.15)' : '#e5e7eb',
                      color: index === currentStep ? 'var(--white)' : index < currentStep ? 'var(--navy)' : '#6b7280',
                    }}
                  >
                    {group.group.name}
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit} className="p-6">
              {formErrors.length > 0 && (
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h3 className="text-sm font-semibold text-red-800 mb-2">Please fix the following errors:</h3>
                      <ul className="list-disc list-inside text-red-700 text-sm space-y-1">
                        {formErrors.map((err, i) => <li key={i}>{err}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {formGroups[currentStep] && (() => {
                const group = formGroups[currentStep];
                const siteVisit = group.inputs.find(it => it.input.inputcode === siteVisitInputCode);
                const normalItems = group.inputs.filter(it => it.input.inputcode !== siteVisitInputCode);
                // A single lone column field spans full width so it fills the card.
                const singleColumn = normalItems.filter(it => ![10, 15, 16, 17].includes(it.input.inputtype.id)).length === 1;
                return (
                  <div className="space-y-5">
                    <h3 className="text-lg font-semibold" style={{ color: 'var(--navy)', fontFamily: 'var(--font-poppins),sans-serif' }}>
                      {group.group.name}
                    </h3>

                    {/* Site visit is a paid add-on — its own selectable, priced card. */}
                    {siteVisit && (
                      <div
                        className="rounded-xl border p-4 sm:p-5 transition-colors"
                        style={{
                          borderColor: siteVisitSelected ? 'var(--navy)' : '#e5e7eb',
                          background: siteVisitSelected ? 'rgba(27,58,92,0.04)' : '#fff',
                        }}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <span className="flex items-center justify-center w-9 h-9 rounded-lg shrink-0" style={{ background: 'rgba(201,151,43,0.12)', color: 'var(--gold)' }}>
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            </span>
                            <div>
                              <p className="text-sm font-semibold" style={{ color: 'var(--navy)' }}>Site visit</p>
                              <p className="text-sm mt-0.5" style={{ color: 'var(--muted)' }}>Add an optional site visit to your registration.</p>
                            </div>
                          </div>
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap" style={{ background: 'rgba(201,151,43,0.12)', color: 'var(--gold)' }}>+ USD 70</span>
                        </div>
                        <div className="mt-3">
                          {renderInput(siteVisit.input, siteVisit.options, siteVisit.value)}
                        </div>
                      </div>
                    )}

                    {/* All other fields sit in a framed card to match the surrounding cards. */}
                    {normalItems.length > 0 && (
                      <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                          {normalItems.map(({ input, options, value }) => {
                            // Multi-option groups, textareas, info paragraphs and a
                            // lone column field read better across the full width.
                            const fullWidth = singleColumn || [10, 15, 16, 17].includes(input.inputtype.id);
                            return (
                              <div key={input.inputcode} className={fullWidth ? 'sm:col-span-2' : ''}>
                                {input.inputtype.id !== 17 && (
                                  <label htmlFor={input.inputcode} className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text)' }}>
                                    {input.nameEnglish}
                                    {input.is_mandatory === 'YES' && <span className="text-red-500 ml-1">*</span>}
                                  </label>
                                )}
                                {renderInput(input, options, value)}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Payment summary */}
              {paymentRequired && selectedCategory && currentStep === formGroups.length - 1 && !processingPayment && (() => {
                const base = parseFeeAmount(selectedCategory.fee);
                const currency = extractCurrency(selectedCategory.fee);
                const total = base + (siteVisitSelected ? 70 : 0);
                return (
                  <div className="mt-5 rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" style={{ color: 'var(--gold)' }}>
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-semibold" style={{ color: 'var(--navy)' }}>Payment summary</span>
                    </div>
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-sm">
                        <span style={{ color: 'var(--muted)' }}>Registration fee</span>
                        <span className="font-medium tabular-nums" style={{ color: 'var(--text)' }}>{selectedCategory.fee}</span>
                      </div>
                      {siteVisitSelected && (
                        <div className="flex items-center justify-between text-sm">
                          <span style={{ color: 'var(--muted)' }}>Site visit</span>
                          <span className="font-medium tabular-nums" style={{ color: 'var(--text)' }}>{currency} 70</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: 'rgba(27,58,92,0.12)' }}>
                        <span className="text-sm font-semibold" style={{ color: 'var(--navy)' }}>Total due</span>
                        <span className="text-lg font-bold tabular-nums" style={{ color: 'var(--navy)' }}>{currency} {total.toLocaleString()}</span>
                      </div>
                    </div>
                    <p className="text-xs mt-3 flex items-center gap-1.5" style={{ color: 'var(--muted)' }}>
                      <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Secure payment — you&apos;ll be redirected to complete it after you continue.
                    </p>
                  </div>
                );
              })()}

              {processingPayment && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                    <p className="text-sm font-medium text-blue-800">Processing Payment — please complete the payment in the popup window...</p>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <div>
                  {currentStep > 0 ? (
                    <button type="button" onClick={prevStep} disabled={submitting || processingPayment} className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50">
                      Previous
                    </button>
                  ) : (
                    <button type="button" onClick={() => setSelectedCategory(null)} disabled={submitting || processingPayment} className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50">
                      Change Category
                    </button>
                  )}
                </div>
                <div>
                  {currentStep < formGroups.length - 1 ? (
                    <button type="button" onClick={nextStep} disabled={submitting || processingPayment} className="px-6 py-2 rounded-lg text-white font-semibold transition-colors disabled:opacity-50" style={{ background: 'var(--navy)' }}>
                      Next
                    </button>
                  ) : (
                    <button type="submit" disabled={submitting || processingPayment} className="px-6 py-2 rounded-lg text-white font-semibold transition-colors disabled:opacity-50 flex items-center gap-2" style={{ background: 'var(--navy)' }}>
                      {processingPayment ? (
                        <><div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div> Processing Payment...</>
                      ) : submitting ? (
                        <><div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div> Submitting...</>
                      ) : (
                        paymentRequired ? 'Proceed to Payment' : 'Submit Registration'
                      )}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        )}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(registrationFaq)) }}
      />
      <Faq eyebrow="Questions" title="Registration FAQ" items={registrationFaq} />

      {/* Mastercard embedded checkout */}
      {paymentSession && selectedCategory && (
        <PaymentModal
          session={paymentSession}
          amount={parseFeeAmount(selectedCategory.fee) + (siteVisitSelected ? 70 : 0)}
          currency={extractCurrency(selectedCategory.fee)}
          categoryName={decodeHtml(selectedCategory.name_english)}
          customerEmail={(formValues['input_id_52307'] as string) || ''}
          isOpen={showPaymentModal}
          onClose={() => {
            setShowPaymentModal(false);
            setProcessingPayment(false);
            setSubmitting(false);
          }}
        />
      )}

      {/* PawaPay mobile-money payment */}
      {selectedCategory && (
        <PawaPayModal
          isOpen={showPawapayModal}
          amountUsd={parseFeeAmount(selectedCategory.fee) + (siteVisitSelected ? 70 : 0)}
          email={(formValues['input_id_52307'] as string) || ''}
          name={`${(formValues['input_id_21576'] as string) || ''} ${(formValues['input_id_35129'] as string) || ''}`.trim()}
          onSuccess={(depositId) => {
            setShowPawapayModal(false);
            // Mirror the Mastercard flow: order_id is the client reference,
            // and the gateway's confirmation (depositId) is the acknowledgment.
            void finalizeRegistration({ orderId: paymentData.orderId, transactionId: depositId });
          }}
          onClose={() => {
            setShowPawapayModal(false);
            setSubmitting(false);
          }}
        />
      )}
    </div>
  );
}
