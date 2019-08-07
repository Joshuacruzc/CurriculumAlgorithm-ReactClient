import React from 'react';
import './App.css';
import LoginPage from "./LoginPage";
import MainPage from "./MainPage";
import HomePage from "./HomePage";
import {getUserInfo} from "./CurriculumAlgorithmAPI";


class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: null,
        };
        this.getUser = this.getUser.bind(this);
    }

    getUser(token){
        getUserInfo(token).then((data) => {
            data["accessToken"] = token;
            this.setState({user: data})
        });
    }

    render() {
        if (this.state.user){
            return (<MainPage user={this.state.user}/>);
        } else{
            return (<LoginPage onSuccessfulLogin={this.getUser}/>);
        }
    }
}

export default App;
