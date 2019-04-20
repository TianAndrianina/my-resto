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
import base from "../../../../base/base";
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
class MenuList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 5,
            hasValue: false,
        }
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ page: 0, rowsPerPage: event.target.value });
    };

    render() {

        const { menus, plats, restaurants, currentMenu, classes, fullScreen } = this.props;
        const { rowsPerPage, page } = this.state;
        var styleDialog = {
            width: "400px"
        }
        return (

            <div>
                <Button variant="contained" color="secondary" className={classes.button} onClick={() => this.props.handleClickAddButton(true)}>
                    Ajouter/Modifer un menu
                    <AddIcon className={classes.rightIcon} />
                </Button>
                <Paper className={classes.root}>
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    {
                                        Config.menuTableHead.map((title, index) => {
                                            return (<TableCell key={index}>{title}</TableCell>);
                                        })
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {menus.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                    return (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.restaurant.nom}</TableCell>
                                            <TableCell><Button size="small" color="secondary" variant="contained" className={classes.button + " banner-admin"} onClick={(e) => this.props.handleClickOpenModal(e, row, false)}>...</Button></TableCell>
                                            <TableCell>{row.dateCreation}</TableCell>
                                        </TableRow>
                                    )
                                })}

                            </TableBody>
                            <TableFooter>
                                <TableRow className="pagination-custom">
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        colSpan={3}
                                        count={menus.length}
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
                {
                    currentMenu !== null && currentMenu !== undefined &&
                    <Dialog
                        open={this.props.open}
                        onClose={this.handleClose}
                        aria-labelledby="responsive-dialog-title"
                        fullWidth={true}
                        maxWidth={'md'}

                    >
                        <DialogTitle id="responsive-dialog-title">Menu chez {currentMenu.restaurant.nom}</DialogTitle>
                        <DialogContent>

                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nom du menu</TableCell>
                                        <TableCell>Entrée</TableCell>
                                        <TableCell>Plat</TableCell>
                                        <TableCell>Dessert</TableCell>
                                        <TableCell>Boisson</TableCell>
                                        <TableCell>Prix</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        currentMenu.menuChoix.map((row, index) => {

                                            return (
                                                <TableRow key={row.id}>
                                                    <TableCell>{row.nom}</TableCell>
                                                    {
                                                        Config.platsKey.map((key, i) => {
                                                            var platByKey = row.menu[key];
                                                            return (
                                                                <TableCell key={i}>{platByKey.nom}</TableCell>
                                                            )

                                                        })
                                                    }

                                                    <TableCell><b>{row.prix} RS</b></TableCell>

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


MenuList.propTypes = {
    classes: PropTypes.object.isRequired

};

export default withStyles(styles)(MenuList);