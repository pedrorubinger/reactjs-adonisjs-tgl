'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

/* USERS */
Route.post('users', 'UserController.store').validator('StoreUser')

/* SESSIONS */
Route.post('sessions', 'SessionController.store').validator('StoreSession')
Route.get('sessions', 'SessionController.show')

/* PASSWORD RECOVERY */
Route.post('recovery', 'PasswordRecoveryController.store').validator('StorePassRecovery')
Route.put('recovery', 'PasswordRecoveryController.update').validator('UpdatePassRecovery')
Route.get('recovery/:token', 'PasswordRecoveryController.show')

/* PROTECTED RESOURCES */
Route.group(() => {
  /* BETS */
  Route.post('bets', 'BetController.store')
  Route.get('bets', 'BetController.index')
  Route.get('bets/:id', 'BetController.show')

  /* GAMES */
  Route.post('games', 'GameController.store')
  Route.get('games/user/:user/:filter', 'GameController.index')

  /* USERS */
  Route.get('users/:id', 'UserController.show');
  Route.put('users', 'UserController.update').validator('UpdateUser')
}).middleware(['auth'])