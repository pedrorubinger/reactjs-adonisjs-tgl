'use strict'

class SessionController {
    async store ({ request, auth }) {
        const { email, password } = await request.all()
        const token = await auth.attempt(email, password)

        return token
    }

    async show ({ auth, response }) {
        try {
            await auth.check()
            
            return response
                .status(200)
                .send({ success: true, message: 'Authorized!', userId: auth.user.id })
        } catch (err) {
            return response
                .status(401)
                .send({ success: false, message: 'Not authorized!' })
        }
    }
}

module.exports = SessionController
