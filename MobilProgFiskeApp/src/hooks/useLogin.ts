
import { sendRequest } from '../databaseAPI';

export async function login(
  userName: string,
  password: string
): Promise<string> {

  // Check that the required fields aren't empty
  if (!userName.trim() || !password) {
    throw new Error('Username or password is missing');
  }

  const response = await sendRequest(
    'user/getuserid',
    'GET',
    {
      userName: userName.trim(),
      passwordHash: password,
    }
  );

  if (!response.ok) {
    throw new Error(`Login failed: ${response.status}`);
  }

  const data = await response.json();

  if (
    !Array.isArray(data) ||
    !data[0] ||
    typeof data[0].userId !== 'string'
  ) {
    throw new Error('Unexpected login response');
  }

  return data[0].userId;
}
