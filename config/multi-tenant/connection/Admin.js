const mongoose = require('mongoose')


async function initAdminDbConnection(DB_URL, dbConnectionOptions) {
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
            console.log('Inside AdminJS: initAdminDbConnection method: Error while connecting to master database: ', error);
            reject(error);
        }

    })

}

module.exports =
    initAdminDbConnection
