const {successResponse, errorResponse, responseCode, pagination, page} = require( '../utils/helpers');

const MemberTagRepository = require('../repositories/MemberTagRepository');

const addMemberTagRequest = require('../requests/addMemberTagRequest');
const updateMemberTagRequest = require('../requests/updateMemberTagRequest');


/**
 *
 * @api {post} /members/tags MemberTag: Add
 * @apiName addMemberTag
 * @apiGroup MemberTag Account
 * @apiVersion  0.1.0
 *
 *
 * @apiParam  {String} member_id Member_id unique ID
 * @apiParam  {String} tag_id Tag_id unique ID
 *
 *
 * @apiParamExample  {type} Request Example:
 * {
 *     member_id: "5f7da9656c2e1867628c7bce",
 *     tag_id: "5f7da9656c2e1867628c7bce",
 * }
 *
 *
 * @apiSuccessExample Success Response
 * HTTP/1.1 201 Ok
 {
    "status": "success",
    "message": "MemberTag added successfully.",
    "data": {
        "_id": "604e562eba32336c2f19b637",
        "member_id": "604d36a6c07eb321334958b2",
        "tag_id": "604d36a6c07eb321334958b2",
        "createdAt": "2021-03-14T18:30:06.420Z",
        "updatedAt": "2021-03-14T18:30:06.420Z",
        "__v": 0,
        "id": "604e562eba32336c2f19b637"
    }
}
 *
 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 422 UNPROCESSABLE ENTITY
 *     {
 *       "status": "error",
         "message": "Error creating add tag to member",
 *     }
 *
 */
exports.addMemberTag = async (request, response) => {

    try {
        const reqBody = request.body;
        const {
            FormattedError, NormalizedValue
        } = addMemberTagRequest.validate(reqBody);

        if (FormattedError)
            return errorResponse(
                response,
                response.UNPROCESSABLE_ENTITY,
                'Validation Error',
                FormattedError
            );

        let memberTag = await (new MemberTagRepository).addMemberTag(NormalizedValue);

        return successResponse(
            response,
            responseCode.CREATED,
            'MemberTag added successfully.',
            memberTag
        );
    } catch (err) {
        return errorResponse(
            response,
            responseCode.UNPROCESSABLE_ENTITY,
            'Error creating MemberTag.'
        );
    }
};


/**
 * @api {patch} /members/tags/:id  MemberTag: update
 * @apiName ListMemberTags
 * @apiGroup MemberTag Account
 *
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 200 OK
 {
    "status": "success",
    "message": "member tag ",
    "data": {
        "_id": "604e5743b50fec6fd6a1ac91",
        "member_id": "604d36a6c07eb321334958b3",
        "tag_id": "604d36a6c07eb321334958b2",
        "createdAt": "2021-03-14T18:34:43.916Z",
        "updatedAt": "2021-03-14T19:56:19.444Z",
        "__v": 0,
        "id": "604e5743b50fec6fd6a1ac91"
    }
}
 *
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 422 UNPROCESSABLE ENTITY
 *    {
 *      status: "false",
 *      message: "error updating member tag"
 *    }
 *
 * @param request
 * @param response
 */
exports.updateMemberTag = async (request, response) => {
    try {
        const {
            FormattedError,
            NormalizedValue
        } = updateMemberTagRequest.validate(request.body);

        if (FormattedError)
            return errorResponse(
                response,
                responseCode.UNPROCESSABLE_ENTITY,
                'Validation Error',
                FormattedError
            );

        const tag = await (new MemberTagRepository).updateMemberTag(request.params.id, NormalizedValue);

        return successResponse(
            response,
            responseCode.SUCCESS,
            'member tag',
            tag
        );
    } catch (err) {
        return errorResponse(
            response,
            responseCode.UNPROCESSABLE_ENTITY,
            'error updating member tag'
        );
    }
};

/**
 * @api {delete} /members/tags/:id MemberTags: Remove
 * @apiName removeMemberTag
 * @apiGroup MemberTag Account
 *
 * @apiParam {string} :id MemberTag unique ID
 *
 * @apiSuccessExample Success Response
 * HTTP/1.1 204 No Content
 *
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 422 UNPROCESSABLE ENTITY
 *    {
 *      status: "false",
 *      message: "Error deleting memberTag "
 *    }
 *
 *
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 404 NOT FOUND
 *    {
 *      status: "false",
 *      message: "memberTag not found"
 *    }
 *
 * @param request
 * @param response
 */
exports.deleteMemberTag = async (request, response) => {
    try {
        const id = request.params.id;
        let memberTag = await (new MemberTagRepository).getMemberTag(id);
        if (!memberTag)
            return errorResponse(
                response,
                responseCode.NOT_FOUND,
                'MemberTag not found'
            );

        return successResponse(
            response,
            responseCode.NO_CONTENT,
            '',
            await (new MemberTagRepository).deleteMemberTag(id)
        );

    } catch (err) {
        return errorResponse(
            response,
            responseCode.UNPROCESSABLE_ENTITY,
            'Error deleting memberTag',
        );
    }
};
