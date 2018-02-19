import * as React from 'react';
import CreateSubscription from './pages/CreateSubscription';
import ListSubscriptions from './pages/ListSubscriptions';
import ViewSubscriptionPage from './pages/ViewSubscriptionPage';
import NotFound from './pages/NotFound';
import { Redirect, Route, Switch } from 'react-router';

export default function PageRouter(props: {}) {
  return (
    <Switch>
      <Route path="/" exact component={() => <Redirect to="/subscriptions"/>}/>
      <Route path="/subscriptions/new" exact component={CreateSubscription}/>
      <Route path="/subscriptions" exact component={ListSubscriptions}/>
      <Route path="/subscriptions/:id" exact component={ViewSubscriptionPage}/>
      <Route path="*" component={NotFound}/>
    </Switch>
  );
}