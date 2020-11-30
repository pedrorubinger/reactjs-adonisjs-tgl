'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BetSchema extends Schema {
  up () {
    this.create('bets', (table) => {
      table.increments()
      table.string('type', 30).notNullable().unique()
      table.string('description', 350).notNullable().unique()
      table.integer('range').notNullable()
      table.decimal('price', 4, 2).notNullable()
      table.integer('max_number').notNullable()
      table.string('color', 15).notNullable()
      table.decimal('min_cart_value', 4, 2).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('bets')
  }
}

module.exports = BetSchema
