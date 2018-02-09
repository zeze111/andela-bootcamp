# More-Recipes
  [![Build Status](https://travis-ci.org/zeze111/more-recipes.svg?branch=develop)](https://travis-ci.org/zeze111/more-recipes)
[![Coverage Status](https://coveralls.io/repos/github/zeze111/more-recipes/badge.svg?branch=develop)](https://coveralls.io/github/zeze111/more-recipes?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/f665ddbfed3d92bd7fd4/maintainability)](https://codeclimate.com/github/zeze111/more-recipes/maintainability)


More Recipe Project: More Recipes is a website application that allow users submit and share their cooking recipes.

## Heroku App
---
* https://zeze-more-recipes.herokuapp.com/

## Website Features
---
### User Authentication
Users are authenticated and validated using JSONWebTokens

### Website Functionality
There are two major users of the app, their functionalities are listed below

#### Non Registered Users
* Create a new account with the app (Sign Up)
* Login with credentials
* View the details of a recipe
* View a list of all recipes in the application
* View a list of the most popular recipes

#### Registered Users
* View account profile
* Update User details
* Change password
* View a list of user's submitted recipes
* View a list of user's favorite recipes
* Submit a recipe
* Update submitted recipes
* Delete recipe from recipe / favorite list
* View the details of a recipe
* View a list of all recipes in the application
* View a list of the most popular recipes
* Upvote or downvote a recipe
* Favorite a recipe
* Review a recipe

## API Documentation
---
The full documentation for all api end points can be found at [MoreRecipes Docs](https://zeze-more-recipes.herokuapp.com/api-docs)

## Technologies
---
Written following JavaScript ES6 Syntax and nodejs on the backend, using:

Nodejs: a JavaScript runtime built on Chrome's V8 JavaScript engine.

```Materialize: a flat-based framework for easy styling and designing of web pages.```

Mocha: a feature-rich JavaScript test framework running on Node.js

```Chai: a BDD / TDD assertion library for node and the browser that can be paired with any javascript testing framework.```

Eslint: provides a pluggable linting utility for JavaScript

```Hound CI: comments on style violations on GitHub pull requests.```

Travis CI: a hosted continuous integration and delivery service for GitHub projects.

```Express js: handles backend routing.```

Coveralls: shows the parts of your code that are not covered by your test suites.

```Sequelize: a promise-based ORM for Node.js and io.js.```

PostgreSQL: a powerful, open source object-relational database system.

```Postman:  a powerful HTTP client for testing web services.```

React: a declarative, efficient, and flexible JavaScript library for building user interfaces.

```Redux: a predictable state container for JavaScript apps.```

Jest: a framework to test all JavaScript code including React applications

```Webpack:  a build tool that puts all of your assets, including Javascript, images, fonts, and CSS, in a dependency graph.```

## Installation
---
* Install Node js and Postgres on your machine
* Clone the repository `git clone https://github.com/zeze111/more-recipes.git`
* Navigate to directory `cd more-recipes`
* Install all required dependencies with `npm install`
* Create a `.env` file in your root directory, following the syntax of the `.env` file
* Migrate your database using `sequelize db:migrate` on the command line
* You can undo migrations by running `sequelize db:migrate:undo:all` on the command line
* Run `npm run start:dev` to start the application

## Test
---
* For Back-end testing, run `npm test`
* For Front-end testing, run `npm run jest`

## Limitations of the application
---
* User token on sign in \ sign up expires after 48 hours of being signed in
* User can change password but cannot reset password if forgotten
* Users can not view other user's profile nor see other user's favorites list.
* Users cannot deactivate their accounts

## Contributions
---
* Fork this repository to your github account
* Clone the repository - `git clone https://github.com/{your_username_goes_here}/dman.git`
* Create your feature branch - `git checkout -b {feature, chore or bug}-short_feature_desscription`
* Commit your changes - `git commit -m “{commit_message_goes_here}“ or git commit for the interactive interface`
* Push to the remote branch - `git push origin {your_branch_name_as_described_above}`
* Create a pull request

## Author
---
Osaze Edo-Osagie

## License
---
This is licensed for your use, modification and distribution under the [MIT license](https://github.com/zeze111/more-recipes/blob/develop/LICENSE).
