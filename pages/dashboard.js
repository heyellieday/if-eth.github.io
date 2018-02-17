import withRedux from "next-redux-wrapper";
import { makeAuthenticatedRequest } from '../utilities/api';
import makeStore from '../utilities/makeStore';
import objectToArray from '../utilities/objectToArray';

class Dashboard extends React.Component {
  componentDidMount() {
    makeAuthenticatedRequest('subscriptions')
    .then(subscriptions => this.props.setSubscriptions({ subscriptions }));
  }
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        {this.props.subscriptions.map(subscription => (<h4 key={subscription.id}>{subscription.name}</h4>))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ subscriptions: objectToArray(state.entities.subscriptions) });
const mapDispatchToProps = (dispatch) => ({ setSubscriptions: console.log });

Dashboard = withRedux(makeStore, mapStateToProps, mapDispatchToProps)(Dashboard);

export default Dashboard;
