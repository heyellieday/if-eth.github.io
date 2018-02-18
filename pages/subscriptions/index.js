import withRedux from "next-redux-wrapper";
import makeStore from '../../utilities/makeStore';
import objectToArray from '../../utilities/objectToArray';
import { fetchCollection, createRecord } from '../../utilities/action-creators';
import SubscriptionList from '../../components/subscriptions/list';
import NewSubscription from '../../components/subscriptions/new';
import Columns from 'grommet/components/Columns';

class IndexPage extends React.Component {
  componentDidMount() {
    this.props.fetchSubscriptions();
  }
  render() {
    return (<SubscriptionList items={this.props.subscriptions} />);
  }
}
const mapStateToProps = (state) => ({ subscriptions: objectToArray(state.entities.subscriptions) });
const mapDispatchToProps = (dispatch) => ({
  fetchSubscriptions: () => dispatch(fetchCollection('subscriptions')),
});

let SubscriptionsIndex = withRedux(makeStore, mapStateToProps, mapDispatchToProps)(IndexPage);

export default SubscriptionsIndex;
