
const { ADMIN_DB_NAME, BASE_DB_URI } = require('../../config')
const initAdminDbConnection = require('./connection/Admin');
const initTenantDbConnection = require('./connection/Tenant');

const TenantService = require('../multi-tenant/service/Tenant.service')
let connectionMap;
let adminDbConnection;

async function connectAllDb() {
    return new Promise(async (resolve, reject) => {
        let tenants = []
        let ADMIN_DB_URI = `${BASE_DB_URI}/${ADMIN_DB_NAME}`

        // Admin DB Connection
        adminDbConnection = await initAdminDbConnection(ADMIN_DB_URI, {
            socketTimeoutMS: 30000,
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: 100,
            serverSelectionTimeoutMS: 5000
        })
        try {
            tenants = await TenantService.getAllTenants(adminDbConnection)
            let connections = {};
            if (tenants && tenants.length > 0) {
                for (let i = 0; i < tenants.length; i++) {
                    let tenantDBURI = tenants[i]['dbURI'];
                    connections[tenants[i]['dbURI']] = await initTenantDbConnection(tenantDBURI, {
                        socketTimeoutMS: 30000,
                        // keepAlive: true,
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                        maxPoolSize: 100,
                        serverSelectionTimeoutMS: 5000
                    }, tenants[i]['domain'])
                    connectionMap = connections;

                    resolve(adminDbConnection)
                }
            }
        } catch (error) {
            console.log('Error while connecting to Tenant DB Connection', error)
            reject(error)

        }


    })
}


async function getAdminConnection() {
    console.log("========55555555", adminDbConnection)
    if (adminDbConnection) {
        return adminDbConnection
    }

}

async function getConnectionByTenant(tenantDomain) {
    console.log("tenantDomain=====", tenantDomain, "connectionMap", connectionMap)
    if (connectionMap && connectionMap[tenantDomain])
        return connectionMap[tenantDomain]
}


module.exports = { connectAllDb, getAdminConnection, getConnectionByTenant }

