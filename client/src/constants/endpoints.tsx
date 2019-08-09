export default {
  login: "/auth/login",
  signup: "/auth/signup",
  activate: (token:string, email:string) => `/activate/${token}/${email}`,
  privacyTest: "/private",
  askResetPassword: "/reset-password-email",
  resetPassword: "/reset-password"
};
