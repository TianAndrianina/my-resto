import React from 'react';
import base from "../../../base/base";
import loaderMin from "../../../assets/images/loader-min1.gif";
import RestaurantLeft from "../restaurants/restaurantLeft";
import RestaurantRight from "../restaurants/restaurantRight";
class Restaurant extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            restaurants: [],
            restaurantsdecoupee: [],
            restaurantAllSearch: [],
            restaurantClicked: null,
            hasValue: false,
            loadData: false,
            typeDeCuisine: []

        }
    }

    componentWillMount() {

        //this.props.handleLoading(true);
        this.ref = base.syncState("restaurants", {
            context: this,
            state: 'restaurants',
            asArray: true
        })

        base.fetch('typeDeCuisine', {
            context: this,
            asArray: true,
            then(data) {
                //console.log(data);
                this.setState({
                    typeDeCuisine: data,
                    isLoading: true
                })

            }
        });
    }
    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    handleLoadMore(e) {
        e.preventDefault();
        this.setState({
            loadData: true
        })

        var resCount = this.state.restaurantsdecoupee.length;

        var newRestaurantDecoupee = this.state.restaurantsdecoupee.concat(this.state.restaurants.slice(resCount, resCount + 6));

        this.setState({
            loadData: false,
            restaurantsdecoupee: newRestaurantDecoupee
        })
    }

    handleClickRestaurant(e, index) {
        e.preventDefault();
        this.setState({
            restaurantClicked: this.state.restaurantsdecoupee[index]
        });
    }

    handleSearch(restaurant, adresse, typeDeCuisine) {
        var temp = [];
        var newRes = [];
        var fieldEmpty = false;
        if (adresse === null && restaurant !== null) {
            this.state.restaurants.filter(x => {
                restaurant.forEach(rest => {
                    if (rest.value === x.id) {
                        return temp.push(x);
                    }
                });
            });
        }
        else if (restaurant === null && adresse !== null)
            temp = this.state.restaurants.filter(x => x.adresse === adresse.label);
        else {
            if (this.state.restaurants != null && adresse != null){
                newRes = this.state.restaurants.filter(x => x.adresse === adresse.label);
                newRes.filter(x => {
                    restaurant.forEach(rest => {
                        if (rest.value === x.id) {
                            temp.push(x);
                        }
                    });
                });
            }
            else{
                fieldEmpty = true;
                temp = this.state.restaurants;
            }

        }
        
        var result = [];
        
        typeDeCuisine.map((tc) => {
            temp.map((tmp) => {
                var match = tmp.typeDeCuisine.filter(x => x.id == tc.id);
                if (match != null && match != undefined && match.length > 0)
                    return result.push(tmp);
            })
        })
        if (result.length > 0) {
            temp = result;
        }

        this.setState({
            restaurantAllSearch: temp,
            restaurantsdecoupee: temp.slice(0, 6)
        })
    }

    handleClickToPlat(e) {
        e.preventDefault();
        this.props.history.push("/plats");
    }

    handleClickToMenu(e) {
        e.preventDefault();
        this.props.history.push("/nos-menus");
    }

    render() {
        if (this.state.restaurants.length > 0 && this.state.hasValue === false) {
            this.setState({
                hasValue: true,
                restaurantsdecoupee: this.state.restaurants.slice(0, 6)
            })

            console.log(this.state.restaurants);
        }

        var resClicked = this.state.restaurantClicked;
        return (

            <div className="restaurant">

                <div className="row" id="content-main">

                    <div className="col-md-8 col-sm-6">
                        <RestaurantLeft
                            hasValue={this.state.hasValue}
                            loaderMin={loaderMin}
                            restaurantsdecoupee={this.state.restaurantsdecoupee}
                            restaurantAllSearch={this.state.restaurantAllSearch}
                            handleLoadMore={this.handleLoadMore.bind(this)}
                            handleClickRestaurant={this.handleClickRestaurant.bind(this)}

                        />
                    </div>
                    {this.state.hasValue &&
                        <div className="col-md-4 col-sm-6">
                            <RestaurantRight
                                resClicked={resClicked}
                                restaurants={this.state.restaurants}
                                handleSearch={this.handleSearch.bind(this)}
                                currentRestaurantClicked={this.props.currentRestaurantClicked}
                                handleClickToPlat={this.handleClickToPlat.bind(this)}
                                handleClickToMenu={this.handleClickToMenu.bind(this)}
                                typeDeCuisine={this.state.typeDeCuisine}
                                {...this.props}
                            />
                        </div>
                    }
                </div>
                }
            </div>

        );
    }
}

export default Restaurant;