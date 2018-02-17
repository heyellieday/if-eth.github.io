export default ({ subscription }) => {
  return (
    <div>
      <p>{subscription.id}</p>
      <p>{subscription.name}</p>
      <p>{subscription.webhookUrl}</p>
      <pre>{JSON.stringify(subscription.logic)}</pre>
      -----------------------------------------------
    </div>
  );
}
