const data = {
  recipeData: {
    name: 'Amala and Ewedu',
    description: 'Yummy amala for everyday consumption',
    preparationTime: '40 mins',
    type: 'Main',
    ingredients: 'amala powder, ewedu leaf, stew',
    instructions: 'turn amala in pot, mix ewedu and stew',
    imageFile: ''
  },

  recipeData2: {
    name: 'name',
    description: 'description',
    preparationTime: 'time time',
    type: 'Dessert',
    ingredients: 'ingredients, ingredients, ingredients',
    instructions: 'instructions',
    imageFile: ''
  },

  addRecipeResponse: {
    status: 'Success',
    message: 'Amala and Ewedu has been added',
    recipe: {
      id: 2,
      name: 'Amala and Ewedu',
      description: 'Yummy amala for everyday consumption',
      preparationTime: '40 mins',
      type: 'Main',
      ingredients: 'amala powder, ewedu leaf, stew',
      instructions: 'turn amala in pot, mix ewedu and stew',
      image: 'http://res.cloudinary.com/zeze-andela/image/upload/v1513857342/noimg_mhvbu1.png',
      userId: 3
    }
  },

  addRecipeResponse2: {
    status: 'Success',
    message: 'name has been added',
    recipe: {
      id: 3,
      name: 'name',
      description: 'description',
      preparationTime: 'time time',
      type: 'Main',
      ingredients: 'ingredients, ingredients, ingredients',
      instructions: 'instructions',
      image: 'http://res.cloudinary.com/zeze-andela/image/upload/v1513857342/noimg_mhvbu1.png',
      userId: 3
    }
  },

  getAllRecipesResponse: {
    status: 'Successful',
    recipes: [
      {
        id: 2,
        name: 'Amala and Ewedu',
        description: 'Yummy amala for everyday consumption',
        preparationTime: '40 mins',
        type: 'Main',
        ingredients: 'amala powder, ewedu leaf, stew',
        instructions: 'turn amala in pot, mix ewedu and stew',
        image: '',
        userId: 3
      },
      {
        id: 3,
        name: 'name',
        description: 'description',
        preparationTime: 'time time',
        type: 'Main',
        ingredients: 'ingredients, ingredients, ingredients',
        instructions: 'instructions',
        image: '',
        userId: 3
      }
    ]
  },

  getPagedRecipesResponse: {
    status: 'Successful',
    recipes: [
      {
        id: 2,
        name: 'Amala and Ewedu',
        description: 'Yummy amala for everyday consumption',
        preparationTime: '40 mins',
        type: 'Main',
        ingredients: 'amala powder, ewedu leaf, stew',
        instructions: 'turn amala in pot, mix ewedu and stew',
        image: '',
        userId: 3
      },
      {
        id: 3,
        name: 'name',
        description: 'description',
        preparationTime: 'time time',
        type: 'Main',
        ingredients: 'ingredients, ingredients, ingredients',
        instructions: 'instructions',
        image: '',
        userId: 3
      }
    ],
    pagination: {
      pageSize: 3,
      totalCount: 2,
      page: 1,
      pageCount: 1
    }
  },

  viewRecipeError: {
    status: 'Unsuccessful',
    message: 'Recipe Not Found',
  },

  updateRecipeResponse: {
    status: 'Success',
    message: 'Amala and Ewedu has been updated',
    recipe: {
      id: 2,
      name: 'Amala and Ewedu',
      description: 'Yummy amala for everyday consumption',
      preparationTime: '1hr 30 mins',
      type: 'Main',
      ingredients: 'amala powder, ewedu leaf, stew',
      instructions: 'turn amala in pot, mix ewedu and stew',
      image: '',
      userId: 3
    }
  },

  viewRecipeResponse: {
    status: 'Successful',
    recipe: {
      id: 2,
      name: 'Amala and Ewedu',
      description: 'Yummy amala for everyday consumption',
      preparationTime: '1hr 30 mins',
      type: 'Main',
      ingredients: 'amala powder, ewedu leaf, stew',
      instructions: 'turn amala in pot, mix ewedu and stew',
      image: '',
      userId: 3,
      User: {
        firstName: 'Jane',
        surname: 'Doe'
      }
    }
  },

  mostUpvotedResponse: {
    status: 'Successful',
    message: 'There Are Currently No Popular Recipes',
    recipes: []
  },

  updateRecipeData: {
    preparationTime: '1hr 30 mins'
  },

  searchResponse: {
    recipes: [{
      id: 2,
      name: 'Amala and Ewedu',
      description: 'Yummy amala for everyday consumption',
      preparationTime: '40 mins',
      type: 'Main',
      ingredients: 'amala powder, ewedu leaf, stew',
      instructions: 'turn amala in pot, mix ewedu and stew',
      image: '',
      userId: 3
    }]
  },

  deleteRecipeResponse: {
    status: 'Successful',
    message: 'name has been deleted'
  },
};

export default data;
