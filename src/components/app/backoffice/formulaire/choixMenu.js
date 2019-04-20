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
import loaderMin from "../../../../assets/images/loader-min1.gif";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Config from '../../../config/config';


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

class ChoixMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartes: [],
            hasValue: false,
            value: 0,
            carteByRes: [],
            menuByRes: [],
            idBoissons: [],
            idEntree: [],
            idPlats: [],
            idDesserts: [],
            initValue: false,
            menuChoiceOne: [],
            nomNewMenu: "",
            prixNewMenu: "",
            open: false,
            openUpdate: false,
            idMenuUpdate: "",
            displayButton : "none",
            promptFinish : false

        }
    }

    init(carteByRes) {

        carteByRes.map((element) => {
            Config.platsKey.map((key) => {
                var plat = element.plats[key];
                var id_ = [];
                plat.map(() => {
                    id_.push(false);
                    Config.idPlats.map(id => {
                        var regex = key;
                        var re = new RegExp(regex, "i");
                        if (id.match(re)) {
                            this.setState({
                                [id]: id_
                            });
                            console.log(id, id_);

                        }
                    })
                })

            })
        })

    }

    initCarteTemp() {
        Config.idPlats.map(id => {
            var id_ = [];
            for (var i = 0; i < 50; i++) {
                id_.push(false);
            }
            this.setState({
                [id]: id_
            });
        })

    }

    componentWillMount() {
        base.fetch('carte', {
            context: this,
            asArray: true,
            then(data) {
                //console.log(data);
                this.setState({
                    cartes: data,
                })

            }
        });
    }


    handleClickAdd(e) {

    }

    handleCloseModal() {

    }

    handleChange = (e, restaurant) => {

        if (e.target.checked) {
            this.setState({
                idCheckedRestaurant: restaurant.id,
                restaurantChecked: restaurant
            });
        }
    };

    handleChangeMenu(e, plat, index, type, idKey) {

        var menuChoix = this.state.menuChoiceOne;

        var idKey_ = [...this.state[idKey]];
        idKey_.map((key, i) => {
            idKey_[i] = false;
        })

        var value_ = this.state.value;
        if (value_ < 3) {
            value_ = value_ + 1;
        }
        else{
            if (this.state.idMenuUpdate !== "") {
                this.validerCompo(e);
            }
            else{
                this.setState({ open: true })
            }
        }

        idKey_[index] = e.target.checked

        if (menuChoix[type] !== null) {
            menuChoix[type] = plat;
        }
        else {
            var menuByType = {
                [type]: plat
            }

            menuChoix.push(menuByType)
        }
        this.setState({
            menuChoiceOne: menuChoix,
            [idKey]: idKey_,
            value: value_

        })
    }

    handleChangeTab = (event, value) => {
        this.setState({ value });
    };

    validerCompo() {
        var menuByRes_ = [...this.state.menuByRes];
        var menuDetail = this.state.menuChoiceOne;
        var newMenu = {
            isActive: true,
            menu: {
                boissons: menuDetail["boissons"],
                desserts: menuDetail["desserts"],
                entree: menuDetail["entree"],
                plats: menuDetail["plats"]
            },
            prix: this.state.prixNewMenu,
            nom: this.state.nomNewMenu
        };
        if (this.state.idMenuUpdate !== "") {
            //var menuChoix = menuByRes_[0].menuChoix;
            //menuChoix[this.state.idMenuUpdate] = newMenu;
            this.setState({
              //  menuByRes: menuChoix,
                open: false,
                menuChoiceOne: [],
                nomNewMenu: "",
                prixNewMenu: "",
                idMenuUpdate: "",
                displayButton : "block"
            })

        }
        else {
            menuByRes_[0].menuChoix.push(newMenu);
            this.setState({
                menuByRes: menuByRes_,
                open: false,
                menuChoiceOne: [],
                nomNewMenu: "",
                prixNewMenu: "",
                displayButton : "block"
            })
        }
        this.initCarteTemp();
    }

    actionMenu(e, type) {
        this.setState({
            openUpdate: false,
        })
        if (type === "update") {

        }
        else {
            var menuByRes = [...this.state.menuByRes];
            var idMenuUpdate = this.state.idMenuUpdate;
            var tempResult = menuByRes[0].menuChoix.splice(idMenuUpdate,1);
            this.setState({
                idMenuUpdate : "",
                menuChoiceOne : [],
                displayButton : "block"
            })
        }
    }

    actionMenuToDB(e, menuByRes,restaurant){
        this.props.actionMenuToDB(e, menuByRes,restaurant);
        this.setState({
            promptFinish : true,
            open : false
        })
    }
    render() {
        const { classes, restaurant, open, menus, changeRestaurant } = this.props;
        const { cartes, hasValue, value, carteByRes, menuByRes, idMenuUpdate } = this.state;


        if (restaurant != null) {
            if (cartes.length > 0 && !hasValue) {
                var carteByRes_ = cartes.filter(x => x.restaurant.id == restaurant.id);
                var menuByRes_ = menus.filter(x => x.restaurant.id === restaurant.id);

                //this.init(carteByRes_);
                this.setState({
                    carteByRes: carteByRes_,
                    menuByRes: menuByRes_,
                    hasValue: true
                })
            }
        }

        if (changeRestaurant) {
            var carteByRes_ = cartes.filter(x => x.restaurant.id == restaurant.id);
            var menuByRes_ = menus.filter(x => x.restaurant.id === restaurant.id);

            this.initCarteTemp();
            this.setState({
                carteByRes: carteByRes_,
                menuByRes: menuByRes_,
                hasValue: true
            })
            this.props.setChangeRestaurant();
        }


        return (

            <div>
                {
                    restaurant != null && this.state.idBoissons.length > 0 &&
                    <Dialog
                        open={open}
                        onClose={(e) => this.props.handleClose(e, false)}
                        aria-labelledby="responsive-dialog-title"
                        fullWidth={true}
                        maxWidth={'lg'}
                    >
                        <DialogTitle id="responsive-dialog-title">Selectionnez des compositions de menu dand la carte du restaurant: {restaurant.nom} { idMenuUpdate !== "" && <p>(en mode modification)</p>}</DialogTitle>
                        <DialogContent>
                            {
                                !hasValue &&
                                <div>
                                    <p>Récupération des données</p>
                                    <img src={loaderMin} alt="min-loader" className="mini-loader" />
                                </div>
                            }
                            {
                                hasValue &&
                                <div className="row">
                                    <div className="col-md-4">
                                        <h4 className="menu-title">Les menus existants</h4>
                                        <List component="nav">

                                            {
                                                menuByRes.map((mr, index) => {
                                                    return mr.menuChoix.map((mc, indexMc) => {
                                                        var compo = "";
                                                        Config.platsKey.map(key => {
                                                            compo = compo + "-" + mc.menu[key].nom
                                                        })
                                                        var menu = mc.nom + " (" + compo + ")";
                                                        return (

                                                            <ListItem button key={index} onClick={(e) => { this.setState({ openUpdate: true, menuChoiceOne: mc.menu, idMenuUpdate: indexMc }) }}>
                                                                <ListItemText primary={menu} className="list-menu" />
                                                            </ListItem>
                                                        )

                                                    })



                                                })
                                            }
                                        </List>
                                    </div>
                                    <div className="col-md-8">
                                        {
                                            carteByRes.length > 0 &&
                                            carteByRes.map((element, index) => {

                                                return (
                                                    <div key={index}>
                                                        <AppBar position="static">
                                                            <Tabs value={value} onChange={this.handleChangeTab} className="tab-plat" variant="fullWidth">
                                                                {
                                                                    Config.platsKey.map((platKey, index) => {
                                                                        return (
                                                                            <Tab key={index} label={Config.titrePlats[index]} />
                                                                        )
                                                                    })
                                                                }
                                                            </Tabs>
                                                        </AppBar>
                                                        {
                                                            Config.platsKey.map((platKey, index) => {

                                                                var plat = element.plats[platKey];
                                                                return (

                                                                    <div key={index}>
                                                                        {
                                                                            value === index &&
                                                                            <Table className={classes.table}>
                                                                                <TableHead>
                                                                                    <TableRow>
                                                                                        <TableCell> </TableCell>
                                                                                        <TableCell>Nom</TableCell>
                                                                                    </TableRow>
                                                                                </TableHead>
                                                                                <TableBody>
                                                                                    {
                                                                                        plat.map((row, index) => {
                                                                                            var regex = platKey;
                                                                                            var re = new RegExp(regex, "i");
                                                                                            var resCheck = Config.idPlats.filter(x => x.match(re));
                                                                                            var result = this.state[resCheck[0]][index];

                                                                                            if (idMenuUpdate !== "" && idMenuUpdate != undefined) {
                                                                                                var menuChoiceOne = this.state.menuChoiceOne;
                                                                                                var value = menuChoiceOne[platKey];
                                                                                                if (value.id == row.id)
                                                                                                    result = true;
                                                                                            }
                                                                                            return (
                                                                                                <TableRow key={row.id}>
                                                                                                    <TableCell>
                                                                                                        <Checkbox
                                                                                                            checked={result}
                                                                                                            onChange={(e) => this.handleChangeMenu(e, row, index, platKey, resCheck[0])}
                                                                                                            value="checkedA"
                                                                                                        />
                                                                                                    </TableCell>
                                                                                                    <TableCell>{row.nom}</TableCell>

                                                                                                </TableRow>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                </TableBody>
                                                                            </Table>
                                                                        }
                                                                    </div>
                                                                );
                                                            })
                                                        }
                                                    </div>
                                                )
                                            })
                                        }
                                        {
                                            carteByRes.length === 0 &&
                                            <p>Carte non disponible, Veuillez créer une carte pour ce restaurant</p>
                                        }
                                    </div>
                                </div>
                            }

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={(e) => this.actionMenuToDB(e, menuByRes,restaurant)} color="secondary" style={{ display : this.state.displayButton}}>Validation finale</Button>
                        </DialogActions>
                    </Dialog>
                }
                {
                    <Dialog
                        open={this.state.open}
                        aria-labelledby="responsive-dialog-title"
                    >
                        <DialogTitle id="responsive-dialog-title">Donner un nom au menu </DialogTitle>
                        <DialogContent>
                            <TextField
                                id="nom"
                                label="Nom du menu"
                                className={classes.textField}
                                style={textField}
                                onChange={(e) => { this.setState({ nomNewMenu: e.target.value }) }}
                                value={this.state.nomNewMenu}
                            />
                            <TextField
                                id="prix"
                                label="Prix du menu"
                                className={classes.textField}
                                style={textField}
                                onChange={(e) => { this.setState({ prixNewMenu: e.target.value }) }}
                                value={this.state.prixNewMenu}
                            />


                        </DialogContent>
                        <DialogActions>
                            <Button onClick={(e) => this.validerCompo(e)} color="primary">Valider la composition</Button>
                        </DialogActions>
                    </Dialog>
                }

                {
                    <Dialog
                        open={this.state.openUpdate}
                        aria-labelledby="responsive-dialog-title"
                    >
                        <DialogTitle id="responsive-dialog-title">Faites quelque chose</DialogTitle>
                        <DialogContent>
                            <Button onClick={(e) => this.actionMenu(e, "update")} color="secondary">Modifier</Button>
                            <Button onClick={(e) => this.actionMenu(e, "delete")} color="primary">Supprimer</Button>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={(e) => { this.setState({ openUpdate: false, idMenuUpdate : "" }) }} color="primary">Annuler</Button>
                        </DialogActions>
                    </Dialog>
                }

{
                    <Dialog
                        open={this.state.promptFinish}
                        aria-labelledby="responsive-dialog-title"
                    >
                        <DialogTitle id="responsive-dialog-title">Ajout / Modification / Suppression</DialogTitle>
                        <DialogContent>
                            Action effectuée avec succès
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={(e) => { this.setState({ promptFinish : false }) }} color="primary">FERMER</Button>
                        </DialogActions>
                    </Dialog>
                }

            </div>
        );
    }
}

ChoixMenu.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChoixMenu);