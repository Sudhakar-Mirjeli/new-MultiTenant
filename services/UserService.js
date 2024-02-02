// const UserModel = require('../models/UserModel');
const config = require('../config')
const jwt = require('jsonwebtoken');
const HTTP_STATUS = require('../models/http-status/Http-Status')
const logger = require('../utilities/Logger')


async function createNewUser(body, masterDBConnection) {
    try {
        logger.info('Inside UserService : createNewUser method ')
        let UserModel = masterDBConnection.model("users")
        const isUserExist = await UserModel.find({ email: body.email })
        if (isUserExist.length > 0)
            return {
                message: 'User already exist!'
            }
        else {
            const createUser = new UserModel(body);
            await createUser.save();
            const token = jwt.sign(body, config.SERVER.JWT_SECRET, { expiresIn: '8h' })
            return {
                token: token,
                message: 'User created successfully.'
            };
        }
    } catch (error) {
        logger.info(`Error while creating a new user : ${error.message}`)
        throw new Error(error.message);;
    }
}

async function loginUser(body, masterDBConnection) {
    try {
        logger.info('Inside UserService : loginUser method ')
        let UserModel = masterDBConnection.model("users")
        const isUserExist = await UserModel.find({ email: body.email, password: body.password })
        let token;
        if (isUserExist) {
            token = jwt.sign(body, config.SERVER.JWT_SECRET, { expiresIn: '2h' })
            return {
                message: 'login successfully.',
                token: token
            }
        } else {
            return {
                status: HTTP_STATUS.NOT_FOUND,
                message: 'Please enter valid credentials'
            }

        }

    } catch (error) {
        logger.error(`Error occurred while login :${error.message}`)
        // return error.message
        throw new Error(error.message);

    }
}

module.exports = {
    createNewUser,
    loginUser
};
