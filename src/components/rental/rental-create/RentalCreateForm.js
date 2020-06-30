import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { AppInput } from '../../shared/form/AppInput';
import { AppSelect } from '../../shared/form/AppSelect';
import { AppTextArea } from '../../shared/form/AppTextArea';
import { AppFileUpload } from '../../shared/form/AppFileUpload';
import { AppResError } from '../../shared/form/AppResError';
// import { required, minLength4 } from '../shared/form/validators';

const RentalCreateForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, options, errors } = props
  return (
    <form onSubmit={handleSubmit(submitCb)}>

      <Field name="title" label="Title" type="text" className="form-control" component={AppInput} />
      <Field name="description" rows="3" label="Description" type="text" className="form-control" component={AppTextArea} />
      <Field name="city" label="City" type="text" className="form-control" component={AppInput} />
      <Field name="street" label="Street" type="text" className="form-control" component={AppInput} />
      <Field options={options} name="category" label="Category" className="form-control" component={AppSelect} />
      <Field name="image" label="Image" component={AppFileUpload} />
      <Field name="bedrooms" label="Bedrooms" type="number" className="form-control" component={AppInput} />

      <Field name="rate" label="Rate" type="number" className="form-control" symbol="$" component={AppInput}  />
      <Field name="shared" label="Shared" type="checkbox" className="form-control" component={AppInput}  />
      
      <button className="btn btn-bwm btn-form" type="submit" disabled={!valid || pristine || submitting}>
          Create
      </button>
      <AppResError errors={errors}></AppResError>
    </form>
  )
}


export default reduxForm({
  form: 'rentalCreateForm',
  initialValues: {shared: false, category: 'apartment'}
})(RentalCreateForm)