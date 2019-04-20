import React from 'react';
import Menu from "./menu";
import Banner from "./banner";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Config from '../../../config/config';
import { Route } from "react-router-dom";
const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
});

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: "restaurant-list"
        };
    }

    setKey(key){
        this.setState({
            key : key,
            bannerTitle : "",
        })
    }
    setTitle(title){
        this.setState({
            bannerTitle : title
        })
    }
    render() {
        const { classes } = this.props;

        return (
            <div className="header_">
                <div className={classes.root}>
                    <Banner bannerTitle={this.state.bannerTitle}/>
                    <Menu setKey={this.setKey.bind(this)}
                        setTitle={this.setTitle.bind(this)}
                    />
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        {
                            Config.routesAdmin.map((route, index) => {
                                var C = route.component;
                                if (this.state.key === route.key)
                                    return <C  key={index}/>

                            })
                        }
                    </main>
                </div>
            </div>
        );
    }
}
Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Header);
