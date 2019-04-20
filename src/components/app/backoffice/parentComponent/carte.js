import React from 'react';
import base from "../../../../base/base";
import loaderMin from "../../../../assets/images/loader-min1.gif";
import CarteList from '../list/carteList';
class Carte extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            colList: "col-md-12",
            colAdd: "",
            open: false,
            restaurants: [],
            modalDeleteOpen: false,
            cartes : [],
            currentCarte: null,
            hasValue : false
        }
    }

    componentWillMount() {
        this.ref = base.syncState("carte", {
            context: this,
            state: 'cartes',
            asArray: true
        })
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


    handleClickOpenModal(e, carte, isUpdate_) {
        e.preventDefault();
        this.setState({
            currentCarte: carte,
            open: true,
            isUpdate: isUpdate_,
            hasUpdateCheckbox: false,
            hasInitialized: false
        });

    }




    render() {
        var {restaurants, colList, colAdd,cartes,hasValue,open,currentCarte} = this.state;
        if (cartes.length > 0 && !hasValue) {
            this.setState({
                hasValue: true
            })
        }
        return (
            <div>
                {
                    !hasValue &&
                    <div>
                        <p>Récupération des données</p>
                        <img src={loaderMin} alt="min-loader" className="mini-loader" />
                    </div>
                }
                {
                    hasValue &&
                    <div className="row">
                        <div className={colList}>
                            <CarteList
                                cartes={cartes}
                                restaurants={restaurants}
                                handleClickAddButton={this.handleClickAddButton.bind(this)}
                                handleClickOpenModal={this.handleClickOpenModal.bind(this)}
                                open={open}
                                currentCarte={currentCarte}
                                handleCloseModal={this.handleCloseModal.bind(this)}
                            />
                        </div>
                        {
                            colAdd !== "" &&
                            <div className={colAdd}>
                                
                            </div>
                        }

                    </div>
                }
            </div>

        );
    }
}

export default Carte;