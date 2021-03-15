const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');

const server = require('../app');
const Member = require('../app/models/member')
const Tag = require('../app/models/tag')
const MemberTag = require('../app/models/memberTag')

describe('/members requests', () => {
    let member;
    let memberObject = {name: 'Asefon Michael P.', type: 'employee', role: 'Software Engineer'}
    let tag;
    let tagObject = {name: 'c++'}
    let memberTag;
    let memberTagObject;

    beforeEach(async () => {
        member = await Member.create(memberObject);
        tag = await Tag.create(tagObject);
        memberTagObject = {member_id: member._id, tag_id: tag._id}
        memberTag = await MemberTag.create(memberTagObject);
    });


    describe('POST /members/tags (= create)', () => {
         it('creates memberTag ', async () => {
            const response = await request(server)
                .post('/members/tags')
                .send(memberTagObject);

            const responseData = response.body.data;
            expect(responseData._id).not.to.be.null;

        });
    });
    //
    //
    describe('PATCH /members/tags/:id (= update)', () => {

        it('updates selected memberTags', async () => {
            const response = await request(server)
                .patch(`/members/tags/${memberTag._id}`)
                .send({tag_id: tag._id});

            expect(response._id).not.to.be.null;
        });
    });
    //
    describe('DELETE /members/tags/:id (= destroy)', () => {

        it('deletes specific memberTag selected', async () => {
            const response = await request(server)
                .delete(`/members/tags/${memberTag._id}`);

            expect(response.status).to.equal(204);
            expect(response.body).to.deep.equal({});
        });
    });
});
