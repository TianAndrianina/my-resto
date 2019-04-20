import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { render } from 'react-dom'
import { Map as LeafletMap, Marker, Popup, TileLayer } from 'react-leaflet'
class Localisation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 51.505,
            lng: -0.09,
            zoom: 13
        }
    }


    render() {
        const { fullScreen, open, restaurant } = this.props;
        var longLat = restaurant.longLat;
        var long = longLat.split("|")[0].trim();
        var lat = longLat.split("|")[1].trim();
        //On n'a pas utiliser le long et lat dans la basse car la localistion nous mene tous dans la mere
        const position = [this.state.lat, this.state.lng];
        console.log("position", position);
        return (
            <div>
                <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={this.props.handleCloseModal}
                    aria-labelledby="responsive-dialog-title"
                    fullWidth={true}
                    maxWidth={'md'}
                >
                    <DialogTitle id="responsive-dialog-title">La localisation du {restaurant.nom}</DialogTitle>
                    <DialogContent>
                        <LeafletMap center={position} zoom={this.state.zoom}>
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                            />
                            <Marker position={position}>
                                <Popup>{restaurant.adresse}</Popup>
                            </Marker>
                        </LeafletMap>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleCloseModalLocalisation} color="secondary">Fermer</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

Localisation.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(Localisation);