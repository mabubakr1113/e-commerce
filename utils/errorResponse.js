const createHttpError = require('http-errors');

module.exports = {
    notFound: (message = 'Resource not found') => createHttpError.NotFound(message),
    badRequest: (message = 'Bad request') => createHttpError.BadRequest(message),
    validationError: (errors) => {
        const err = createHttpError.BadRequest('Validation failed');
        err.errors = errors;
        return err;
    }
};