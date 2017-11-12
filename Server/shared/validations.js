const userRules = {
  firstName: 'required|between:2,35',
  surname: 'required|between:2,50',
  email: 'required|email',
  password: 'required|confirmed|min:6',
  password_confirmation: 'required',
};

const recipeRules = {
  name: 'required|between:2,90',
  description: 'between:2,140',
  prepTime: 'required|min:5',
  type: 'required',
  ingredients: 'required|min:15',
  instructions: 'required|min:10',
};

const updateRecipeRules = {
  name: 'between:2,90',
  description: 'between:3,140',
  prepTime: 'between:2,90',
  type: 'between:4,90',
  ingredients: 'between:5,1200',
  instructions: 'between:10,1200',
};


export default { userRules, recipeRules, updateRecipeRules };
