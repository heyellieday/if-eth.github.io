import withRedux from "next-redux-wrapper";
import makeStore from '../utilities/makeStore';
import objectToArray from '../utilities/objectToArray';
import { fetchCollection, createRecord } from '../utilities/action-creators';
import SubscriptionList from '../components/subscriptions/list';
import NewSubscription from '../components/subscriptions/new';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.fetchSubscriptions();
  }
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <NewSubscription onSubmit={this.props.createSubscription} />
        <SubscriptionList items={this.props.subscriptions} />
      </div>
    );
  }
}

const formDataToParams = data => {
  const params = {};
  for (const key in data) {
    if (key == "logic") {
      params[key] = data[key].reduce((result, item) => {
        result.push(item.conditions);
        return result;
      }, []);
    } else {
      params[key] = data[key];
    }
  }
  return params;
}
const mapStateToProps = (state) => ({ subscriptions: objectToArray(state.entities.subscriptions) });
const mapDispatchToProps = (dispatch) => ({
  fetchSubscriptions: () => dispatch(fetchCollection('subscriptions')),
  createSubscription: (data) => dispatch(createRecord('subscriptions', formDataToParams(data))),
});

Dashboard = withRedux(makeStore, mapStateToProps, mapDispatchToProps)(Dashboard);

export default Dashboard;
