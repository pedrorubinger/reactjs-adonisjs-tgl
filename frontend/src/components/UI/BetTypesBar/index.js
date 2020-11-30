import React from 'react';
import { connect } from 'react-redux';

import styles from './BetTypesBar.module.css';
import RoundedButton from '../Buttons/RoundedButton';
import { Creators as BetTypesActions } from '../../../store/ducks/betTypes';

/**
 * @param {Boolean} inactivate Defines whether the bet type button bar removes the
 * filter when clicking
 */

const BetTypesBar = ({ betTypes, setActive, inactivate = false }) => {
    const setActiveButton = (_, id) => {
        if(inactivate) return betTypes.active === id ? false : setActive(id);
        else return betTypes.active === id ? setActive('') : setActive(id);
    };

    return (
        <div className={styles.ButtonsContainer}>
            {betTypes.data.map(bet => (
                <RoundedButton
                    key={bet.type}
                    color={bet.color}
                    active={betTypes.active === bet.id}
                    radius="rounded"
                    size="small"
                    handleClick={(e) => setActiveButton(e, bet.id)}
                >
                    {bet.type}
                </RoundedButton>
            ))}
        </div>
    );
};

const mapStateToProps = (state) => ({ betTypes: state.betTypes });
const mapDispatchToProps = (dispatch) => ({
    setActive: (filter) => dispatch(BetTypesActions.betTypesActive(filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(BetTypesBar);