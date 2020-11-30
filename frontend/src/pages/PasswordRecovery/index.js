import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import swal from 'sweetalert';

import AuthContainer from '../../components/Auth/';
import AuthForm from '../../components/Auth/AuthForm';
import Input from '../../components/UI/Input';
import ArrowButton from '../../components/UI/Buttons/ArrowButton';
import ErrorBox from '../../components/UI/ErrorBox';
import { recoverPassword } from '../../services/auth';

const PasswordRecovery = (props) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (values) => {
        setIsLoading(true);

        const { success, errors } = await recoverPassword(values);

        setIsLoading(false);

        if(success) {
            return swal({
                title: 'Check your inbox!',
                text: `A password recovery email was sent to ${values.email}`,
                icon: 'success'
            }).then(() => props.history.push('/login'));
        }

        return formik.setErrors(errors);
    };

    const formik = useFormik({
        initialValues: { email: '' },
        onSubmit: handleSubmit,
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email('Invalid email!')
                .required('Email must be filled!')
        })
    });

    return (
        <AuthContainer title="Reset password">
            {
                Object.keys(formik.errors).length !== 0 &&
                    <ErrorBox errors={formik.errors}/>
            }

            <AuthForm handleSubmit={formik.handleSubmit}>
                <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    formik={formik}
                />

                <ArrowButton
                    type="submit"
                    color="GreenButton"
                    disabled={isLoading}
                    arrow={isLoading ? 'none' : 'default'}
                >
                    {isLoading ? 'Loading...' : 'Send link'}
                </ArrowButton>
            </AuthForm>

            <ArrowButton
                arrow="back"
                disabled={isLoading}
                handleClick={() => props.history.push('/login')}
            >
                Back
            </ArrowButton>
        </AuthContainer>
    );
};

export default PasswordRecovery;