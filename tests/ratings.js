import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../Server';

const should = chai.should();

chai.use(chaiHttp);
