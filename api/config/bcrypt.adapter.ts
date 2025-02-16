import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

export class BcryptAdapter {
  static hash(password: string) {
    const salt = genSaltSync()
    return hashSync(password, salt)
  }

  static compare(options: { password: string, hashed: string }) {
    const { password, hashed } = options
    return compareSync(password, hashed)
  }
}