import React from 'react';
import { connect } from 'react-redux';
import { BsTrash } from 'react-icons/bs';

import styles from './Game.module.css';
import { MarkerBox, TypeTitle } from './styles';
import { Creators as CartActions } from '../../../store/ducks/cart';

const Game = ({ betTypes, game, cart, removeItem }) => {
    const pallete = betTypes.data.map((item) => (
        { type: item.type, color: item.color }));
    const color = pallete.filter((item) => item.type === game.type)[0].color || '';

    return (
        <div className={styles.Container}>
            <MarkerBox color={color}>
                {cart ? <BsTrash onClick={() => removeItem(game.id)} size="20" /> : ''}
                <div className={`${cart ? 'CartMarker' : 'Marker'}`} />
            </MarkerBox>

            <div className={styles.GameContent}>
                <h4 className={`${cart ? styles.CartNumbers : styles.Numbers}`}>
                    {game.numbers}
                </h4>

                <p
                    className={styles.Info}>
                        {game.date || new Date().toLocaleDateString()}
                        &nbsp;- (R$ {parseFloat(game.price).toFixed(2)})
                </p>

                <TypeTitle color={color}>
                    {game.type}
                </TypeTitle>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({ betTypes: state.betTypes });
const mapDispatchToProps = (dispatch) => ({
    removeItem: (id) => dispatch(CartActions.removeFromCart(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);