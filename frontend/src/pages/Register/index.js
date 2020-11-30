import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import swal from 'sweetalert';

import Input from '../../components/UI/Input';
import ArrowButton from '../../components/UI/Buttons/ArrowButton';
import AuthForm from '../../components/Auth/AuthForm';
import ErrorBox from '../../components/UI/ErrorBox';
import AuthContainer from '../../components/Auth/';
import { signIn, signUp } from '../../services/auth';

const Register = ({ history }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (values) => {
        setIsLoading(true);

        const { success, errors } = await signUp(values);

        if(success) {
            const { success, token, errors } = await signIn(values);

            if(success) {
                localStorage.setItem('token', token);
                return swal({
                    title: `Welcome, ${values.name}!`,
                    text: 'Your account has been successfully created!',
                    icon: 'success',
                }).then(() => history.push('/'));
            }

            setIsLoading(false);
            return formik.setErrors(errors);
        }

        setIsLoading(false);
        return formik.setErrors(errors);
    };

    const formik = useFormik({
        initialValues: { name: '', email: '', password: '' },
        onSubmit: handleSubmit,
        validationSchema: Yup.object().shape({
            name: Yup.string().required('Name must be filled!'),
            email: Yup.string().email('Invalid email!').required('Email must be filled!'),
            password: Yup.string().required('Password must be filled!')
        })
    });

    return (
        <AuthContainer title="Registration">
            {
                Object.keys(formik.errors).length !== 0 &&
                    <ErrorBox errors={formik.errors} />
            }

            <AuthForm handleSubmit={formik.handleSubmit}>
                <Input
                    type="text"
                    name="name"
                    placeholder="Name"
                    formik={formik}
                />

                <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    formik={formik}
                />

                <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    formik={formik}
                />

                <ArrowButton
                    type="submit"
                    color="GreenButton"
                    arrow={isLoading ? 'none' : 'default'}
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Register'}
                </ArrowButton>
            </AuthForm>

            <ArrowButton
                arrow="back"
                handleClick={() => history.push('/login')}
                disabled={isLoading}
            >
                Back
            </ArrowButton>
        </AuthContainer>
    );
};

export default Register;