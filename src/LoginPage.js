import React from 'react';
import GoogleLogin from "react-google-login";
import {convertToken} from "./CurriculumAlgorithmAPI";

const responseGoogle = (response) => {
    console.log(response);
};

class LoginPage extends React.Component{
    onSuccessfulLogin;
    successfulLogin = (response) =>{
        let token = convertToken(response['accessToken']);
        this.props.onSuccessfulLogin(token);
        return null;
    };

    render() {
            return (<GoogleLogin
                onSuccess={this.successfulLogin}
                onFailure={responseGoogle}
                clientId='286387389215-c4ase095o0hunm41m6de3rcfl82g4ue2.apps.googleusercontent.com'
                scope='openid profile'
                uxMode='popup'/>);
    }
}

export default LoginPage;
