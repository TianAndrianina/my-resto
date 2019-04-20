import React, { Component } from "react";
import { Route } from "react-router-dom";

class RouteWithSubRoutes extends Component {
    constructor(props) {
        super(props);
        this.handleLoading = this.props.handleLoading;
        
    }
    componentDidMount(){
        //this.props.handleLoading(true);
    }
    render() {
        
        var C = this.props.component;
        
        return (
            <Route
                path={this.props.path}
                component={(props) => <C
                     {...props}
                    currentRestaurant={this.props.currentRestaurant}
                    currentRestaurantClicked={this.props.currentRestaurantClicked}
                    handleLoading={this.handleLoading}
                    {...this.props}/>}
            />
        );
    }
}

export default RouteWithSubRoutes;