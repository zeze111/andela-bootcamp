const data = {
  favoriteResponse: {
    status: 'Successful',
    message: 'Recipe has been added to your Favorites',
    favorite: {
      id: 1,
      recipeId: 2,
      userId: 45
    }
  },

  deleteFavoriteResponse: {
    status: 'Successful',
    message: 'Recipe has been removed from your Favorites',
  },

  allFavoritesResponse: {
    status: 'Successful',
    favorites: [{
      id: 2,
      name: 'Amala and Ewedu',
      description: 'Yummy amala for everyday consumption',
      preparationTime: '40 mins',
      type: 'Main',
      User: {
        firstName: 'Jane',
        surname: 'Doe'
      }
    }]
  },

  favoriteError: {
    status: 'Unsuccessful',
    message: 'Recipe Not Found',
  }
}

export default data;
