import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import ClearIcon from '@material-ui/icons/Clear';
import base, { auth, provider, firebaseapp } from "../../../base/base";
import { BrowserRouter as Router, Route, Link, Prompt } from "react-router-dom";
import { Cookies } from 'react-cookie';
import commandevide from "../../../assets/images/commande-vide.png";
import PropTypes from 'prop-types';
const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
        button: {
            margin: theme.spacing.unit,
        }
    },
});
const iconstyle = {
    fontSize: '15px'
}
const cookies = new Cookies();
class Commande extends React.Component {
    constructor(props) {
        super(props);
        const cmdCookie = cookies.get('cmdOnboarded');
        this.state = {
            commande: this.props.currentCommande,
            somme: this.props.somme,
            prixTotal: '',
            isBlocking: true,
            cmdCookie: cmdCookie,
            open: false
        }
    }
    handleQteChange(event, keycommande, menuKey, prixmenu, prixTotal, total1) {
        const storeRef = firebaseapp.database().ref('commande/');
        if (event.target.value == 0) {
            if (this.props.currentCommande[keycommande].menus) {
                storeRef.child(keycommande).child(keycommande).child('menus').child(menuKey).remove();
            }
            storeRef.child(keycommande).child(keycommande).update({ total: total1 - prixTotal }).then().catch();
        }
        else {
            prixmenu = prixmenu * 1;
            const prixTot = (event.target.value * 1) * prixmenu;
            if (prixTot > prixTotal) {
                total1 = total1 + ((event.target.value * 1 - (prixTotal / prixmenu)) * prixmenu);
            }
            else if (prixTot < prixTotal) {
                total1 = total1 - (((prixTotal / prixmenu) - event.target.value * 1) * prixmenu);
            }
            storeRef.child(keycommande).child(keycommande).child('menus').child(menuKey).update({ qteplat: event.target.value * 1, prixTotal: prixTot }).then().catch();
            storeRef.child(keycommande).child(keycommande).update({ total: total1 }).then().catch();
        }
    }
    handleRemove(event, keycommande, menuKey, prixTotal, total1) {
        event.preventDefault();
        const storeRef = firebaseapp.database().ref('commande/');
        if (this.props.currentCommande[keycommande].menus) {
            storeRef.child(keycommande).child(keycommande).child('menus').child(menuKey).remove();
        }
        storeRef.child(keycommande).child(keycommande).update({ total: total1 - prixTotal }).then().catch();
    }
    emptyCommande() {

        if (this.state.cmdCookie !== null) {
            const storeRef = firebaseapp.database().ref('commande/' + this.state.cmdCookie);
            storeRef.remove();
            cookies.remove('cmdOnboarded');
        }
    }
    handleCheckOutCmd(e) {
        e.preventDefault();
        if (sessionStorage.getItem('user') === null) {
            this.setState({ isBlocking: false }, function () {
                this.props.history.push('/se-connecter');
            });
        }
        else {
            var utilisateur = JSON.parse(sessionStorage.getItem('user'));
            var success = this.setCommandeEncours(cookies.get('cmdOnboarded'), utilisateur);
            this.props.history.push('/profile');
            cookies.remove('cmdOnboarded');

        }

    }
    setCommandeEncours(idcommande, utilisateur) {
        const storeRef = firebaseapp.database().ref('commande/' + idcommande);
        storeRef.child(idcommande).update({ utilisateur: JSON.parse(utilisateur) }).then(
        ).catch();
    }
    componentWillUnmount() {
        // this.emptyCommande();
    }
    render() {
        var style = {
            float: "right"
        };
        const { classes } = this.props;
        return (
            <div>
                <React.Fragment>
                    <Prompt
                        when={this.state.isBlocking}
                        message={
                            `Etes-vous sur de quitter? Si vous quittez maintenant, votre commande chez ${this.props.currentRestaurant.nom} sera perdu.`
                        }
                    />
                </React.Fragment>
                {
                    this.state.cmdCookie !== null && this.props.currentCommande[this.state.cmdCookie].menus &&
                    <div>
                        <Table className='tableCmd'>
                            <TableHead>
                                <TableRow className="head-table">
                                    <CustomTableCell>Plat</CustomTableCell>
                                    <CustomTableCell>Quantité</CustomTableCell>
                                    <CustomTableCell>Prix</CustomTableCell>
                                    <CustomTableCell>Total</CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    Object.keys(this.props.currentCommande).map((key, i1) => {
                                        const commande = this.props.currentCommande[key];
                                        if (commande.menus) {
                                            return (
                                                Object.keys(commande.menus).map((keymenu, i2) => {
                                                    const menu = commande.menus[keymenu];
                                                    return (
                                                        <TableRow key={i2}>
                                                            <CustomTableCell>
                                                                {/* <Typography id="simple-modal-description">{p.plat.nom}</Typography> */}
                                                                {menu.menu.nom}
                                                            </CustomTableCell>
                                                            <CustomTableCell>
                                                                <TextField
                                                                    onChange={(e) => { this.handleQteChange(e, key, keymenu, menu.menu.prix, menu.prixTotal, commande.total) }}
                                                                    value={menu.qteMenu}
                                                                    type="number"
                                                                    inputProps={{ min: "0", max: "50", step: "1" }}
                                                                />
                                                            </CustomTableCell>
                                                            <CustomTableCell>{menu.menu.prix} RS</CustomTableCell>
                                                            <CustomTableCell>
                                                                <Typography className="js-price">
                                                                    {menu.prixTotal}
                                                                </Typography>
                                                                RS
                                                    </CustomTableCell>
                                                            <CustomTableCell>
                                                                <ClearIcon style={iconstyle} onClick={(e) => { this.handleRemove(e, key, keymenu, menu.prixTotal, commande.total) }} />
                                                            </CustomTableCell>
                                                        </TableRow>
                                                    )
                                                })
                                            )
                                        }
                                    })
                                }
                                {
                                    Object.keys(this.props.currentCommande).map((key, i1) => {


                                        return (
                                            <TableRow>
                                                <TableCell rowSpan={3} />
                                                <TableCell colSpan={2}><b>Total</b></TableCell>
                                                <TableCell align="right">{this.props.currentCommande[key].total} RS</TableCell>
                                            </TableRow>
                                        )

                                    })
                                }
                            </TableBody>
                        </Table>
                        <br />
                        <Button className={classes.button} style={style} >Vider ma commande</Button>

                        <Button color="secondary" style={style} className={classes.button} onClick={this.handleCheckOutCmd.bind(this)}>Valider ma commande</Button>
                    </div>
                }
                {
                    this.state.cmdCookie !== null && !this.props.currentCommande[this.state.cmdCookie].menus &&
                    <div>
                        <img src={commandevide} alt="commandevide" />
                        <br />
                        <p>Pensez a passer votre commande</p>
                    </div>
                }


                {/* <CommandeLoginModal
                  {...this.props}
                open={this.state.open} 
            />  */}
            </div>
        );
    }
}

Commande.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Commande);