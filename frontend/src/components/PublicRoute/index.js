import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import { Creators as AuthActions } from '../../store/ducks/auth';
import Loading from '../UI/Loading';

const PublicRoute = ({ auth, checkAuth, component: Component, ...rest }) => {
    const token = localStorage.getItem('token');

    useEffect(() => {
        if(token && !auth.validated) checkAuth();
    }, [checkAuth, auth.validated, token]);

    if(!token) return <Route {...rest} render={props => <Component {...props} />} />;
    if(!auth.validated) return <Loading />

    return <Route {...rest} render={props => (
            auth.isAuthenticated
                ? <Redirect to="/" />
                : <Component {...props} />
    )} />;
};

const mapStateToProps = (state) => ({ auth: state.auth });
const mapDispatchToProps = (dispatch) => ({
    checkAuth: () => dispatch(AuthActions.checkAuthStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(PublicRoute);