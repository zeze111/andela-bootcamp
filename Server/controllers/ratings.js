import models from '../models';

const Recipe = models.Recipe;
const Rating = models.Rating;

const ratings = {

  /** Upvotes a Recipe and stores in the RRatings table
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} Response object
  */
  upvote(req, res) {
    if (isNaN(req.params.recipeId)) {
      return res.status(406).json({
        status: 'Unsuccessful',
        message: 'Page Must Be A Number',
      });
    }
    const recipeid = parseInt(req.params.recipeId, 10);
    Recipe.findOne({
      where: { id: recipeid },
    })
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).json({
            status: 'Unsuccessful',
            message: 'Recipe Not Found',
          });
        }
        Rating.findOne({
          where: {
            userId: req.decoded.id,
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
                    return res.status(200).json({
                      status: 'Successful',
                      message: 'You Have Upvoted this Recipe',
                    });
                  })
                  .catch(error => res.status(400).send(error));
              } else if (votes.vote === 1) {
                votes.destroy()
                  .then(() => {
                    return res.status(200).json({
                      status: 'Successful',
                      message: 'Your Vote was Deleted',
                    });
                  });
              }
            } else {
              Rating.create({
                vote: 1,
                userId: req.decoded.id,
                recipeId: recipe.id,
              })
                .then((rated) => {
                  return res.status(201).json({
                    status: 'Successful',
                    vote: rated,
                  });
                })
                .catch(error => res.status(400).send(error));
            }
          })
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },


  /** downvotes a Recipe and stores in the Ratings table
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} Response object
  */
  downvote(req, res) {
    if (isNaN(req.params.recipeId)) {
      return res.status(406).json({
        status: 'Unsuccessful',
        message: 'Page Must Be A Number',
      });
    }
    const recipeid = parseInt(req.params.recipeId, 10);
    Recipe.findOne({
      where: { id: recipeid },
    })
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).json({
            status: 'Unsuccessful',
            message: 'Recipe Not Found',
          });
        }
        Rating.findOne({
          where: {
            userId: req.decoded.id,
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
                    return res.status(200).json({
                      status: 'Successful',
                      message: 'You Have Upvoted this Recipe',
                    })
                      .catch(error => res.status(400).send(error));
                  })
                  .catch(error => res.status(400).send(error));
              } else if (votes.vote === 0) {
                votes.destroy()
                  .then(() => {
                    return res.status(200).json({
                      status: 'Successful',
                      message: 'Your Vote was Deleted',
                    });
                  });
              }
            } else {
              Rating.create({
                vote: 0,
                userId: req.decoded.id,
                recipeId: recipe.id,
              })
                .then((rated) => {
                  return res.status(201).json({
                    status: 'Successful',
                    vote: rated,
                  });
                })
                .catch(error => res.status(400).send(error));
            }
          })
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

};

export default ratings;
