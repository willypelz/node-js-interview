const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');

const server = require('../app');
const Member = require('../app/models/member')

describe('/members requests', () => {
    let member;
    let memberObject = { name: 'Asefon Michael P.', type: 'employee', role: 'Software Engineer'}
    beforeEach(async () => {
      member =  await Member.create(memberObject);
    });


    describe('GET /members', () => {
        it('returns list of members which should be array', async () => {
            const response = await request(server).get('/members')
            expect(response.body.data).to.be.an('array');
        });
    });

    describe('GET /members/:id', () => {
        it('returns single member', async () => {
            const response = await request(server).get(`/members/${member._id}`);
            expect(response.body.data).to.have.deep.include(memberObject);
        });

    });

    describe('POST /members (= create)', () => {
        const newMemberObject = { name: 'David G.', type: 'contractor', duration: '18 months'}
        it('creates member ', async () => {
            const response = await request(server)
                .post('/members')
                .send(newMemberObject);

            const responseData = response.body.data;

            expect(responseData._id).not.to.be.null;
            expect(responseData).to.deep.include(newMemberObject);

            //fetch what was created to be 100% sure of data creation
            const loadedMember = await Member.findById(responseData._id);
            expect(loadedMember).to.deep.include(newMemberObject);
        });
    });


    describe('PATCH /members/:id (= update)', () => {

        it('updates selected members', async () => {
            const response = await request(server)
                .patch(`/members/${member._id}`)
                .send({ type: 'employee', role: 'Senior Engineer' });

            expect(response.body.data).to.deep.include({
                role: 'Senior Engineer'
            });

        });
    });

    describe('DELETE /members/:id (= destroy)', () => {

        it('deletes specific member selected', async () => {
            const response = await request(server)
                .delete(`/members/${member._id}`);

            expect(response.status).to.equal(204);
            expect(response.body).to.deep.equal({});
            const loadedMember = await Member.findById(member._id);
            expect(loadedMember).to.be.null;
        });
    });
});
