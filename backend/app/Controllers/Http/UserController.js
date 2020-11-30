'use strict'

const User = use('App/Models/User')
const Database = use('Database')

class UserController {
    async store ({ request, response }) {
        try {
            const data = request.only(['name', 'email', 'password'])
            await User.create(data)

            return response
                .status(200)
                .send({ success: true, message: 'Registered!' })
        } catch (error) {
            return response
                .status(error.response.status)
                .send({
                    success: false,
                    error: error.response.data
                })
        }
    }

    async update ({ auth, request, response }) {
        try {
            const {
                name,
                email,
                currentEmail,
                password,
                newPassword,
                userId
            } = request.body

            await auth.attempt(currentEmail, password)

            const checkUser = await User
                .query()
                .where('id', userId)
                .andWhere('email', currentEmail)
                .fetch()

            if(auth.user.id != userId || !!!checkUser.rows.length)
                return response.status(401).send({
                    success: false,
                    message: 'Not authorized!'
                })

            const user = await User.findOrFail(userId)

            user.name = name
            if(!email || email === currentEmail) user.email = currentEmail
            else if(email !== currentEmail) user.email = email
            if(newPassword) user.password = newPassword

            await user.save()

            return response.status(200).send({
                success: true,
                message: 'User was successfully updated!',
                user
            })
        } catch (err) {
            if(err.status === 401)
                return response.status(401).send({
                    success: false,
                    message: 'Not authorized!'
                })
            
            return response.status(err.status).send({
                success: false,
                message: 'Error:' + err
            })
        }
    }

    async show ({ auth, params, response }) {
        try {
            await auth.check()

            if(auth.user.id != params.id)
                return response.status(401).send({
                    success: false,
                    message: 'Not authorized!',
                    requester: auth.user.id,
                })

            const user = await Database
                .select('name', 'email')
                .from('users')
                .where('id', params.id)

            return response
                .status(200)
                .send({
                    success: true,
                    message: 'Authorized!',
                    user
                })
        } catch (err) {
            return response
                .status(401)
                .send({ success: false, message: 'Not authorized!' })
        }
    }
}

module.exports = UserController
