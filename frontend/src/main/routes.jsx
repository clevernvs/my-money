import React from 'react';
import { Switch, Router, Redirect } from 'react-router-dom';

import AuthOrApp from './authOrApp';
import Dashboard from '../dashboard/dashboard';
import BillingCycle from '../billingCycle/billingCycle';

export default (props) => {

    <div className='contet-wrapper'>
        <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/billingCycles' component={BillingCycle} />
            <Redirect from='*' to='/' />
        </Switch>

    </div>

}