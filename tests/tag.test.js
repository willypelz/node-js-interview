const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');

const server = require('../app');
const Tag = require('../app/models/tag')

describe('/tags requests', () => {
    let tag;
    let tagObject = {name: 'c++'}

    beforeEach(async () => {
        tag = await Tag.create(tagObject);
    });

    describe('GET /tags', () => {
        it('returns list of tags which should be array', async () => {
            const response = await request(server).get('/tags')
            expect(response.body.data).to.be.an('array');
        });
    });

    describe('GET /tags/:id', () => {
        it('returns single tag', async () => {
            const response = await request(server).get(`/tags/${tag._id}`);
            expect(response.body.data).to.have.deep.include(tagObject);
        });

        it('returns status 404 when not found', async () => {
            const response = await request(server).get('/tags/604d36acc07eb321334958b3');
            expect(response.status).to.equal(404);
            expect(response.body).to.have.deep.include({message: "Tag not found"});
        });
    });

    describe('POST /tags (= create)', () => {
        it('creates tag ', async () => {
            const newTagObject = {name: 'Senior Backend developer'};
            const response = await request(server)
                .post('/tags')
                .send(newTagObject);

            const responseData = response.body.data;

            expect(responseData._id).not.to.be.null;
            expect(responseData).to.deep.include(newTagObject);

            //fetch what was created to be 100% sure of data creation
            const loadedTag = await Tag.findById(responseData._id);
            expect(loadedTag).to.deep.include(newTagObject);
        });
    });


    describe('PATCH /tags/:id (= update)', () => {
        const updateTagObject = {name: 'Senior Engineer'};

        it('updates selected tags', async () => {
            const response = await request(server)
                .patch(`/tags/${tag._id}`)
                .send(updateTagObject);

            expect(response.status).to.equal(200);
            expect(response.body.data).to.deep.include(updateTagObject);

        });
    });

    describe('DELETE /tags/:id (= destroy)', () => {

        it('deletes specific tag selected', async () => {
            const response = await request(server)
                .delete(`/tags/${tag.id}`);

            expect(response.status).to.equal(204);
            expect(response.body).to.deep.equal({});
            const loadedTag = await Tag.findById(tag._id);
            expect(loadedTag).to.be.null;
        });
    });
});
