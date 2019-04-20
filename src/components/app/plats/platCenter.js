import React from 'react';
import base from "../../../base/base";
import loaderMin from "../../../assets/images/loader-min1.gif";
import PlatCenterList from "./platCenterList";
class PlatCenter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            plats: [],
            platByRes: [],
            cartes: [],
            cartesByRes: [],
            hasValue: false
        }

    }

    componentWillMount() {

        //this.props.handleLoading(true);
        this.ref = base.syncState("carte", {
            context: this,
            state: 'cartes',
            asArray: true
        })


    }

    componentDidMount() {

    }
    componentWillUnmount() {
        //base.removeBinding(this.ref);
    }

    setCarteRestaurant() {
        var hasValue = this.props.hasValue;
        var currentRestaurant = this.props.currentRestaurant;
        if (this.props.currentRestaurantState !== null && this.props.currentRestaurantState !== undefined) {
            currentRestaurant = this.props.currentRestaurantState;
        }
        if (!hasValue) {
            if (this.state.cartes.length > 0 && currentRestaurant != null) {
                this.setState({
                    cartesByRes: this.state.cartes.filter(x => x.restaurant.id === currentRestaurant.id),
                    hasValue: true
                })
                this.props.hasValueClick(true);
                var platByRestaurant = this.state.cartes.filter(x => x.restaurant.id === currentRestaurant.id)
                console.log("platbyres : ", platByRestaurant);
            }
        }
    }

    render() {
        this.setCarteRestaurant();
        return (
            <div className="platCenter">
                <h4 className="menu-title">Nos Plats</h4>
                {
                    this.state.hasValue &&
                    <div>
                        <PlatCenterList
                            setCommande={this.props.setCommande}
                            setPlat={this.props.setPlat}
                            currentRestaurant={this.props.currentRestaurant}
                            cartesByRes={this.state.cartesByRes}
                            prixMin={this.props.prixMin}
                            prixMax={this.props.prixMax} />
                    </div>
                }
                {
                    !this.state.hasValue && this.props.currentRestaurant !== null &&
                    <div>
                        <p>Récupération des données</p>
                        <img src={loaderMin} alt="min-loader" className="mini-loader" />
                    </div>
                }
                {
                    !this.state.hasValue && this.props.currentRestaurant === null &&
                    <div>
                        <p>Veuillez Choisir un restaurant</p>
                    </div>
                }

            </div>
        );
    }
}

export default PlatCenter;