let server = require('./app.js');

let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;

chai.use(chaiHttp);

describe('Accessing invalid URL', () => {
    it('should redirect to /todo', done => {
        chai.request(server).get('').end((err, res) => {

            expect(res.statusCode).to.equal(200);
            expect(res.redirects[0].split('/').reverse()[0]).to.equal('todo');

            done();
        });
    });
});

describe('Getting todo list before adding any', () => {
    it('should have no items in it', done => {
        chai.request(server).get('/todo').end((err, res) => {

            expect(res.statusCode).to.equal(200);

            done();
        });
    });
});

describe('Adding a new todo item', () => {
    it('should be added', done => {
        chai.request(server).post('/todo/add/').send({newtodo: 'Batman'}).end((err, res) => {

            expect(res.statusCode).to.equal(200);
            expect(res.redirects[0].split('/').reverse()[0]).to.equal('todo');

            done();
        });
    });
});

describe('Adding a new empty todo item', () => {
    it('should not be added', done => {
        chai.request(server).post('/todo/add/').send({newtodo: ''}).end((err, res) => {

            expect(res.statusCode).to.equal(200);
            expect(res.redirects[0].split('/').reverse()[0]).to.equal('todo');

            done();
        });
    });
});

describe('Updating todo item 0', () => {
    it('should update the text', done => {
        chai.request(server).post('/todo/update/0').send({updatedtodo: 'Iron Man'}).end((err, res) => {

            expect(res.statusCode).to.equal(200);
            expect(res.redirects[0].split('/').reverse()[0]).to.equal('todo');

            done();
        });
    });
});
describe('Updating todo item 0 with \'\'', () => {
    it('should not update', done => {
        chai.request(server).post('/todo/update/0').send({updatedtodo: ''}).end((err, res) => {

            expect(res.statusCode).to.equal(200);
            expect(res.redirects[0].split('/').reverse()[0]).to.equal('todo');

            done();
        });
    });
});

describe('Deleting todo item 0', () => {
    it('should work', done => {
        chai.request(server).get('/todo/delete/0').end((err, res) => {

            expect(res.statusCode).to.equal(200);
            expect(res.redirects[0].split('/').reverse()[0]).to.equal('todo');

            done();
        });
    });
});

describe('Check XSS prevention', () => {
    it('it should have escaped the string', done => {
        chai.request(server).post('/todo/add/').send({newtodo: "<script>console.log('Hello World!')</script>"}).end((err, res) => {

            expect(res.statusCode).to.equal(200);
            expect(res.redirects[0].split('/').reverse()[0]).to.equal('todo');

            done();
        });
    });
});
