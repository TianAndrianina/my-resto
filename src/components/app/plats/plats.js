import React from 'react';
import base, { auth, provider , firebaseapp } from "../../../base/base";
import PlatLeft from "./platLeft";
import PlatCenter from "./platCenter";
import PlatRight from "./platRight";
import {Cookies}    from 'react-cookie';


const cookies = new Cookies();

class Plats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurant: null,
            hasValue : false,
            commande : [],
            somme:'',
            isBlocking: false,
            prixMin : 0,
            prixMax : 5000
        }
    }

    setPrix(min,max){
        if(min > max)
            min = 0;
        this.setState({
            prixMin : min,
            prixMax : max
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
        console.log("rest", this.state.restaurant)
    }
    componentWillMount(){
        // this.ref = base.syncState("commande", {
        //     context: this,
        //     state: 'commande',
        //     asArray: true
        // })
    }
    componentWillUnmount() {
        
    }

    handleClickRestaurant(currentRrestaurant){
        this.setState({
            restaurant : currentRrestaurant
        })
    }
    setHasValue(value){
        this.setState({
            hasValue : value
        });
    }

    setCommande(commande){
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
            let platExists = '-1';
            let qteplat1 = 0;
            let prixTotal1 = 0;
            let grandTotal = 0;
            storeRef.on('value', (snapshot) => {
                const cmd = snapshot.val();
                let prixplat = '';
                Object.keys(cmd).map((key1, i1) =>{
                    const plts = cmd[key1].plats;
                    grandTotal = cmd[key1].total;
                    if(plts){
                        Object.keys(plts).map((key2, i2) =>{
                            const name = plts[key2].plat.nom;
                            prixplat = plts[key2].plat.prix;
                            if(name === commande.plat.nom){
                                platExists = key2;
                                qteplat1 = (plts[key2].qteplat + commande.qteplat);
                                prixTotal1 = qteplat1*(plts[key2].plat.prix);
                            }
                            else{
                                prixTotal1 = commande.prixTotal;
                            }
                        })
                    }
                })
                grandTotal = grandTotal+(commande.qteplat*prixplat);
            })
            if(platExists === '-1'){
                storeRef.child(cmdCookie).child('plats').push(commande).then().catch();
            }
            else{
                storeRef.child(cmdCookie).child('plats').child(platExists).update({qteplat: qteplat1,prixTotal: prixTotal1 }).then().catch();
            }
            storeRef.child(cmdCookie).update({total: grandTotal}).then().catch();
            storeRef.on('value', (snapshot) => {
                this.setState({
                    commande: snapshot.val()
                })
            })
        }
        // const storeRef = firebase.database().ref('commande/');
        // var commandeCopie = [...this.state.commande];
        // commandeCopie.push(commande);
        // this.setState({
        //     commande : commandeCopie
        // })
    }
    setPlat(plat,idCommande){
    }

    render() {
        var currentRestaurant = this.props.currentRestaurant;
        if(currentRestaurant === null || currentRestaurant === undefined){
            currentRestaurant = this.state.restaurant
        }
        return (
            <div className="plat">
                <div className="row" id="content-detail">
                    <div className="col-md-4 col-sm-6 col-lg-3">
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
                    <div className="col-md-8 col-sm-6 col-lg-6">
                        <div className="jumbotron content-menu">
                                <PlatCenter
                                    currentRestaurant={currentRestaurant}
                                    currentRestaurantState={this.state.restaurant}
                                    hasValueClick={this.setHasValue.bind(this)}
                                    hasValue={this.state.hasValue}
                                    setCommande={this.setCommande.bind(this)}
                                    setPlat={this.setPlat.bind(this)}
                                    prixMin={this.state.prixMin}
                                    prixMax={this.state.prixMax}
                                />
                        </div>

                    </div>
                    <div className="col-md-4 col-sm-6 col-lg-3">
                        <div className="jumbotron content-menu">
                            <PlatRight 
                                {...this.props}
                                commande={this.state.commande} somme={this.state.somme} currentRestaurant={currentRestaurant} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Plats;