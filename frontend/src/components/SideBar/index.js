import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import styled from 'styled-components';
import Header from './Header';
import ArrowButton from '../UI/Buttons/ArrowButton';
import { Creators as AuthActions } from '../../store/ducks/auth';

const SideBar = ({ auth, logout, history }) => {
    const [sideBar, setSidebar] = useState('none');

    if(!auth.isAuthenticated) return false;

    const logoutHandler = () => {
        logout();
        localStorage.clear();
        history.push('/login');
    };
    const setDisplay = (display) => setSidebar(display);
    const hideSideBar = () => setSidebar('none');
    const items = [];

    if(history.location.pathname !== '/')
        items.unshift({
            value: 'Home',
            arrow: 'back',
            callback: () => history.push('/')
        });

    if(history.location.pathname !== '/account') {
        items.push({
            value: 'Account',
            arrow: 'none',
            callback: () =>  history.push('/account')
        });
    }

    items.push({ value: 'Logout', arrow: 'default', callback: logoutHandler });

    return (
        <React.Fragment>
            <Header setSideBar={setDisplay} items={items} />
            <Backdrop display={sideBar} onClick={hideSideBar} />
            <SideMenuContent display={sideBar}>
                <nav>
                    {
                        items.map(item => (
                            <ArrowButton
                                key={item.value}
                                arrow={item.arrow === 'none' ? 'default' : item.arrow}
                                size="NormalButton"
                                handleClick={item.callback}
                            >
                                {item.value}
                            </ArrowButton>
                        ))
                    }
                </nav>
            </SideMenuContent>
        </React.Fragment>
    );
};

const Backdrop = styled.div`
    background-color: rgb(0, 0, 0);
    height: 100vh;
    width: 100vw;
    position: fixed;
    opacity: .5;
    top: 0;
    display: ${(props) => props.display};
`;

const SideMenuContent = styled.div`
    top: 0;
    background-color: rgb(240, 240, 240);
    height: 100vh;
    width: 40vw;
    position: fixed;
    opacity: 1;
    z-index: 9999;
    display: ${(props) => props.display};
`;

const mapStateToProps = (state) => ({ auth: state.auth });
const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(AuthActions.logout())
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(SideBar)
);