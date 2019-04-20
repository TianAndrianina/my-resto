import React from 'react';
import Login from "./login";
import base from "../../../base/base";
import Inscription from "./inscription";
import cake from "../../../assets/images/cake.jpg"
import icecream from "../../../assets/images/icecream.jpg";
class Authentification extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            utilisateurs : [],
            hasValue : false
        }
    }

    componentWillMount(){
        this.ref = this.ref = base.syncState("utilisateurs", {
            context: this,
            state: 'utilisateurs',
            asArray: true
        })
    }
    render() {
        return (
            <div id="authentification">
                <div className="row" id="content-main">

                    <div className="col-md-4 col-sm-12">
                        <Login
                        utilisateurs= {this.state.utilisateurs}
                        {...this.props}
                        />
                        <img src={icecream} alt="cake" className="icecream responsive" />
                    </div>
                    <div className="col-md-5 col-sm-12">
                        <Inscription />
                    </div>
                    <div className="col-md-3 col-sm-12">
                        <img src={cake} alt="cake" className="cake responsive" />
                    </div>

                </div>
                <div>

                </div>
            </div>
        );
    }
}

export default Authentification;