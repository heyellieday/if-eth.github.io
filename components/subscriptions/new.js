import { Field, FieldArray, reduxForm } from 'redux-form'
import Form from 'grommet/components/Form';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';
import FormField from 'grommet/components/FormField';
import CloseIcon from 'grommet/components/icons/base/Close';
import AddIcon from 'grommet/components/icons/base/Add';
import Heading from 'grommet/components/Heading';
import Toast from 'grommet/components/Toast';

let NewSubscription = props => {
  const { handleSubmit, style, submitSucceeded } = props

  const makeRenderConditionFields = (parentIndex) => {
    const renderConditionFields = ({ fields, meta: { error, submitFailed } }) => {
      if (fields.length == 0) { fields.push({}) }
      return (<div>
        {fields.map((condition, index) => {
          const inputStyle = {
            width: "35%",
          }
          return (<div key={index}>
            <h4>
              {index > 0 ? "OR" : null}
            </h4>
              <FormField
                label="Type"
                style={inputStyle}
              >
                <Field
                  name={`${condition}.type`}
                  type="text"
                  component="input"
                />
              </FormField>
              <FormField
                label="Value"
                style={inputStyle}
              >
                <Field
                  name={`${condition}.value`}
                  type="text"
                  component="input"
                />
              </FormField>
              { index == fields.length - 1 ? <Button
                icon={<AddIcon />}
                onClick={() => fields.push({})}
                primary={false}
              /> : null }
          </div>);
        })}
      </div>);
    }
    return renderConditionFields;
  }

  const renderLogicFields = ({ fields, meta: { error, submitFailed } }) => (
    <div>
      <Heading tag="h2">
        Filters
        <Button
          icon={<AddIcon />}
          onClick={() => fields.push({})}
          primary={false}
        />
      </Heading>
      {fields.map((logic, index) => {
        return (
          <div>
            <Heading tag="h3">
              {index > 0 ? "AND" : null}
            </Heading>
            <div style={{
              border: '1px solid gray',
              borderRadius: '2px',
              position: 'relative',
            }} key={index}>
              <Button
                icon={<CloseIcon />}
                onClick={() => fields.remove(index)}
                primary={false}
                style={{
                  position:'absolute',
                  right: '5px',
                  top: '10px',
                }}
              />
            <FieldArray name={`${logic}.conditions`} component={makeRenderConditionFields(index)} />
          </div>
        </div>);
      })}
    </div>
)

  return (
    <Form style={style} onSubmit={handleSubmit}>
      <div>
      { submitSucceeded ? <Toast status='ok'>Subscription successfully created. </Toast> : null }
      <Heading tag="h2">
        General
      </Heading>
        <FormField label="Name">
          <Field name="name" component="input" type="text" />
        </FormField>
        <FormField label="Webhook URL">
          <Field name="webhookUrl" component="input" type="text" />
        </FormField>
        <FieldArray name="logic" component={renderLogicFields} />
      </div>
      <Footer pad={{"vertical": "medium"}}>
        <Button label='Submit'
          type='submit'
          primary={true}
          onClick={handleSubmit} />
      </Footer>
    </Form>
  )
}

NewSubscription = reduxForm({
  form: 'newSubscription'
})(NewSubscription)

export default NewSubscription
