import React from 'react';
import banner from "../../../assets/images/banner.jpg"
import base from "../../../base/base";
import Config from '../../config/config';
import loaderMin from "../../../assets/images/loader-min1.gif";
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CommandeModal from './cmdModal';

var style = {
    width: "100%",
    marginTop: "10px"
}

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: "#17a2b8",
        width: "100%"
    },
});


class MenuList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menus: [],
            menuByRestaurant: null,
            hasValue: false,
            hasValueByRes: false,
            open: false,
            menu: {}
        }
    }

    filterMenuByRestaurant() {

    }
    componentWillMount() {
        this.ref = base.syncState("menu", {
            context: this,
            state: 'menus',
            asArray: true
        })
    }

    handleCmdModalOpen = (e, res) => {
        e.preventDefault();
        this.setState({ open: true, menu: res});
    };

    handleCmdModalClose = () => {
        this.setState({ open: false });
    };
    

    render() {
        var list = [];
        var { classes } = this.props;
        var menuByRes = this.state.menuByRestaurant;
        if ((this.state.menus.length > 0 && this.state.hasValue === false)) {
            this.setState({
                hasValue: true
            })
        }
        var currentRestaurant = this.props.currentRestaurant;
        if(this.props.changedByState){
            currentRestaurant = this.props.currentRestaurantState;
        }
        if (this.props.hasMenuValueByRes === false && this.state.menus.length > 0 && this.props.currentRestaurant !== undefined && currentRestaurant !== null) {
            list = this.state.menus.filter(x => x.restaurant.id === currentRestaurant.id);
            if (list.length > 0) {
                this.setState({
                    menuByRestaurant: list[0]
                })
            }

            this.props.hasMenuValueByResSet(true);
        }
        
        return (
            
            <div>
                <h4 className="menu-title">Nos Menus</h4>
                {

                    !this.state.hasValue && currentRestaurant !== null &&
                    <div>
                        <p>Récupération des données</p>
                        <img src={loaderMin} alt="min-loader" className="mini-loader" />
                    </div>
                }
                {
                    currentRestaurant === null &&
                    <div>
                        <p>Veuillez Choisir un restaurant</p>
                    </div>
                }
                <div className="row">
                    {

                        menuByRes !== null && menuByRes !== undefined &&
                        menuByRes.menuChoix.map((menu, index) => {
                            if (menu.prix >= this.props.prixMin && menu.prix <= this.props.prixMax) {
                                return (

                                    <div key={index} className="col-md-6">
                                        <h5 className="menu-title-1">{menu.nom}</h5>
                                        <div id={"carouselExampleIndicators" + index} className="carousel slide car-slide" data-ride="carousel">
                                            <ol className="carousel-indicators">
                                                {
                                                    Config.titreMenu.map((titre, i) => {
                                                        return <li key={i} data-target={"#carouselExampleIndicators" + index} data-slide-to={i} className={i === 0 ? "active" : ""}></li>
                                                    })
                                                }

                                            </ol>
                                            <div className="carousel-inner">
                                                {
                                                    Config.platsKey.map((plat, i) => {
                                                        var platByKey = menu.menu[plat];
                                                        return <div key={i} className={i === 0 ? "carousel-item active" : "carousel-item"}>
                                                            <img src={Config.URL_IMAGE_PLAT + platByKey.photo + Config.URS_TOKEN} alt="Norway" style={style} />
                                                            <div className="carousel-caption d-none d-md-block">
                                                                <h5><b>{platByKey.nom}</b></h5>
                                                                <p><b>{plat}</b></p>
                                                                <div>
                                                                    <Fab size="small" color="primary" aria-label="Add" className="commander-btn add-menu">
                                                                        <AddIcon onClick={(e) => { this.handleCmdModalOpen(e, menu) }}  />
                                                                    </Fab>
                                                                    <Button size="small" variant="contained" color="secondary" className={classes.button + " prix-menu"}>{menu.prix} Rs</Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    })
                                                }
                                            </div>
                                            <a className="carousel-control-prev" href={"#carouselExampleIndicators" + index} role="button" data-slide="prev">
                                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span className="sr-only">Previous</span>
                                            </a>
                                            <a className="carousel-control-next" href={"#carouselExampleIndicators" + index} role="button" data-slide="next">
                                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span className="sr-only">Next</span>
                                            </a>

                                        </div>
                                     <CommandeModal 
                                     currentRestaurant={this.props.currentRestaurant}
                                     setCommande={this.props.setCommande}  
                                     open={this.state.open} menu={this.state.menu} close={this.handleCmdModalClose}/>
                                    </div>
                                )
                            }else{
                                return;
                            }
                        })
                        }
                     </div>
                     </div>
        );
    }
}

export default withStyles((styles))(MenuList);