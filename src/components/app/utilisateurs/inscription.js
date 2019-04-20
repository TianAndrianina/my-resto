import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Utils from "../util/utils";
import base from "../../../base/base";
import sha1 from "js-sha1";
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
class Inscription extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nom: "",
            mail: "",
            password: "",
            confirm: "",
            adresse: "",
            tel: "",
            nomError: "",
            mailError: "",
            passwordError: "",
            confirmError: "",
            adresseError: "",
            telError: "",
            utilisateurs: [],
            success : ""

        }
    }
    componentWillMount() {
        this.ref = base.syncState("utilisateurs", {
            context: this,
            state: 'utilisateurs',
            asArray: true
        });

    }
    validate(e, typeField) {
        var isEmpty = false;
        var value = e.target.value;

        if (e.target.value == undefined || e.target.value === "") {
            isEmpty = true;
        }
        switch (typeField) {

            case "nom": {
                if (isEmpty) {
                    this.setState({
                        nomError: "Le nom est vide",
                        nom: value
                    })
                }
                else {
                    this.setState({
                        nomError: "",
                        nom: value
                    })
                }
                break;
            }
            case "mail": {
                if (isEmpty)
                    this.setState({
                        mailError: "L'adresse mail est vide",
                        mail: value

                    });
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                var isValid = re.test(String(e.target.value).toLowerCase());
                if (!isValid) {
                    this.setState({
                        mailError: "L'adresse mail n'est pas valide",
                        mail: value

                    });
                }
                else {
                    this.setState({
                        mailError: "",
                        mail: value

                    });
                }
                break;
            }
            case "password": {
                if (isEmpty)
                    this.setState({
                        passwordError: "Le mot de passe est vide",
                        password: value
                    })
                else
                    this.setState({
                        passwordError: "",
                        password: value
                    })

                break;
            }
            case "confirm": {
                if (isEmpty)
                    this.setState({
                        confirmError: "Mot de passe de confirmationvide",
                        confirm: value
                    });
                if (this.state.password !== value) {
                    console.log("mdp", this.state.password)
                    console.log("mdp1", value)
                    this.setState({
                        confirmError: "Mot de passe non identique",
                        confirm: value
                    });
                }
                else {
                    this.setState({
                        confirmError: "",
                        confirm: value
                    });
                }
                break;
            }
            case "adresse": {
                if (isEmpty)
                    this.setState({
                        adresseError: "L'adresse est vide",
                        adresse: value
                    })
                else {
                    this.setState({
                        adresseError: "",
                        adresse: value
                    })
                }
                break;
            }
            case "tel": {
                if (isEmpty)
                    this.setState({
                        telError: "Le téléphone est vide",
                        tel: value

                    })
                this.setState({
                    telError: "",
                    tel: value
                })
                break;
            }
            default:
                return;
        }
    }

    handleClick(e) {
        e.preventDefault();
        var newUser = {
            id: Utils.idGenereator(),
            adresse: this.state.adresse,
            adresseEmail: this.state.mail,
            isAdmin: false,
            nom: this.state.nom,
            password: sha1(this.state.password),
            telephone: this.state.tel
        };

        var copyUser = this.state.utilisateurs;
        copyUser.push(newUser);
        this.setState({
            utilisateurs: copyUser,
            success : "L'utilisateur est enregistré",
            nom: "",
            mail: "",
            password: "",
            confirm: "",
            adresse: "",
            tel: "",
        })
    }
    render() {
        const { classes } = this.props;
        return (
            <div id="inscription">
                <div className="jumbotron content-menu">
                    <h4 className="menu-title">Inscription</h4>
                    <div >
                        <form>
                            <TextField
                                id="nom"
                                label="Nom et prénom"
                                className={classes.textField}
                                style={textField}
                                helperText={this.state.nomError}
                                onChange={(e) => this.validate(e, "nom")}
                                value={this.state.nom}
                            />
                            <TextField
                                id="mail"
                                label="Adresse email"
                                className={classes.textField}
                                style={textField}
                                type="mail"
                                helperText={this.state.mailError}
                                onChange={(e) => this.validate(e, "mail")}
                                value={this.state.mail}
                            />
                            <TextField
                                id="password"
                                label="Mot de passe"
                                className={classes.textField}
                                style={textField}
                                type="password"
                                helperText={this.state.passwordError}
                                onChange={(e) => this.validate(e, "password")}
                                value={this.state.password}
                            />
                            <TextField
                                id="confirm"
                                label="Confirmer mot de passe"
                                className={classes.textField}
                                style={textField}
                                type="password"
                                helperText={this.state.confirmError}
                                onChange={(e) => this.validate(e, "confirm")}
                                value={this.state.confirm}
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
                            <br />
                            <br />
                            <Button variant="contained" color="secondary" fullWidth className="custom-btn" onClick={(e) => this.handleClick(e)}>S'incrire</Button>
                        </form>
                        <p>{this.state.success}</p>
                    </div>
                </div>
            </div>
        );
    }
}
Inscription.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Inscription);
