import React from 'react';
import './App.css';
import LoginPage from "./LoginPage";
import MainPage from "./MainPage";


class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: null,
        };
        this.getUser = this.getUser.bind(this);
    }

    getUser(token){
        const user = {accessToken: token};
        this.setState({user:user})
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
