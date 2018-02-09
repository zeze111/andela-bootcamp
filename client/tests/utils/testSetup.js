import moxios from 'moxios';
import $ from 'jquery';
import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import { LocalStorage } from '../mocks/localStorage';

// This file is written in ES5 since it's not transpiled by Babel.
// This file does the following:
// 1. Sets Node environment variable
// 2. Registers babel for transpiling our code for testing
// 3. Disables Webpack-specific features that Mocha doesn't understand.
// 4. Requires jsdom so we can test via an in-memory DOM in Node
// 5. Sets up global vars that mimic a browser.
// 6. Sets up a mock store for redux reducers and action-creators

process.env.NODE_ENV = 'test';

// React 15 Enzyme adapter
configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

require.extensions['.css'] = () => null;
require.extensions['.png'] = () => null;
require.extensions['.jpg'] = () => null;

global.expect = expect;
global.moxios = moxios;
global.mount = mount;
global.shallow = shallow;
global.Materialize = window;
global.Materialize = { toast: () => {} };
global.mockStore = mockStore;
global.$ = $;
global.jQuery = $;
global.navigator = {
  userAgent: 'node.js'
};

var documentRef = document;

// Disable webpack-specific features for tests since
// Jest doesn't know what to do with them.

// Configure JSDOM and set global variables
// to simulate a browser environment for tests.
// var jsdom = require('jsdom');

// const { JSDOM } = jsdom;

// var exposedProperties = ['window', 'navigator', 'document'];

// const { document } = (new JSDOM(
//   '<!doctype html><html><body></body></html>')).window;

// global.render = render;
// global.mount = mount;
// global.mock = mock;

// global.localStorage = new LocalStorage();
// global.decode = decode;
// global.document = document;
// global.window = document.defaultView;
// $.prototype.sideNav = () => {};
// $.prototype.modal = () => {};
// $.prototype.dropdown = () => {};

// Object.keys(document.defaultView).forEach((property) => {
//   if (typeof global[property] === 'undefined') {
//     exposedProperties.push(property);
//     global[property] = document.defaultView[property];
//   }
// });
