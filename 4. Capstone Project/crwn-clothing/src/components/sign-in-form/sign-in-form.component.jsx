import { useState, useEffect } from 'react';

import { getRedirectResult } from 'firebase/auth';


import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import {
    auth,
    signInWithGooglePopup,
    signInWithGoogleRedirect,
    createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: ''
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    useEffect(() => {
        getRedirectResult(auth).then(response => {
            if (response) {
                createUserDocumentFromAuth(response.user);
            }
        });
    }, []);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            resetFormFields();
        } catch (error) {}
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    }



    const signInWithGooglePopupHandler = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };

    return (
        <div className='sign-in-container'>
            <h2>Already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} autoComplete='off'/>
                <Button buttonType="" type="submit">Sign In with email & password</Button>
                <Button buttonType="google" onClick={signInWithGooglePopupHandler}>Sign In with Google Popup</Button>
                <Button buttonType="google" onClick={signInWithGoogleRedirect}>Sign In with Google Redirect</Button>
            </form>
        </div>
    );
}

export default SignInForm;
