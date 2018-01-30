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
  prepTime: 'required|min:5',
  type: 'required',
  ingredients: 'required|min:5',
  instructions: 'required|min:10',
};

const reviewRules = {
  title: 'required|between:2,90',
  comment: 'required',
};

const updateRecipeRules = {
  name: 'between:2,90',
  description: 'between:3,140',
  prepTime: 'between:2,90',
  type: 'between:4,90',
  ingredients: 'between:5,1200',
  instructions: 'between:10,1200',
};

const updateUserRules = {
  firstName: 'alpha|between:2,35',
  surname: 'alpha|between:2,50',
  email: 'email',
  password: 'min:6|alpha_num'
};

export default {
  userRules,
  recipeRules,
  reviewRules,
  updateRecipeRules,
  updateUserRules
};
