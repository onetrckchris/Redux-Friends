import React from 'react';
import { Form, Field, withFormik } from 'formik';
import styled, { css } from 'styled-components';
import * as Yup from 'yup';
import axios from 'axios';

const url = 'http://localhost:5000'

export const StyledField = styled(Field)`
    padding: 10px;
    font-size: 0.9rem;
    outline: none;
    color: #6a1b9a;
    border-radius: 5px;
    border: 1px solid #6a1b9a;
    margin: 5px;

    &::placeholder {
        color: #ba68c8;
    }

    ${props =>
    props.age && css`
        width: 50px;
    `}
`;

export const ErrorMessage = styled.p`
    font-size: 0.8rem;
    color: red;
`;

export const LoginButton = styled.button`
    border: none;
    background-color: #6a1b9a;
    color: #f3e5f5;
    width: 190px;
    height: 41px;
    font-size: 0.9rem;
    cursor: pointer;
    border-radius: 5px;
`;

const Login = ({errors, touched}) => {
    return (
        <Form>
            <StyledField type="text" name="username" autoComplete="off" placeholder="Username" />
            <ErrorMessage>{touched.username && errors.username}</ErrorMessage>
            <StyledField type="password" name="password" autoComplete="off" placeholder="Password" />
            <ErrorMessage>{touched.password && errors.password}</ErrorMessage>
            <LoginButton type="submit">Login</LoginButton>
        </Form>
    )
}

export default withFormik({
    mapPropsToValues() {
        return {
            username: '',
            password: ''
        };
    },
    validationSchema: Yup.object().shape({
        username: Yup.string().required(),
        password: Yup.string().min(8).required()
    }),
    handleSubmit(values, formikBag) {
        formikBag.resetForm();
        axios.post(`${url}/api/login`, values)
            .then(response => {
                console.log(response);
                localStorage.setItem('token', response.data.payload);
                formikBag.props.history.push('/friends');
            })
            .catch(error => console.log(error.response.data))
        console.log(values);
    }
})(Login);