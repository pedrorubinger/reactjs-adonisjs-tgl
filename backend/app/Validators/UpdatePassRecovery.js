'use strict'

const Antl = use('Antl')
const { rule } = use('Validator')

class UpdatePassRecovery {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      token: 'required',
      password: [
        rule('regex', /^[\w#.-]+$/g),
        rule('required'),
        rule('min', 6),
        rule('max', 60)
      ]
    }
  }

  get messages () {
    return Antl.list('validation')
  }

  async fails (errorMessages) {
    return this.ctx.response.status(400).send(errorMessages)
  }
}

module.exports = UpdatePassRecovery
