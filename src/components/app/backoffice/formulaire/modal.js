import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

class CustomModal extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const { fullScreen } = this.props;

        return (
            <div>
                <Dialog
                    fullScreen={fullScreen}
                    open={this.props.open}
                    onClose={this.props.handleCloseModal}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">Message</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{this.props.message}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleCloseModal} color="secondary">Fermer</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

CustomModal.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(CustomModal);