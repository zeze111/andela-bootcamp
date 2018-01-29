import jwt from 'jsonwebtoken';
import { Recipe } from '../models';

export const paginationData = (count, limit, offset) => ({
  pageSize: parseInt(limit, 10),
  totalCount: count,
  page: Math.ceil(offset / limit) + 1,
  pageCount: Math.ceil(count / limit),
});

/** Creates a user token
  * @param {Object} payload - payload object
  * @returns {string} - return a decoded string
  */
export const createToken = (payload) => {
  const token = jwt.sign(
    payload, process.env.SECRET_KEY,
    { expiresIn: 60 * 60 * 48 },
  );
  return token;
};

export const isNum = (number, response, modelType) => {
  if (!Number.isNaN(number)) {
    return response.status(406).json({
      status: 'Unsuccessful',
      message: `${modelType} ID Must Be A Number`,
    });
  }
};

export const findRecipe = (recipeId, response) => {
  Recipe.findOne({
    where: { id: recipeId },
  })
    .then((recipe) => {
      if (!recipe) {
        return response.status(404).json({
          status: 'Unsuccessful',
          message: 'Recipe Not Found',
        });
      }
      return true;
    })
    .catch(error => response.status(500).send(error));
};
