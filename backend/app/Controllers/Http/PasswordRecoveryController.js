'use strict'

const moment = require('moment')
const crypto = require('crypto')
const User = use('App/Models/User')
const Mail = use('Mail')

class PasswordRecoveryController {
    async store ({ request, response }) {
        try {
            const email = request.input('email')
            const user = await User.findByOrFail('email', email)

            user.token = crypto.randomBytes(10).toString('hex')
            user.token_created_at = new Date()

            await user.save()
            await Mail.send(
                ['emails.forgot_password'],
                {
                    email,
                    token: user.token,
                    link: `${request.input('redirect_url')}?token=${user.token}`
                },
                (email) => {
                    email
                        .to(user.email)
                        .from('pedro.rubinger@gmail.com')
                        .subject('Password Recovery | TGL')
                }
            )
        } catch (err) {
            return response.status(err.status).send({
                success: false,
                message: 'Something went wrong. Does this email exist?'
            })
        }
    }

    async update ({ request, response }) {
        try {
            const { token, password } = request.all()
            const user = await User.findByOrFail('token', token)
            const tokenHasExpired = moment()
                .subtract('2', 'hours')
                .isAfter(user.token_created_at)

            user.token = null
            user.token_created_at = null

            if(tokenHasExpired)
                return response.status(401).send({
                    success: false,
                    message: 'The token has expired.'
                })

            user.password = password

            await user.save()
        } catch (err) {
            return response.status(err.status).send({
                success: false,
                message: 'Something went wrong when resetting your password'
            })
        }
    }

    async show ({ params, response }) {
        const user = await User.query().where('token', params.token).fetch()

        if(!!!user.rows.length) 
            return response.status(404).send({
                success: false,
                message: 'Token does not exist!'
            })

        const tokenHasExpired = moment()
            .subtract('2', 'hours')
            .isAfter(user.token_created_at)

        if(tokenHasExpired) {
            user.token = null
            user.token_created_at = null
            
            await user.save()

            return response.status(401).send({
                success: false,
                message: 'The token has expired.'
            })
        }

        return response.status(200).send({ success: true, message: 'Authorized' })
    }
}

module.exports = PasswordRecoveryController
