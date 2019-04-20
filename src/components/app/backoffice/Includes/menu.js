import React from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import Config from "../../../config/config";
import classNames from 'classnames';
import Icon from '@material-ui/core/Icon';
import { loadCSS } from 'fg-loadcss/src/loadCSS';

const drawerWidth = 240;

const styles = theme => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    icon: {
        margin: theme.spacing.unit * 2,
      }
});

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileOpen: false,
        };
    }

    componentDidMount() {
        loadCSS(
          'https://use.fontawesome.com/releases/v5.8.1/css/all.css',
          document.querySelector('#insertion-point-jss'),
        );
      }

    handleClick(e,route){
        e.preventDefault();
        this.props.setKey(route.key);
        this.props.setTitle(route.text)
    }
    render() {
        const { classes } = this.props;

        return (

            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar + " title-app"} >My Resto</div>
                <Divider />
                <List>
                    {
                        Config.routesAdmin.map((route, index) => {
                            return (
                                <ListItem button key={index} onClick={(e) => this.handleClick(e, route)}>
                                    <ListItemIcon><Icon className={classNames(classes.icon, route.icon)} color="secondary" /></ListItemIcon>
                                    <ListItemText className="menu-link" primary={route.text}/>
                                </ListItem>
                            )

                        })
                    }
                </List>

            </Drawer>

        );
    }
}
Menu.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Menu);