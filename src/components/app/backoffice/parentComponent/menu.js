import React from 'react';
import RestaurantList from '../list/restaurantList';
import RestaurantFormulaire from '../formulaire/restaurantFormulaire';
import base from "../../../../base/base";
import CustomModal from "../formulaire/modal";
import MenuList from "../list/menuList"
import MenuFormulaire from "../formulaire/menuFormulaire";
import loaderMin from "../../../../assets/images/loader-min1.gif";
class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            colList: "col-md-12",
            colAdd: "",
            open: false,
            isUpdate: false,
            menus: [],
            restaurants: [],
            plats: [],
            currentMenu: null,
            modalDeleteOpen: false,
            hasMenuValue: false
        }
    }

    componentWillMount() {
        this.ref = base.syncState("menu", {
            context: this,
            state: 'menus',
            asArray: true
        })
        base.fetch('plats', {
            context: this,
            asArray: true,
            then(data) {
                //console.log(data);
                this.setState({
                    plats: data,
                    isLoading: true
                })

            }
        });
        base.fetch('restaurants', {
            context: this,
            asArray: true,
            then(data) {
                //console.log(data);
                this.setState({
                    restaurants: data,
                    isLoading: true
                })

            }
        });


    }

    handleCloseModal = () => {
        this.setState({
            open: false,
            colList: "col-md-12",
            colAdd: "",
        });
    };

    extendTable = () => {
        this.setState({
            colList: "col-md-12",
            colAdd: "",
        });
    };

    actionMenuToDB(e, menuByRes, restaurant) {
        var menus = [...this.state.menus];

        menus.map((m, index) => {
            if (m.restaurant.id === restaurant.id) {
                menus[index] = menuByRes[0];
            }
        })

        var newMenu = menus;
        if (newMenu.length > 0) {
            this.setState({
                menus: newMenu
            })
        }

    }



    handleClickAddButton(show) {
        if (show == true) {
            this.setState({
                colList: "col-md-8",
                colAdd: "col-md-4"
            })
        }
        else {
            this.state = {
                colList: "col-md-12",
                colAdd: ""
            }
        }
    }


    setModalDelete(show) {
        if (show === undefined)
            show = true;
        this.setState({
            modalDeleteOpen: show
        })
    }

    setInitializedContent(value) {
        this.setState({
            hasInitialized: value
        })
    }

    setUpdateMenu(menu, value) {

    }

    handleClickOpenModal(e, menu, isUpdate_) {
        e.preventDefault();
        this.setState({
            currentMenu: menu,
            open: true,
            isUpdate: isUpdate_,
            hasUpdateCheckbox: false,
            hasInitialized: false
        });

    }




    render() {
        var { menus, hasMenuValue, plats, restaurants, colList, colAdd, currentMenu } = this.state;
        if (menus.length > 0 && !hasMenuValue) {
            this.setState({
                hasMenuValue: true
            })
        }
        return (
            <div>
                {
                    !hasMenuValue &&
                    <div>
                        <p>Récupération des données</p>
                        <img src={loaderMin} alt="min-loader" className="mini-loader" />
                    </div>
                }
                {
                    hasMenuValue &&
                    <div className="row">
                        <div className={colList}>
                            <MenuList
                                menus={menus}
                                plats={plats}
                                restaurants={restaurants}
                                handleClickAddButton={this.handleClickAddButton.bind(this)}
                                setUpdateMenu={this.setUpdateMenu.bind(this)}
                                handleClickOpenModal={this.handleClickOpenModal.bind(this)}
                                currentMenu={currentMenu}
                                open={this.state.open}
                                handleCloseModal={this.handleCloseModal.bind(this)}
                            />
                        </div>
                        {
                            colAdd !== "" &&
                            <div className={colAdd}>
                                <MenuFormulaire
                                    restaurants={restaurants}
                                    menus={menus}
                                    actionMenuToDB={this.actionMenuToDB.bind(this)}
                                />
                            </div>
                        }

                    </div>
                }
            </div>

        );
    }
}

export default Menu;