import React, { useState } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';

import styles from './Cart.module.css';
import Game from '../Games/Game';
import ArrowButton from '../UI/Buttons/ArrowButton';
import { Creators as GameActions } from '../../store/ducks/games';
import { Creators as CartActions } from '../../store/ducks/cart';

const Cart = ({ auth, cart, minCartValue, addGames, clearCart }) => {
    /* Cart data can be stored in the localStorage 
    * 
    * const storage = localStorage.getItem('cart') ? localStorage.getItem('cart') : '';
    * const cartItems = JSON.parse(`[${storage}]`) || [];
    * 
    * */
    const [isLoading, setIsLoading] = useState(false);

    const saveClickHandler = () => {
        if(price() < minCartValue)
            return swal({
                title: 'Minimum purchase amount',
                text: `You must make at least R$ ${parseFloat(minCartValue).toFixed(2)} in purchases!`,
                icon: 'error'
            });

        setIsLoading(true);

        const games = {
            "games": cart.items.map((item) => ({
                "user_id": auth.userId,
                "bet_id": item.bet_id,
                "numbers": item.numbers
            }))
        };

        addGames(games);
        setIsLoading(false);

        swal({
            title: 'Purchase successful!',
            text: `Your bets have been saved!`,
            icon: 'success'
        });

        return clearCart();
    };

    const price = () => (parseFloat(cart.items.reduce((acc, actual) => 
        acc + actual.price, 0)).toFixed(2));

    return (
        <div className={styles.Container}>
            <h2 className={styles.Title}>Cart</h2>

            <div className={styles.CartContent}>
                {cart.items.length 
                    ? cart.items.map((game) => <Game key={game.id} game={game} cart />)
                    : 
                    <div className={styles.EmptyCart}>
                        <p>Your cart is empty.</p>
                    </div>
                }
            </div>

            {!!cart.items.length &&
                <React.Fragment>
                    <p className={styles.Price}>
                        <strong>Cart </strong>Total: R$ {price()}
                    </p>

                    <div className={styles.ButtonBox}>
                        <ArrowButton
                            arrow={isLoading ? 'none' : 'default'}
                            color="DarkGreenButton"
                            handleClick={saveClickHandler}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Loading...' : 'Save'}
                        </ArrowButton>
                    </div>
                </React.Fragment>
            }
        </div>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    cart: state.cart
});

const mapDispatchToProps = (dispatch) => ({
    addGames: (games) => dispatch(GameActions.addGames(games)),
    clearCart: () => dispatch(CartActions.clearCart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);