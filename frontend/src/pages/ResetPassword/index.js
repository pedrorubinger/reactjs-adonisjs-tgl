import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import swal from 'sweetalert';

import { BASE_URL } from '../../utils/constants';
import AuthContainer from '../../components/Auth';
import ErrorBox from '../../components/UI/ErrorBox';
import AuthForm from '../../components/Auth/AuthForm';
import Input from '../../components/UI/Input';
import ArrowButton from '../../components/UI/Buttons/ArrowButton';
import Loading from '../../components/UI/Loading';
import { setNewPassword } from '../../services/auth';

const ResetPassword = ({ history }) => {
    const [tokenIsValid, setTokenIsValid] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const token = new URLSearchParams(history.location.search).get('token');

    useEffect(() => {
        const validateToken = async () => {
            if(!token) return setIsReady(true);

            try {
                await axios.get(`${BASE_URL}/recovery/${token}`);

                setTokenIsValid(true);
                setIsReady(true);
            } catch (err) {
                setIsReady(true);
            }
        };

        validateToken();
    }, [token]);

    const handleSubmit = async (values) => {
        setIsLoading(true);

        const { success, errors } = await setNewPassword(values, token);

        if(success) {
            return swal({
                title: `Success!`,
                text: 'Your password has been successfully updated!',
                icon: 'success',
            }).then(() => history.push('/'));
        }

        setIsLoading(false);
        return formik.setErrors(errors);
    };

    const formik = useFormik({
        initialValues: { password: '', passwordConfirmation: '' },
        onSubmit: handleSubmit,
        validationSchema: Yup.object().shape({
            password: Yup.string().required('Password must be filled!'),
            passwordConfirmation: Yup.string()
                .required('Password confirmation must be filled!')
        })
    });

    if(!isReady) return <Loading message="Loading..." />;
    if(!tokenIsValid) return <Redirect to='/login' />

    return (
        <AuthContainer title="Change Password">
            {
                Object.keys(formik.errors).length !== 0 &&
                    <ErrorBox errors={formik.errors} />
            }

            <AuthForm handleSubmit={formik.handleSubmit}>
                <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    formik={formik}
                />

                <Input
                    type="password"
                    name="passwordConfirmation"
                    placeholder="Confirm Password"
                    formik={formik}
                />

                <ArrowButton
                    type="submit"
                    color="GreenButton"
                    disabled={isLoading}
                    arrow={isLoading ? 'none' : 'default'}
                >
                    {isLoading ? 'Loading...' : 'Reset'}
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

export default ResetPassword;