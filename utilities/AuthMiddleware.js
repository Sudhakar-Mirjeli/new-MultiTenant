const logger = require('./Logger')
const HTTP_STATUS = require('../models/http-status/Http-Status')
const config = require('../config')
const {getAdminConnection, getConnectionByTenant} = require('../config/multi-tenant/connectionManager')
// const {getConnectionByTenant, getAdminConnection} = require('../config/multi-tenant/')



async function authenticate(req, res, next) {
    try {
        logger.info('Inside AuthMiddleware Service : authenticate method');
        const tokenHeader = req.headers.authorization;
			if (tokenHeader) {
				let token = await tokenHeader.split(' ');
				let decoded = jwt.verify(token[1], config.SERVER.JWT_SECRET);
                console.log("15=====", decoded)
				if (decoded) {
					const getMasterDBConnection = await getAdminConnection();
					req.masterDBConnection = getMasterDBConnection;
					// if (decoded.userRole !== USER_TYPES.PROPFLO_ADMIN) {
						const tenantModel = getMasterDBConnection.model('tenants');
						const doesTenantExist = await tenantModel.findOne({ domain: 'localhost:9000' });
                        console.log("doesTenantExist", doesTenantExist)

                        if (doesTenantExist) {
							let dbConnection = await getConnectionByTenant('localhost:9000');
							if (dbConnection)
								req['tenantDBConnection'] = dbConnection.db;
						}
					// }
					req.user = decoded;
					return next();
				} else {
					return res.status(HTTP_STATUS.UNAUTHORIZED).json({ status: HTTP_STATUS.UNAUTHORIZED, message: 'Session expired.' });
				}
			} else {
				return res.status(HTTP_STATUS.UNAUTHORIZED).json({ status: HTTP_STATUS.UNAUTHORIZED, message: 'Authentication token required' });
			}
    } catch (error) {
        logger.error(`Inside AuthMiddleware Service : authenticate method : ${error}`);

    }
}

module.exports = { authenticate }