import React from 'react';
import Config from "../../config/config";
import PlatSearch from "./platSearch";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import Icon from '@material-ui/core/Icon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 250,
    },
    input: {
        display: 'flex',
        padding: 0,
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
    }
});
var style = {
    width: "100%",
    marginTop: "10px"
}

class PlatLeft extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        loadCSS(
            'https://use.fontawesome.com/releases/v5.8.1/css/all.css',
            document.querySelector('#insertion-point-jss'),
        );
    }

    render() {
        const { classes, theme } = this.props;
        return (
            <div className="platLeft">
                <div className="search">
                    <h4 className="menu-title">Trouvez des plats</h4>
                    <PlatSearch
                        currentRestaurantClicked={this.props.currentRestaurantClicked}
                        handleClickRestaurant={this.props.handleClickRestaurant}
                        hasValueClick={this.props.hasValueClick}
                        hasValue={this.props.hasValue}
                        prixMin={this.props.prixMin}
                        prixMax={this.props.prixMax}
                        setPrix={this.props.setPrix}

                    />
                </div>
                <h4 className="menu-title">Restaurant</h4>
                {
                    this.props.currentRestaurant !== undefined && this.props.currentRestaurant != null && (this.props.currentRestaurantState === undefined || this.props.currentRestaurantState === null) &&
                    <div>

                        <img src={Config.URL_IMAGE + this.props.currentRestaurant.photo + Config.URS_TOKEN} alt="Norway" style={style} />
                        <div className="container">
                            <p>{this.props.currentRestaurant.nom}</p>
                            <span>{this.props.currentRestaurant.description}</span>
                            <div className="detail-res">
                                <span><b>Adresse : </b>{this.props.currentRestaurant.adresse}</span><br />
                                <span><b>N° téléphone : </b>{this.props.currentRestaurant.telephone}</span>
                            </div>
                        </div><br />
                    </div>
                }
                {
                    this.props.currentRestaurantState !== undefined && this.props.currentRestaurantState != null &&
                    <div>

                        <img src={Config.URL_IMAGE + this.props.currentRestaurantState.photo + Config.URS_TOKEN} alt="Norway" style={style} />
                        <div className="container">
                            <p>{this.props.currentRestaurantState.nom}</p>
                            <span>{this.props.currentRestaurantState.description}</span>
                            <div className="detail-res">
                                <span><b>Adresse : </b>{this.props.currentRestaurantState.adresse}</span><br />
                                <span><b>N° téléphone : </b>{this.props.currentRestaurantState.telephone}</span>
                            </div>
                            <div>
                                <h5 className="menu-title">Types de cuisine</h5>
                                <List component="nav">
                                    {
                                        this.props.currentRestaurantState.typeDeCuisine.map((tc, index) => {
                                            return (

                                                <ListItem button key={index}>
                                                    <ListItemIcon><Icon className={classNames(classes.icon, "fas fa-utensils")} color="secondary" /></ListItemIcon>
                                                    <ListItemText primary={tc.val} />
                                                </ListItem>

                                            )
                                        })
                                    }
                                </List>
                            </div>
                        </div><br />
                    </div>
                }
            </div>
        );
    }
}


PlatLeft.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(PlatLeft);