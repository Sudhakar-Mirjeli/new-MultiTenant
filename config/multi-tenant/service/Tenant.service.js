const logger = require('../../../utilities/Logger')


async function getAllTenants(adminDbConnection) {
    try {
        logger.info('Inside TenantService : getAllTenants method ')
        let tenantModel = adminDbConnection.model('tenants');
        let tenants = await tenantModel.find({})
        return tenants;

    } catch (error) {
        logger.info(`Error while fetching tenants : ${error.message}`)
        throw new Error(error.message);
    }
}

module.exports = {
    getAllTenants
}
