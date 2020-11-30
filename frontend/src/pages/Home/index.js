import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import styles from './Home.module.css';
import RecentGames from '../../components/RecentGames';
import Games from '../../components/Games';
import { Creators as BetTypesActions } from '../../store/ducks/betTypes';
import Loading from '../../components/UI/Loading';
import ErrorBox from '../../components/UI/ErrorBox';

const Home = ({ betTypes, fetchBetTypes }) => {
    useEffect(() => {
        if(!betTypes.fetched) fetchBetTypes();
    }, [fetchBetTypes, betTypes.fetched]);

    return (
        <div className={styles.Container}>
            {!betTypes.fetched
                ? <Loading />
                : betTypes.error
                    ? <div className={styles.Error}>
                        <h2>Oh, no! Something went wrong!</h2>
                        <ErrorBox errors={{ err: betTypes.error }} />
                    </div>
                    : <>
                        <RecentGames />
                        <Games />
                    </>
            }
        </div>
    );
};

const mapStateToProps = (state) => ({ betTypes: state.betTypes });
const mapDispatchToProps = (dispatch) => ({
    fetchBetTypes: () => dispatch(BetTypesActions.betTypesStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);