// Middleware to extract and set the store ID from the request header
exports.setStoreIdFromHeader = (req, res, next) => {
    const companyId = req.headers['x-company-id'];
    // console.log("setStoreIdFromHeader", req.url)
    if (
        req.url == '/api/v1/user/register'
        ||
        req.url == '/api/v1/user/login'
        ||
        req.url == '/api/v1/user/email-otp-verify'
        ||
        req.url == '/api/v1/user/reset-password'
        ||
        req.url == '/api/v1/user/reset-verify-otp'
        ||
        req.url == '/api/v1/user/password-update'
        ||
        req.url == '/api/v1/user/logout/'
    ) {
        next();
    } else {
        if (!companyId) {
            return res.status(400).json({ message: 'Store ID is missing in request header' });
        }
        req.companyId = companyId; // Attach the store ID to the request object
        next();
    }

};

// Apply the middleware to all routes or specific routes as needed
