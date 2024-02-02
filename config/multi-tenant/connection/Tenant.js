
const mongoose = require('mongoose')
const logger = require('../../../utilities/Logger')



async function initTenantDbConnection(DB_URL, dbConnectionOptions, domainPrefix) {
    logger.info('Inside TenantJs : initTenantDbConnection method ')

    return new Promise((resolve, reject) => {
        try {
            const db = mongoose.createConnection(DB_URL, dbConnectionOptions)

            db.on('error', (error) => {
                console.info('/////////////////////////////////  TENANT DB CONNECTION FAILED!!  ////////////////////////////////////////////////////')
                console.error(`Inside TenantJS : initTenantDbConnection method : Error while connecting to Tenant database: ${domainPrefix}:`, error)
                console.info('///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////')
            })


            db.on('open', () => {
                // require all schemas
                const userSchema = require('../../../models/UserModel');

                db.model(userSchema.model.name, userSchema.model.schema);
                let responseObject = { db: db }

                console.info('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
                console.info(`\t TENANT DATABASE CONNECTION SUCCESSFUL : ${domainPrefix}`)
                console.info('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')

                resolve(responseObject)

            })
        } catch (error) {
            logger.info(`Error while connecting to Tenant database : ${error.message}`)
            reject(error);
            throw new Error(error.message);

        }


    })

}
module.exports = initTenantDbConnection;