module.exports = {
  'Display homepage and ensure all element are available': (browser) => {
    browser
      .url('http://localhost:8000')
      .pause(3000)
      .waitForElementVisible('body', 5000)
      .assert.containsText('#auth', 'Sign Up / In')
      .assert.containsText('#logo', 'MoreRecipes')
      .assert.visible('#slide')
    browser.pause(1000);
  },

  'user gets error when signup field is not properly filled': (browser) => {
    browser
      .refresh()
      .click('a#auth')
      .waitForElementVisible('body', 5000)
      .assert.elementPresent('a#auth')
      .assert.elementPresent('input[name=firstName]')
      .assert.elementPresent('input[name=surname]')
      .assert.elementPresent('input[name=email]')
      .assert.elementPresent('input[name=password]')
      .assert.elementPresent('input[name=password_confirmation]')
      .assert.elementPresent('input[value=Register]')
      .waitForElementVisible('#signupForm', 5000)
      .setValue('input[name=firstName]', '')
      .setValue('input[name=surname]', 'Doe')
      .setValue('input#email', 'jane@yahoo.com')
      .setValue('input#pwd', 'janedoe')
      .setValue('input[name=password_confirmation', 'janedoe')
      .click('input[value=Register]')
      .pause(3000)
      .assert.visible('#errors')
      .expect.element('#errors').text.to.equal('The firstName field is required.');
    browser.pause(1000);
  },

  'it registers a user and redirect to homepage': (browser) => {
    browser
      .refresh()
      .click('a#auth')
      .waitForElementVisible('body', 5000)
      .assert.elementPresent('a#auth')
      .assert.elementPresent('input[name=firstName]')
      .assert.elementPresent('input[name=surname]')
      .assert.elementPresent('input[name=email]')
      .assert.elementPresent('input[name=password]')
      .assert.elementPresent('input[name=password_confirmation]')
      .assert.elementPresent('input[value=Register]')
      .waitForElementVisible('#signupForm', 5000)
      .setValue('input[name=firstName]', 'Jane')
      .setValue('input[name=surname]', 'Doe')
      .setValue('input#email', 'jane@yahoo.com')
      .setValue('input#pwd', 'janedoe')
      .setValue('input[name=password_confirmation', 'janedoe')
      .click('input[value=Register]')
      .pause(3000)
      .assert.urlEquals('http://localhost:8000/')
      .assert.containsText('.caps.div-pointer2.username', 'Jane');
    browser.pause(1000);
  },

  'it signs user out': (browser) => {
    browser
      .refresh()
      .click('.caps.div-pointer2.username')
      .waitForElementVisible('body', 5000)
      .assert.elementPresent('.caps.div-pointer2.username')
      .assert.elementPresent('#profile')
      .assert.elementPresent('#signOut')
      .click('#signOut')
      .assert.urlEquals('http://localhost:8000/')
      .assert.containsText('#auth', 'Sign Up / In')
    browser.pause(1000);
  },

  'user gets error when invalid credentials are entered': (browser) => {
    browser
      .refresh()
      .click('a#auth')
      .waitForElementVisible('body', 5000)
      .click('a[href="#tab_01"]')
      .waitForElementVisible('#signinForm', 5000)
      .assert.elementPresent('input[name=email]')
      .assert.elementPresent('input[name=password]')
      .assert.elementPresent('input[value="Sign in"]')
      .setValue('input#signInEmail', 'jane@yahoo.com')
      .setValue('input#signInPwd', 'jane')
      .click('input[value="Sign in"]')
      .pause(5000)
      .assert.visible('#inerrors')
      .expect.element('#inerrors').text.to.equal('Sign in failed, Wrong email/password');
    browser.pause(1000);
  },

  'user gets error when invalid credentials are entered': (browser) => {
    browser
      .refresh()
      .click('a#auth')
      .waitForElementVisible('body', 5000)
      .click('a[href="#tab_01"]')
      .waitForElementVisible('#signinForm', 5000)
      .assert.elementPresent('input[name=email]')
      .assert.elementPresent('input[name=password]')
      .assert.elementPresent('input[value="Sign in"]')
      .setValue('input#signInEmail', 'jane@yahoo.com')
      .setValue('input#signInPwd', 'janedoe')
      .click('input[value="Sign in"]')
      .pause(5000)
      .assert.urlEquals('http://localhost:8000/')
      .assert.containsText('.caps.div-pointer2.username', 'Jane');
    browser.pause(1000);
  },

  'user gets error when recipe field is not properly filled': (browser) => {
    browser
      .refresh()
      .click('a#add')
      .waitForElementVisible('body', 5000)
      .assert.elementPresent('input[name=name]')
      .assert.elementPresent('input[name=preparationTime]')
      .assert.elementPresent('input[name=description]')
      .assert.elementPresent('input[class=select-dropdown]')
      .assert.elementPresent('textarea[name=ingredients]')
      .assert.elementPresent('textarea[name=instructions]')
      .assert.elementPresent('input[value=Submit]')
      .waitForElementVisible('#add-form', 5000)
      .setValue('input#name', 'Jollof rice')
      .setValue('input#time', '')
      .setValue('input#desc', '')
      .setValue('input[class=select-dropdown]', 'option[value=Main]')
      .setValue('textarea#ingred', 'rice, pepper, tomatoes, onions')
      .setValue('textarea#instruct', 'mix them all together and cook')
      .click('input[value=Submit]')
      .pause(3000)
      .expect.element('#errors').to.be.present
      // .expect.element('#errors').text.to.equal('The preparationTime field is required.');
    browser.pause(1000);
  },

  'user adds a recipe successfully': (browser) => {
    browser
      .refresh()
      .click('a#add')
      .waitForElementVisible('body', 5000)
      .assert.elementPresent('input[name=name]')
      .assert.elementPresent('input[name=preparationTime]')
      .assert.elementPresent('input[name=description]')
      .assert.elementPresent('input[class=select-dropdown]')
      .assert.elementPresent('textarea[name=ingredients]')
      .assert.elementPresent('textarea[name=instructions]')
      .assert.elementPresent('input[value=Submit]')
      .waitForElementVisible('#add-form', 5000)
      .setValue('input#name', 'Jollof rice')
      .setValue('input#time', '2 hours')
      .setValue('input#desc', '')
      .click('.select-wrapper')
      .pause(3000)
      .click('select[name=type] option[value=Main]')
      // .click('select[name=type]')
      // .click('option[value="Main"]')
      // .setValue('option[value=Main]', 'Main')
      // .click('select[name=type]')
      .setValue('textarea#ingred', 'rice, pepper, tomatoes, onions')
      .setValue('textarea#instruct', 'mix them all together and cook')
      .click('input[value=Submit]')
      .pause(3000)
      // .assert.urlEquals('http://localhost:8000/user/recipes')
    browser.pause(1000);
  },
}
