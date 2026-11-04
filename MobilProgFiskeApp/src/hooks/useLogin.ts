
import * as Crypto from 'expo-crypto';
import { sendRequest } from '../databaseAPI';

export async function login(
  userName: string,
  password: string
): Promise<string> {

  const passwordHash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password
  );

  const response = await sendRequest(
    'user/getuserid',
    'GET',
    {
      userName,
      passwordHash,
    }
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Incorrect username or password');
    }

    throw new Error(`Login failed: ${response.status}`);
  }

  const data: unknown = await response.json();

  if (
    !Array.isArray(data) ||
    typeof data[0]?.AccountId !== 'string'
  ) {
    throw new Error('Unexpected login response');
  }

  return data[0].AccountId;
}
