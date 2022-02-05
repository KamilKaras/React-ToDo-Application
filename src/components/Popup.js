import React from 'react';
import { useFormik } from 'formik';

const validate = values => {
  const errors = {};

    if (!values.email) {
        errors.email = 'Write your email';
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
    }

    if (values.password.length < 8) {
        errors.password = 'Must be 8 characters or more';
    }else if(values.password.charAt(0) !== values.password.charAt(0).toUpperCase()){
        errors.userPassword = 'First letter must be capital';
    }

    return errors;
};

const SignupForm = (props) => {
  const formik = useFormik({
    initialValues: {
        email:"",
        password:"",
    },
    validate,
    onSubmit: values => {  
        props.userToLogin.map(user =>
            user.email !== values.email.toLocaleLowerCase() ?
                alert("Wrong user email adress !! ")
            :user.password !== values.password ?
                alert("Wrong user password !! ")
            :
                props.whoIsLogged(user.id),
            )
            values.email='';
            values.password='';
    }
  });

  return (props.trigger)?(
    <form onSubmit={formik.handleSubmit} className="popup">
        <div className="popup-inner">
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
        {formik.touched.userEmail && formik.errors.userEmail ? (
            <div className='form-desc'>{formik.errors.userEmail}</div>
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
            <button className="close-btn" onClick={() => props.closePopup()}>X</button>
            <button type="submit" className="button-submit">Submit</button>
        </div>
    </form>
  ):"";
};

export default SignupForm;