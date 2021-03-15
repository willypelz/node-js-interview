const {successResponse, errorResponse, responseCode, pagination, page} = require('../utils/helpers');

const MemberRepository = require('../repositories/MemberRepository');

const addMemberRequest = require('../requests/addMemberRequest');
const updateMemberRequest = require('../requests/updateMemberRequest');


/**
 *
 * @api {post} /members Member: Add
 * @apiName addMember
 * @apiGroup Member Account
 * @apiVersion  0.1.0
 *
 *
 * @apiParam  {String} name Member name
 * @apiParam  {String} type Type
 * @apiParam  {String} duration Duration
 * @apiParam  {String} role Role
 *
 *
 * @apiParamExample  {type} Request Example:
 * {
 *     "name": "michael",
 *     "type": "contractor",
 *     "duration": "6month",
 * }
 *
 *
 * @apiSuccessExample Success Response
 * HTTP/1.1 201 Ok
 {
    "status": "success",
    "message": "Member added successfully.",
    "data": {
        "_id": "604f1ed33edb08001f0ae61a",
        "name": "michael",
        "type": "contractor",
        "duration": "6month",
        "createdAt": "2021-03-15T08:46:11.564Z",
        "updatedAt": "2021-03-15T08:46:11.564Z",
        "__v": 0
    }
}
 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 422 UNPROCESSABLE ENTITY
 *     {
 *       "status": "error",
         "message": "Error creating member",
 *     }
 *
 */
exports.addMember = async (request, response) => {

    try {
        const reqBody = request.body;
        const {
            FormattedError, NormalizedValue
        } = addMemberRequest.validate(reqBody);

        if (FormattedError)
            return errorResponse(
                response,
                response.UNPROCESSABLE_ENTITY,
                'Validation Error',
                FormattedError
            );

        let member = await (new MemberRepository).addMember(NormalizedValue);

        return successResponse(
            response,
            responseCode.CREATED,
            'Member added successfully.',
            member
        );
    } catch (err) {
        return errorResponse(
            response,
            responseCode.UNPROCESSABLE_ENTITY,
            'Error creating Member.'
        );
    }
};

/**
 * @api {get} /members  Member: List
 * @apiName ListMembers
 * @apiGroup Member Account
 *
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 200 OK
 {
    "status": "success",
    "message": "list of members",
    "data": [
        {
            "_id": "604f1ed33edb08001f0ae61a",
            "name": "michael",
            "type": "contractor",
            "duration": "6month",
            "createdAt": "2021-03-15T08:46:11.564Z",
            "updatedAt": "2021-03-15T08:46:11.564Z",
            "__v": 0,
            "tags": []
        },
        {
            "_id": "604d2c3a87d7da001f2c05ee",
            "name": "qwer",
            "type": "employee",
            "createdAt": "2021-03-13T21:18:50.286Z",
            "updatedAt": "2021-03-13T21:18:50.286Z",
            "__v": 0,
            "tags": []
        }
    ]
}
 *
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 422 UNPROCESSABLE ENTITY
 *    {
 *      status: "false",
 *      message: "error fetching members"
 *    }
 *
 * @param request
 * @param response
 */
exports.getMembers = async (request, response) => {
    try {
        const requestParams = request.query;
        const members = await (new MemberRepository).getMembers(requestParams.pagination, requestParams.page);

        return successResponse(
            response,
            responseCode.SUCCESS,
            'list of members',
            members
        );
    } catch (err) {
        return errorResponse(
            response,
            responseCode.UNPROCESSABLE_ENTITY,
            'error fetching members'
        );
    }
};



/**
 * @api {get} /members/:id  Member: Info
 * @apiName ListMembers
 * @apiGroup Member Account
 *
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 200 OK
 {
    "status": "success",
    "message": "details of member",
    "data": {
        "_id": "604f1ed33edb08001f0ae61a",
        "name": "michael",
        "type": "contractor",
        "duration": "6month",
        "createdAt": "2021-03-15T08:46:11.564Z",
        "updatedAt": "2021-03-15T08:46:11.564Z",
        "__v": 0,
        "tags": []
    }
}
 *
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 422 UNPROCESSABLE ENTITY
 *    {
 *      status: "false",
 *      message: "error fetching member details"
 *    }
 *
 * @param request
 * @param response
 */
exports.getSingleMember = async (request, response) => {
    try {
        const member = await (new MemberRepository).getMember(request.params.id);

        if (!member)
            return errorResponse(
                response,
                responseCode.NOT_FOUND,
                'Member not found'
            );

        return successResponse(
            response,
            responseCode.SUCCESS,
            'details of member',
            member
        );
    } catch (err) {
        return errorResponse(
            response,
            responseCode.UNPROCESSABLE_ENTITY,
            'error fetching member details'
        );
    }
};


/**
 * @api {patch} /members/:id  Member: update
 * @apiName ListMembers
 * @apiGroup Member Account
 *
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 200 OK
 {
    "status": "success",
    "message": "updated member",
    "data": {
        "_id": "604f1ed33edb08001f0ae61a",
        "name": "michael",
        "type": "contractor",
        "duration": "6month",
        "createdAt": "2021-03-15T08:46:11.564Z",
        "updatedAt": "2021-03-15T08:50:05.371Z",
        "__v": 0
    }
}
 *
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 422 UNPROCESSABLE ENTITY
 *    {
 *      status: "false",
 *      message: "error updating member"
 *    }
 *
 * @param request
 * @param response
 */
exports.updateMember = async (request, response) => {
    try {
        const reqBody = request.body;
        const {
            FormattedError, NormalizedValue
        } = updateMemberRequest.validate(reqBody);

        if (FormattedError)
            return errorResponse(
                response,
                response.UNPROCESSABLE_ENTITY,
                'Validation Error',
                FormattedError
            );

        const member = await (new MemberRepository).updateMember(request.params.id, NormalizedValue);

        return successResponse(
            response,
            responseCode.SUCCESS,
            'updated member',
            member
        );
    } catch (err) {
        return errorResponse(
            response,
            responseCode.UNPROCESSABLE_ENTITY,
            'error updating member'
        );
    }
};

/**
 * @api {delete} /members/:id Members: Remove
 * @apiName removeMember
 * @apiGroup Member Account
 *
 * @apiParam {string} :id Member unique ID
 *
 * @apiSuccessExample Success Response
 * HTTP/1.1 204 No Content
 *
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 422 UNPROCESSABLE ENTITY
 *    {
 *      status: "false",
 *      message: "Error deleting member"
 *    }
 *
 *
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 404 NOT FOUND
 *    {
 *      status: "false",
 *      message: "Member not found"
 *    }
 *
 * @param request
 * @param response
 */
exports.deleteMember = async (request, response) => {
    try {
        const id = request.params.id;
        let member = await (new MemberRepository).getMember(id);
        if (!member)
            return errorResponse(
                response,
                responseCode.NOT_FOUND,
                'Member not found'
            );

        return successResponse(
            response,
            responseCode.NO_CONTENT,
            '',
            await (new MemberRepository).deleteMember(id)
        );

    } catch (err) {
        return errorResponse(
            response,
            responseCode.UNPROCESSABLE_ENTITY,
            'Error deleting member',
        );
    }
};
