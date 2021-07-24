import bcrypt from 'bcrypt';

export const hasher = {
  // 文字列をハッシュ化
  hash: (str: string) => {
    return bcrypt.hashSync(str, 10);
  },

  // 文字列がハッシュ化後と一致するか賢章
  check: (str: string, hashed: string) => {
    return bcrypt.compareSync(str, hashed);
  }
}