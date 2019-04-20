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

class RestaurantFormulaire extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nom: "",
            description: "",
            password: "",
            confirm: "",
            adresse: "",
            tel: "",
            nomErrorr: "",
            descriptionError: "",
            adresseError: "",
            telError: "",
            open: false,
            hasValue: false,
            typeDeCuisine: [],
            typeDeCuisineChecked: null,
            checked: [],
            errorGlobal: "",
            modalSuccess: false,
            hasUpdateCheckbox: false
            

        }
    }
    handleChange = (e, index, typeDeCuisine) => {
        var typeCuisine_ = this.state.typeDeCuisineChecked;
        var checked_ = [...this.state.checked];
        checked_[index] = e.target.checked
        this.setState({ checked: checked_ });

        if (checked_[index] === true) {
            typeCuisine_.push(typeDeCuisine);
        }
        else {
            var newTC = typeCuisine_.filter(el => el !== typeDeCuisine);
            this.setState({
                typeDeCuisineChecked: newTC
            })
        }
    };

    init() {
        if(!this.props.hasInitialized && this.props.currentRestaurant === null){
            this.setState({
                nom: "",
                description: "",
                longLat: "",
                photo: "",
                tel: "",
                adresse: "",
                checked: [],
                typeDeCuisineChecked: [],
            })
            this.props.setInitializedContent(true);
        }
        if (this.state.typeDeCuisineChecked === null) {
            if (this.props.currentRestaurant != null) {
                this.setState({
                    typeDeCuisineChecked: this.props.currentRestaurant.typeDeCuisine,
                })
            } else {
                this.setState({
                    typeDeCuisineChecked: [],
                })
            }
        }
        else{
            if (this.state.typeDeCuisineChecked.length === 0 && this.props.currentRestaurant != null) {
                this.setState({
                    typeDeCuisineChecked: this.props.currentRestaurant.typeDeCuisine,
                })
            }
            
        }
        if (this.state.typeDeCuisineChecked !== null && this.state.typeDeCuisineChecked.length > 0 && this.state.typeDeCuisine.length > 0 && this.props.isUpdate && !this.props.hasUpdateCheckbox) {
            var tpChecked = this.state.typeDeCuisineChecked;
            if (this.props.currentRestaurant != null) {
                tpChecked = this.props.currentRestaurant.typeDeCuisine;
            }
            var checked_ = [];
            this.state.typeDeCuisine.map(tp => {
                var isChecked = false;

                var match = tpChecked.filter(x => x.id === tp.id);
                if (match != null && match != undefined) {
                    if (match.length > 0) {
                        isChecked = true;
                    }
                }

                checked_.push(isChecked);

            })
            
            var currentRestaurant = this.props.currentRestaurant;
            if (currentRestaurant != null) {
                this.setState({
                    nom: currentRestaurant.nom,
                    description: currentRestaurant.description,
                    longLat: currentRestaurant.longLat,
                    photo: currentRestaurant.photo,
                    tel: currentRestaurant.telephone,
                    adresse: currentRestaurant.adresse,
                    typeDeCuisineChecked : currentRestaurant.typeDeCuisine,
                    checked: checked_,
                })
            }
            else {
                this.setState({
                    checked: checked_,
                    hasUpdateCheckbox: true,
                })
            }
            this.props.setUpdateCheckbox();
        }

    }

    componentWillMount() {
        base.fetch('typeDeCuisine', {
            context: this,
            asArray: true,
            then(data) {
                //console.log(data);
                this.setState({
                    typeDeCuisine: data,
                    hasValue: true
                })

            }
        })
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

            case "nom": {
                if (isEmpty)
                    this.setState({
                        nomErrorr: "Le nom est vide"
                    })
                break;
            }
            case "description": {
                if (isEmpty)
                    this.setState({
                        descriptionError: "La description est vide"

                    });
                break;
            }
            case "adresse": {
                if (isEmpty)
                    this.setState({
                        adresseError: "L'adresse est vide"
                    })
                break;
            }
            case "tel": {
                if (isEmpty)
                    this.setState({
                        telError: "Le téléphone est vide"
                    })
                break;
            }
            default:
                return;
        }
    }

    handleClickModal(e, show) {
        e.preventDefault();
        this.setState({
            open: show
        })
    }

    handleClickAdd(e) {
        e.preventDefault();
        var currentRestaurant = this.props.currentRestaurant;
        if (this.state.typeDeCuisineChecked.length > 0) {
            var newRestaurant = {
                id: Utils.idGenereator(),
                nom: this.state.nom,
                description: this.state.description,
                longLat: "1| 2",
                photo: "noimg.png",
                telephone: this.state.tel,
                adresse: this.state.adresse,
                typeDeCuisine: this.state.typeDeCuisineChecked
            }
            if(currentRestaurant !== null && currentRestaurant !== undefined){
                newRestaurant.id = currentRestaurant.id;
                newRestaurant.longLat = currentRestaurant.longLat;
                newRestaurant.photo = currentRestaurant.photo;

            }
            this.props.handleAddRestaurant(newRestaurant);
            this.setState({
                modalSuccess: true
            })
            this.props.handleClickAddButton(false);
        }
        else {
            this.setState({
                errorGlobal: "Veuillez choisir un/plusieurs types de cuisine"
            })
        }
    }

    handleCloseModal() {
        this.setState({
            modalSuccess: false
        })

        this.props.extendTable();
    }


    render() {
        const { classes, fullScreen, currentRestaurant } = this.props;
        if (this.state.typeDeCuisine.length > 0 && !this.state.hasValue) {
            this.setState({
                hasValue: true
            })
        }
        this.init();
        return (

            <div>
                <div className="jumbotron content-menu-admin jbt-custom">
                    <h4 className="menu-title">Ajouter / Modifier un restaurant</h4>
                    <form>
                        <TextField
                            id="nom"
                            label="Nom"
                            className={classes.textField}
                            style={textField}
                            helperText={this.state.nomError}
                            onChange={(e) => this.validate(e, "nom")}
                            value={this.state.nom}
                        />
                        <TextField
                            id="description"
                            label="description"
                            className={classes.textField}
                            style={textField}
                            type="mail"
                            helperText={this.state.descriptionError}
                            onChange={(e) => this.validate(e, "description")}
                            value={this.state.description}

                        />

                        <TextField
                            id="adresse"
                            label="Adresse"
                            className={classes.textField}
                            style={textField}
                            helperText={this.state.adresseError}
                            onChange={(e) => this.validate(e, "adresse")}
                            value={this.state.adresse}
                        />
                        <TextField
                            id="tel"
                            label="N° de télephone"
                            className={classes.textField}
                            style={textField}
                            helperText={this.state.telError}
                            onChange={(e) => this.validate(e, "tel")}
                            value={this.state.tel}
                        />
                        <br /><br />
                        <Button variant="contained" color="primary" fullWidth className="custom-btn banner-admin" onClick={(e) => this.handleClickModal(e, true)}>Choisir un/plusieur type de cuisine</Button>
                        <br /><br />
                        <Button variant="contained" color="secondary" fullWidth className="custom-btn" onClick={(e) => this.handleClickAdd(e)}>AJOUTER / MODIFIER</Button>
                    </form>
                    <div>
                        <h5 className="menu-title">Types de cuisine ajoutés</h5>
                        <List component="nav">
                            {
                                this.state.typeDeCuisineChecked != null &&
                                this.state.typeDeCuisineChecked.map((tc, index) => {
                                    return (

                                        <ListItem button key={index}>
                                            <ListItemText primary={tc.val} />
                                        </ListItem>

                                    )
                                })
                            }
                        </List>
                    </div>
                    <div>
                        <p>{this.state.errorGlobal}</p>
                    </div>
                </div>
                {
                    this.state.hasValue &&
                    <Dialog
                        fullScreen={fullScreen}
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="responsive-dialog-title"
                        fullWidth={true}
                        maxWidth={'md'}
                    >
                        <DialogTitle id="responsive-dialog-title">Choisir un type de cuisine</DialogTitle>
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
                                        this.state.typeDeCuisine !== undefined &&
                                        this.state.typeDeCuisine.map((row, index) => {
                                            return (
                                                <TableRow key={row.id}>
                                                    <TableCell>
                                                        <Checkbox
                                                            checked={this.state.checked.length === 0 ? false : this.state.checked[index]}
                                                            onChange={(e) => this.handleChange(e, index, row)}
                                                            value="checkedA"
                                                        />
                                                    </TableCell>
                                                    <TableCell>{row.val}</TableCell>
                                                    <TableCell>{row.desce}</TableCell>

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
                <CustomModal open={this.state.modalSuccess} handleCloseModal={this.handleCloseModal.bind(this)} message={!this.props.isUpdate ? "Restaurant ajouté avec succès" : "Restaurant modifié avec succès"} />
            </div>
        );
    }
}

RestaurantFormulaire.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RestaurantFormulaire);