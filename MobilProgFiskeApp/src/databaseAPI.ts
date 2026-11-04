const baseUrl =
  'https://mobile-programming.emilhesmyr.workers.dev/api/v1/';

export async function sendRequest(
  endPoint: string,
  method: string,
  headers: Record<string, string | number> = {}
): Promise<Response> {

  const stringHeaders: Record<string, string> = {};

  for (const [key, value] of Object.entries(headers)) {
    stringHeaders[key] = String(value);
  }

  const response = await fetch(baseUrl + endPoint, {
    method,
    headers: stringHeaders,
  });

  if (!response.ok) {
    const errorMessage = await response.clone().text();

    console.error('API request failed:', {
      endpoint: endPoint,
      method,
      status: response.status,
      message: errorMessage,
    });
  }

  return response;
}
