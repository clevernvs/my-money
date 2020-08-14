import React from 'react';
import { Router, Route, Redirect, hashHistory } from 'react-router';

import Dashboard from '../dashboard/dashboard';
import BillingCycle from '../billingCycle/billingCycle';

export default () => {
    <Router>
        <Route path='/' component={Dashboard}></Route>
        <Route path='/billingCycle' component={BillingCycle}></Route>
        <Redirect from='*' to='/'></Redirect>
    </Router>
}


