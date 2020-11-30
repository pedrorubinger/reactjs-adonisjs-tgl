import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import swal from 'sweetalert';

import AuthContainer from '../../components/Auth';
import AuthForm from '../../components/Auth/AuthForm';
import ErrorContainer from '../../components/UI/ErrorContainer';
import ErrorBox from '../../components/UI/ErrorBox';
import Input from '../../components/UI/Input';
import ArrowButton from '../../components/UI/Buttons/ArrowButton';
import Loading from '../../components/UI/Loading';
import { getUserData, updateProfileData } from '../../services/auth';

const Account = ({ auth, history }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isFetched, setIsFetched] = useState(false);
    const [error, setError] = useState(null);
    const [currentEmail, setCurrentEmail] = useState('');

    const handleSubmit = async (values) => {
        setIsLoading(true);

        const { success, errors } = await updateProfileData(
            values,
            auth.userId,
            currentEmail
        );

        if(success) {
            return swal({
                title: `Success!`,
                text: 'Your account profile has been successfully updated!',
                icon: 'success',
            }).then(() => history.push('/'));
        }

        setIsLoading(false);
        return formik.setErrors(errors);
    };

    const formik = useFormik({
        initialValues: { name: '', email: '', password: '', newPassword: '' },
        onSubmit: handleSubmit,
        validationSchema: Yup.object().shape({
            name: Yup.string().required('Name must be filled!'),
            email: Yup.string().email('Invalid email!')
                .required('Email must be filled!'),
            password: Yup.string().required('Password must be filled!'),
            newPassword: Yup.string()
        })
    });

    useEffect(() => {
        const getUser = async () => {
            const { success, name, email, error } = await getUserData(auth.userId);

            if(success) {
                formik.initialValues.name = name;
                formik.initialValues.email = email;

                setCurrentEmail(email);
                return setIsFetched(true);
            }

            setIsFetched(true);
            return setError(error.message);
        };

        getUser();
    }, [auth.userId, error, formik.initialValues]);
   
    if(error) return <ErrorContainer error={error} />
    if(!isFetched) return <Loading />;

    return (
        <AuthContainer title="Account" slogan={false}>
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
                    placeholder="Current password"
                    formik={formik}
                />

                <Input
                    type="password"
                    name="newPassword"
                    placeholder="New password"
                    formik={formik}
                />

                <ArrowButton
                    type="submit"
                    color="GreenButton"
                    arrow={isLoading ? 'none' : 'default'}
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Save Changes'}
                </ArrowButton>
            </AuthForm>

            <ArrowButton
                arrow="back"
                disabled={isLoading}
                handleClick={() => history.push('/')}
            >
                Back
            </ArrowButton>
        </AuthContainer>
    );
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(Account);