import withRedux from "next-redux-wrapper";
import makeStore from '../utilities/makeStore';
import objectToArray from '../utilities/objectToArray';
import { fetchCollection, createRecord } from '../utilities/action-creators';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.fetchSubscriptions();
  }
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <button onClick={this.props.createSubscription}>create subscription</button>
        {this.props.subscriptions.map(subscription => (<h4 key={subscription.id}>{subscription.name}</h4>))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ subscriptions: objectToArray(state.entities.subscriptions) });
const mapDispatchToProps = (dispatch) => ({
  fetchSubscriptions: () => dispatch(fetchCollection('subscriptions')),
  createSubscription: (data) => dispatch(createRecord('subscriptions', { name: 'test', logic: [[{ type: 'address', value: '0x2d785ec2de671319db1956a404ec7b73e6a36c99ddf81bc7adc5b286f82967ab' }]] })),
});

Dashboard = withRedux(makeStore, mapStateToProps, mapDispatchToProps)(Dashboard);

export default Dashboard;
