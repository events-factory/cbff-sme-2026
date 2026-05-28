import { NextRequest, NextResponse } from 'next/server';

const SMARTEVENT_API_URL = 'https://app.smartevent.rw/Api';
const EVENT_CODE = '0fAbj7CRs264k7PGAcaU1mNGcEhPSHFTSHV1SW9pZUJlVXR6MUE9PQ==';
const BULK_INVITE_EVENT_CODE = '69fc3ce472122';
const EXHIBITION_EVENT_CODE_AUTH = 'tt6S0fXwCg8zJMtXt6JS1kxzR0ZGQVlUZjltaENHMERDVE1KWkE9PQ==';

const EXHIBITION_PATHS = [
  'Get-Exibition-Packages-Full',
  'Get-Exhibition-Bookings',
  'Book-Exibition-Packages',
  'Validate-Payment-Method',
  'Initiate-Gateway-Session',
];

function isExhibitionPath(path: string): boolean {
  return EXHIBITION_PATHS.some((endpoint) => path.includes(endpoint));
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return proxyRequest(request, path, 'GET');
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return proxyRequest(request, path, 'POST');
}

async function proxyRequest(
  request: NextRequest,
  pathSegments: string[],
  method: string,
) {
  try {
    const path = pathSegments.join('/');
    const url = `${SMARTEVENT_API_URL}/${path}`;

    const isRegistrationEndpoint = [
      'Display-Registration-Categories',
      'Display-Categories-Form-Inputs',
      'Register-Delegate',
      'Invite-Bulk-Delegates',
    ].some((endpoint) => path.includes(endpoint));

    const isExhibition = isExhibitionPath(path);

    const headers: Record<string, string> = {};

    const authorization = request.headers.get('authorization');
    if (authorization) {
      headers['Authorization'] = authorization;
    } else if (isExhibition) {
      headers['Authorization'] = EXHIBITION_EVENT_CODE_AUTH;
    } else if (path.includes('Registration-Page-Api')) {
      headers['Authorization'] = EVENT_CODE;
    }

    let body: FormData | string | URLSearchParams | undefined;
    if (method !== 'GET') {
      if (isExhibition) {
        try {
          const clonedRequest = request.clone();
          const incomingFormData = await clonedRequest.formData();

          const newFormData = new FormData();

          incomingFormData.forEach((value, key) => {
            if (key !== 'event_code') {
              newFormData.append(key, value);
            }
          });
          newFormData.append('event_code', EXHIBITION_EVENT_CODE_AUTH);

          body = newFormData;
          delete headers['Content-Type'];
        } catch {
          headers['Content-Type'] = 'application/json';
          body = undefined;
        }
      } else if (isRegistrationEndpoint) {
        try {
          const clonedRequest = request.clone();
          const incomingFormData = await clonedRequest.formData();

          const eventCodeField = path.includes('Invite-Bulk-Delegates') ? 'eventcode' : 'event_code';
          const eventCodeValue = path.includes('Invite-Bulk-Delegates') ? BULK_INVITE_EVENT_CODE : EVENT_CODE;

          const newFormData = new FormData();
          newFormData.append(eventCodeField, eventCodeValue);

          incomingFormData.forEach((value, key) => {
            if (key !== 'event_code' && key !== 'eventcode') {
              newFormData.append(key, value);
            }
          });

          body = newFormData;
          delete headers['Content-Type'];
        } catch {
          try {
            const eventCodeField = path.includes('Invite-Bulk-Delegates') ? 'eventcode' : 'event_code';
            const eventCodeValue = path.includes('Invite-Bulk-Delegates') ? BULK_INVITE_EVENT_CODE : EVENT_CODE;
            const formParams = new URLSearchParams();
            formParams.append(eventCodeField, eventCodeValue);

            const jsonBody = await request.json();
            Object.entries(jsonBody).forEach(([key, value]) => {
              if (key !== 'event_code' && key !== 'eventcode') {
                formParams.append(key, String(value));
              }
            });

            headers['Content-Type'] = 'application/x-www-form-urlencoded';
            body = formParams;
          } catch {
            headers['Content-Type'] = 'application/json';
            body = undefined;
          }
        }
      } else {
        headers['Content-Type'] = 'application/json';
        try {
          body = await request.text();
        } catch {
          body = undefined;
        }
      }
    } else {
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(url, {
      method,
      headers,
      body: body instanceof FormData ? body : body?.toString() || undefined,
    });

    const data = await response.text();

    return new NextResponse(data, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('SmartEvent proxy error:', error);
    return NextResponse.json(
      { message: 'Proxy error', error: String(error) },
      { status: 500 },
    );
  }
}
