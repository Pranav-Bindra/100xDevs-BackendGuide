const { builtinModules } = require('module');
const { z } = require('zod');

const UserAuthenticator = z.object({
    username: z.string().email(),
    password: z.string().min(8),
    firstName: z.string().min(1),
    lastName: z.string().min(1)
})

const updateBody = z.object({
    username: z.string().email(),
    password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
})

module.exports = {
    UserAuthenticator,
    updateBody
}