import * as crypto from 'crypto';

const SECRET_KEY = '2e2b8a40a1d4ef4f752d7d0d57e14c49d1a1c3e1b7b0e3f989d93d65d9d0a674';

export function hashPassword(password: string): string {
  const hmac = crypto.createHmac('sha256', SECRET_KEY);
  hmac.update(password);
  return hmac.digest('hex');
}

export function comparePassword(plainPassword: string, hashedPassword: string): boolean {
  return hashPassword(plainPassword) === hashedPassword;
}

function xorEncryptDecrypt(text: string, key: string): string {
  const keyLength = key.length;
  let result = '';

  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % keyLength));
  }

  return result;
}

export function encrypt(text: string): string {
  let encrypted = text;
  for (let i = 0; i < 3; i++) {
    encrypted = xorEncryptDecrypt(encrypted, SECRET_KEY);
  }
  return Buffer.from(encrypted, 'utf8').toString('base64');
}

export function decrypt(encryptedText: string): string {
  const base64Decoded = Buffer.from(encryptedText, 'base64').toString('utf8');
  let decrypted = base64Decoded;
  for (let i = 0; i < 3; i++) {
    decrypted = xorEncryptDecrypt(decrypted, SECRET_KEY);
  }
  return decrypted;
}
