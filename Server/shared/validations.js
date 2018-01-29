const userRules = {
  firstName: 'required|alpha|between:2,35',
  surname: 'required|alpha|between:2,50',
  email: 'required|email',
  password: 'required|confirmed|min:6|alpha_num',
  password_confirmation: 'required',
};

const recipeRules = {
  name: 'required|alpha|between:2,90',
  description: 'alpha|between:2,140',
  prepTime: 'required|alpha_num|min:5',
  type: 'required',
  ingredients: 'required|alpha_dash|min:5',
  instructions: 'required|alpha_dash|min:10',
};

const reviewRules = {
  title: 'required|between:2,90',
  comment: 'required',
};

const updateRecipeRules = {
  name: 'alpha|between:2,90',
  description: 'alpha|between:3,140',
  prepTime: 'alpha_num|between:2,90',
  type: 'between:4,90',
  ingredients: 'alpha_dash|between:5,1200',
  instructions: 'alpha_dash|between:10,1200',
};

const updateUserRules = {
  firstName: 'alpha|between:2,35',
  surname: 'alpha|between:2,50',
  email: 'email',
  password: ['confirmed|min:6', 'regex:/\s/']
};

export default {
  userRules,
  recipeRules,
  reviewRules,
  updateRecipeRules,
  updateUserRules
};
