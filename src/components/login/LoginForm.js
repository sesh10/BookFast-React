import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { AppInput } from '../shared/form/AppInput';
import { AppResError } from '../shared/form/AppResError';
import { required, minLength4 } from '../shared/form/validators';

const LoginForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props
  return (
    <form onSubmit={handleSubmit(submitCb)}>

      <Field name="email" label="Email" type="email" className="form-control" component={AppInput} validate={[required, minLength4]}/>

      <Field name="password" label="Password" type="password" className="form-control" component={AppInput} validate={[required]} />
      
      <button className="btn btn-bwm btn-form" type="submit" disabled={!valid || pristine || submitting}>
          Login
      </button>
      <AppResError errors={errors}></AppResError>
    </form>
  )
}


export default reduxForm({
  form: 'loginForm' 
})(LoginForm)