const fs = require('fs');
const jwt = require('jsonwebtoken');

const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET;
const CERT = fs.readFileSync('./../dashboardhub.pem');

// Policy helper function
const generatePolicy = (principalId, effect, resource) => {
    const authResponse = {};
    authResponse.principalId = principalId;
    if (effect && resource) {
        const policyDocument = {};
        policyDocument.Version = '2012-10-17';
        policyDocument.Statement = [];
        const statementOne = {};
        statementOne.Action = 'execute-api:Invoke';
        statementOne.Effect = effect;
        statementOne.Resource = resource;
        policyDocument.Statement[0] = statementOne;
        authResponse.policyDocument = policyDocument;
    }
    return authResponse;
};

module.exports.auth = (event, context, cb) => {
    if (event.authorizationToken) {
        const token = event.authorizationToken.substring(7);

        const options = {
            // audience: AUTH0_CLIENT_ID,
            algorithms: ['RS256']
        };

        jwt.verify(token, CERT, options, (err, decoded) => {
            if (err) {
                cb(null, generatePolicy(decoded ? decoded.sub : '', 'Deny', event.methodArn));
            } else {
                cb(null, generatePolicy(decoded.sub, 'Allow', '*'));
            }
        });
    } else {
        cb('Unauthorized');
    }
};
