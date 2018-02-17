import SubscriptionItem from './item';

export default ({ items }) => {
  return (
    <div>
      {items.map(subscription => <SubscriptionItem key={subscription.id} subscription={subscription} />)}
    </div>
  );
}
