import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import TablePagination from './tablePaginationActions';
import Config from '../../../config/config';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import loaderMin from "../../../../assets/images/loader-min1.gif";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class RestaurantList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 5,
            hasValue: false,
            typeCuisine: [],
        }
    }


    componentWillMount() {

    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ page: 0, rowsPerPage: event.target.value });
    };

    render() {

        const { rows, classes, fullScreen } = this.props;
        const { rowsPerPage, page } = this.state;
        if (this.props.rows.length > 0 && !this.state.hasValue) {
            this.setState({
                hasValue: true
            })
        }
        return (

            <div>

                <Button variant="contained" color="secondary" className={classes.button} onClick={() => this.props.handleClickAddButton(true)}>
                    Ajouter un restaurant
                    <AddIcon className={classes.rightIcon} />
                </Button>
                {
                    !this.state.hasValue &&
                    <div>
                        <p>Récupération des données</p>
                        <img src={loaderMin} alt="min-loader" className="mini-loader" />
                    </div>
                }
                {
                    this.state.hasValue &&

                    <Paper className={classes.root}>
                        <div className={classes.tableWrapper}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        {
                                            Config.restauranTableHead.map((title, index) => {
                                                return (<TableCell key={index}>{title}</TableCell>);
                                            })
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                        return (
                                            <TableRow key={row.id}>
                                                <TableCell>{row.nom}</TableCell>
                                                <TableCell>{row.description}</TableCell>
                                                <TableCell>{row.adresse}</TableCell>
                                                <TableCell>{row.telephone}</TableCell>
                                                <TableCell><Button size="small" color="secondary" variant="contained" className={classes.button + " banner-admin"} onClick={(e) => this.props.handleClickOpenModal(e, row, false)}>...</Button></TableCell>
                                                <TableCell><Fab color="secondary" size="small" aria-label="Edit" className={classes.fab} onClick={(e) => this.props.setUpdateRestaurant(row, true)}><Icon>edit_icon</Icon></Fab></TableCell>
                                                <TableCell><IconButton aria-label="Delete" className={classes.margin}>
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton></TableCell>
                                            </TableRow>
                                        )
                                    })}

                                </TableBody>
                                <TableFooter>
                                    <TableRow className="pagination-custom">
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25]}
                                            colSpan={3}
                                            count={rows.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            SelectProps={{
                                                native: true,
                                            }}
                                            onChangePage={this.handleChangePage}
                                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                            ActionsComponent={TablePagination}
                                        />
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </div>
                    </Paper>
                }


                {
                    this.props.currentRestaurant !== null && this.props.currentRestaurant !== undefined &&
                    <Dialog
                        fullScreen={fullScreen}
                        open={this.props.open}
                        onClose={this.handleClose}
                        aria-labelledby="responsive-dialog-title"
                        fullWidth={true}
                        maxWidth={'md'}
                    >
                        <DialogTitle id="responsive-dialog-title">{this.props.currentRestaurant.nom}</DialogTitle>
                        <DialogContent>

                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Id</TableCell>
                                        <TableCell>Nom</TableCell>
                                        <TableCell>Description</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        this.props.currentRestaurant.typeDeCuisine !== undefined &&
                                        this.props.currentRestaurant.typeDeCuisine.map(row => {
                                            return (
                                                <TableRow key={row.id}>
                                                    <TableCell>{row.id}</TableCell>
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
                            <Button onClick={() => this.props.handleCloseModal()} color="primary">Fermer</Button>
                        </DialogActions>
                    </Dialog>
                }

            </div>
        );
    }
}

RestaurantList.propTypes = {
    classes: PropTypes.object.isRequired

};

export default withStyles(styles)(RestaurantList);
