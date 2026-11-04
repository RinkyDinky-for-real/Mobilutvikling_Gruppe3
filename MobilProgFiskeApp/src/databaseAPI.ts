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

  return fetch(baseUrl + endPoint, {
    method,
    headers: stringHeaders,
  });
}
