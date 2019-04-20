import React, { Component } from 'react';
import '../App.css';
import base from "./base";

class CarteGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
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
    this.ref = base.syncState("carte", {
      context: this,
      state: 'cartes',
      asArray: true
    })

    base.fetch('plats', {
      context: this,
      asArray: true,
      then(data) {
        //console.log(data);
        this.setState({
          plats: data,
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

  choosePlat(plats, restaurantCount, b = null, p = null, e = null, d = null) {

    var boissonsCount = 0;
    var platResCount = 0;
    var dessertCount = 0;
    var entreeCount = 0;
    var plat_temp = [];

    let boissons_ = [];
    let platsRes_ = [];
    let entree_ = [];
    let desserts_ = [];
    if (b === null && p === null && e === null && d === null) {
      plats.map((plat) => {
        console.log(plat.typePlat.val);
        switch (plat.typePlat.val) {
          case "Boissons":
            boissons_.push(plat);
            break;
          case "Plat principal":
            platsRes_.push(plat);
            break;
          case "Entrées":
            entree_.push(plat);
            break;
          case "Desserts":
            desserts_.push(plat);
            break;
          default:
            break;
        }
      });
    }
    else {
      boissons_ = b;
      platsRes_ = p;
      desserts_ = d;
      entree_ = e;
    }

    boissonsCount = parseInt(boissons_.length) / restaurantCount;
    platResCount = platsRes_.length / restaurantCount;
    dessertCount = desserts_.length / restaurantCount;
    entreeCount = entree_.length / restaurantCount;
    plat_temp.push(boissons_.slice(0, boissonsCount));
    plat_temp.push(platsRes_.slice(0, platResCount));
    plat_temp.push(desserts_.slice(0, dessertCount));
    plat_temp.push(entree_.slice(0, entreeCount));


    boissons_.splice(0, boissonsCount);
    platsRes_.splice(0, platResCount);
    desserts_.splice(0, dessertCount);
    entree_.splice(0, entreeCount);

    let result = {
      boissons: boissons_,
      plats: platsRes_,
      desserts: desserts_,
      entree: entree_,
      platResult: plat_temp
    }
    return result;
  }


  addCarte(restaurants, plats) {

    let restaurantCount = restaurants.length;
    let result = {
      boissons: null,
      plats: null,
      desserts: null,
      entree: null

    }
    var carteArray = [];

    restaurants.map((restaurant, index) => {

      let choose = this.choosePlat(plats, parseInt(restaurantCount), result.boissons, result.plats, result.entree, result.desserts);
      result = choose;
      var platsResult = {
        boissons: choose.platResult[0],
        plats: choose.platResult[1],
        desserts: choose.platResult[2],
        entree: choose.platResult[3],
      }
      var carte = {
        id: this.idGenereator(),
        restaurant: restaurant,
        plats: platsResult
      }

      carteArray.push(carte);
      console.log("carte", carte);
      restaurantCount--;;
    });

    if (this.state.cartes.length === 0 && carteArray.length !== 0) {
      this.setState({
        cartes: carteArray
      })
    }

  }

  render() {
    var restaurants = [...this.state.restaurants];
    var plats = [...this.state.plats];
    var cartes = [...this.state.cartes];
    console.log(JSON.stringify(cartes));
    var isLoading = this.state.isLoading;
    if (isLoading) {
      this.addCarte(restaurants, plats);
    }
    return (
      <div className="App" >

      </div>
    );
  }
}

export default CarteGenerator;
