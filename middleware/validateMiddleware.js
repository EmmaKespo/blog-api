// this middleware runs the incomming request through the validation schema and returns an error if the request is invalide

const validate = (schema) => (req, res, next) => {
    try {
        // parse the req.body, req.query, or req.params against our own rules
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        })
        next(); // if the request is valid, move to the next middleware or route handler
    } catch (error) {
        const validationErrors = error.errors.map((err) => ({
            field: err.path.join('.'),// join the path array into a string to represent the field name
            message: err.message, // the error message from zod
        }));
        res.status(400).json({ errors: validationErrors });
    }
}
export default validate;