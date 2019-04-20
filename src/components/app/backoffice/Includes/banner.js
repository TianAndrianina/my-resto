import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const styles = theme => ({

    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    }
});

class Banner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileOpen: false,
        };
    }

    render() {
        const { classes } = this.props;
        return (
            <div id="banner">
                <CssBaseline />
                    <AppBar position="fixed" className={classes.appBar + " banner-admin"} color="primary">
                        <Toolbar>
                            <Typography variant="h6" color="inherit" className="menu-title-admin" noWrap>{this.props.bannerTitle === "" || this.props.bannerTitle === null || this.props.bannerTitle === undefined ? "RESTAURANT" : this.props.bannerTitle}</Typography>
                        </Toolbar>
                    </AppBar>
            </div>
        );
    }
}
Banner.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Banner);
