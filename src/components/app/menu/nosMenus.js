import React from 'react';
import PlatLeft from "../plats/platLeft";
import MenuList from "./menuList";
import MenuRigth from "./menuRigth";
import base, { auth, provider , firebaseapp } from "../../../base/base";
import {Cookies}    from 'react-cookie';

const cookies = new Cookies();

class NosMenus extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            restaurant: null,
            hasValue: false,
            commande: [],
            prixMin: 0,
            prixMax: 5000,
            hasMenuValueByRes : false,
            changedByState  : false,
        }
    }

    setPrix(min, max) {
        if (min > max)
            min = 0;
        this.setState({
            prixMin: min,
            prixMax: max
        })
    }

    setChangedByState(value){
        this.setState({
            changedByState : value
        })
    }

    componentDidMount() {
        if (this.state.restaurant === null) {
            this.setState({
                restaurant: this.props.currentRestaurant
            })
        }
        if (this.props.currentRestaurant !== null) {
            this.setState({
                restaurant: this.props.currentRestaurant
            })
        }
        // this.ref = base.syncState("commande", {
        //     context: this,
        //     state: 'commande',
        //     asArray: true
        // })
        console.log("rest", this.props.restaurant)
    }

    componentWillUnmount() {

    }
    handleClickRestaurant(currentRrestaurant) {
        this.setState({
            restaurant: currentRrestaurant,
            hasMenuValueByRes: false,
            changedByState : true
        })

    }
    setHasValue(value) {
        this.setState({
            hasValue: value,
            hasMenuValueByRes: false
        });
    }

    setCommande(commande) {
        const cmdCookie = cookies.get('cmdOnboarded');        
        const timestamp = Date.now();
        if(cmdCookie == null){
            cookies.set('cmdOnboarded', timestamp, { path: '/' });
            const storeRef = firebaseapp.database().ref('commande/'+ timestamp);
            storeRef.child(timestamp).set(commande).then((snapshot) => {
                console.log("SnpshotFrst "+snapshot);
            }).catch();
            storeRef.on('value', (snapshot) => {
                this.setState({
                    commande: snapshot.val()
                })
            })
        }
        else{
            const storeRef = firebaseapp.database().ref('commande/'+ cmdCookie);
            let menuExists = '-1';
            let qtemenu1 = 0;
            let prixTotal1 = 0;
            let grandTotal = 0;
            storeRef.on('value', (snapshot) => {
                const cmd = snapshot.val();
                let prixmenu = '';
                Object.keys(cmd).map((key1, i1) =>{
                    const menus = cmd[key1].menus;
                    grandTotal = cmd[key1].total;
                    if(menus){
                        Object.keys(menus).map((key2, i2) =>{
                            const name = menus[key2].menu.nom;
                            prixmenu = menus[key2].menu.prix;
                            if(name === commande.menu.nom){
                                menuExists = key2;
                                qtemenu1 = (menus[key2].qteMenu + commande.qteMenu);
                                prixTotal1 = qtemenu1*(menus[key2].menu.prix);
                            }
                            else{
                                prixTotal1 = commande.prixTotal;
                            }
                        })
                    }
                })
                grandTotal = grandTotal+(commande.qteMenu*prixmenu);
            })
            if(menuExists === '-1'){
                storeRef.child(cmdCookie).child('menus').push(commande).then().catch();
            }
            else{
                storeRef.child(cmdCookie).child('menus').child(menuExists).update({qteMenu: qtemenu1,prixTotal: prixTotal1 }).then().catch();
            }
            storeRef.child(cmdCookie).update({total: grandTotal}).then().catch();
            storeRef.on('value', (snapshot) => {
                this.setState({
                    commande: snapshot.val()
                })
            })
        }
    }

    setHasMenuValueByRes(value) {
        this.setState({
            hasMenuValueByRes: value
        })
    }

    render() {
        var currentRestaurant = this.props.currentRestaurant;
        if(currentRestaurant === null || currentRestaurant === undefined){
            currentRestaurant = this.state.restaurant
        }
        return (
            <div className="menus">
                <div className="row" id="content-detail">
                    <div className="col-md-3 col-sm-6">
                        <div className="jumbotron content-menu content-right">
                            <PlatLeft
                                currentRestaurant={currentRestaurant}
                                currentRestaurantState={this.state.restaurant}
                                currentRestaurantClicked={this.props.currentRestaurantClicked}
                                handleClickRestaurant={this.handleClickRestaurant.bind(this)}
                                hasValueClick={this.setHasValue.bind(this)}
                                hasValue={this.state.hasValue}
                                prixMin={this.state.prixMin}
                                prixMax={this.state.prixMax}
                                setPrix={this.setPrix.bind(this)}
                            />
                        </div>
                    </div>
                    <div className="col-md-5 col-sm-6">
                        <div className="jumbotron content-menu content-right">
                            <MenuList
                                currentRestaurant={currentRestaurant}
                                currentRestaurantState={this.state.restaurant}
                                hasMenuValueByResSet={this.setHasMenuValueByRes.bind(this)}
                                hasMenuValueByRes={this.state.hasMenuValueByRes}
                                setCommande={this.setCommande.bind(this)}
                                prixMin={this.state.prixMin}
                                prixMax={this.state.prixMax}
                                changedByState={this.state.changedByState}
                            />
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6">
                        <div className="jumbotron content-menu">
                            <MenuRigth 
                             {...this.props}
                             commande={this.state.commande} currentRestaurant={currentRestaurant}/>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default NosMenus;