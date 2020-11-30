'use strict'

const Bet = use('App/Models/Bet')

class BetController {
    async store ({ request }) {
        const data = await request.only([
            'type',
            'description',
            'range',
            'price',
            'max_number',
            'color',
            'min_cart_value'
        ])

        const bet = await Bet.create(data)

        return bet
    }

    async index () {
        const bets = await Bet.query().fetch()

        return bets
    }

    async show ({ params }) {
        const bets = await Bet.query()
            .where('id', params.id).fetch()

        return bets
    }
}

module.exports = BetController
