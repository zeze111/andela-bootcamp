class Values {
  static getAllRecipes(request, response) {
    response.status(200).json({
      status:'Success', message: request.params.some_value
    }) 
  }
}

export default Values;
