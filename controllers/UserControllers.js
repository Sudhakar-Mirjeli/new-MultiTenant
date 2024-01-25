
const UserService = require('../services/UserService')
const HTTP_STATUS = require('../models/http-status/Http-Status')
const {getAdminConnection} = require('../config/multi-tenant/connectionManager')

async function createNewUser(req, res) {
    try {
        const getMasterDBConnection = await getAdminConnection();
        req.masterDBConnection = getMasterDBConnection;
        console.log("10*********", )
        const isUserAdded = await UserService.createNewUser(req.body, req.masterDBConnection)
        if (isUserAdded)
            return res.status(HTTP_STATUS.CREATED).json(isUserAdded);
    } catch (error) {
        console.log("15555555555", error)
        res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Server error' });
    }
}

async function loginUser(req, res) {
    try {
        const getMasterDBConnection = await getAdminConnection();
        req.masterDBConnection = getMasterDBConnection;
        const userLogin = await UserService.loginUser(req.body, req.masterDBConnection);
        if (userLogin)
            return res.status(HTTP_STATUS.SUCCESS).json(userLogin)

    } catch (error) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Server error' });

    }

}

module.exports = {
    createNewUser,
    loginUser
}