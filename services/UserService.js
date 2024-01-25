// const UserModel = require('../models/UserModel');
const config = require('../config')
const jwt = require('jsonwebtoken');
const HTTP_STATUS = require('../models/http-status/Http-Status')


async function createNewUser(body, masterDBConnection) {
    try {
        let UserModel = masterDBConnection.model("users")
        console.log("555555555", UserModel)
        console.log("body.email", body.email)

        const isUserExist = await UserModel.find({ email: body.email })
        console.log("isUserExist", isUserExist)
        if (isUserExist.length > 0)
            return {
                message: 'User already exist!'
            }
        else {
            const createUser = new UserModel(body);
            await createUser.save();

            const token = jwt.sign(body, config.SERVER.JWT_SECRET_KEY, { expiresIn: '8h' })
            console.log("token", token)

            return {
                token: token,
                message: 'User created successfully.'
            };
        }
    } catch (error) {
        console.log("error",error)
        console.error(`error while creating new user : ${error.message}`)
        throw error;
    }
}

async function loginUser(body, masterDBConnection) {
    try {
        console.log("41", body)
        let UserModel = masterDBConnection.model("users")
        const isUserExist = await UserModel.find({ email: body.email, password: body.password })
        let token;
        if (isUserExist) {
            token = jwt.sign(body, config.SERVER.JWT_SECRET_KEY, { expiresIn: '2h' })
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

    } catch {

    }
}

module.exports = {
    createNewUser,
    loginUser
};
