import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import base from "../../../base/base";
import {Cookies}    from 'react-cookie';


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

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const cookies = new Cookies();


class CommandeModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            qteplat: 1,
            prixTotal: '',
            commande: []
        };
    }
    componentWillMount() {
        // this.ref = base.syncState("commande", {
        //     context: this,
        //     state: 'commande',
        //     asArray: true
        // })
    }
    componentWillUnmount() {
    }
    handleContinueClick() {
        const cmdCookie = cookies.get('cmdOnboarded');
        
        if(cmdCookie == null){
            const timestamp = Date.now();
            const comm = {
                    id: timestamp.toString(),
                    dateCommande: timestamp,
                    plats: [
                        {
                            plat: this.props.plat,
                            qteplat: this.state.qteplat,
                            prixTotal: (this.state.qteplat*this.props.plat.prix)*1
                        }
                    ],
                    restaurant: this.props.currentRestaurant,
                    total: (this.state.qteplat*this.props.plat.prix)*1,
                    isValider: false
            }
            this.props.setCommande(comm);
        }
        else{
            let comm = 
                    {
                        plat: this.props.plat,
                        qteplat: this.state.qteplat,
                        prixTotal: (this.state.qteplat*this.props.plat.prix)*1,
                    }
            this.props.setCommande(comm);
        }
        this.props.close();
    }
    handleQteChange(event) {
        this.setState({
            qteplat: event.target.value*1,
            prixTotal: (event.target.value * this.props.plat.prix)
        })
    }

    
    render() {
        var style = {
            float : "right"
        };
        const { classes } = this.props;
        return (<div>
            <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description"
                open={this.props.open}>
                <div style={getModalStyle()} className="customModal">
                    <h4 className="menu-title">
                        Votre commande est la suivante:
                </h4>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow className="head-table">
                                    <CustomTableCell>Plat</CustomTableCell>
                                    <CustomTableCell>Quantité</CustomTableCell>
                                    <CustomTableCell>Prix</CustomTableCell>
                                    <CustomTableCell>Total</CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <CustomTableCell>
                                        <Typography id="simple-modal-description">{this.props.plat.nom}</Typography>

                                    </CustomTableCell>
                                    <CustomTableCell>
                                        <TextField
                                            onChange={(e) => { this.handleQteChange(e) }}
                                            value={this.state.qteplat}
                                            inputProps={{ min: "0", max: "50", step: "1" }}
                                            type="number"
                                        />
                                    </CustomTableCell>
                                    <CustomTableCell>{this.props.plat.prix} RS</CustomTableCell>
                                    <CustomTableCell>
                                        <Typography>
                                            {this.props.plat.prix * this.state.qteplat}
                                        </Typography>
                                        RS
                                </CustomTableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Paper>
                    <br />
                    <Button className={classes.button} style={style} onClick={this.props.close}>Annuler</Button>
                    &nbsp;
                    <Button color="secondary" style={style}  className={classes.button} onClick={(e) => { this.handleContinueClick() }}>Continuer</Button>
                </div>
            </Modal>
        </div>
        );
    }
}

CommandeModal.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(CommandeModal);