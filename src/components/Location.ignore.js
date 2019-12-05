import React from "react";

export default class Location extends React.Component {
    getLocation = ()=> {
        const isGeolocationSupported = navigator.geolocation ? true : false
        if (isGeolocationSupported) {
            navigator.geolocation.getCurrentPosition((location)=>{
                console.log("Current location:",location);
                return location;
            });
        } else {
            console.warn("Location is not supported in your browser!");
        }
    }
}