const {ROLES} = require('../utils/constants');

const _isAuthorized = (userRole, requiredRole) => {
    let rolesArray = Object.values(ROLES);
    return rolesArray.indexOf(userRole) >= rolesArray.indexOf(requiredRole)
};

const autho = (requiredRole) => (req, res, next) => {
    _isAuthorized(req.user.role, requiredRole)
        ?  next()
        : res.status(403).send({error: 'Insufficient permissions'});
};

module.exports = autho;