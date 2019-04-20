import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import sha1 from "js-sha1";
import {Cookies}    from 'react-cookie';
import base, { auth, provider , firebaseapp } from "../../../base/base";

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
const cookies = new Cookies();
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mail: "",
            password: "",
            errorGlobal : "",
            error: {
                mail: "",
                password: ""
                
            }
            
            
        }

    }
    handleClick(e) {
        e.preventDefault();
        console.log(this.props.utilisateurs)
        var mail = this.state.mail;
        var password = sha1(this.state.password);
        console.log(this.state.error.mail);
        if(this.state.error.mail === undefined || this.state.error.mail === undefined){
            this.setState({
                errorGlobal : "Verifier votre formuliare!"
            })
        }
        else{
            var utilisateurs = this.props.utilisateurs;
            var match = utilisateurs.filter(x => x.adresseEmail === mail && x.password === password);
            if(match.length > 0){
                this.props.setCurrentUser(match[0]);
                if(cookies.get('cmdOnboarded') != null){
                    this.setCommandeEncours(cookies.get('cmdOnboarded'),match[0]);                    
                    this.props.history.push("/profile");
                    cookies.remove('cmdOnboarded');
                }
                else{
                    this.props.history.push("/restaurants");
                }
            }
            this.setState({
                errorGlobal : "Verifier votre formuliare! Erreur d'Authentification"
            })
            
            
        }

    }
    setCommandeEncours(idcommande,utilisateur){
        const storeRef = firebaseapp.database().ref('commande/'+idcommande);
        storeRef.child(idcommande).update({utilisateur: utilisateur}).then(
        ).catch();
    }
    validate(e, value) {
        if (value === "mail") {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var isValid = re.test(String(e.target.value).toLowerCase());
            console.log(isValid + e.target.value);
            if (isValid) {
                this.setState({
                    mail: e.target.value,
                    error: {
                        mail: "",
                        password: this.state.error.password
                    }
                })
            }
            else {

                this.setState({
                    mail: e.target.value,
                    error: {
                        mail: "Adresse email non valide",
                        password: this.state.error.password
                    }
                })
            }
        }
        else {
            if (e.target.value == "") {
                this.setState({
                    password: e.target.value,
                    error: {
                        mail: this.state.error.mail,
                        password: "Mot de passe vide"
                    }
                })
            }
            else {
                this.setState({
                    password: e.target.value,
                    error: {
                        mail: this.state.error.mail,
                        password: ""
                    }
                })
            }
        }

    }
    render() {
        const { classes } = this.props;
        return (
            <div id="login">
                <div className="jumbotron content-menu">
                    <h4 className="menu-title">Veuillez vous connecter</h4>
                    <div >
                        <form>
                            <TextField
                                id="mail"
                                label="Adresse email"
                                className={classes.textField}
                                style={textField}
                                type="mail"
                                value={this.state.mail}
                                onChange={(e) => this.validate(e, "mail")}
                                helperText={this.state.error.mail}
                            />
                            <TextField
                                id="password"
                                label="Mot de passe"
                                className={classes.textField}
                                style={textField}
                                type="password"
                                onChange={(e) => this.validate(e, "password")}
                                helperText={this.state.error.password}
                            />
                            <br />
                            <br />
                            <Button variant="contained" color="secondary" fullWidth className="custom-btn" onClick={(e) => this.handleClick(e)}>Se connecter</Button>
                            <br/><br/>
                            <p>Login Test: dapibus.ligula@commodo.org / b</p>
                            <p>{this.state.errorGlobal}</p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);