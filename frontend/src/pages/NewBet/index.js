import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import styles from './NewBet.module.css';
import BetTypesBar from '../../components/UI/BetTypesBar';
import Cart from '../../components/Cart';
import { Creators as BetTypesActions } from '../../store/ducks/betTypes';
import NumbersChart from '../../components/NumbersChart';
import Loading from '../../components/UI/Loading';
import ErrorContainer from '../../components/UI/ErrorContainer';

const NewBet = ({ betTypes, fetchBetTypes, setActive }) => {
    useEffect(() => {
        if(!betTypes.fetched) fetchBetTypes();
        if(betTypes.data.length) setActive(betTypes.data[0].id);
        // return () => setActive('');
    }, [fetchBetTypes, setActive, betTypes.fetched, betTypes.data]);

    const data = !!betTypes.active
        ? betTypes.data.filter((bet) => bet.id === betTypes.active)[0]
        : betTypes.data[0];

    return (
        <div className={styles.Container}>
            {
                betTypes.error
                    ? <ErrorContainer error={betTypes.error} />
                    : !!!betTypes.active
                        ? <Loading />
                        : <>
                            <div className={styles.Header}>
                                <h2 className={styles.Title}>
                                    <strong>New Bet</strong> for {data.type}
                                </h2>

                                <h3 className={styles.Label}>
                                    <strong>Choose a game</strong>
                                </h3>

                                <BetTypesBar betTypes={betTypes} inactivate />
                            </div>

                            <div className={styles.Content}>
                                <NumbersChart />
                                <Cart minCartValue={data.min_cart_value} />
                            </div>
                        </>
            }
        </div>
    );
};

const mapStateToProps = (state) => ({ betTypes: state.betTypes });
const mapDispatchToProps = (dispatch) => ({
    fetchBetTypes: () => dispatch(BetTypesActions.betTypesStart()),
    setActive: (active) => dispatch(BetTypesActions.betTypesActive(active))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewBet);