import React from 'react';
import { Icon } from "fundamental-react";
import GoogleMapReact from 'google-map-react';

// const AnyReactComponent = ({ text }) => <div>{text}</div>;
  

export default class Map extends React.Component {
    static defaultProps = {
        center: {
            lat: 0,
            lng: 0
        },
        zoom: 1
    };

    constructor(props) {
        super(props);
        this.state = {
            center: {
                lat: 59.95,
                lng: 30.33
            },
            zoom: 11
        };
    }

    render() {
        return (
            <>
                {/* Important! Always set the container height explicitly */}
                <div style={{ height: '40vh', width: '100%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "AIzaSyD9Zv2VxSNm3BFTwMVGnyca-low1U0wwz4" }}
                        center={this.props.mapControls.center}
                        zoom={this.props.mapControls.zoom}
                        options={()=>{
                            return {
                                    panControl: false, // Depricated anyway, so setting this to true makes no difference
                                    mapTypeControl: false, // Turn off the Satellite/Map selector buttons
                                    scrollwheel: true, // Doesn't make a difference is gestureHandling is set to "none"
                                    gestureHandling: "cooperative", // Use "cooperative" to force using CMD+scroll, can also use "auto" to set greedy or cooperative based on window size, can also set to greedy for lots of control, can be set to none
                                    zoomControl: false,
                                    // styles: [{ stylers: [{ 'saturation': -100 }, { 'gamma': 0.8 }, { 'lightness': 4 }, { 'visibility': 'on' }] }]
                                };
                        }}
                    >
                        {/* SAP NSQ */}
                        <Icon glyph="factory" lat={39.988358} lng={-75.415309} size={"xl"}/>
                        {/* SAP PALO ALTO */}
                        <Icon glyph="factory" lat={37.398490} lng={-122.145730} size={"xl"}/>
                        {/* SAP GERMANY */}
                        <Icon glyph="factory" lat={49.293369} lng={8.641660} size={"xl"}/>
                    </GoogleMapReact>
                </div>
            </>
        );
    }
}