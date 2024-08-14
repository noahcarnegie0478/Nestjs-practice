import * as bcrypt from 'bcrypt';

export function PasswordHasing(rawpassword: string) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hash(rawpassword, salt);
  return hash;
}

export function Encodepassword(rawpassword: string, hash: string) {
  const isMatch = bcrypt.compare(rawpassword, hash);
  return isMatch;
}
