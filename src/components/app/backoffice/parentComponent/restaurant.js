import React from 'react';
import RestaurantList from '../list/restaurantList';
import RestaurantFormulaire from '../formulaire/restaurantFormulaire';
import base from "../../../../base/base";
import CustomModal from "../formulaire/modal";
class Restaurant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            colList: "col-md-12",
            colAdd: "",
            open: false,
            isUpdate: false,
            rows: [],
            currentRestaurant: null,
            modalDeleteOpen : false,
        }
    }

    componentWillMount() {
        this.ref = base.syncState("restaurants", {
            context: this,
            state: 'rows',
            asArray: true
        })
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
    handleClickOpenModal = (e, restaurant, isUpdate_) => {
        e.preventDefault();
        this.setState({
            currentRestaurant: restaurant,
            open: true,
            isUpdate: isUpdate_,
            hasUpdateCheckbox: false,
            hasInitialized: false
        });
    };



    handleClickAddButton(show) {
        if (show == true) {
            this.setState({
                colList: "col-md-8",
                colAdd: "col-md-4",
                currentRestaurant: null,
                hasInitialized: false
            })
        }
        else {
            this.state = {
                colList: "col-md-12",
                colAdd: "",
                currentRestaurant: null,
                hasInitialized: false
            }
        }
    }

    setUpdateRestaurant(currentRestaurant, value) {

        this.setState({
            currentRestaurant: currentRestaurant,
            isUpdate: value,
            hasUpdateCheckbox: false,
            colList: "col-md-8",
            colAdd: "col-md-4"
        })
    }

    setUpdateCheckbox() {
        this.setState({
            hasUpdateCheckbox: true
        })
    }

    setModalDelete(show){
        if(show === undefined)
            show = true;
        this.setState({
            modalDeleteOpen : show
        })
    }

    setInitializedContent(value) {
        this.setState({
            hasInitialized: value
        })
    }

    handleAddRestaurant(restaurant) {
        var restaurantCopy = [...this.state.rows];
        if (!this.state.isUpdate) {
            restaurantCopy.push(restaurant);
            this.setState({
                rows: restaurantCopy,

            })
        }
        else {
            debugger;
            var indexOfUpdate = -1;
            restaurantCopy.filter((x, index) => {
                if (x.id === restaurant.id) {
                    debugger;
                    indexOfUpdate = index;
                }
            })
            restaurantCopy[indexOfUpdate] = restaurant;
            if (restaurantCopy.length !== 0) {
                this.setState({
                    rows: restaurantCopy,
                })
            }

        }

    }


    render() {
        return (

            <div className="row">
                <div className={this.state.colList}>
                    <RestaurantList handleClickAddButton={this.handleClickAddButton.bind(this)}
                        handleClickOpenModal={this.handleClickOpenModal.bind(this)}
                        handleCloseModal={this.handleCloseModal.bind(this)}
                        open={this.state.open}
                        rows={this.state.rows}
                        currentRestaurant={this.state.currentRestaurant}
                        setUpdateRestaurant={this.setUpdateRestaurant.bind(this)}
                        setModalDelete={this.setModalDelete.bind(this)} />
                </div>
                {
                    this.state.colAdd !== "" &&
                    <div className={this.state.colAdd}>
                        <RestaurantFormulaire handleClickAddButton={this.handleClickAddButton.bind(this)} handleClickOpenModal={this.handleClickOpenModal.bind(this)} extendTable={this.extendTable.bind(this)}
                            open={this.state.open}
                            isUpdate={this.state.isUpdate}
                            currentRestaurant={this.state.currentRestaurant}
                            handleAddRestaurant={this.handleAddRestaurant.bind(this)}
                            setUpdateCheckbox={this.setUpdateCheckbox.bind(this)}
                            hasUpdateCheckbox={this.state.hasUpdateCheckbox}
                            setInitializedContent={this.setInitializedContent.bind(this)}
                            hasInitialized={this.state.hasInitialized}
                        />
                    </div>
                }
                <CustomModal open={this.state.modalDeleteOpen} handleCloseModal={this.setModalDelete.bind(this)} message="Voulez-vous suppprimer le contenu?" />
            </div>
        );
    }
}

export default Restaurant;