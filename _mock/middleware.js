module.exports = (req, res, next) => {
    if (req.method === 'POST') {
        req.method = 'GET';
    }

    if (req.originalUrl === "/paramsError") {
        res.statusCode = 400
    }
    if (req.originalUrl === "/unexpectedError") {
        res.statusCode = 500
    }

    setTimeout(() => {
        next();
    }, 500);
};