import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import { Creators as AuthActions } from '../../store/ducks/auth';
import ProgressBar from '../UI/ProgressBar';

const PrivateRoute = ({ auth, checkAuth, component: Component, ...rest }) => {
    const token = localStorage.getItem('token');

    useEffect(() => {
        if(token && !auth.validated) checkAuth();
    }, [checkAuth, auth.validated, token, auth.isAuthenticated]);

    if(!token)
        return <Redirect to="/login" />

    if(!auth.validated && !auth.error)
        return <ProgressBar />;

    if(auth.error && auth.error.status === 500)
        return <h2>Server Error. Please try again later.</h2>
    
    return <Route {...rest} render={props => (
            auth.isAuthenticated
                ? <Component {...props} />
                : <Redirect to="/login" />
    )} />;
};

const mapStateToProps = (state) => ({ auth: state.auth });
const mapDispatchToProps = (dispatch) => ({
    checkAuth: () => dispatch(AuthActions.checkAuthStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);