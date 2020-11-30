import React from 'react';
import { withRouter } from 'react-router-dom';

import styles from './RecentGames.module.css'; 
import ArrowButton from '../UI/Buttons/ArrowButton';
import BetTypesBar from '../UI/BetTypesBar';

const RecentGames = (props) => (
    <div className={styles.Container}>
        <div className={styles.TitleContainer}>
            <h2 className={styles.Title}>Recent Games</h2>

            <div className={styles.Filters}>
                <h3 className={styles.FiltersTitle}>Filters</h3>

                <BetTypesBar />
            </div>
        </div>

        <div>
            <ArrowButton
                color="GreenButton"
                size="NormalButton"
                handleClick={() => props.history.push('/cart')}
            >
                New Bet
            </ArrowButton>
        </div>
    </div>
);

export default withRouter(React.memo(RecentGames));