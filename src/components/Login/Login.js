import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import './Login.css';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { Container } from 'react-bootstrap';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        photoURL: '',
        isSignedIn: false
    })

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const { displayName, email, photoURL } = result.user;

                const userInfo = { ...user }

                userInfo.name = displayName;
                userInfo.email = email;
                userInfo.photoURL = photoURL;
                userInfo.isSignedIn = true;
                setUser(userInfo);
                setLoggedInUser(userInfo);
                history.replace(from);

            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log('login err', errorMessage);

            });
    }
    return (
        <div className='login-area'>
            <h2 className='login-title'>Welcome To BD Fresh Market</h2>

            <div className='login-from'>
                <h3 className='form-title'> Login</h3>

                <button onClick={googleSignIn} className='btn ggl-btn'>
                    <span className='google'><FontAwesomeIcon icon={faGoogle} /></span> <span>Continue With Google</span>
                </button>
            </div>

        </div>

    );
};

export default Login;