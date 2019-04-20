import React from 'react';
import Config from "../../config/config";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import Icon from '@material-ui/core/Icon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 250,
    },
    input: {
        display: 'flex',
        padding: 0,
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
            0.08,
        ),
    },
    noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    singleValue: {
        fontSize: 16,
    },
    placeholder: {
        position: 'absolute',
        left: 2,
        fontSize: 16,
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
});

function NoOptionsMessage(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.noOptionsMessage}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props} />;
}

function Control(props) {
    return (
        <TextField
            fullWidth
            InputProps={{
                inputComponent,
                inputProps: {
                    className: props.selectProps.classes.input,
                    inputRef: props.innerRef,
                    children: props.children,
                    ...props.innerProps,
                },
            }}
            {...props.selectProps.textFieldProps}
        />
    );
}

function Option(props) {
    return (
        <MenuItem
            buttonRef={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
                fontWeight: props.isSelected ? 500 : 400,
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    );
}

function Placeholder(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.placeholder}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function SingleValue(props) {
    return (
        <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
            {props.children}
        </Typography>
    );
}

function ValueContainer(props) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
    return (
        <Chip
            tabIndex={-1}
            label={props.children}
            className={classNames(props.selectProps.classes.chip, {
                [props.selectProps.classes.chipFocused]: props.isFocused,
            })}
            onDelete={props.removeProps.onClick}
            deleteIcon={<CancelIcon {...props.removeProps} />}
        />
    );
}

function Menu(props) {
    return (
        <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
        </Paper>
    );
}

const components = {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
};

class RestaurantRight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            single: null,
            multi: null,
            multiTc: null,
            restaurantsList: [],
            open: false,
            checked: [],
            typeDeCuisineChecked: [],
        };
    }

    handleChangeCheckBox = (e, index, typeDeCuisine) => {
        var typeCuisine_ = this.state.typeDeCuisineChecked;
        var checked_ = [...this.state.checked];
        checked_[index] = e.target.checked
        this.setState({ checked: checked_ });

        if (checked_[index] === true) {
            typeCuisine_.push(typeDeCuisine);
        }
        else {
            var newTC = typeCuisine_.filter(el => el !== typeDeCuisine);
            this.setState({
                typeDeCuisineChecked: newTC
            })
        }
    };


    handleChange = name => value => {
        this.setState({
            [name]: value,
        });

        if (name === "single") {
            console.log("value ", value);
            if (value !== null) {
                var newRes = this.props.restaurants.filter(x => x.adresse === value.label);
                this.setState({
                    restaurantsList: newRes
                })
            }
            else {
                this.setState({
                    restaurantsList: this.props.restaurants
                })
            }
        }

    };

    componentWillMount() {

        this.setState({
            restaurantsList: this.props.restaurants
        })
        console.log(this.state.restaurantsList);

        loadCSS(
            'https://use.fontawesome.com/releases/v5.8.1/css/all.css',
            document.querySelector('#insertion-point-jss'),
        );
    }

    handleClickRestaurant(e) {
        e.preventDefault();
        this.props.currentRestaurantClicked(this.props.resClicked);
        this.props.handleClickToPlat(e);
    }

    handleClickMenuRestaurant(e) {
        e.preventDefault();
        this.props.currentRestaurantClicked(this.props.resClicked);
        this.props.handleClickToMenu(e);
    }

    handleClickModal(e, show) {
        e.preventDefault();
        this.setState({
            open: show
        })
    }

    initCheckTypeCuisine() {
        var checked_ = [];
        if (this.props.typeDeCuisine.length > 0) {
            if (this.state.checked.length === 0) {
                this.props.typeDeCuisine.map((tc, index) => {
                    return checked_.push(false);
                })
                this.setState({
                    checked: checked_
                })

            }
        }


    }

    render() {
        var style = {
            width: "100%",
            marginTop: "10px"
        }
        var restaurantsList = []
        if (this.state.restaurantsList.length > 0) {
            restaurantsList = this.state.restaurantsList.map(restaurant => ({
                value: restaurant.id,
                label: restaurant.nom
            }));
        }


        var adresseList = this.props.restaurants.map(restaurant => ({
            value: restaurant.id,
            label: restaurant.adresse,
        }));

        const { classes, theme, typeDeCuisine, fullScreen } = this.props;


        const selectStyles = {
            input: base => ({
                ...base,
                color: theme.palette.text.primary,
                '& input': {
                    font: 'inherit',
                },
            }),
        };

        this.initCheckTypeCuisine();

        return (
            <div className={classes.root}>
                <div className="jumbotron content-menu content-right" id="content-res">

                    <div className="search">
                        <h4 className="menu-title">Trouvez vos restaurants</h4>
                        <form noValidate autoComplete="off">
                            <NoSsr>
                                <Select
                                    classes={classes}
                                    styles={selectStyles}
                                    options={adresseList}
                                    components={components}
                                    value={this.state.single}
                                    onChange={this.handleChange('single')}
                                    placeholder="Adresse"
                                    isClearable
                                />
                                <div className={classes.divider} />
                                <Select
                                    classes={classes}
                                    styles={selectStyles}
                                    textFieldProps={{
                                        label: 'Restaurants',
                                        InputLabelProps: {
                                            shrink: true,
                                        },
                                    }}
                                    options={restaurantsList}
                                    components={components}
                                    value={this.state.multi}
                                    onChange={this.handleChange('multi')}
                                    placeholder="Selectionnez des restaurants"
                                    isMulti
                                />
                                <div className={classes.divider} />
                                <Button variant="contained" color="primary" fullWidth className="custom-btn banner-admin" onClick={(e) => this.handleClickModal(e, true)}>Choisir un/plusieur type de cuisine</Button>
                                <br />
                            </NoSsr>
                            <br></br>
                            <Button variant="contained" color="secondary" fullWidth className="secondary custom-btn" onClick={() => this.props.handleSearch(this.state.multi, this.state.single, this.state.typeDeCuisineChecked)}>Rechercher</Button>
                        </form>
                        <div>
                            <h5 className="menu-title">Types de cuisine à rechercher</h5>
                            <List component="nav">
                                {
                                    this.state.typeDeCuisineChecked != null &&
                                    this.state.typeDeCuisineChecked.map((tc, index) => {
                                        return (

                                            <ListItem button key={index}>
                                                <ListItemIcon><Icon className={classNames(classes.icon, "fas fa-utensils")} color="secondary" /></ListItemIcon>
                                                <ListItemText primary={tc.val} />
                                            </ListItem>

                                        )
                                    })
                                }
                            </List>
                        </div>
                    </div>
                    {
                        this.props.resClicked !== null &&
                        <div>
                            <img src={Config.URL_IMAGE + this.props.resClicked.photo + Config.URS_TOKEN} alt="Norway" style={style} />
                            <div className="container">
                                <p>{this.props.resClicked.nom}</p>
                                <span>{this.props.resClicked.description}</span>
                                <div className="detail-res">
                                    <span><b>Adresse : </b>{this.props.resClicked.adresse}</span><br />
                                    <span><b>N° téléphone : </b>{this.props.resClicked.telephone}</span>
                                </div>
                                <div>
                                    <h5 className="menu-title">Types de cuisine</h5>
                                    <List component="nav">
                                        {
                                            this.props.resClicked.typeDeCuisine.map((tc, index) => {
                                                return (

                                                    <ListItem button key={index}>
                                                        <ListItemIcon><Icon className={classNames(classes.icon, "fas fa-utensils")} color="secondary" /></ListItemIcon>
                                                        <ListItemText primary={tc.val} />
                                                    </ListItem>

                                                )
                                            })
                                        }
                                    </List>
                                </div>
                            </div><br />

                            <Button variant="contained" color="primary" fullWidth className="button-primary custom-btn" onClick={(e) => {this.handleClickRestaurant(e)}}>Voir la carte pour les plats</Button><br/><br/>
                            <Button variant="contained" color="primary" fullWidth className="button-primary custom-btn" onClick={(e) => {this.handleClickMenuRestaurant(e)}}>Voir les menus disponibles</Button>
                        </div>
                    }
                </div>
                {
                    typeDeCuisine.length > 0 &&
                    <Dialog
                        fullScreen={fullScreen}
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="responsive-dialog-title"
                        fullWidth={true}
                        maxWidth={'md'}
                    >
                        <DialogTitle id="responsive-dialog-title">Choisir un type de cuisine</DialogTitle>
                        <DialogContent>

                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell> </TableCell>
                                        <TableCell>Nom</TableCell>
                                        <TableCell>Description</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        typeDeCuisine !== undefined &&
                                        typeDeCuisine.map((row, index) => {
                                            return (
                                                <TableRow key={row.id}>
                                                    <TableCell>
                                                        <Checkbox
                                                            checked={this.state.checked.length === 0 ? false : this.state.checked[index]}
                                                            onChange={(e) => this.handleChangeCheckBox(e, index, row)}
                                                            value="checkedA"
                                                        />
                                                    </TableCell>
                                                    <TableCell>{row.val}</TableCell>
                                                    <TableCell>{row.desce}</TableCell>

                                                </TableRow>
                                            )
                                        })

                                    }

                                </TableBody>
                            </Table>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={(e) => this.handleClickModal(e, false)} color="primary">Valider</Button>
                        </DialogActions>
                    </Dialog>
                }
            </div>
        );
    }

}

RestaurantRight.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(RestaurantRight);