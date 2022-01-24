import React from 'react';
import { useFormik } from 'formik';

const validate = values => {
  const errors = {};

    if (!values.firstName) {
        errors.firstName = 'Write your name';
    }else if(values.firstName.length > 15){
        errors.firstName = 'Must be 15 characters or less';
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    }

    if (values.password.length < 8) {
        errors.password = 'Must be 8 characters or more';
    }else if(values.password.charAt(0) !== values.password.charAt(0).toUpperCase()){
        errors.password = 'First letter must be capital';
    }

    if (values.repPassword !== values.password) {
        errors.repPassword = 'Passwords are not this same';
    }
  
    return errors;
};

const SignupForm = (props) => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      password: '',
      email: '',
      repPassword: '',
    },
    validate,
    onSubmit: values => {
        props.addUser(values);
        values.firstName='';
        values.password='';
        values.email='';
        values.repPassword='';
    }
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        id="firstName"
        name="firstName"
        type="text"
        className="input"
        placeholder='Enter name'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.firstName}
      />
      {formik.touched.firstName && formik.errors.firstName ? (
        <div className='form-desc'>{formik.errors.firstName}</div>
      ) : null}

      <input
        id="email"
        name="email"
        type="email"
        className="input"
        placeholder='Enter email'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email ? (
        <div className='form-desc'>{formik.errors.email}</div>
      ) : null}

      <input
        id="password"
        name="password"
        type="password"
        className="input"
        placeholder='Enter password'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password ? (
        <div className='form-desc'>{formik.errors.password}</div>
      ) : null}

    <input
        id="repPassword"
        name="repPassword"
        type="password"
        className="input"
        placeholder='Repeat password'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.repPassword}
      />
      {formik.touched.repPassword && formik.errors.repPassword ? (
        <div className='form-desc'>{formik.errors.repPassword}</div>
      ) : null}

      <button type="submit" className="button">Submit</button>
    </form>
  );
};

export default SignupForm;