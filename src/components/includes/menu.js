import React from 'react';
import Config from '../config/config';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";



class Menu extends React.Component {
    constructor(props) {
        super(props);

    }

    handleDeconnection(e) {
        e.preventDefault();
        var user = null;
        this.props.setCurrentUser(user);
        this.props.history.push("/restaurants");
        sessionStorage.removeItem("user");
    }
    render() {
        var { navItem, currentUtilisateur } = this.props;
        return (

            <div className="menu" id="menu">
                <nav className="navbar my-menu navbar-expand-sm bg-info navbar-dark">
                    <ul className="navbar-nav">
                        {
                            navItem.map((nav, index) => {
                                if (currentUtilisateur !== null && currentUtilisateur !== undefined) {
                                    if (currentUtilisateur.id != undefined) {
                                        if (nav.key === "Authentification")
                                            return;
                                    }
                                }
                                else if (sessionStorage.getItem("user") != undefined) {
                                    if (nav.key === "Authentification")
                                        return;
                                }
                                return <li key={index}>
                                    <Link className="nav-link" key={index} to={nav.path}>{nav.text}</Link>
                                </li>
                            })
                        }
                    </ul>
                    {
                        currentUtilisateur !== undefined && currentUtilisateur !== null && 
                        <ul className="navbar-nav ml-auto">

                            <li className="nav-item">
                                <Link className="nav-link" to={Config.routeUser.path}>Bienvenue, {currentUtilisateur.nom}</Link>
                            </li>
                            <li className="nav-item"><Link to="#" className="nav-link" >|</Link></li>
                            <li className="nav-item"><Link className="nav-link" to={window.location.pathname} onClick={(e) => this.handleDeconnection(e)}>Se déconnecter</Link></li>

                        </ul>
                    }
                </nav>
            </div >

        );
    }
}

export default withRouter(Menu);