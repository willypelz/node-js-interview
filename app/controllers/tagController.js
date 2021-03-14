const {successResponse, errorResponse, responseCode, pagination, page} = require(__utils + 'helpers');

const TagRepository = require('../repositories/TagRepository');

const addTagRequest = require('../requests/addTagRequest');
const updateTagRequest = require('../requests/updateTagRequest');


/**
 *
 * @api {post} /tags Member: Add
 * @apiName addMember
 * @apiGroup Member Account
 * @apiVersion  0.1.0
 *
 *
 * @apiParam  {String} name Tag Name
 *
 *
 * @apiParamExample  {type} Request Example:
 * {
 *     "name": "Frontend-developer"
 * }
 *
 *
 * @apiSuccessExample Success Response
 * HTTP/1.1 201 Ok
 {
    "status": "success",
    "message": "Tag added successfully.",
    "data": {
        "_id": "604d37f7df8812258084f4cf",
        "name": "Frontend-developer",
        "createdAt": "2021-03-13T22:08:55.861Z",
        "updatedAt": "2021-03-13T22:08:55.861Z",
        "__v": 0
    }
}
 *
 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 422 UNPROCESSABLE ENTITY
 *     {
 *       "status": "error",
         "message": "Error creating tag",
 *     }
 *
 */
exports.addTag = async (request, response) => {

    try {
        const reqBody = request.body;
        const {
            FormattedError, NormalizedValue
        } = addTagRequest.validate(reqBody);

        if (FormattedError)
            return errorResponse(
                response,
                response.UNPROCESSABLE_ENTITY,
                'Validation Error',
                FormattedError
            );

        let tag = await (new TagRepository).addTag(NormalizedValue);

        return successResponse(
            response,
            responseCode.CREATED,
            'Tag added successfully.',
            tag
        );
    } catch (err) {
        return errorResponse(
            response,
            responseCode.UNPROCESSABLE_ENTITY,
            'Error creating tag'
        );
    }
};

/**
 * @api {get} /tags  Tag: List
 * @apiName ListTags
 * @apiGroup Tag Account
 *
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 200 OK
 {
    "status": "success",
    "message": "list of tags",
    "data": [
        {
            "_id": "604d36acc07eb321334958b3",
            "name": "c#",
            "createdAt": "2021-03-13T22:03:24.278Z",
            "updatedAt": "2021-03-13T22:03:24.278Z",
            "__v": 0
        },
        {
            "_id": "604d36a6c07eb321334958b2",
            "name": "C++",
            "createdAt": "2021-03-13T22:03:18.449Z",
            "updatedAt": "2021-03-13T22:03:18.449Z",
            "__v": 0
        }
    ]
}
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 422 UNPROCESSABLE ENTITY
 *    {
 *      status: "false",
 *      message: "error fetching list of tags"
 *    }
 *
 * @param request
 * @param response
 */
exports.getTags = async (request, response) => {
    try {
        const requestParams = request.query;
        const roles = await (new TagRepository).getTags(requestParams.pagination, requestParams.page);

        return successResponse(
            response,
            responseCode.SUCCESS,
            'list of tags',
            roles
        );
    } catch (err) {
        return errorResponse(
            response,
            responseCode.UNPROCESSABLE_ENTITY,
            'error fetching list of tags'
        );
    }
};



/**
 * @api {get} /tags/:id  Tag: Info
 * @apiName ListTag
 * @apiGroup Tag Account
 *
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 200 OK
 {
    "status": "success",
    "message": "details of tag",
    "data": {
        "_id": "604d36acc07eb321334958b3",
        "name": "c#",
        "createdAt": "2021-03-13T22:03:24.278Z",
        "updatedAt": "2021-03-13T22:03:24.278Z",
        "__v": 0
    }
}
 *
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 422 UNPROCESSABLE ENTITY
 *    {
 *      status: "false",
 *      message: "error fetching tag"
 *    }
 *
 * @param request
 * @param response
 */
exports.getSingleTag = async (request, response) => {
    try {
        const roles = await (new TagRepository).getTag(request.params.id);

        return successResponse(
            response,
            responseCode.SUCCESS,
            'details of tag',
            roles
        );
    } catch (err) {
        return errorResponse(
            response,
            responseCode.UNPROCESSABLE_ENTITY,
            'error fetching tag'
        );
    }
};


/**
 * @api {patch} /tags/:id  Tag: update
 * @apiName ListTags
 * @apiGroup Tag Account
 *
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 200 OK
 * {
 *       status: 'success',
 *       data:
 *   [
 *     {
 *      name: "Admin",
 *      display_name: "admin",
 *      description: "This is an admin role"
 *      createdAt: "2020-10-20T12:01:44.264Z",
 *       updatedAt: "2020-10-20T12:01:44.264Z",
 *      id: "5f8ed1a83709d21c277e9300"
 *    },
 *    {
 *      name: "Admin",
 *      display_name: "admin",
 *      description: "This is an admin role"
 *      createdAt: "2020-10-20T12:01:44.264Z",
 *       updatedAt: "2020-10-20T12:01:44.264Z",
 *      id: "5f8ed1a83709d21c277e9300"
 *    },
 *    {
 *      name: "Admin",
 *      display_name: "admin",
 *      description: "This is an admin role"
 *      createdAt: "2020-10-20T12:01:44.264Z",
 *       updatedAt: "2020-10-20T12:01:44.264Z",
 *      id: "5f8ed1a83709d21c277e9300"
 *    }
 *  ]
 *   }
 *
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 422 UNPROCESSABLE ENTITY
 *    {
 *      status: "false",
 *      message: "error fetching list of users"
 *    }
 *
 * @param request
 * @param response
 */
exports.updateTag = async (request, response) => {
    try {
        const {
            FormattedError,
            NormalizedValue
        } = updateTagRequest.validate(request.body);

        if (FormattedError)
            return errorResponse(
                response,
                responseCode.UNPROCESSABLE_ENTITY,
                'Validation Error',
                FormattedError
            );

        const tag = await (new TagRepository).updateTag(request.params.id, NormalizedValue);

        return successResponse(
            response,
            responseCode.SUCCESS,
            'tag ',
            tag
        );
    } catch (err) {
        return errorResponse(
            response,
            responseCode.UNPROCESSABLE_ENTITY,
            'error updating tag'
        );
    }
};

/**
 * @api {delete} /tags/:id Tags: Delete
 * @apiName deleteTag
 * @apiGroup Tag Account
 *
 * @apiParam {string} :id Tag unique ID
 *
 * @apiSuccessExample Success Response
 * HTTP/1.1 204 No Content
 *
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 422 UNPROCESSABLE ENTITY
 *    {
 *      status: "false",
 *      message: "Error deleting tag "
 *    }
 *
 * @param request
 * @param response
 */
exports.deleteTag = async (request, response) => {
    try {
        const id = request.params.id;
        let tag = await (new TagRepository).getTag(id);
        if (!tag)
            return errorResponse(
                response,
                responseCode.NOT_FOUND,
                'Tag not found'
            );

        return successResponse(
            response,
            responseCode.NO_CONTENT,
            '',
            await (new TagRepository).deleteTag(id)
        );

    } catch (err) {
        return errorResponse(
            response,
            responseCode.UNPROCESSABLE_ENTITY,
            'Error deleting tag',
        );
    }
};
