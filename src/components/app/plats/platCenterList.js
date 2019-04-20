import React from 'react';
import Config from "../../config/config";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CommandeModal from '../commande/cmdModal';
var style = {
    width: "100%"
}
const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: "#17a2b8",
        width: "100%"
    },
});

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};


class PlatCenterList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            open: false,
            plat:{}
        }

    }

    componentWillMount() {

    }

    componentDidMount() {

    }
    componentWillUnmount() {
        //base.removeBinding(this.ref);
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };
    
    handleCmdModalOpen = (e, res) => {
        e.preventDefault();
        this.setState({ open: true, plat: res});
    };

    handleCmdModalClose = () => {
        this.setState({ open: false });
    };

    render() {

        var { cartesByRes, classes } = this.props;
        const { value } = this.state;
        return (
            <div className="platCenterList">
                {
                    cartesByRes.map((element, index) => {

                        return (
                            <div key={index}>
                                {
                                    <AppBar position="static">
                                        <Tabs value={value} onChange={this.handleChange} className="tab-plat" variant="fullWidth">
                                            {
                                                Config.platsKey.map((platKey, index) => {
                                                    return (
                                                        <Tab key={index} label={Config.titrePlats[index]} />
                                                    )
                                                })
                                            }
                                        </Tabs>
                                    </AppBar>
                                }
                                {
                                    Config.platsKey.map((platKey, index) => {

                                        var platNoFilterByPrice = element.plats[platKey];
                                        var plat = platNoFilterByPrice.filter(x => x.prix >= this.props.prixMin && x.prix <=this.props.prixMax);
                                        return (

                                            <div key={index}>
                                                {
                                                    value === index &&

                                                    <TabContainer>
                                                        <div className="row">
                                                            {
                                                                plat.map((res, index) => {
                                                                    return (
                                                                        <div key={index} className="col-md-4">

                                                                            <div className="polaroid list-plat">
                                                                                <div className="container-img">
                                                                                    <img src={Config.URL_IMAGE_PLAT + res.photo + Config.URS_TOKEN} alt="Norway" style={style} />
                                                                                    <div className="bottom-left">
                                                                                        <Fab size="small" color="primary" aria-label="Add" className={classes.fab + " commander-btn"}>
                                                                                             <AddIcon onClick={(e) => { this.handleCmdModalOpen(e, res) }} />
                                                                                        </Fab>
                                                                                    </div>
                                                                                    <div className="bottom-right">
                                                                                        <Button size="small" variant="contained" color="secondary" className={classes.button}>
                                                                                            {res.prix} Rs
                                                                                        </Button>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="container container-plat-liste">
                                                                                    <span className="plat-title">{res.nom}</span>
                                                                                </div> <br />
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                })
                                                            } </div>
                                                            <CommandeModal 
                                                            currentRestaurant={this.props.currentRestaurant}
                                                            setCommande={this.props.setCommande}   
                                                            setPlat={this.props.setPlat} 
                                                            open={this.state.open} plat={this.state.plat} close={this.handleCmdModalClose}/>
                                                    </TabContainer>

                                                }

                                            </div>

                                        );

                                    })
                                }
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default withStyles(styles)(PlatCenterList);