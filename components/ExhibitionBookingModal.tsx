'use client';

import { useMemo, useRef, useState } from 'react';
import {
  ApiProduct,
  PaymentMethod,
  BookingFormData,
  validatePaymentMethod,
  submitExhibitionBooking,
  initiateExhibitionGatewaySession,
  extractPaymentSessionId,
  parsePrice,
  getBookingKey,
} from '@/lib/exhibition';
import { loadCheckoutScript, showEmbeddedCheckout } from '@/lib/payment';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product: ApiProduct | null;
  paymentMethods: PaymentMethod[];
  lang: 'en' | 'fr';
}

type Step = 'details' | 'review' | 'gateway' | 'success';

export default function ExhibitionBookingModal(props: Props) {
  if (!props.isOpen || !props.product) return null;
  return <BookingModalContent {...props} product={props.product} />;
}

function BookingModalContent({ onClose, product, paymentMethods, lang }: Props & { product: ApiProduct }) {
  const [step, setStep] = useState<Step>('details');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [country, setCountry] = useState('');
  const [message, setMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const gatewayContainer = useRef<HTMLDivElement>(null);

  const T = useMemo(() => {
    if (lang === 'fr') {
      return {
        title: 'Réserver',
        details: 'Vos coordonnées',
        review: 'Récapitulatif & Paiement',
        success: 'Réservation confirmée',
        successBody: 'Votre demande a été reçue. Vous recevrez un e-mail de confirmation sous peu.',
        contactName: 'Nom du contact',
        emailLabel: 'E-mail',
        phoneLabel: 'Téléphone',
        companyLabel: 'Entreprise',
        countryLabel: 'Pays',
        messageLabel: 'Message',
        paymentMethod: 'Méthode de paiement',
        selectPayment: 'Sélectionnez une méthode',
        next: 'Suivant →',
        back: '← Précédent',
        cancel: 'Annuler',
        pay: 'Payer',
        submit: 'Confirmer la réservation',
        processing: 'Traitement…',
        orderSummary: 'Résumé de la commande',
        contactInfo: 'Informations de contact',
        total: 'Total',
        paymentNotice:
          'Votre réservation est valable 5 jours à compter de la réservation. Veuillez régler dans ce délai pour confirmer votre stand.',
        gatewayLoading: 'Initialisation du paiement sécurisé…',
        close: 'Fermer',
        required: '*',
        noPayment: 'Aucune méthode de paiement disponible. Contactez info@netkigali.com.',
      };
    }
    return {
      title: 'Book',
      details: 'Your Details',
      review: 'Review & Pay',
      success: 'Booking Confirmed',
      successBody: 'Your request has been received. You will get a confirmation email shortly.',
      contactName: 'Contact Name',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      companyLabel: 'Company',
      countryLabel: 'Country',
      messageLabel: 'Message',
      paymentMethod: 'Payment Method',
      selectPayment: 'Select a method',
      next: 'Next →',
      back: '← Back',
      cancel: 'Cancel',
      pay: 'Pay',
      submit: 'Confirm Booking',
      processing: 'Processing…',
      orderSummary: 'Order Summary',
      contactInfo: 'Contact Information',
      total: 'Total',
      paymentNotice:
        'Your reservation is valid for 5 days from the time of booking. Please complete payment within this timeframe to confirm your booth.',
      gatewayLoading: 'Initializing secure payment…',
      close: 'Close',
      required: '*',
      noPayment: 'No payment methods available. Please contact info@netkigali.com.',
    };
  }, [lang]);

  const totalPrice = product ? parsePrice(product.prices) : 0;
  const currency = product?.currency || 'USD';

  const baseBookingData = (): BookingFormData => ({
    product_key: getBookingKey(product),
    name,
    email,
    phone,
    company,
    country,
    message,
    quantity: '1',
    payment_method: paymentMethod,
  });

  const submitBookingAndFinish = async (extras?: Partial<BookingFormData>) => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      await submitExhibitionBooking({ ...baseBookingData(), ...extras });
      setStep('success');
    } catch (err) {
      console.error('Booking submission error:', err);
      setSubmitError(err instanceof Error ? err.message : 'Failed to submit booking.');
    } finally {
      setSubmitting(false);
    }
  };

  const startGatewayPayment = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const session = await initiateExhibitionGatewaySession(getBookingKey(product), '1');
      if (session.data?.result !== 'SUCCESS') {
        throw new Error('Payment gateway initialization failed');
      }
      const sessionId = extractPaymentSessionId(session.data.payment_session);
      const token = session.data.token;
      const orderId = session.data.orderId;
      if (!sessionId) throw new Error('Invalid session ID from gateway');

      setStep('gateway');
      await loadCheckoutScript();

      const expectedToken = token;
      window.completeCallback = (result) => {
        delete window.completeCallback;
        delete window.errorCallback;
        delete window.cancelCallback;
        if (result.resultIndicator === expectedToken) {
          submitBookingAndFinish({
            payment_token: token,
            payment_session: sessionId,
            order_id: orderId,
          });
        } else {
          setSubmitError('Payment verification failed. Please try again.');
          setStep('review');
        }
      };
      window.errorCallback = (error) => {
        delete window.completeCallback;
        delete window.errorCallback;
        delete window.cancelCallback;
        setSubmitError(error?.['error.explanation'] || 'Payment processing failed');
        setStep('review');
      };
      window.cancelCallback = () => {
        delete window.completeCallback;
        delete window.errorCallback;
        delete window.cancelCallback;
        setSubmitError('Payment was cancelled.');
        setStep('review');
      };

      setTimeout(() => {
        try {
          showEmbeddedCheckout(sessionId, '#exhibition-payment-target', token);
        } catch (err) {
          console.error('Failed to show embedded checkout:', err);
          setSubmitError('Failed to load payment form.');
          setStep('review');
        }
      }, 100);
    } catch (err) {
      console.error('Gateway initialization error:', err);
      setSubmitError(err instanceof Error ? err.message : 'Failed to initialize payment.');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePayment = async () => {
    if (!paymentMethod) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const validation = await validatePaymentMethod(baseBookingData());
      if (!validation.data?.result) {
        setSubmitError('This payment method is not currently accepted.');
        setSubmitting(false);
        return;
      }
      if (validation.data.direct_payment === 'true') {
        setSubmitting(false);
        await startGatewayPayment();
        return;
      }
      await submitBookingAndFinish();
    } catch (err) {
      console.error('Validation error:', err);
      setSubmitError('Failed to validate payment method. Please try again.');
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (submitting && step !== 'gateway') return;
    onClose();
  };

  const formatPrice = (n: number) =>
    new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
    }).format(n);

  const detailsValid = name.trim() && email.trim() && phone.trim();

  return (
    <div
      onClick={handleClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(10,25,47,0.65)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        overflow: 'auto',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--white)',
          width: '100%',
          maxWidth: 720,
          maxHeight: '90vh',
          overflow: 'auto',
          borderRadius: 4,
          borderTop: '4px solid var(--gold)',
          position: 'relative',
        }}
      >
        <button
          onClick={handleClose}
          aria-label={T.close}
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            border: 'none',
            background: 'transparent',
            fontSize: 24,
            cursor: 'pointer',
            color: 'var(--muted)',
            lineHeight: 1,
          }}
        >
          ×
        </button>

        <div style={{ padding: '28px 32px 12px' }}>
          <p
            style={{
              fontFamily: 'var(--font-poppins),sans-serif',
              fontSize: 11,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: 'var(--gold)',
              fontWeight: 700,
              marginBottom: 6,
            }}
          >
            {T.title}
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-poppins),sans-serif',
              fontSize: 22,
              fontWeight: 800,
              color: 'var(--navy)',
              marginBottom: 4,
            }}
          >
            {lang === 'fr' && product.name_french ? product.name_french : product.name_english}
          </h2>
          <p style={{ fontSize: 13, color: 'var(--muted)' }}>
            {product.sizes} · {formatPrice(totalPrice)}
          </p>
        </div>

        {step === 'details' && (
          <div style={{ padding: '12px 32px 28px' }}>
            <h3
              style={{
                fontFamily: 'var(--font-poppins),sans-serif',
                fontSize: 14,
                fontWeight: 700,
                color: 'var(--navy)',
                marginBottom: 16,
              }}
            >
              {T.details}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Field label={`${T.contactName} ${T.required}`}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={inputStyle}
                />
              </Field>
              <Field label={`${T.emailLabel} ${T.required}`}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={inputStyle}
                />
              </Field>
              <Field label={`${T.phoneLabel} ${T.required}`}>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  style={inputStyle}
                />
              </Field>
              <Field label={T.companyLabel}>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  style={inputStyle}
                />
              </Field>
              <Field label={T.countryLabel}>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  style={inputStyle}
                />
              </Field>
              <Field label={T.messageLabel} fullWidth>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </Field>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
              <button onClick={handleClose} style={btnSecondary}>
                {T.cancel}
              </button>
              <button
                onClick={() => setStep('review')}
                disabled={!detailsValid}
                style={{ ...btnPrimary, opacity: detailsValid ? 1 : 0.5, cursor: detailsValid ? 'pointer' : 'not-allowed' }}
              >
                {T.next}
              </button>
            </div>
          </div>
        )}

        {step === 'review' && (
          <div style={{ padding: '12px 32px 28px' }}>
            <h3
              style={{
                fontFamily: 'var(--font-poppins),sans-serif',
                fontSize: 14,
                fontWeight: 700,
                color: 'var(--navy)',
                marginBottom: 16,
              }}
            >
              {T.orderSummary}
            </h3>

            <div
              style={{
                background: 'var(--light)',
                border: '1px solid var(--border)',
                padding: 16,
                marginBottom: 16,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <strong style={{ fontSize: 14, color: 'var(--navy)' }}>
                  {lang === 'fr' && product.name_french ? product.name_french : product.name_english}
                </strong>
                <span style={{ fontSize: 14 }}>{formatPrice(totalPrice)}</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>{product.sizes}</div>
            </div>

            <div
              style={{
                background: 'var(--light)',
                border: '1px solid var(--border)',
                padding: 16,
                marginBottom: 16,
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-poppins),sans-serif',
                  fontSize: 11,
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                {T.contactInfo}
              </p>
              <p style={{ fontSize: 13, color: 'var(--text)' }}>
                <strong>{name}</strong>
                <br />
                {email}
                <br />
                {phone}
                {company && (
                  <>
                    <br />
                    {company}
                  </>
                )}
                {country && (
                  <>
                    <br />
                    {country}
                  </>
                )}
              </p>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px 16px',
                background: 'rgba(201,151,43,.08)',
                border: '1px solid var(--gold)',
                marginBottom: 16,
              }}
            >
              <span style={{ fontFamily: 'var(--font-poppins),sans-serif', fontWeight: 700, color: 'var(--navy)' }}>
                {T.total}
              </span>
              <strong style={{ fontFamily: 'var(--font-poppins),sans-serif', fontSize: 18, color: 'var(--navy)' }}>
                {formatPrice(totalPrice)}
              </strong>
            </div>

            <Field label={`${T.paymentMethod} ${T.required}`}>
              {paymentMethods.length === 0 ? (
                <p style={{ fontSize: 13, color: 'var(--muted)', padding: '8px 0' }}>{T.noPayment}</p>
              ) : (
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  required
                  style={inputStyle}
                >
                  <option value="">{T.selectPayment}</option>
                  {paymentMethods.map((m) => (
                    <option key={m.id} value={m.id}>
                      {lang === 'fr' && m.contentFrench ? m.contentFrench : m.contentEnglish}
                    </option>
                  ))}
                </select>
              )}
            </Field>

            <div
              style={{
                background: 'rgba(201,151,43,.08)',
                borderLeft: '3px solid var(--gold)',
                padding: '10px 14px',
                margin: '16px 0',
                fontSize: 12.5,
                color: 'var(--text)',
                lineHeight: 1.6,
              }}
            >
              {T.paymentNotice}
            </div>

            {submitError && (
              <div
                style={{
                  background: '#fee2e2',
                  border: '1px solid #fca5a5',
                  color: '#991b1b',
                  padding: '10px 14px',
                  fontSize: 13,
                  marginBottom: 16,
                }}
              >
                {submitError}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
              <button onClick={() => setStep('details')} disabled={submitting} style={btnSecondary}>
                {T.back}
              </button>
              <button
                onClick={handlePayment}
                disabled={submitting || !paymentMethod || paymentMethods.length === 0}
                style={{
                  ...btnPrimary,
                  opacity: submitting || !paymentMethod || paymentMethods.length === 0 ? 0.5 : 1,
                  cursor: submitting || !paymentMethod ? 'not-allowed' : 'pointer',
                }}
              >
                {submitting ? T.processing : `${T.pay} ${formatPrice(totalPrice)}`}
              </button>
            </div>
          </div>
        )}

        {step === 'gateway' && (
          <div style={{ padding: '12px 32px 28px' }}>
            <h3
              style={{
                fontFamily: 'var(--font-poppins),sans-serif',
                fontSize: 14,
                fontWeight: 700,
                color: 'var(--navy)',
                marginBottom: 16,
              }}
            >
              {T.review}
            </h3>
            {submitting && (
              <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 16 }}>{T.gatewayLoading}</p>
            )}
            <div id="exhibition-payment-target" ref={gatewayContainer} style={{ minHeight: 400 }} />
            {submitError && (
              <div
                style={{
                  background: '#fee2e2',
                  border: '1px solid #fca5a5',
                  color: '#991b1b',
                  padding: '10px 14px',
                  fontSize: 13,
                  marginTop: 16,
                }}
              >
                {submitError}
              </div>
            )}
          </div>
        )}

        {step === 'success' && (
          <div style={{ padding: '12px 32px 28px', textAlign: 'center' }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: '#dcfce7',
                color: '#16a34a',
                fontSize: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '8px auto 16px',
              }}
            >
              ✓
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-poppins),sans-serif',
                fontSize: 18,
                fontWeight: 700,
                color: 'var(--navy)',
                marginBottom: 8,
              }}
            >
              {T.success}
            </h3>
            <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 24, lineHeight: 1.6 }}>{T.successBody}</p>
            <button onClick={handleClose} style={btnPrimary}>
              {T.close}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, fullWidth, children }: { label: string; fullWidth?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ gridColumn: fullWidth ? '1 / -1' : 'auto' }}>
      <label
        style={{
          display: 'block',
          fontFamily: 'var(--font-poppins),sans-serif',
          fontSize: 11,
          letterSpacing: 1,
          textTransform: 'uppercase',
          color: 'var(--muted)',
          fontWeight: 700,
          marginBottom: 6,
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  fontSize: 14,
  border: '1px solid var(--border)',
  borderRadius: 2,
  background: 'var(--white)',
  color: 'var(--text)',
  fontFamily: 'inherit',
};

const btnPrimary: React.CSSProperties = {
  padding: '11px 24px',
  fontFamily: 'var(--font-poppins),sans-serif',
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: 1,
  textTransform: 'uppercase',
  background: 'var(--gold)',
  color: 'var(--white)',
  border: 'none',
  borderRadius: 2,
  cursor: 'pointer',
};

const btnSecondary: React.CSSProperties = {
  padding: '11px 24px',
  fontFamily: 'var(--font-poppins),sans-serif',
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: 1,
  textTransform: 'uppercase',
  background: 'transparent',
  color: 'var(--navy)',
  border: '1.5px solid var(--navy)',
  borderRadius: 2,
  cursor: 'pointer',
};
