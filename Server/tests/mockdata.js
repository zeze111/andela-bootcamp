export const createUser1 = {
  firstName: 'user',
  surname: 'user',
  email: 'user1@gmail.com',
  password: 'testpassword',
  password_confirmation: 'testpassword',
};

export const createUser2 = {
  firstName: 'osaze',
  surname: 'edo',
  email: 'osaze@gmail.com',
  password: 'testpassword',
  password_confirmation: 'testpassword',
};

//invalid user
export const createUser3 = {
  firstName: 'user',
  surname: 'user',
  email: 'user1@gmail.com',
  password: 'test',
  password_confirmation: 'test',
};

export const fakeUser = {
  email: 'fake@gmail.com',
  password: 'fakepassword',
};

export const errorUser = {
  email: 'user1@gmail.com',
  password: 'fakepassword',
};

export const user1 = {
  email: 'user1@gmail.com',
  password: 'testpassword',
};

export const recipe1 = {
  name: 'Amala and Ewedu',
  description: 'Yummy amala for everyday consumption',
  preparationTime: '40 mins',
  type: 'Dessert',
  ingredients: 'amala powder, ewedu leaf, stew',
  instructions: 'turn amala in pot, mix ewedu and stew',
};

export const recipe2 = {
  name: 'name',
  description: 'description',
  preparationTime: 'time time',
  type: 'Dessert',
  ingredients: 'ingredients, ingredients, ingredients',
  instructions: 'instructions',
};

export const errorRecipe = {
  name: 'Amala and Ewedu',
  description: '',
  preparationTime: '40 mins',
  type: 'Dessert',
  ingredients: '',
  instructions: 'turn amala in pot, mix ewedu and stew',
};

export const updatePassword = {
  oldPassword: "testpassword",
	newPassword: "testpassword2",
	newPassword_confirmation: "testpassword2"
}

export const update = {
  type: 'Main',
};

export const review = {
  comment: 'love this recipe',
}
