import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import base, { auth, provider , firebaseapp } from "../../../base/base";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  });
  
class ProfileRigth extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            commandes: [],
            expanded: null
        }
    }
    handleChange = panel => (event, expanded) => {
        this.setState({
          expanded: expanded ? panel : false,
        });
      };
    componentWillMount(){
        const storeRef = firebaseapp.database().ref('commande/');
        const commandeCopie = [...this.state.commandes];
        storeRef.on('value', (snapshot) => {
            const commande = snapshot.val();
            Object.keys(commande).map((key, i1) =>{
                if(commande[key][key].utilisateur && commande[key][key].utilisateur.adresseEmail === this.props.currentUtilisateur.adresseEmail){
                     commandeCopie.push(commande[key]);
                }
            })
            this.setState({
                commandes: commandeCopie
            }) 
        });  
    }
    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
    
        return [day, month, year].join('-');
    }
    render() {
        const { classes } = this.props;
        const { expanded } = this.state;
        return(
            <div id="profileRigth">
                <div className="jumbotron content-menu">
                    <h4 className="menu-title">Mes commandes</h4>
                    {
                        Object.keys(this.state.commandes).map((key,index)=>{
                            const commande = this.state.commandes[key];
                            if(commande != null && commande != undefined){
                            return(
                                Object.keys(commande).map((key1,index1)=>{
                                    return(
                                        <ExpansionPanel key={index1} expanded={expanded === 'panel'+index1} onChange={this.handleChange('panel'+index1)}>
                                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                            {
                                                commande[key1].restaurant != undefined && commande[key1].restaurant != null &&
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <Typography className={classes.heading}>Chez {commande[key1].restaurant.nom} <br/> le {this.formatDate(commande[key1].dateCommande)}</Typography>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <Typography className={classes.secondaryHeading}><i>Adresse: </i>{commande[key1].restaurant.adresse} <br/> <i>Tel:</i> {commande[key1].restaurant.telephone}</Typography>
                                                    </div>
                                                </div>
                                            }
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                    <Table className='tableCmd'>
                                                        <TableHead>
                                                            <TableRow className="head-table">
                                                                <CustomTableCell>Plat ou Menu</CustomTableCell>
                                                                <CustomTableCell>Quantité</CustomTableCell>
                                                                <CustomTableCell>Prix</CustomTableCell>
                                                                <CustomTableCell>Total</CustomTableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {
                                                                commande[key1].plats != null &&
                                                                 Object.keys(commande[key1].plats).map((keyplat, i2) =>{ 
                                                                    const plat = commande[key1].plats[keyplat];
                                                                    return (      
                                                                        <TableRow key={i2}>
                                                                            <CustomTableCell>
                                                                                {/* <Typography id="simple-modal-description">{p.plat.nom}</Typography> */}
                                                                                {plat.plat.nom}
                                                                            </CustomTableCell>
                                                                            <CustomTableCell>
                                                                                {plat.qteplat}
                                                                            </CustomTableCell>
                                                                            <CustomTableCell>{plat.plat.prix} RS</CustomTableCell>
                                                                            <CustomTableCell>
                                                                                <Typography>
                                                                                    {plat.prixTotal} 
                                                                                </Typography>
                                                                                RS
                                                                            </CustomTableCell>
                                                                        </TableRow>
                                                                    )})
                                                            }
                                                            {
                                                                commande[key1].menus != null &&
                                                                 Object.keys(commande[key1].menus).map((keymenu, i2) =>{ 
                                                                    const menu = commande[key1].menus[keymenu];
                                                                    return (      
                                                                        <TableRow key={i2}>
                                                                            <CustomTableCell>
                                                                                {/* <Typography id="simple-modal-description">{p.plat.nom}</Typography> */}
                                                                                {menu.menu.nom}
                                                                            </CustomTableCell>
                                                                            <CustomTableCell>
                                                                                {menu.qteMenu}
                                                                            </CustomTableCell>
                                                                            <CustomTableCell>{menu.menu.prix} RS</CustomTableCell>
                                                                            <CustomTableCell>
                                                                                <Typography>
                                                                                    {menu.prixTotal} 
                                                                                </Typography>
                                                                                RS
                                                                            </CustomTableCell>
                                                                        </TableRow>
                                                                    )})
                                                            }
                                                            
                                                            <TableRow>
                                                                <TableCell rowSpan={3} />
                                                                <TableCell colSpan={2}><b>Total</b></TableCell>
                                                                <TableCell align="right">{commande[key1].total} RS</TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                    )
                                })
                            )
                            }
                        })
                    }
                    
                </div>
            </div>
        );
    }
}
ProfileRigth.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(ProfileRigth);