const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Extract the Authorization header from the incoming request
    const authHeader = req.headers.authorization;

    // Check if the Authorization header exists and follows the format 'Bearer <token>'
    if (authHeader && authHeader.startsWith('Bearer ')) {
        // Extract the token from the header
        const token = authHeader.split(' ')[1];

        // Verify the token with your JWT secret
        jwt.verify(token, process.env.REACT_APP_JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log(`JWT Verification Error: ${err.message}`); // Log the verification error
                // If there's an error (e.g., token is invalid or expired), respond with 403 Forbidden
                return res.status(403).json({ message: 'Token is not valid' });
            }
            req.user = { id: decoded.userId };
            next();
        });
    } else {
        return res.status(401).json({ message: 'Authorization header not found' });
    }
};

module.exports = verifyToken;