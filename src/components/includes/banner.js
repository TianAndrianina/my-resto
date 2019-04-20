import React from 'react';

class Banner extends React.Component {
    render() {
        return (
            <div id="header">
                <div className="header-parent">
                    <h2 className="title_header">MY RESTO</h2>
                    <span>Somewhere between love and food lies summer, and it's looking good from our plate. Try our new summer inspired menu today.</span>
                </div>
            </div>
        );
    }
}

export default Banner;