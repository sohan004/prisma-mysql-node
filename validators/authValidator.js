const { z } = require('zod');

 const signUpValidator = async (req, res, next) => {
    try {
        const validator = await z.object({
            email: z.string().email(),
            password: z.string().min(6),
            name: z.string().min(3)
        })
        validator.parse(req.body)
        next()
    } catch (error) {
        console.log(error.errors);
        res.status(400).json(error.errors);
    }
}

 const loginValidator = async (req, res, next) => {
    try {
        const validator = await z.object({
            email: z.string().email(),
            password: z.string().min(6)
        })
        validator.parse(req.body)
        next()
    } catch (error) {
        console.log(error.errors);
        res.status(400).json(error.errors);
    }
}

module.exports = {
    signUpValidator,
    loginValidator
}