
const UserService = require('../services/UserService')
const HTTP_STATUS = require('../models/http-status/Http-Status')
const { getAdminConnection } = require('../config/multi-tenant/connectionManager')
const logger = require('../utilities/Logger')

/* 
*@create user
 */
async function createNewUser(req, res) {
    try {
        logger.info('Inside UserController : createNewUser method ')
        const getMasterDBConnection = await getAdminConnection();
        req.masterDBConnection = getMasterDBConnection;
        const isUserAdded = await UserService.createNewUser(req.body, req.masterDBConnection)
        if (isUserAdded)
            return res.status(HTTP_STATUS.CREATED).json(isUserAdded);
    } catch (error) {
        logger.error(`Error occurred while creating a new user :${error.message}`)
        res.status(HTTP_STATUS.BAD_REQUEST).json({ error: error.message });
    }
}

async function loginUser(req, res) {
    try {
        logger.info('Inside UserController : loginUser method ')
        const getMasterDBConnection = await getAdminConnection();
        req.masterDBConnection = getMasterDBConnection;
        const userLogin = await UserService.loginUser(req.body, req.masterDBConnection);
        if (userLogin)
            return res.status(HTTP_STATUS.SUCCESS).json(userLogin)

    } catch (error) {
        logger.error(`Error occurred while login :${error.message}`)
        res.status(HTTP_STATUS.BAD_REQUEST).json({ error: error.message });

    }

}

module.exports = {
    createNewUser,
    loginUser
}