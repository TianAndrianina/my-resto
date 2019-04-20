import React from 'react';
import Config from "../../config/config";
import Button from '@material-ui/core/Button';
function RestaurantLeft(props) {
    var style = {
        width: "100%"
    }
    return (
        <div className="jumbotron content-menu">
            {
                !props.hasValue &&
                <div>
                    <p>Récupération des données</p>
                    <img src={props.loaderMin} alt="min-loader" className="mini-loader" />
                </div>
            }{
                props.hasValue &&
                <div>
                    <h4 className="menu-title">Liste des Restaurants</h4>
                    <div className="row">
                        {
                            props.restaurantsdecoupee.map((restaurant, index) => {
                                return (
                                    <div className="col-md-4 col-sm-12" key={index}>
                                        <div className="polaroid" onClick={(e) => { props.handleClickRestaurant(e, index) }}>
                                            <div className="container-img">
                                                <img src={Config.URL_IMAGE + restaurant.photo + Config.URS_TOKEN} alt="Norway" style={style} />
                                                <div className="bottom-left"></div>
                                                <div className="bottom-right"></div>
                                            </div>
                                            <div className="container">
                                                <p>{restaurant.nom}</p>
                                                <span>{restaurant.description}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className="load-more">
                        {
                            //props.restaurantAllSearch.length > props.restaurantsdecoupee.length &&
                            <div>
                                <Button variant="contained" color="primary" className="button-primary custom-btn" onClick={(e) => props.handleLoadMore(e)}>Load more...</Button>
                                {
                                    props.loadData &&
                                    <img src={props.loaderMin} alt="min-loader" className="mini-loader" />
                                }
                            </div>
                        }

                    </div>
                </div>
            }
        </div>

    );
}

export default RestaurantLeft;