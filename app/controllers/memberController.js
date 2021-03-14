const {successResponse, errorResponse, responseCode, pagination, page} = require(__utils + 'helpers');

const MemberRepository = require('../repositories/MemberRepository');

const addMemberRequest = require('../requests/addMemberRequest');


/**
 *
 * @api {post} /members Member: Add
 * @apiName addMember
 * @apiGroup Member Account
 * @apiVersion  0.1.0
 *
 *
 * @apiParam  {String} user_id User unique ID
 * @apiParam  {String} company_id Company unique ID
 *
 *
 * @apiParamExample  {type} Request Example:
 * {
 *     user_id: "5f7da9656c2e1867628c7bce",
 *     company_id: "5f7da9656c2e1867628c7bce",
 * }
 *
 *
 * @apiSuccessExample Success Response
 * HTTP/1.1 201 Ok
 * {
 *      status: "success",
 *      data: {
 *      company_id: "5f7da9656c2e1867628c7bce",
 *       user_id: "5f7da942493872671f2f6493",
 *       createdAt: "2020-10-21T09:20:01.876Z",
 *       updatedAt: "2020-10-21T09:20:01.876Z",
 *       user: {
 *           _id: "5f7da942493872671f2f6493",
 *           first_name: "John",
 *           last_name: "Doe",
 *           email: "john@doe.com",
 *           role: "5f5fc2d8da04a488821aa827",
 *           account_type: "distributor_admin",
 *           createdAt: "2020-10-07T11:40:50.337Z",
 *           updatedAt: "2020-10-07T11:40:50.337Z",
 *       },
 *       company: {
 *           _id: "5f7da9656c2e1867628c7bce",
 *           name: "Blue Company",
 *           address: "S46 Blue company avenue",
 *           type: "distributor",
 *           email: "info1@bluecompany.com",
 *           admin: "5f7da9656c2e1867628c7bcd",
 *           createdAt": "2020-10-07T11:41:25.166Z",
 *           updatedAt": "2020-10-07T11:41:25.166Z",
 *       },
 *       id: "5f8ffd4162482a2e5fa7e7c0"
 *   }
 * }
 *
 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 422 UNPROCESSABLE ENTITY
 *     {
 *       "status": "error",
         "message": "Error creating Company Admin account",
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
exports.getSingleMember = async (request, response) => {
    try {
        const roles = await (new MemberRepository).getMember(request.params.id);

        return successResponse(
            response,
            responseCode.SUCCESS,
            'details of member',
            roles
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
exports.updateMember = async (request, response) => {
    try {
        const requestParams = request.query;
        const roles = await (new MemberRepository).updateMember(requestParams.pagination, requestParams.page);

        return successResponse(
            response,
            responseCode.SUCCESS,
            'list of roles',
            roles
        );
    } catch (err) {
        return errorResponse(
            response,
            responseCode.UNPROCESSABLE_ENTITY,
            'error fetching roles'
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
 *      message: "Error deleting company user"
 *    }
 *
 *
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 404 NOT FOUND
 *    {
 *      status: "false",
 *      message: "CompanyUser not found"
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
