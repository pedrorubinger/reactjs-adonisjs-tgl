import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import SideBar from './components/SideBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PasswordRecovery from './pages/PasswordRecovery';
import ResetPassword from './pages/ResetPassword';
import NewBet from './pages/NewBet';
import Account from './pages/Account';
import NotFound from './pages/NotFound';

const Router = () => {
    return (
        <BrowserRouter>
            <SideBar />
            <Switch>
                <PrivateRoute path="/" exact component={Home} />
                <PublicRoute path="/login" exact component={Login} />
                <PublicRoute path="/register" exact component={Register} />
                <PublicRoute path="/recovery" exact component={PasswordRecovery} />
                <PublicRoute path="/reset_password" exact component={ResetPassword} />
                <PrivateRoute path="/cart" exact component={NewBet} />
                <PrivateRoute path="/account" exact component={Account} />
                <Route path="/" component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
};

export default Router;