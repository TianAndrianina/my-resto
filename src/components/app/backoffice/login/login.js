import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import sha1 from "js-sha1";
import base from "../../../../base/base";


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

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mail: "",
            password: "",
            errorGlobal: "login test : admin@admin.com / b",
            error: {
                mail: "",
                password: ""

            },
            utilisateurs: [],
            hasValue: false


        }

    }

    componentWillMount() {
        base.fetch('utilisateurs', {
            context: this,
            asArray: true,
            then(data) {
                //console.log(data);
                this.setState({
                    utilisateurs: data,
                    hasValue: true
                })

            }
        });
    }


    handleClick(e) {
        e.preventDefault();
        console.log(this.state.utilisateurs)
        var mail = this.state.mail;
        var password = sha1(this.state.password);
        console.log(this.state.error.mail);
        if (this.state.error.mail === undefined || this.state.error.mail === undefined) {
            this.setState({
                errorGlobal: "Verifier votre formuliare!"
            })
        }
        else {
            var utilisateurs = this.state.utilisateurs;
            var match = utilisateurs.filter(x => x.adresseEmail === mail && x.password === password);
            if (match.length > 0) {
                if(match[0].isAdmin === true){
                    sessionStorage.setItem("userAdmin", match[0]);
                    this.props.setConnected(true);
                    
                }
                else{
                    this.setState({
                        errorGlobal: "Erreur d'authentification!"
                    })
                }
            }
            else{
                this.setState({
                    errorGlobal: "Erreur d'authentification!"
                })
            }


        }
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
            <div id="login" className="col-sm-4 content-menu-container">
                <div className="jumbotron content-menu-admin">
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
                            <br /><br />
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