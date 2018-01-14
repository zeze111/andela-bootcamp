import { Recipe, Rating } from '../models';

const ratings = {

  /** Upvotes a Recipe and stores in the Ratings table
  * @param {Object} request - request object
  * @param {Object} response - response object
  * @returns {Object} response object
  */
  upvote(request, response) {
    if (Number.isNaN(request.params.recipeId)) {
      return response.status(406).json({
        status: 'Unsuccessful',
        message: 'Recipe Must Be A Number',
      });
    }
    const recipeid = parseInt(request.params.recipeId, 10);
    Recipe.findOne({
      where: { id: recipeid },
    })
      .then((recipe) => {
        if (!recipe) {
          return response.status(404).json({
            status: 'Unsuccessful',
            message: 'Recipe Not Found',
          });
        }
        Rating.findOne({
          where: {
            userId: request.decoded.id,
            recipeId: recipeid,
          },
        })
          .then((votes) => {
            if (votes) {
              if (votes.vote === 0) {
                votes.update({
                  vote: 1,
                })
                  .then(() => {
                    return response.status(200).json({
                      status: 'Successful',
                      message: 'You Have Upvoted this Recipe',
                    });
                  })
                  .catch(error => response.status(400).send(error));
              } else if (votes.vote === 1) {
                votes.destroy()
                  .then(() => {
                    return response.status(200).json({
                      status: 'Successful',
                      message: 'Your Vote was Deleted',
                    });
                  });
              }
            } else {
              Rating.create({
                vote: 1,
                userId: request.decoded.id,
                recipeId: recipe.id,
              })
                .then((rated) => {
                  return response.status(201).json({
                    status: 'Successful',
                    vote: rated,
                  });
                })
                .catch(error => response.status(500).send(error));
            }
          })
          .catch(error => response.status(500).send(error));
      })
      .catch(error => response.status(500).send(error));
  },


  /** downvotes a Recipe and stores in the Ratings table
  * @param {Object} request - request object
  * @param {Object} response - response object
  * @returns {Object} response object
  */
  downvote(request, response) {
    if (Number.isNaN(request.params.recipeId)) {
      return response.status(406).json({
        status: 'Unsuccessful',
        message: 'Recipe Must Be A Number',
      });
    }
    const recipeid = parseInt(request.params.recipeId, 10);
    Recipe.findOne({
      where: { id: recipeid },
    })
      .then((recipe) => {
        if (!recipe) {
          return response.status(404).json({
            status: 'Unsuccessful',
            message: 'Recipe Not Found',
          });
        }
        Rating.findOne({
          where: {
            userId: request.decoded.id,
            recipeId: recipeid,
          },
        })
          .then((votes) => {
            if (votes) {
              if (votes.vote === 1) {
                votes.update({
                  vote: 0,
                })
                  .then(() => {
                    return response.status(200).json({
                      status: 'Successful',
                      message: 'You Have Downvoted this Recipe',
                    });
                  })
                  .catch(error => response.status(400).send(error));
              } else if (votes.vote === 0) {
                votes.destroy()
                  .then(() => {
                    return response.status(200).json({
                      status: 'Successful',
                      message: 'Your Vote was Deleted',
                    });
                  });
              }
            } else {
              Rating.create({
                vote: 0,
                userId: request.decoded.id,
                recipeId: recipe.id,
              })
                .then((rated) => {
                  return response.status(201).json({
                    status: 'Successful',
                    vote: rated,
                  });
                })
                .catch(error => response.status(500).send(error));
            }
          })
          .catch(error => response.status(500).send(error));
      })
      .catch(error => response.status(500).send(error));
  },

  /** gets the total upvotes for a recipe
  * @param {Object} request - request object
  * @param {Object} response - response object
  * @returns {Object} response object
  */
  getUpvotes(request, response) {
    if (Number.isNaN(request.params.recipeId)) {
      response.status(406).json({
        status: 'Unsuccessful',
        message: 'Recipe Must Be A Number',
      });
    }
    const recipeid = parseInt(request.params.recipeId, 10);
    Rating.findAndCountAll({
      where: {
        recipeId: recipeid,
        vote: 1,
      },
    })
      .then((upvotes) => {
        response.status(200).json({
          status: 'Successful',
          votes: upvotes,
        });
      })
      .catch(error => response.status(400).send(error));
  },

  /** gets the total downvotes for a recipe
  * @param {Object} request - request object
  * @param {Object} response - response object
  * @returns {Object} response object
  */
  getDownvotes(request, response) {
    if (Number.isNaN(request.params.recipeId)) {
      response.status(406).json({
        status: 'Unsuccessful',
        message: 'Recipe Must Be A Number',
      });
    }
    const recipeid = parseInt(request.params.recipeId, 10);
    Rating.findAndCountAll({
      where: {
        recipeId: recipeid,
        vote: 0,
      },
    })
      .then((downvotes) => {
        response.status(200).json({
          status: 'Successful',
          votes: downvotes,
        });
      })
      .catch(error => response.status(400).send(error));
  },

};

export default ratings;
