'use strict'

const Game = use('App/Models/Game')
const Database = use('Database')

class GameController {
    async store ({ request }) {
        const data = await request.input('games')
        const game = await Game.createMany(data)

        return game
    }

    async index ({ request, params }) {
        const { page } = request.get()
        const sqlFilter = params.filter === 'all'
            ? `bets.id LIKE '%'`
            : `bets.id = '${params.filter}'`;

        const games = await Database
            .select(
                'games.id',
                'user_id',
                'numbers',
                'games.created_at',
                'bets.type',
                'bets.price'
            )
            .from('games')
            .innerJoin('bets', 'games.bet_id', 'bets.id')
            .whereRaw(`user_id = ${params.user} AND ${sqlFilter}`)
            .paginate(page, 10)

        return games
    }
}

module.exports = GameController
