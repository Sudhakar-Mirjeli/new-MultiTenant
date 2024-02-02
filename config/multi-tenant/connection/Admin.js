const mongoose = require('mongoose')
const logger = require('../../../utilities/Logger')



async function initAdminDbConnection(DB_URL, dbConnectionOptions) {
    logger.info('Inside AdminJs : initAdminDbConnection method ')
    return new Promise((resolve, reject) => {
        try {
            const db = mongoose.createConnection(DB_URL, dbConnectionOptions)

            db.on('error', (error) => {
                console.info('/////////////////////////////////  MASTER DB CONNECTION FAILED!!  ///////////////////////////////////////////')
                console.error(`Inside AdminJS : initAdminDbConnection method : Error while connecting to Master database: ${DB_URL}:`, error)
                console.info('//////////////////////////////////////////////////////////////////////////////////////////////////////////////')
            })

            db.once('open', () => {
                // require All schemas!!!
                const userSchema = require('../../../models/UserModel');

                db.model(userSchema.model.name, userSchema.model.schema);
                db.model('tenants', require('../models/Tenant.model'));

                console.info('*********************************************************************')
                console.info('\t\t MASTER DATABASE CONNECTION SUCCESSFUL.')
                console.info('*********************************************************************')

                resolve(db)
            })

        } catch (error) {
            logger.info(`Error while connecting to master database : ${error.message}`)
            reject(error);
            throw new Error(error.message);
        }

    })

}

module.exports =
    initAdminDbConnection
