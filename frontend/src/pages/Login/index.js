import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import AuthForm from '../../components/Auth/AuthForm';
import ArrowButton from '../../components/UI/Buttons/ArrowButton';
import Input from '../../components/UI/Input';
import ErrorBox from '../../components/UI/ErrorBox';
import AuthContainer from '../../components/Auth';
import { signIn } from '../../services/auth';

const Login = (props) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (values) => {
        setIsLoading(true);

        const { success, token, errors } = await signIn(values);

        if(success) {
            localStorage.setItem('token', token);
            return props.history.push('/');
        }

        setIsLoading(false);

        return formik.setErrors(errors);
    };

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        onSubmit: handleSubmit,
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email('Invalid email!')
                .required('Email must be filled!'),
            password: Yup.string().required('Password must be filled!')
        })
    });

    return (
        <AuthContainer title="Authentication">
            {
                Object.keys(formik.errors).length !== 0 &&
                    <ErrorBox errors={formik.errors} />
            }

            <AuthForm handleSubmit={formik.handleSubmit}>
                <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    formik={formik}
                    noValidate
                />

                <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    formik={formik}
                />

                <ArrowButton
                    color="GreyButton"
                    size="SmallButton"
                    arrow="none"
                    disabled={isLoading}
                    handleClick={() => props.history.push('/recovery')}
                >
                    I forget my password
                </ArrowButton>

                <ArrowButton
                    type="submit"
                    color="GreenButton"
                    disabled={isLoading}
                    arrow={isLoading ? 'none' : 'default'}
                >
                    {isLoading ? 'Loading...' : 'Sign In'}
                </ArrowButton>
            </AuthForm>

            <ArrowButton
                handleClick={() => props.history.push('/register')}
                disabled={isLoading}
            >
                Sign Up
            </ArrowButton>
        </AuthContainer>
    );
};

export default Login;