import React, { Component } from 'react';
import './App.css';
import base from "./base/base";

class MenuGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      menu: [],
      plats: [],
      cartes: [],
      platsRes: [],
      boissons: [],
      desserts: [],
      entree: [],
      isLoading: false,

    }



  }

  idGenereator() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  componentWillMount() {
    //alert("toto")
    // this runs right before the <App> is rendered
    this.ref = base.syncState("menu", {
      context: this,
      state: 'menu',
      asArray: true
    })

    base.fetch('carte', {
      context: this,
      asArray: true,
      then(data) {
        //console.log(data);
        this.setState({
          cartes: data,
          isLoading: true
        })

      }
    });

    base.fetch('restaurants', {
      context: this,
      asArray: true,
      then(data) {
        //console.log(data);
        this.setState({
          restaurants: data
        })

      }
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
    base.removeBinding(this.carte);

  }

  componentDidMount() {
    console.log("miakatra");

  }
  setStateRestaurant(data) {
    this.setState({
      restaurants: data
    })
  }

  addMenu(restaurants, cartes) {
    var menuResult = [];
    if (restaurants.length > 0 && cartes.length > 0) {
      restaurants.map((restaurant) => {
        var currentCarte = cartes.filter(carte => carte.restaurant.id === restaurant.id);
        if (currentCarte.length > 0) {
          currentCarte = currentCarte[0];
          var randomNumber = Math.floor(Math.random() * 5);
          if (randomNumber < 3) {
            randomNumber = randomNumber + 3;
          }
          var menuChoix = [];
          for (var i = 0; i < randomNumber; i++) {
            var randomBoisson = Math.floor(Math.random() * currentCarte.plats.boissons.length);
            var randomPlat = Math.floor(Math.random() * currentCarte.plats.plats.length);
            var randomEntree = Math.floor(Math.random() * currentCarte.plats.entree.length);
            var randomDesserts = Math.floor(Math.random() * currentCarte.plats.desserts.length);

            var menu = {
              boissons: currentCarte.plats.boissons[randomBoisson],
              plats: currentCarte.plats.plats[randomPlat],
              entree: currentCarte.plats.entree[randomEntree],
              desserts: currentCarte.plats.desserts[randomDesserts]
            }
            var nomMenu = menu.entree.nom.split(" ")[0] + " " + menu.plats.nom.split(" ")[0] + "," + menu.desserts.nom.split(" ")[0];
            var prix_ = parseInt(menu.entree.prix) + parseInt(menu.plats.prix) + parseInt(menu.desserts.prix) + parseInt(menu.boissons.prix);
            var menuDetail = {
              nom : nomMenu,
              prix : prix_,
              isActive : true,
              menu : menu
            };

            menuChoix.push(menuDetail);
          }
          var menuAdd = {
            id : this.idGenereator(),
            dateCreation : new Date(),
            restaurant : restaurant,
            menuChoix : menuChoix
          };
          menuResult.push(menuAdd);
        }
      });
    }
    console.log(menuResult);
      console.log(JSON.stringify(menuResult));
    
    
  }

  render() {
    var restaurants = [...this.state.restaurants];
    var plats = [...this.state.plats];
    var cartes = [...this.state.cartes];
    var isLoading = this.state.isLoading;
    if (isLoading) {
      //this.addCarte(restaurants, plats);
      this.addMenu(restaurants, cartes);
    }
    return (
      <div className="App" >

      </div>
    );
  }
}

export default MenuGenerator;
