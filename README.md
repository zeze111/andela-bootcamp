# More-Recipes
  [![Build Status](https://travis-ci.org/zeze111/more-recipes.svg?branch=develop)](https://travis-ci.org/zeze111/more-recipes)
[![Coverage Status](https://coveralls.io/repos/github/zeze111/more-recipes/badge.svg?branch=develop)](https://coveralls.io/github/zeze111/more-recipes?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/f665ddbfed3d92bd7fd4/maintainability)](https://codeclimate.com/github/zeze111/more-recipes/maintainability)


More Recipe Project: More Recipes is a website applications that allow users submit and share their cooking recipes.


## Heroku App
* https://zeze-more-recipes.herokuapp.com/

## Website Features
#### User Authentication
Users are authenticated and validated using JSONWebTokens

#### Website Functionality
* Create a new account with the app (Sign Up)
* Login with credentials
* View account profile
* Update User details
* Change password
* View a list of user's submitted recipes
* View a list of user's favorite recipes
* Submit recipe
* Update submitted recipes
* Delete recipe from list
* View a list of all recipes in the application
* View a list of the most popular recipes
* Up-vote or down-vote a recipe
* Favorite a recipe
* Review a recipe

## API Documentation
The full documentation for all api end point can be found at https://zeze-more-recipes.herokuapp.com/api-docs

## API End-Points
* User Sign up - /api/v1/users/signup
* User Sing in - /api/v1/users/signin
* Create Recipe by Authenticated user - /api/v1/recipes
* Update Recipe by Authenticated user - /api/v1/recipes/:recipeId
* Delete Recipe by Authenticated user - /api/v1/recipes/:recipeId
* Favorite a Recipe by Authenticated user - /api/v1/recipes/:recipeId/favorite
* Upvote a Recipe by Authenticated user - /api/v1/recipes/:recipeId/upvote
* Downvote a Recipe by Authenticated user - /api/v1/recipes/:recipeId/downvote
* Review a Recipe by Authenticated user - /api/v1/recipes/:recipeId/reviews
* Retrieve a Favorite Recipes for authenticated user - api/v1/users/:userId/favorites
* Retrieve a list of Submitted Reecipes for Authenticated user - api/v1/users/:userId/recipes
* Retrieve a Recipe by User - /api/v1/recipes/:recipeId
* Retrieve a list of All Recipes by User - /api/v1/recipes
* Retrieve a list of (paginated) All Recipes by User - /api/v1/recipes/?page=number
* Retrieve a list of Popular Recipes by User - api/v1/recipes?sort=upvotes&order=des

## Technologies
Written following JavaScript ES6 Syntax and nodejs on the backend, using:

* Nodejs; a JavaScript runtime built on Chrome's V8 JavaScript engine.
* Materialize; a flat-based framework for easy styling and designing of web pages.
* Mocha; a feature-rich JavaScript test framework running on Node.js
* Chai; a BDD / TDD assertion library for node and the browser that can be paired with any javascript testing framework.
* Eslint; provides a pluggable linting utility for JavaScript
* Hound CI; comments on style violations on GitHub pull requests.
* Travis CI; a hosted continuous integration and delivery service for GitHub projects.
* Express js; handles backend routing.
* Coveralls; shows the parts of your code that are not covered by your test suites.
* Sequelize; a promise-based ORM for Node.js and io.js.
* PostgreSQL; a powerful, open source object-relational database system.
* Postman;  a powerful HTTP client for testing web services

## Installation
* Install Node js and Postgres on your machine
* Clone the repository `git clone https://github.com/zeze111/more-recipes.git`
* Navigate to directory `cd more-recipes`
* Install all required dependencies with `npm install`
* For easy accessibility, Install sequelize-cli globally for database migrations ` npm install -g sequelize-cli `
* Create a `.env` file in your root directory, following the syntax of the `.env` file
* Migrate your database using `sequelize db:migrate` on the command line
* You can undo migrations by running `sequelize db:migrate:undo:all` on the command line
* Run npm start to `start:dev` the application

## Test
* For Backend testing run `npm run test`

## Limitations of the application
* User signed in expires after 48 hours of being signed in
* User cannot create account, if email exists already
* User cannot submit, favorite, update / delete a recipe if not signed in


## Contributions
* Fork this repository to your github account
* Clone the repository - git clone https://github.com/{your_username_goes_here}/dman.git
* Create your feature branch - git checkout -b {feature, chore or bug}-short_feature_desscription
* Commit your changes - git commit -m “{commit_message_goes_here}“ or git commit for the interactive interface
* Push to the remote branch - git push origin {your_branch_name_as_described_above}
* Create a pull request

## Author
Osaze Edo-Osagie
