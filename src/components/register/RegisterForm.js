import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { AppInput } from '../shared/form/AppInput';
import { AppResError } from '../shared/form/AppResError';

const RegisterForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props
  return (
    <form onSubmit={handleSubmit(submitCb)}>
      
        <Field name="username" label="Username" type="text" className="form-control" component={AppInput} />

        <Field name="email" label="Email" type="email" className="form-control" component={AppInput} />

        <Field name="password" label="Password" type="password" className="form-control" component={AppInput} />

        <Field name="passwordConfirmation" label="Confirm Password" type="password" className="form-control" component={AppInput} />
        
        <div>
        <button className="btn btn-bwm btn-form" type="submit" disabled={!valid || pristine || submitting}>
            Register
        </button>
        <AppResError errors={errors}></AppResError>
        </div>
    </form>
  )
}

const validate = values => {
    const errors = {}
    if (values.username && values.username.length < 4) {
      errors.username = 'Must be 4 characters or more';
    } 
    if (!values.email) {
      errors.email = 'Please enter email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (!values.password) {
        errors.password = 'Please enter password';
    }
    if (values.password !== values.passwordConfirmation) {
        errors.passwordConfirmation = 'Password does not match'
    }
    return errors
}

export default reduxForm({
  form: 'registerForm',
  validate: validate // a unique identifier for this form
})(RegisterForm)