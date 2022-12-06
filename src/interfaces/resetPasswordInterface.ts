export default interface IResetPasswordSchema {
  email: string;
  code: string;
  used: boolean;
  expire: Date;
}