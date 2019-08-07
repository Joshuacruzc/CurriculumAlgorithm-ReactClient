import React from 'react';
import NavigationBar from "./NavigationBar";


class HomePage extends React.Component{
    user;
    render() {
        return (
            <div>
                <NavigationBar/>
                <h1>Welcome {this.props.user.username}</h1>
            </div>);
    }
}

export default HomePage;
