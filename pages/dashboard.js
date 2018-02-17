import React from 'react';
import Auth from '../utilities/auth.js';

const auth = new Auth();

export default class Dashboard extends React.Component {
  state = {
      subscriptions: [],
  }

  componentDidMount() {
    fetch("https://9sf3re3thg.execute-api.us-east-1.amazonaws.com/dev/subscriptions", {
      method: "get",
      headers: {
        Authorization: `Bearer ${auth.getAccessToken()}`
      },
    })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(subscriptions => this.setState({ subscriptions }));
  }
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        {this.state.subscriptions.map(subscription => (<h4 key={subscription.id}>{subscription.name}</h4>))}
      </div>
    );
  }
}
