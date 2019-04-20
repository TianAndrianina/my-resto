import React from 'react';
import Header from "../includes/header";
import Footer from "../includes/footer";
import Config from "../config/config";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import RouteWithSubRoutes from "../app/routes/route";
import Restaurant from '../app/restaurants/restaurants';
import  { Redirect } from 'react-router-dom'

class MainAppClient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRestaurant: null
        }
    }

    componentDidMount() {

    }

    setCurrentRestaurant(restaurant) {
        this.setState({
            currentRestaurant: restaurant
        })
    }
    render() {
        var { currentUtilisateur } = this.props;
        var pathName = window.location.pathname;
        console.log(pathName);
        
        return (
            <Router>
                <div className="mainAppClient">
                    <Header
                        currentUtilisateur={currentUtilisateur} 
                        navItem={Config.routesClient}
                        setCurrentUser={this.props.setCurrentUser} 
                        {...this.props}
                    />
                    <div className="body-content">
                        {
                            Config.routesClient.map((route, i) => {

                                return (

                                    <RouteWithSubRoutes
                                        key={i} {...route}
                                        handleLoading={this.props.handleLoading}
                                        currentRestaurantClicked={this.setCurrentRestaurant.bind(this)}
                                        currentRestaurant={this.state.currentRestaurant}
                                        {...this.props}
                                    />)
                            })
                            
                        }
                              <RouteWithSubRoutes
                                        {...Config.routeUser}
                                        handleLoading={this.props.handleLoading}
                                        currentRestaurantClicked={this.setCurrentRestaurant.bind(this)}
                                        currentRestaurant={this.state.currentRestaurant}
                                        {...this.props}
                                    />)

                        {
                            pathName === "/" &&
                                <Redirect to='/restaurants'/>
                        }
                    </div>
                    <Footer />
                </div>
            </Router>
        );
    }
}

export default MainAppClient;