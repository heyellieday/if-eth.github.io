import * as qs from 'qs';
import * as React from 'react';
import { ChangeEvent } from 'react';
import { Link, withRouter } from 'react-router-dom';
import SubscriptionList from '../components/subscriptions/SubscriptionList';
import { listSubscriptions } from '../util/api';
import mustBeLoggedIn from '../util/mustBeLoggedIn';
import { RouteComponentProps } from 'react-router';
import { Subscription } from '../util/model';
import { Button, Container, Dimmer, Header, Icon, Input, Loader } from 'semantic-ui-react';
import * as _ from 'underscore';

class ListSubscriptions extends React.Component<RouteComponentProps<{}>, { subscriptions: Subscription[] | null, promise: Promise<any> | null }> {
  state = {
    subscriptions: null,
    promise: null
  };

  componentDidMount() {
    this.fetchSubs();
  }

  fetchSubs = () => {
    const { promise } = this.state;
    if (promise) {
      return;
    }

    this.setState({
      promise: listSubscriptions()
        .then(subscriptions => this.setState({ subscriptions, promise: null }))
        .catch(error => this.setState({ promise: null }))
    });
  };

  handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    const { history } = this.props;

    history.replace({
      pathname: '/subscriptions',
      search: `q=${value}`
    });
  };

  render() {
    const { history } = this.props;
    const { subscriptions, promise } = this.state;

    const { search } = history.location;

    let filteredSubs: Subscription[] = subscriptions || [];

    let q = '';
    if (search && search.length > 1) {
      q = qs.parse(search.substr(1)).q || '';

      filteredSubs = _.filter(
        filteredSubs,
        ({ name }: Subscription) => !q || name.toLowerCase().indexOf(q) !== -1
      );
    }

    const loading = promise !== null;

    return (
      <Container>
        <Header as="h1">My subscriptions</Header>
        <div style={{ display: 'flex' }}>
          <div style={{ flexGrow: 1 }}>
            <Input
              icon="search"
              placeholder="Search subscriptions"
              fluid
              onChange={this.handleChange}
              value={q}
            />
          </div>
          <div style={{ marginLeft: 10 }}>
            <Button primary as={Link} to="/subscriptions/new"><Icon name="add"/> Create</Button>
          </div>
        </div>

        <div style={{ marginTop: 24 }}>
          <Dimmer.Dimmable>
            <Dimmer active={loading} inverted>
              <Loader active={loading}>Loading</Loader>
            </Dimmer>

            <SubscriptionList items={filteredSubs}/>
          </Dimmer.Dimmable>
        </div>
      </Container>
    );
  }
}

export default withRouter(mustBeLoggedIn(ListSubscriptions));
