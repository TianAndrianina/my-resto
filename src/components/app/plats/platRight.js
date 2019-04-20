import React from 'react';
import commandevide from "../../../assets/images/commande-vide.png";
import Commande from "../commande/commande";
import Typography from '@material-ui/core/TableRow';
import {Cookies}    from 'react-cookie';

const styleP = {
    paddingLeft: '10%'
}
const cookies = new Cookies();
class PlatRight extends React.Component {
    
    constructor(props) {
        super(props);
    }
     
    render() {
        return (
            <div className="platRight">
            {
                this.props.currentRestaurant !== null &&
                <h4 className="menu-title">Votre commande chez : <b>{this.props.currentRestaurant.nom}</b></h4>
            }
            {
                this.props.currentRestaurant === null &&
                <h4 className="menu-title">Votre commande </h4>
            }
                {
                    this.props.commande.length !== 0 &&
                    <div>
                        <Commande   {...this.props} currentCommande={this.props.commande} currentRestaurant={this.props.currentRestaurant} />
                    </div>
                }
                {
                    this.props.commande.length === 0 &&
                    <div>
                        <img src={commandevide} alt="commandevide"  />
                        <br/>
                        <p>Pensez a passer votre commande</p>
                    </div>
                }
            </div>
        );
    }
}

export default PlatRight;