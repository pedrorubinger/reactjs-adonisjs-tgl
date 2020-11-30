'use strict'

const Antl = use('Antl')

class StorePassRecovery {
  get validateAll () {
    return true
  }

  get rules () {
    return { email: 'required|email' }
  }

  get messages () {
    return Antl.list('validation')
  }

  async fails (errorMessages) {
    return this.ctx.response.status(400).send(errorMessages)
  }
}

module.exports = StorePassRecovery
