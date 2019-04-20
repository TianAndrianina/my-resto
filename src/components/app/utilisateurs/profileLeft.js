import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import profileimage from "../../../assets/images/profileimage.png";
import EditIcon from '@material-ui/icons/Edit';

const styles = {
    card: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    cover: {
      width: 151,
      paddingRigth: "10px"
    }
    
  };
const editbtn={
    marginRigth: "25px"
}

class ProfileLeft extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        return (
            <div id="profileLeft">
                 <div className="jumbotron content-menu">
                    <h4 className="menu-title">Mes informations</h4>
                    <div>
                        <Card className={classes.card}>
                            <div className="row">
                                <div className="col-md-8">
                                    <CardContent>
                                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                                            Nom et prénom
                                        </Typography>
                                        <Typography component="p">
                                            {this.props.currentUtilisateur.nom}
                                        </Typography>
                                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                                            Adresse
                                        </Typography>
                                        <Typography component="p">
                                            {this.props.currentUtilisateur.adresse}
                                        </Typography>
                                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                                            Adresse e-mail
                                        </Typography>
                                        <Typography component="p">
                                            {this.props.currentUtilisateur.adresseEmail}
                                        </Typography>
                                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                                            N° de téléphone
                                        </Typography>
                                        <Typography component="p">
                                            {this.props.currentUtilisateur.telephone}
                                        </Typography>
                                    </CardContent>
                                </div>
                                <div className="col-md-4">
                                    <img src={profileimage} className={classes.cover}/>
                                    <Button size="small" style={editbtn}><EditIcon />Modifier mon profil</Button>
                                </div>
                            </div>
                        </Card>  
                    </div>
                </div>
            </div>
        );
    }
}
ProfileLeft.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileLeft);