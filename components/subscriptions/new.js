import { Field, FieldArray, reduxForm } from 'redux-form'

let NewSubscription = props => {
  const { handleSubmit } = props

  const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} type={type} placeholder={label} />
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  )

  const makeRenderConditionFields = (parentIndex) => {
    const renderConditionFields = ({ fields, meta: { error, submitFailed } }) => (
      <ul>
        <li>
          <button type="button" onClick={() => fields.push({})}>
            Add Condition
          </button>
          {submitFailed && error && <span>{error}</span>}
        </li>
        {fields.map((condition, index) => {
          return (<li key={index}>
            <button
              type="button"
              onClick={() => fields.remove(index)}
            > Remove Condition
            </button>
            <h4>Condition #{index + 1}</h4>
            <Field
              name={`${condition}.type`}
              type="text"
              component={renderField}
              label="Type"
            />
            <Field
              name={`${condition}.value`}
              type="text"
              component={renderField}
              label="Value"
            />
          </li>);
        })}
      </ul>
    )
    return renderConditionFields;
  }

  const renderLogicFields = ({ fields, meta: { error, submitFailed } }) => (
    <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>
        Add Logic
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((logic, index) => {
      return (<li key={index}>
        <button
          type="button"
          onClick={() => fields.remove(index)}
        > Remove Logic
        </button>
        <h4>Logic #{index + 1}</h4>
        <FieldArray name={`${logic}.conditions`} component={makeRenderConditionFields(index)} />
      </li>);
    })}
  </ul>
)

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <Field name="name" component="input" type="text" />
        <label htmlFor="webhookUrl">Webhook URL</label>
        <Field name="webhookUrl" component="input" type="text" />
        <FieldArray name="logic" component={renderLogicFields} />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

NewSubscription = reduxForm({
  form: 'newSubscription'
})(NewSubscription)

export default NewSubscription
