import React from 'react';


class NavigationBar extends React.Component{
    onClick;
    user;
    render() {
        return (<div className="navBar">
            <h1 id="app_name"> Semester Keeper </h1>
            <h3 id="full_name">{this.props.user.first_name + " " + this.props.user.last_name}</h3>
            <button id="menu" style={{height:'100%', marginTop: 'auto', marginBottom: 'auto', backgroundColor: 'transparent', border: 'none'}} onClick={this.props.onClick}>
                <svg height="" id="Layer_1" style={{enableBackground: 'new 0 0 32 32'}} fill="white"  viewBox="0 0 32 32" width="32px" >
                    <path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"/>
                </svg>
            </button>
        </div>);
    }
}

export default NavigationBar;
