import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import styles from './Games.module.css';
import { Creators as GameActions } from '../../store/ducks/games';
import ErrorContainer from '../UI/ErrorContainer';
import Game from './Game';
import Loading from '../UI/Loading';
import Pagination from '../UI/Pagination';

const Games = ({ auth, gamesData, betTypes, fetchGames }) => {
    useEffect(() => {
        fetchGames(auth.userId, betTypes.active);
    }, [fetchGames, auth.userId, betTypes.active]);

    if(!gamesData.fetched) return (
        <div className={styles.Container}>
            <Loading message={'Your games are being loaded...'} />
        </div>
    );

    return (
        <div className={styles.Container}>
            {
                gamesData.error && <ErrorContainer error={gamesData.error} />
            }

            {
                !!gamesData.games.length && !gamesData.error &&
                    gamesData.games.map((game) => <Game game={game} key={game.id} />)
            }

            {
                !!!gamesData.games.length && !gamesData.error &&
                    <div className={styles.Empty}>
                        <p>
                            { !!betTypes.active
                                ? `You don't have any ${
                                    betTypes.data[betTypes.active - 1].type}
                                    bets yet.`
                                : 'You don\'t have any games yet.'
                            }
                            <br />Click <strong>New Bet</strong> to start betting.
                        </p>
                    </div>
            }

            {
                gamesData.pagination.lastPage > 1 &&
                    <Pagination />
            }
        </div>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    gamesData: state.games,
    betTypes: state.betTypes
});

const mapDispatchToProps = (dispatch) => ({
    fetchGames: (userId, filter) => 
        dispatch(GameActions.fetchGamesRequest(userId, filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(Games);