import React, { Component } from 'react';
import './App.css';
import "./assets/css/styles.css";
import Loader from "./components/app/loader/loader"
import MainAppClient from "./components/main/MainAppClient"
import { BrowserRouter as Router,withRouter } from "react-router-dom";
import MainAppAdmin from './components/main/MainAppAdmin';
class App extends Component {
  constructor(props) {
    super(props);

    this.handleLoading = this.handleLoading.bind(this);
    
    this.state = {
      isAdmin : false,
      isLoading : false,
      currentUtilisateur : {}
    }
    
  }

  componentWillMount(){
    console.log(window.location.pathname);
    var pathName = window.location.pathname;
    if(pathName.includes("bo")){
      this.setState({
        isAdmin : true
      })
    }
  }
  
  componentDidMount(){
    
    var localStorage = sessionStorage.getItem("user");
    if(localStorage !== undefined){
      var userConnecter = JSON.parse(localStorage);
      this.setState({
        currentUtilisateur : userConnecter
      })
    }
  }

  handleLoading(value){
    this.setState({
      isLoading : value
    })
  }

  setIsAdmin(value){
    this.setState({
      isAdmin : value
    })
  }

  setCurrentUser(user){
    
    this.setState({
      currentUtilisateur : user
    })
    if(JSON.stringify(user) !== ""){
      sessionStorage.setItem('user', JSON.stringify(user));
    }
  }

  render() {
    
    return (
      <Router>
      <div className="App" >
        <Loader isLoading={this.state.isLoading} />
        {
          !this.state.isAdmin &&
          <MainAppClient handleLoading={this.handleLoading} 
            setAdmin={this.setIsAdmin.bind(this)}
            setCurrentUser={this.setCurrentUser.bind(this)}
            currentUtilisateur={this.state.currentUtilisateur}
            {...this.state}
          />
        }
        {
          this.state.isAdmin &&
          <MainAppAdmin />
        }
      </div>
      </Router>
    );
  }
}

export default App;
