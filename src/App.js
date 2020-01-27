import React from "react";
import Axios from "axios";
import * as _ from "lodash";
import * as Faker from "faker";

import {
  Shellbar as FundamentalShellbar,
  TabGroup as FundamentalTabGroup,
  Tab as FundamentalTab,
  Icon as FundamentalIcon,
  Button as FundamentalButton,
  LayoutGrid as FundamentalLayoutGrid,
  Panel as FundamentalPanel,
  SearchInput as FundamentalSearchInput
} from "fundamental-react"; import {
  ThemeProvider as UI5ThemeProvider,
  Timeline as UI5Timeline,
  TimelineItem as UI5TimelineItem
} from "@ui5/webcomponents-react"; import {
  DonutChart as UI5DonutChart
} from "@ui5/webcomponents-react-charts";

// DEBUGGING -----------------
const pollingEnabled = false;
// ---------------------------

const pollingInterval = 1000; // Polling interval in milliseconds
const numberOfDummyPallets = 5; // Number of fake pallets to generate
const dummyPalletUpdateInterval = 1000; // Fake pallet refresh interval in milliseconds
const alertDataURL = "https://braiden.net/sap/coldchain-ui/backend/ext-alert.json"; // Alert OData endpoint URL
const deviceDataURL = "https://braiden.net/sap/coldchain-ui/backend/ext-device.json"; // Device OData endpoint URL

// Define variables to hold the data fetched from the OData endpoints
let alertResponseData;
let deviceResponseData;
let dummyPalletAlertResponseData=[];
let dummyPalletDeviceResponseData=[];

const randomString = (length, chars)=> {
    let result = "";
    for (let i=length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

let dummyPallets=[];
for (let i=0; i<numberOfDummyPallets; i++) {
    dummyPallets.push({
        "alertData": {
            "Time": new Date().toLocaleTimeString(),
            "Bridgeevent": "0000000314",
            "Tor": 10,
            "Orgin": 0,
            "Kpiuom": "F",
            "Kpivalue": 45,
            "Kpithreshold": 40,
            "Kpiprevious1": 57,
            "Kpiprevious2": 57,
            "Kpiprevious3": 101,
            "Kpiprevious4": 101,
            "Kpiprevious5": 57,
            "Kpiprevious6": 57,
            "Kpiprevious7": 57,
            "Deviceid": `smart_pallet_${i+2}`,
            "Deviceguid": randomString(32, "0123456789abcdefghijklmnopqrstuvwxyz"),
            "Devicetitle": `smart_pallet_${i+2}`,
            "Deviceheadername": "Device ID",
            "Deviceheadervalue": `smart_pallet_${i+2}`,
            "Deviceheadername2": "Handling Unit ID",
            "Deviceheadervalue2": randomString(18, "0123456789"),
            "Deliveryguid": Faker.random.uuid(),
            "Deliveryheadername3": "Delivery ID",
            "Deliveryheadervalue3": randomString(8, "0123456789"),
            "Deliverybodyname": "Affected Customer",
            "Deliverybodyvalue": Faker.company.companyName(),
            "Deliverybodyname2": "Contact",
            "Deliverybodyvalue2": Faker.name.firstName()+" "+Faker.name.lastName(),
            "Shipmentguid": Faker.random.uuid(),
            "Shipmentname": "Shipment ID",
            "Shipmentvalue": " 000000"+_.random(1000, 2000),
            "Shipmentsubtitle": "1 Remaining Delivery"
        },
        "deviceData": {
            "Thingid": "8EA3F47F93444CD1B47432C936A7D895",
            "Tor": "0 mins",
            "Lasttimeinfridge": "2019-10-25T20:10:35.214Z",
            "Temperature": "36",
            "Currenttime": "2019-10-25T20:30:15.394Z",
            "Deviceguid": "934bd5c8f20a42e4a7bb187f68bb650a",
            "Handlingunitid": "6100056700000018212",
            "Locationstatus": "In Refrigeration"
        }
    });
}

console.log(dummyPallets);

// Define variable to hold the generated temperatures for the dummy pallets
// let dummyTemps=[];

// Add an authorization header (containing the METDEMO auth) to all outbound GET requests
Axios.defaults.headers.get["Authorization"] = "Basic STg2MTY0ODoxMkdvb2dsZUA0";

// const setIntervaldummyTemps = palletIndex => {
//     dummyTemps[palletIndex] = _.random(26, 39.99);
//     dummyTemps[palletIndex] = Number(dummyTemps[palletIndex].toFixed(2));
//     setInterval(()=>{
//         if (dummyTemps[palletIndex] <= 32) {
//             dummyTemps[palletIndex]+=_.random(0.99,1.99);
//             dummyTemps[palletIndex] = Number(dummyTemps[palletIndex].toFixed(2));
//         } else if (dummyTemps[palletIndex] >= 42) {
//             dummyTemps[palletIndex]+=_.random(-0.99,-1.99);
//             dummyTemps[palletIndex] = Number(dummyTemps[palletIndex].toFixed(2));
//         } else {
//             dummyTemps[palletIndex]+=_.random(-1.99,1.99);
//             dummyTemps[palletIndex] = Number(dummyTemps[palletIndex].toFixed(2));
//         }
//     }, dummyPalletUpdateInterval);
// };

// for (let i = 0; i < numberOfDummyPallets; i++) {
//     setIntervaldummyTemps(i);
// } setInterval(()=>{
//     console.log(dummyTemps);
// }, dummyPalletUpdateInterval);
// console.log(dummyTemps);

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageProperties: {
                isPageLoading: true
            },
            cardProperties: {
                allCardsCollapsed: true
            }
        };
    }

    componentDidMount = ()=> {
        console.log("[APP COMPONENT LOADED]");

        this.generateDummyPalletData();

        // Begin fetching device and alert data from the provided OData endpoints
        if (pollingEnabled) {
            setInterval(()=> {
                this.fetchData();
            }, pollingInterval);
        }

        this.setState({
            pageProperties: {
                isPageLoading: false
            }
        });
    }

    componentWillUnmount = ()=> {
        // Called when the main app component is about to be unloaded from memory
    }

    generateDummyPalletData = ()=> {
        // Clear the dummy pallet response data arrays
        dummyPalletAlertResponseData=[];
        dummyPalletDeviceResponseData=[];

        for (let i = 0; i < numberOfDummyPallets; i++) {
            console.log("CREATING A DUMMY PALLET...");
            const dummyPalletId = i+2;
            // dummyData.Deviceid = `smart_pallet_${dummyPalletId}`;
            // dummyData.Deviceheadervalue = `smart_pallet_${dummyPalletId}`;
            // console.log(dummyData);

            dummyPalletAlertResponseData.push({
                "Time": new Date().toLocaleTimeString(),
                "Bridgeevent": "0000000314",
                "Tor": 10,
                "Orgin": 0,
                "Kpiuom": "F",
                "Kpivalue": 45,
                "Kpithreshold": 40,
                "Kpiprevious1": 57,
                "Kpiprevious2": 57,
                "Kpiprevious3": 101,
                "Kpiprevious4": 101,
                "Kpiprevious5": 57,
                "Kpiprevious6": 57,
                "Kpiprevious7": 57,
                "Deviceid": `smart_pallet_${dummyPalletId}`,
                "Deviceguid": "edc9d60e53d34d41a22aff0157e9c5dd",
                "Devicetitle": "smart_pallet_4",
                "Deviceheadername": "Device ID",
                "Deviceheadervalue": `smart_pallet_${dummyPalletId}`,
                "Deviceheadername2": "Handling Unit ID",
                "Deviceheadervalue2": "610005670000001824",
                "Deliveryguid": "23ec80a0-51b2-11e7-90a5-7112aa58ce36",
                "Deliveryheadername3": "Delivery ID",
                "Deliveryheadervalue3": "80000369",
                "Deliverybodyname": "Affected Customer",
                "Deliverybodyvalue": "ACME",
                "Deliverybodyname2": "Contact",
                "Deliverybodyvalue2": "ACME",
                "Shipmentguid": "860dc580-5245-11e7-b785-23c34afa19e6",
                "Shipmentname": "Shipment ID",
                "Shipmentvalue": " 0000001301",
                "Shipmentsubtitle": "1 Remaining Delivery"
            });

            dummyPalletDeviceResponseData.push({
                
            });
        }
    }

    formatAlertData = ()=> {
        // Clean up alert data
        alertResponseData = alertResponseData.d.results;
        alertResponseData.map(obj => {
            delete obj.__metadata;
            obj.Deviceid = "smart_pallet_1";
            obj.Deviceheadervalue = "smart_pallet_1";
        });

        // Append dummy pallet alert data
        

        // Remove and return the first element from the array (smart_pallet_1)
        // console.log(alertResponseData.shift());
    }

    formatDeviceData = ()=> {
        // Clean up device data
        deviceResponseData = deviceResponseData.d.results;
        deviceResponseData.map(obj => {
            delete obj.__metadata;
        });
    }

    // This function provides a way to get all of the data from both endpoints at the same time in a predictable fashion
    fetchData = ()=> {
        Axios.get(deviceDataURL).then(deviceResponse => {
            deviceResponseData = deviceResponse.data;
            Axios.get(alertDataURL).then(alertResponse => {
                alertResponseData = alertResponse.data;
                this.formatAlertData();
                this.formatDeviceData();
            });
        });
    }

    render = ()=> {
        return (
        <UI5ThemeProvider>
            <FundamentalShellbar
            logo={<img alt="SAP" src="//unpkg.com/fundamental-styles/dist/images/sap-logo.png"/>}
            productTitle="Cold Chain Monitoring"
            profile={{
                initials: 'QS',
                userName: 'Quintin Scheitlin'
            }}
            profileMenu={[]}
            />
            <FundamentalTabGroup>
                <FundamentalTab id={"overview-tab"} title={" Overview"} glyph={"overview-chart"}>

                </FundamentalTab>
                <FundamentalTab id={"pallets-tab"} title={" Pallets"} glyph={"shelf"}>
                    
                </FundamentalTab>
                <FundamentalTab id={"alerts-tab"} title={" Alerts"} glyph={"message-error"}>

                </FundamentalTab>
                <FundamentalTab id={"developer-tab"} title={" Developer Tools"} glyph={"source-code"}>
                    <h1>Debug Menu</h1>
                    <FundamentalButton onClick={()=>{
                        this.fetchData();
                    }}>
                        Fetch Data
                    </FundamentalButton>
                    <FundamentalButton onClick={()=>{
                        this.generateDummyPalletData();
                    }}>
                        Generate Dummy Pallet Data
                    </FundamentalButton>
                </FundamentalTab>
            </FundamentalTabGroup>
        </UI5ThemeProvider>
        );
    }
}