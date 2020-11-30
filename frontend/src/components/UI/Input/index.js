import React from 'react';

import styles from './Input.module.css';

const Input = ({ type, name, placeholder, formik }) => {
    const { values, handleChange, handleBlur } = formik;
    const inputClasses = formik.errors[name]
        ? `${styles.Input} ${styles.InputError}`
        : styles.Input

    return (
        <div>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={values[name]}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClasses}
            />
        </div>
    );
};

export default Input;