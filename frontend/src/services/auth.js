import api from './api';

const errorHandling = (err) => {
    const errors = {};

    if(err.response && Array.isArray(err.response.data))
        err.response.data.forEach((error) => errors[error.field] = error.message);
    else {
        if(err.response && err.response.status === 401) {
            return {
                success: false,
                errors: { 'password': 'Password is incorrect.' }
            };
        }

        return { success: false, errors: { 'server': 'Server error!' } };
    }

    return { success: false, errors: errors };
}

export const signIn = async ({ email, password }) => {
    try {
        const response = await api.post('/sessions', { email, password });

        return { success: true, token: response.data.token };
    } catch (err) {
        return errorHandling(err);
    }
};

export const signUp = async ({ name, email, password }) => {
    try {
        const response = await api.post('/users', { name, email, password });

        return response.data;
    } catch (err) {
        return errorHandling(err);
    }
};

export const recoverPassword = async ({ email }) => {
    try {
        const data = { email, redirect_url: 'http://localhost:3000/reset_password' };
        await api.post('/recovery', data);

        return { success: true };
    } catch (err) {
        return {
            success: false,
            errors: { 'email': 'No user is registered with this email.' }
        };
    }
};

export const setNewPassword = async ({ password, passwordConfirmation }, token) => {
    if(password !== passwordConfirmation)
        return {
            success: false,
            errors: {
                'passwordConfirmation': 'Your password confirmation is incorrect'
            }
        }; 

    try {
        await api.put('/recovery', { token, password });

        return { success: true };
    } catch (err) {
        return errorHandling(err);
    }
};

export const getUserData = async (userId) => {
    try {
        const response = await api.get(`/users/${userId}`);

        return {
            success: true,
            name: response.data.user[0].name,
            email: response.data.user[0].email
        };
    } catch (err) {
        const error = err.response
            ? { message: err.response.data.message }
            : { message: 'Unexpected error' };

        return { success: false, error };
    }
};

export const updateProfileData = async (values, userId, currentEmail) => {
    const { name, password, newPassword } = values;
    let { email } = values;

    if(email === currentEmail)
        email = null;
    
    if(password === newPassword)
        return {
            success: false,
            errors: {
                'newPassword': 'Your new password and current password are the same!'
            }
        };

    const data = { name, email, password, newPassword, userId, currentEmail };

    try {
        await api.put('/users', data);

        return { success: true };
    } catch (err) {
        return errorHandling(err);       
    }
}