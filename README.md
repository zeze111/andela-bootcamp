# More-Recipes
  [![Build Status](https://travis-ci.org/zeze111/andela-bootcamp27.svg?branch=master)](https://travis-ci.org/zeze111/andela-bootcamp27)  <a href="https://codeclimate.com/github/codeclimate/codeclimate"><img src="https://codeclimate.com/github/codeclimate/codeclimate/badges/gpa.svg" /></a> <a href="https://codeclimate.com/github/codeclimate/codeclimate/coverage"><img src="https://codeclimate.com/github/codeclimate/codeclimate/badges/coverage.svg" /></a>

More Recipe Project: Click this link https://zeze111.github.io/more-recipes/Templates/ to access the website. More Recipes is a website applications that allow users submit and share their cooking recipes.

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
* Clone the repository [git clone https://github.com/zeze111/more-recipes.git]
* Navigate to directory [cd more-recipes]
* Install all required dependencies with [npm install]
* For easy accessibility, Install sequelize-cli globally for database migrations [ npm install -g sequelize-cli ]
* Create a [.env] file in your root directory, following the syntax of the [.env] file 
* Migrate your database using [sequelize db:migrate] on the command line
* You can undo migrations by running [sequelize db:migrate:undo:all] on the command line
* Run npm start to [start:dev] the application

## Limitations of the application
* User signed in expires after 48 hours of being signed in
* User cannot create account, if email exists already
* User cannot submit, favorite, update / delete a recipe if not signed in


## Contributions
* Fork the repository
* Make your contributions
* Make sure you test your work
* Create Pull request.
