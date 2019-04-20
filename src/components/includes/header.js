import React from 'react';
import Menu from "./menu";
import Banner from "./banner";
class Header extends React.Component {
    render() {
        return (
            <div className="header_">
                <Menu
                    currentUtilisateur={this.props.currentUtilisateur}
                    navItem={this.props.navItem} 
                    setCurrentUser={this.props.setCurrentUser}
                    {...this.props}/>
                <Banner />
            </div>
        );
    }
}

export default Header;