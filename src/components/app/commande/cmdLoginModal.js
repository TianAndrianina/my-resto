import React from 'react';
import Login from '../utilisateurs/login';
import base from "../../../base/base";
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

class CommandeLoginModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            utilisateurs : []
        };
    }
    
    componentWillMount(){
        this.ref = this.ref = base.syncState("utilisateurs", {
            context: this,
            state: 'utilisateurs',
            asArray: true
        })
    }
    render() {
        return(
            <div>
                <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description"
                open={this.props.open}>
                    <div style={getModalStyle()} className="customModal">
                        <Login
                            utilisateurs= {this.state.utilisateurs}
                            {...this.props}
                        />
                        <Button variant="contained" color="default">Fermer</Button>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default CommandeLoginModal;