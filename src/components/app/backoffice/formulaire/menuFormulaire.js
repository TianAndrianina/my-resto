import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import base from "../../../../base/base";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Utils from "../../util/utils";
import CustomModal from "./modal";
import restaurantList from '../list/restaurantList';
import ChoixMenu from './choixMenu';
const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
        color: "#16a2b7"
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
});

var textField = {
    width: "100%",
    marginTop: "10px",
    color: "#16a2b7"
}

class MenuFormulaire extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            prix: "",
            prixError: "",
            errorGlobal: "",
            errorNoRestaurant: "",
            restaurantChecked: null,
            menuChecked: [],
            idCheckedRestaurant: null,
            openMenuChoix: false,
            changeRestaurant : false


        }
    }

    init() {


    }

    componentWillMount() {

    }

    handleClickModalMenu(e, show) {
        e.preventDefault();
        if (this.state.restaurantChecked === null) {
            this.setState({
                errorNoRestaurant: "Veuillez selectionner un restaurant"
            })
        }
        else {
            e.preventDefault();
            this.setState({
                openMenuChoix: show
            })
        }
    }


    validate(e, typeField) {
        var isEmpty = false;

        if (e.target.value == undefined || e.target.value === "") {
            isEmpty = true;
        }
        else {
            this.setState({
                [typeField]: e.target.value
            })


        }
        switch (typeField) {

            case "prix": {
                if (isEmpty)
                    this.setState({
                        prixErrorr: "Le prix est vide"
                    })
                break;
            }
            default:
                break;

        }
    }

    handleClickModal(e, show) {
        e.preventDefault();
        this.setState({
            open: show
        })
    }

    handleClickAdd(e) {

    }

    handleCloseModal() {

    }
    setChangeRestaurant(){
        this.setState({
            changeRestaurant: false
        })
    }

    handleChange = (e, restaurant) => {

        if (e.target.checked) {
            this.setState({
                idCheckedRestaurant: restaurant.id,
                restaurantChecked: restaurant,
                changeRestaurant : true
            });
        }
    };


    render() {
        const { classes, restaurants,menus } = this.props;
        const { restaurantChecked } = this.state;

        this.init();
        return (

            <div>
                <div className="jumbotron content-menu-admin jbt-custom">
                    <h4 className="menu-title">Ajouter / Modifier un menu</h4>
                    
                        
                        <br /><br />
                        <Button variant="contained" color="primary" fullWidth className="custom-btn banner-admin" onClick={(e) => this.handleClickModal(e, true)}>Choisir un restaurant</Button>
                        <br /><br />
                        <Button variant="contained" color="primary" fullWidth className="custom-btn banner-admin" onClick={(e) => this.handleClickModalMenu(e, true)}>Choisir une composition de plat</Button>

                        <br /><br />
                        <Button variant="contained" color="secondary" fullWidth className="custom-btn" onClick={(e) => this.handleClickAdd(e)}>AJOUTER / MODIFIER</Button>
                    
                    <div>
                        <h5 className="menu-title">Restaurant Choisi</h5>
                        <List component="nav">
                            {
                                restaurantChecked !== null &&
                                <ListItem button>
                                    <ListItemText primary={restaurantChecked.nom} />
                                </ListItem>

                            }
                        </List>
                    </div>
                    
                    <p>{this.state.errorNoRestaurant}</p>
                </div>
                {
                    restaurantList.length > 0 &&
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="responsive-dialog-title"
                        fullWidth={true}
                        maxWidth={'md'}
                    >
                        <DialogTitle id="responsive-dialog-title">Choisir un restaurant</DialogTitle>
                        <DialogContent>

                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell> </TableCell>
                                        <TableCell>Nom</TableCell>
                                        <TableCell>Description</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        restaurants.map((row, index) => {
                                            return (
                                                <TableRow key={row.id}>
                                                    <TableCell>
                                                        <Checkbox
                                                            checked={this.state.idCheckedRestaurant !== null && this.state.idCheckedRestaurant === row.id ? true : false}
                                                            onChange={(e) => this.handleChange(e, row)}
                                                            value="checkedA"
                                                        />
                                                    </TableCell>
                                                    <TableCell>{row.nom}</TableCell>
                                                    <TableCell>{row.description}</TableCell>

                                                </TableRow>
                                            )
                                        })

                                    }

                                </TableBody>
                            </Table>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={(e) => this.handleClickModal(e, false)} color="primary">Valider</Button>
                        </DialogActions>
                    </Dialog>
                }
                
                <ChoixMenu
                    open={this.state.openMenuChoix}
                    restaurant={restaurantChecked}
                    handleClose={this.handleClickModalMenu.bind(this)}
                    menus={menus}
                    changeRestaurant={this.state.changeRestaurant}
                    setChangeRestaurant={this.setChangeRestaurant.bind(this)}
                    actionMenuToDB={this.props.actionMenuToDB}
                />


            </div>
        );
    }
}

MenuFormulaire.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuFormulaire);