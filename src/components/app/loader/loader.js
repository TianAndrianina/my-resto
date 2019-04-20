import React from 'react';
import loader from "../../../assets/images/loader.gif"
class Loader extends React.Component {
    
    render() {
        var isLoading = this.props.isLoading;
        return (
            <div className="loading">
                {
                    isLoading &&
                    <div id="loader-wrapper">
                        <div id="loader">
                            <img src={loader} />    
                        </div>


                        <div className="loader-section section-left"></div>
                        <div className="loader-section section-right"></div>

                    </div>
                }
            </div>
        );
    }
}

export default Loader;