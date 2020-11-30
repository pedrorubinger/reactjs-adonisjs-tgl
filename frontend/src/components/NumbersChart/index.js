import React from 'react';
import { AiOutlineShoppingCart as CartIcon } from 'react-icons/ai';
import { connect } from 'react-redux';
import swal from 'sweetalert';

import styles from './NumbersChart.module.css';
import RoundedButton from '../../components/UI/Buttons/RoundedButton';
import Card from './StyledCard';
import { Creators as CartActions } from '../../store/ducks/cart';

const NumbersChart = ({ betTypes, addToCart }) => {
    const picked = new Set();
    const {
        description,
        range,
        color,
        type,
        price,
        max_number
    } = betTypes;

    const cardClickHandler = (e) => {
        let element = null;

        if(e.target.tagName === 'SPAN') element = e.target.parentNode;
        else element = e.target;

        if(element.classList.contains('Picked')) {
            element.classList.remove('Picked');
            picked.delete(element.textContent);
        } else if(picked.size !== max_number) {
            element.classList.add('Picked');
            picked.add(element.textContent);
        }
    };

    const completeGameClickHandler = () => {
        while(picked.size < max_number) {
            const value = (Math.floor(Math.random() * range) + 1).toString();
            
            if(!picked.has(value)) {
                picked.add(value);
                const el = document.getElementById(`card-${value}`);
                el.classList.add('Picked');
            }
        }
    };

    const clearGame = () => {
        if(!picked.size) return false;

        const numbersChartEl = document.getElementsByClassName(styles.NumbersChart);
        
        Array.from(numbersChartEl[0].children).forEach((child) => {
            child.classList.remove('Picked');
        });

        return picked.clear();
    };

    const addToCartClickHandler = () => {
        if(picked.size !== max_number)
            return swal({
                title: 'Incorrect Data',
                text: `Please fill out the bet card correctly!`,
                icon: 'error',
            });
        
        const game = {
            id: Date.now(),
            type,
            numbers: Array.from(picked).sort((a, b) => a - b).join(', '),
            date: new Date().toLocaleDateString(),
            price,
            bet_id: betTypes.id
        };

        addToCart(game);
        clearGame();

        /**
         * The cart data can be stored in the localStorage
         * 
         * let cart = localStorage.getItem('cart');
         * cart = cart ? cart.split(',') : [];
         * cart.push(JSON.stringify(game));
         * localStorage.setItem('cart', cart.toString());
         * 
         */

        window.scrollTo(0, document.body.scrollHeight);
    };

    return (
        <div className={styles.Board}>
            <h3 className={styles.Label}>
                <strong>Fill your bet</strong><br />
                {description}
            </h3>

            <div className={styles.NumbersChart}>
                {Array.from(Array(range)).map((el, i) => 
                    <Card
                        key={i + 1}
                        id={`card-${i + 1}`}
                        onClick={cardClickHandler}
                        color={color}
                    >
                        <span>{i+1}</span>
                    </Card>
                )}
            </div>

            <div className={styles.BoardButtons}>
                <div className={styles.GroupedButtons}>
                    <RoundedButton
                        color={color}
                        handleClick={completeGameClickHandler}
                    >
                        Complete Game
                    </RoundedButton>

                    <RoundedButton
                        color={color}
                        handleClick={clearGame}
                    >
                        Clear Game
                    </RoundedButton>
                </div>

                <RoundedButton
                    color={color}
                    handleClick={addToCartClickHandler}
                    fill
                >
                    <CartIcon /> Add to cart
                </RoundedButton>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    betTypes: [...state.betTypes.data].filter((bet) => 
        bet.id === state.betTypes.active)[0]
});

const mapDispatchToProps = (dispatch) => ({
    addToCart: (item) => dispatch(CartActions.addToCart(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(NumbersChart);