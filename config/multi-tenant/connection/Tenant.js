
const mongoose = require('mongoose')



async function initTenantDbConnection(DB_URL, dbConnectionOptions, domainPrefix) {
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
            console.log('Inside TenantJS: initTenantDbConnection method: Error while connecting to Tenant database: ', error);
            reject(error);

        }


    })

}
module.exports = initTenantDbConnection;