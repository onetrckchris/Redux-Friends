import React from 'react';
import { Form, withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import Login, { StyledField, LoginButton, ErrorMessage } from './Login';

const url = 'http://localhost:5000/api/friends';
const token = localStorage.getItem('token');

const AddFriendForm = ({touched, errors}) => {
    return (
        <Form>
            <StyledField type="text" name="name" autoComplete="off" placeholder="Name" />
            <ErrorMessage>{touched.name && errors.name}</ErrorMessage>
            <StyledField type="number" name="age" autoComplete="off" placeholder="Age" />
            <StyledField type="email" name="email" autoComplete="off" placeholder="Email" />
            <ErrorMessage>{touched.email && errors.email}</ErrorMessage>
            <LoginButton type="submit">Add Friend</LoginButton>
        </Form>
    )
}

export default withFormik({
    mapPropsToValues() {
        return {
            name: '',
            age: '',
            email: ''
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        age: Yup.number().required(),
        email: Yup.string().required()
    }),
    handleSubmit(values, formikBag) {
        formikBag.resetForm();
        console.log(values);
        axios.post(url, values, {
            headers: { Authorization: token }
        })
            .then(response => {
                formikBag.props.history.push('/friends');
            })
            .catch(error => console.log(error.response.data))
    }
})(AddFriendForm);