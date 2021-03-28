import firebase from "firebase/app";
import firebaseConfig from './firebase.config';
import "firebase/auth";

export const initializeLoginFramework = () =>
{
    if (!firebase.apps.length)
    {
        firebase.initializeApp(firebaseConfig);
    }
    else
    {
        firebase.app();
    }
}

export const handleGoogleSignIn = () =>
{
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth()
        .signInWithPopup(googleProvider)
        .then((res) =>
        {
            const { displayName, photoURL, email } = res.user;

            const signInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true,
            }
            return signInUser;

        }).catch((err) =>
        {

        });
}

export const handleFbSignIn = () =>
{
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase
        .auth()
        .signInWithPopup(fbProvider)
        .then((res) =>
        {
            res.user.success = true;
            return res.user;
        })
        .catch((error) =>
        {
            console.log(error.code, error.message);
        });
}

export const handleSignOut = () =>
{
    return firebase.auth().signOut().then((res) =>
    {
        const logOutUser = {
            isSignedIn: false,
            name: '',
            email: '',
            photo: ''
        }
        return logOutUser;
    }).catch((error) =>
    {

    });
}

export const createUserWithEmailAndPassword = (name, email, password) =>
{
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((res) =>
        {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            updateUserInfo(name);
            return newUserInfo;
        })
        .catch((error) =>
        {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
}

export const SignInUserWithEmailAndPassword = (email, password) =>
{
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res =>
        {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            return newUserInfo;
        })
        .catch((error) =>
        {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
}

export const updateUserInfo = (name) =>
{
    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name,
    }).then(() =>
    {
        console.log('user name updated successfully');
    }).catch(error =>
    {
        console.log(error);
    });
}
