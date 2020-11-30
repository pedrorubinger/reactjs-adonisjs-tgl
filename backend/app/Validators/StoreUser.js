'use strict'

const Antl = use('Antl')
const { rule } = use('Validator')

class User {
  get validateAll() {
    return true
  }

  get rules () {
    return {
      email: 'required|email|unique:users',
      name: [
        rule('regex', /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ -]+$/g),
        rule('required'),
        rule('min', 3),
        rule('max', 80)
      ],
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

module.exports = User
