import React from 'react';
import Button from '@material-ui/core/Button';
import ProfileLeft from './profileLeft';
import ProfileRigth from './profileRigth';
import { withRouter } from 'react-router';
import ReactDOM from 'react-dom';

class Profile extends React.Component {
    constructor(props){
        super(props);
        const user = JSON.parse(sessionStorage.getItem("user"));
        this.state={
            currentUtilisateur:  user
        }
    }
    checkAuth() {
        if ( this.state.currentUtilisateur == null) {
            const location = this.props.location;
            const redirect = location.pathname + location.search;
            // ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this).parentNode);
            this.props.history.push(`/se-connecter?redirect=${redirect}`);
        }
    }
    componentWillMount(){
        this.checkAuth();
    }
  
    render() {
        const currentUtilisateur = JSON.parse(sessionStorage.getItem("user"));
        return (
            <div id="profile">
                    {
                        currentUtilisateur !== null &&
                        <div className="row" id="content-main">
                            <div className="col-md-6 col-sm-12">
                                <ProfileLeft {...this.props} currentUtilisateur={currentUtilisateur}/>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <ProfileRigth currentUtilisateur={currentUtilisateur}/>
                            </div>
                            </div>
                    }
            </div>
        );
    }
}

export default withRouter(Profile);