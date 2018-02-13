const userRules = {
  firstName: 'required|alpha|between:2,35',
  surname: 'required|alpha|between:2,50',
  email: 'required|email',
  password: 'required|confirmed|min:6|alpha_num',
  password_confirmation: 'required',
};

const recipeRules = {
  name: 'required|between:2,90',
  description: 'between:2,140',
  preparationTime: 'required|min:5',
  type: ['required',
    { in: ['Appetizer', 'Main', 'Dessert', 'Drinks'] }],
  ingredients: 'required|min:5',
  instructions: 'required|min:10',
};

const reviewRules = {
  title: 'required|between:2,90',
  comment: 'required',
};

const passwordRules = {
  oldPassword: 'required',
  newPassword: 'required|confirmed|min:6|alpha_num',
  newPassword_confirmation: 'required',
};

const updateRecipeRules = {
  name: 'between:2,90',
  description: 'between:3,140',
  preparationTime: 'between:2,90',
  type: { in: ['Appetizer', 'Main', 'Dessert', 'Drinks'] },
  ingredients: 'between:5,1200',
  instructions: 'between:10,1200',
};

const updateUserRules = {
  firstName: 'alpha|between:2,35',
  surname: 'alpha|between:2,50'
};

export default {
  userRules,
  recipeRules,
  reviewRules,
  updateRecipeRules,
  updateUserRules,
  passwordRules
};
