import withRedux from "next-redux-wrapper";
import makeStore from '../../utilities/makeStore';
import objectToArray from '../../utilities/objectToArray';
import { fetchCollection, createRecord } from '../../utilities/action-creators';
import SubscriptionList from '../../components/subscriptions/list';
import NewSubscription from '../../components/subscriptions/new';
import Columns from 'grommet/components/Columns';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';

class NewPage extends React.Component {
  render() {
    return (<NewSubscription onSubmit={this.props.createSubscription} />);
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
const mapStateToProps = (state) => {};
const mapDispatchToProps = (dispatch) => ({
  createSubscription: (data) => dispatch(createRecord('subscriptions', formDataToParams(data))),
});

let SubscriptionsNew = withRedux(makeStore, mapStateToProps, mapDispatchToProps)(NewPage);

export default SubscriptionsNew;
