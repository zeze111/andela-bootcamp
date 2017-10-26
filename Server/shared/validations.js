const userRules = {
  firstName: 'required|between:2,35',
  surname: 'required|between:2,50',
  email: 'required|email',
  password: 'required|confirmed|min:6',
  password_confirmation: 'required',
};

export default userRules;
