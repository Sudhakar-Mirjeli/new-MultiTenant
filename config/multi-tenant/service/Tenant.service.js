

async function getAllTenants(adminDbConnection) {
    try {
        let tenantModel = adminDbConnection.model('tenants');
        let tenants = await tenantModel.find({})
        return tenants;

    } catch (error) {
        console.log(`Error while retrieving tenants, ${error} `)

    }


}

module.exports={
    getAllTenants
}
