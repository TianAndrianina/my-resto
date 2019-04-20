import React from 'react';
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
import Utils from "../util/utils";
import base from "../../../base/base";
import Slider from '@material-ui/lab/Slider';

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

const Components = {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer
};

class PlatSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            single: null,
            multi: null,
            restaurants: []
        }
    }

    handleChangeMin = (event, value) => {
        this.props.setPrix(value,this.props.prixMax)
    };

    handleChangeMax = (event, value) => {
        this.props.setPrix(this.props.prixMin,value)
    };

    handleChange = name => value => {
        this.setState({
            [name]: value,
        });
        /*var temp = [];
        this.state.restaurants.filter(x => {
            if (x.id === this.state.single)
                temp.push(x);
        });
        console.log("temp " ,temp);*/
    };



    componentWillMount() {
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

    handleClickRestaurant(e) {
        e.preventDefault();
        this.props.hasValueClick(false);
        this.props.handleClickRestaurant(this.state.single.value);
    }
    render() {
        var restaurantList = [];
        if (this.state.restaurants.length > 0) {
            restaurantList = this.state.restaurants.map(restaurant => ({
                value: restaurant,
                label: restaurant.nom
            }));;
        }

        const { valueMin, valueMax } = this.state;
        const { classes, theme } = this.props;
        const selectStyles = {
            input: base => ({
                ...base,
                color: theme.palette.text.primary,
                '& input': {
                    font: 'inherit',
                },
            }),
        };

        return (
            <div id="platSearch">
                <form noValidate autoComplete="off">
                    <NoSsr>
                        <Select
                            classes={classes}
                            styles={selectStyles}
                            options={restaurantList}
                            components={Components}
                            value={this.state.single}
                            onChange={this.handleChange('single')}
                            placeholder="Restaurants"
                            isClearable
                        />
                        <div className={classes.divider} />
                        <div className={classes.root}>
                            <Typography id="valueMin">Prix min : {this.props.prixMin} RS</Typography>
                            <Slider
                                id="valueMin_"
                                classes={{ container: classes.slider }}
                                value={parseFloat(this.props.prixMin)}
                                aria-labelledby="valueMin"
                                style={{height : "auto"}}
                                onChange={this.handleChangeMin}
                                max="5000"
                            />
                        </div>
                        <div className={classes.root}>
                            <Typography id="valueMax">Prix max : {this.props.prixMax} RS</Typography>
                            <Slider
                                id="valueMax_"
                                classes={{ container: classes.slider }}
                                value={parseFloat(this.props.prixMax)}
                                style={{height : "auto"}}
                                aria-labelledby="valueMax"
                                onChange={this.handleChangeMax}
                                max="5000"
                            />
                        </div>
                    </NoSsr>
                    <Button variant="contained" color="secondary" fullWidth className="custom-btn" onClick={(e) => this.handleClickRestaurant(e)}>Rechercher</Button>
                </form>
            </div>
        );
    }
}

PlatSearch.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};
export default withStyles(Utils.styles, { withTheme: true })(PlatSearch);