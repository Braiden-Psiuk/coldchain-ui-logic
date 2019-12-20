// import React from "react";

// import {
//   LayoutGrid,
//   Panel
// } from "fundamental-react";

// import {
//   ThemeProvider,
//   Timeline,
//   TimelineItem,
//   AnalyticalTable,
//   Button
// } from "@ui5/webcomponents-react";

// import Map from "./components/Map";

// import { DonutChart } from "@ui5/webcomponents-react-charts";

// // This needs to be imported if using the app in a production scenario. It allows
// // for components of the app to be translated based on the user's region.
// // We are not using it here, as it likely requires configuration of webpack.
// // import "@ui5/webcomponents/dist/json-imports/i18n.js";

// const GOOGLE_MAP_API_KEY = "AIzaSyD9Zv2VxSNm3BFTwMVGnyca-low1U0wwz4";
// const GOOGLE_MAP_HEIGHT = "20em";

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isPageLoading: true,
//       palletData: []
//     };
//   }

//   componentDidMount() {
//     this.fetchPalletData();
//     this.fetchingInterval = setInterval(()=>{
//       this.fetchPalletData();
//     }, 1000);
//   }

//   // componentWillUnmount() {
//   //   
//   // }

//   removeLoadingIndicators() {
//     this.setState({isPageLoading: false});
//   }

//   fetchPalletData() {
//     const xhr = new XMLHttpRequest();
//     xhr.addEventListener("load", ()=> {
//       console.log(JSON.parse(xhr.responseText).d.results);
//     //   this.setState({palletData: JSON.parse(xhr.responseText).d.results});
//     //   this.removeLoadingIndicators();
//     });
//     // open the request with the verb and the url
//     xhr.open("GET", "https://metdemot1-iflmap.avtsbhf.eu1.hana.ondemand.com/gw/odata/SAP/EUP_ODATA_ALERTS_COPY;v=1/CNG_AlertSet?$format=json");
//     xhr.setRequestHeader("Authorization", "Basic STg2MTY0ODoxMkdvb2dsZUA0");
//     // send the request
//     xhr.send();
//   }

//   render() {
//     return (
//       <ThemeProvider>
//         <LayoutGrid cols={3}>
//           <Panel colSpan={3}>
//             <Panel.Body>
//               <h1>Test</h1>
//             </Panel.Body>
//           </Panel>
//           <Panel colSpan={6}>
//             <Panel.Body>
//               <h1>Test</h1>
//             </Panel.Body>
//           </Panel>
//           <Panel colSpan={6}>
//               <div style={{ width: "100%", height: GOOGLE_MAP_HEIGHT }}>
//                 <Map
//                   googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${GOOGLE_MAP_API_KEY}`}
//                   loadingElement={<div style={{ height: "100%" }} />}
//                   containerElement={<div style={{ height: "100%" }} />}
//                   mapElement={<div style={{ height: "100%" }} />}
//                 />
//               </div>
//           </Panel>
//           <Panel colSpan={3}>
//             <Panel.Header>
//               <h1>Pallets</h1>
//             </Panel.Header>
//             <Panel.Body>
//             {/* <div style={{display: "flex", flexDirection: "column"}}>
//               <AnalyticalTable
//                 title="Pallets"
//                 data={this.state.palletData}
//                 columns={[
//                   {
//                     Header: "Name",
//                     accessor: "name"
//                   },
//                   {
//                     Header: "GUID",
//                     accessor: "GUID"
//                   },
//                   {
//                     Header: "Refrigeration Status",
//                     accessor: "inRefrigeration"
//                   },
//                   {
//                     Header: "Temperature",
//                     accessor: "temperature"
//                   }
//                 ]}
//                 loading={this.state.isPageLoading}
//                 alternateRowColor
//                 minRows={0}
//               />
//             </div> */}
//             </Panel.Body>
//           </Panel>
//           <Panel colSpan={3}>
//             <br/>
//             <Button design={"Positive"} onClick={this.changeState}>
//               Click Me
//             </Button>
//           </Panel>
//         </LayoutGrid>
//       </ThemeProvider>
//     );
//   }
// }














// Import React
import React from "react";

// Import Fundamental React components
import {
    Shellbar,
    TabGroup,
    Tab,
    LayoutGrid,
    Panel,
    Icon,
    Identifier,
    ButtonGroup,
    Button
} from "fundamental-react";

// Import UI5 Web components
import {
    ThemeProvider,
    ProgressIndicator, // Most likely won't use this!
    ValueState, // Most likely won't use this!
    AnalyticalCard,
    AnalyticalCardHeader,
    // Button, // Don't import Button from here! It will conflict with fundamental-react buttons!
    TextAlign,
    Select,
    Option
} from "@ui5/webcomponents-react";
import {
    DonutChart,
    MicroBarChart,
    PieChart,
    LineChart
} from "@ui5/webcomponents-react-charts";

// Import Google Map components
import Map from "./components/Map";

import "./assets/bootstrap/bootstrap.min.css";

import * as moment from "moment";

// Import Internationalization file
// import "@ui5/webcomponents/dist/json-imports/i18n.js";
// NOTE: This is only required if using the app in a production scenario. It allows
// for components of the app to be translated based on the user's location.
// I am not using it here, as it likely requires ejecting and configuration of webpack.

// Map Config no longer needed, as configuration is now done in a seperate Map component file
// Google Map configuration
// const GOOGLE_MAP_API_KEY = "AIzaSyD9Zv2VxSNm3BFTwMVGnyca-low1U0wwz4"; // API Key for Google Maps (This provided key is restricted and should only be used for testing)
// const GOOGLE_MAP_HEIGHT = "20em"; // Height of the Google Map component

// OData polling configuration
const ODATA_FETCH_DELAY = 2500; // Number of milliseconds between OData fetching calls
// const ALERT_DATA_URL = "https://metdemot1-iflmap.avtsbhf.eu1.hana.ondemand.com/gw/odata/SAP/EUP_ODATA_ALERTS_COPY;v=1/CNG_AlertSet?$format=json";
const ALERT_DATA_URL = "https://braiden.net/sap/coldchain-ui/backend/ext-alert.backup.json";
// I861648:12Google@4 [ -----REMOVE THIS LINE----- ]
const PALLET_DATA_URL = "";

// Temperature threshold configuration
const SAFE_VALUE_MIN = -120;
const SAFE_VALUE_MAX = 39.99;
const WARN_VALUE_MIN = 40;
const WARN_VALUE_MAX = 49.99;
const DANGER_VALUE_MIN = 50;
const DANGER_VALUE_MAX = 120;

const torBudget = 30; // Total number of minutes

// Debug configuration (THIS SHOULD BE REMOVED LATER)
const debug_temperature_degrees_1 = 38.37;
const debug_temperature_degrees_2 = 49.61;
const debug_temperature_degrees_3 = 57.27;
const debug_overview_number_pallets = 3;

// Define the App class
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPageLoading: true, // Boolean for determining whether to show loading animations on UI5 components
            isAlertFlashingAnimation: false, // Boolean for displaying flashing alert animation
            alertFlashingAnimationInterval: null, // Will be used to store an interval for the flashing animation
            alertData: [], // Data from the Alert OData endpoint will be stored here
            palletData: [], // Data from the Pallet OData endpoint will be stored here
            microBarChartData: [],
            analyticalTableData: [], // Initialize the data in AnalyticalTable components as empty
            currentTab: 0, // Current selected page tab
            mapControls: { // Map controls for Google Map, including lat/lon and zoom
                center: {
                    lat: 40.471165,
                    lng: -33.747521
                },
                zoom: 3
            },
            palletPicker: {
                currentlySelectedPallet: "smart_pallet_1"
            },
            chartData: [] // Stores chart data for all pallets, including temperature and time histories since page was loaded
        };
    }



    // chartData state array format:

    // [
    //     {
    //       "smart_pallet_1": {
    //         "history": [
    //           {
    //             "temperature": 34,
    //             "time": "8:04pm"
    //           },
    //           {
    //             "temperature": 35,
    //             "time": "8:05pm"
    //           }
    //         ]
    //       }
    //     },
    //     {
    //       "smart_pallet_2": {
    //         "history": [
    //           {
    //             "temperature": 34,
    //             "time": "8:04pm"
    //           },
    //           {
    //             "temperature": 35,
    //             "time": "8:05pm"
    //           }
    //         ]
    //       }
    //     }
    //   ]



    // Need to append the following:

    // {
    //   "smart_pallet_1": {
    //     "history": [
    //       {
    //         "temperature": 34,
    //         "time": "8:04pm"
    //       },
    //       {
    //         "temperature": 35,
    //         "time": "8:05pm"
    //       }
    //     ]
    //   }
    // }

    componentDidMount = ()=> {
        // console.log("App component mounted!");
        this.fetchPalletData();
        this.alertFlashingAnimationInterval = setInterval(()=>{
            this.fetchPalletData();
        }, ODATA_FETCH_DELAY);
    }

    // componentWillUnmount() {
    //     // Called when the main App component is about to be unmounted
    // }

    fetchPalletData() {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("load", ()=> {
            const results = JSON.parse(xhr.responseText).d.results;
            // console.log(results);
            let microBarChartData = [];
            for (let pallet of results) {
                microBarChartData.push({label: pallet["Deviceid"], value: pallet["Kpivalue"]}) // [{label: "Pallet 1", value: 10}]
            }
            microBarChartData.push({label: "FIXED_LENGTH_DATAPOINT", value: DANGER_VALUE_MAX});
            // console.warn(microBarChartData);
            microBarChartData.push();
            this.setState({
                palletData: results,
                microBarChartData: microBarChartData,
                isPageLoading: false
            });
            // this.removeLoadingIndicators();
        });
        // open the request with the verb and the url
        xhr.open("GET", ALERT_DATA_URL);
        xhr.setRequestHeader("Authorization", "Basic STg2MTY0ODoxMkdvb2dsZUA0");
        // send the request
        xhr.send();
    }

    setProgressIndicatorColor = (palletTemp)=> {
        switch (true) {
            case (palletTemp >= SAFE_VALUE_MIN && palletTemp <= SAFE_VALUE_MAX):
                return ValueState.Success;
                break;
            case (palletTemp >= WARN_VALUE_MIN && palletTemp <= WARN_VALUE_MAX):
                return ValueState.Warning;
                break;
            case (palletTemp >= DANGER_VALUE_MIN && palletTemp <= DANGER_VALUE_MAX):
                    return ValueState.Error;
                    break;
            default:
                console.error("palletTemp falls outside of the specified ranges");
                return null;
        }
    }

    // createMicroBarChartData = ()=> {
        // const microBarChartData = [
        //     1,2,3,4
        // ];
        // microBarChartData.push({
        //     label: "__MAX_LENGTH_DATAPOINT__",
        //     value: DANGER_VALUE_MAX
        // })
        // return microBarChartData

        // [
        //     {
        //         label: "Pallet 1",
        //         value: 10
        //     },
        //     {
        //         label: "Pallet 2",
        //         value: 20
        //     },
        //     {
        //         label: "Pallet 3",
        //         value: 30
        //     },
        //     {
        //         label: "Pallet 4",
        //         value: 40
        //     },
        //     {
        //         label: "FIXED_LENGTH_DATAPOINT",
        //         value: DANGER_VALUE_MAX
        //     }
        // ]
    //     return [{label: "Pallet 1", value: 10}]
    // }

    render() {
        return (
            <ThemeProvider>
                <Shellbar logo={<img alt="SAP" src="//unpkg.com/fundamental-styles/dist/images/sap-logo.png"/>} productTitle="Coldchain Monitoring" profileMenu={[]}/>
                <TabGroup selectedIndex={this.state.currentTab}>
                    <Tab id="overview-tab" title=" Overview" glyph="overview-chart">
                        <LayoutGrid cols={6}>
                            <Panel colSpan={5}>
                                <Map mapControls={this.state.mapControls}/>
                            </Panel>
                            <Panel  colSpan={1}>
                                <Panel.Body style={{margin: "auto"}}>
                                    <Button type="standard" onClick={()=>{
                                        this.setState({
                                            mapControls: {
                                                center: {
                                                    lat: 39.988358,
                                                    lng: -75.415309
                                                },
                                                zoom: this.state.mapControls.zoom
                                            }
                                        });
                                    }}>Newtown Square, US</Button>
                                    <br/><br/>
                                    <Button type="standard" onClick={()=>{
                                        this.setState({
                                            mapControls: {
                                                center: {
                                                    lat: 37.398490,
                                                    lng: -122.145730
                                                },
                                                zoom: this.state.mapControls.zoom
                                            }
                                        });
                                    }}>Palo Alto, US</Button>
                                    <br/><br/>
                                    <Button type="standard" onClick={()=>{
                                        this.setState({
                                            mapControls: {
                                                center: {
                                                    lat: 49.293369,
                                                    lng: 8.641660
                                                },
                                                zoom: this.state.mapControls.zoom
                                            }
                                        });
                                    }}>Waldorf, DE</Button>
                                    <br/><br/>
                                    <ButtonGroup>
                                        <Button glyph="globe" onClick={()=>{
                                            this.setState({
                                                mapControls: {
                                                    center: {
                                                        lat: 40.471165,
                                                        lng: -33.747521
                                                    },
                                                    zoom: 3
                                                }
                                            });
                                        }}/>
                                        <Button glyph="sys-add" type="positive" onClick={()=>{
                                            this.setState({
                                                mapControls: {
                                                    zoom: (this.state.mapControls.zoom < 20) ? this.state.mapControls.zoom+1 : this.state.mapControls.zoom
                                                }
                                            });
                                        }}/>
                                        <Button glyph="sys-minus" type="negative" onClick={()=>{
                                            this.setState({
                                                mapControls: {
                                                    zoom: (this.state.mapControls.zoom > 3) ? this.state.mapControls.zoom-1 : this.state.mapControls.zoom
                                                }
                                            });
                                        }}/>
                                        <Button glyph="message-warning" type="medium" onClick={()=>{
                                            this.setState({
                                                currentTab: 1
                                            });
                                        }}/>
                                    </ButtonGroup>
                                </Panel.Body>
                            </Panel>
                        </LayoutGrid>
                        <LayoutGrid cols={6}>
                            <Panel colSpan={6}>
                                {/* <Panel.Header>
                                    <h1>Pallets</h1>
                                </Panel.Header> */}
                                <Panel.Body>
                                    <LayoutGrid cols={4}>
                                        <Panel colSpan={1}>
                                            <Panel.Header>
                                                <h3>Warehouse</h3>
                                            </Panel.Header>
                                            <Panel.Body>
                                                <p style={{display: "inline"}}>Tracking </p>
                                                <Identifier label={this.state.palletData.length+" pallets"} modifier="circle" size="xs">
                                                    {this.state.palletData.length}
                                                </Identifier>
                                                <p style={{display: "inline"}}> pallets</p>
                                            </Panel.Body>
                                        </Panel>
                                        <Panel colSpan={1}>
                                            <Panel.Header>
                                                <h3>Total Time Out of Refrigeration</h3>
                                            </Panel.Header>
                                            <Panel.Body>
                                                <DonutChart height={380} minHeight={50} minWidth={50}
                                                    labels={["Total Time Out of Refrigeration", "Total Time In Refrigeration"]}
                                                    datasets={[{data: [3, 97]}]}
                                                    valueAxisFormatter={(d)=>`${d}%`}
                                                    colors={["sapUiChartBad", "sapUiChartGood"]}
                                                    loading={false}
                                                />
                                            </Panel.Body>
                                        </Panel>
                                        <Panel colSpan={1}>
                                            <Panel.Header>
                                                <h3>Pallet Temperatures</h3>
                                            </Panel.Header>
                                            <Panel.Body>
                                                <MicroBarChart dataset={this.state.microBarChartData}
                                                colors={[
                                                    "#61A656", // Good
                                                    "#D32030", // Bad
                                                    "#E17B24" // Okay
                                                ]}
                                                visibleDatasetCount={this.state.palletData.length}
                                                />
                                            </Panel.Body>
                                        </Panel>
                                        <Panel colSpan={1}>
                                            <Panel.Header>
                                                <h3>Pallet Temperatures (Different Style)</h3>
                                            </Panel.Header>
                                            <Panel.Body>
                                                {/* {this.state.palletData.map((pallet)=>
                                                    <div><p style={{float: "left"}}>{pallet["Devicetitle"]}:</p><pre style={{float: "left"}}>{" "}</pre><ProgressIndicator percentValue={(pallet["Kpivalue"]/DANGER_VALUE_MAX)*100} state={this.setProgressIndicatorColor(pallet["Kpivalue"])} displayValue={<p>{debug_temperature_degrees_1}&deg;F</p>}/></div><br/>
                                                )} */}
                                                {/* {this.state.palletData.map((pallet)=>
                                                    <li>{pallet["Devicetitle"]} (temperature is currently {pallet["Kpivalue"]} degrees {pallet["Kpiuom"]}, TOR is {pallet["Tor"]} minutes)</li>
                                                )} */}
                                                
                                                {/* <div><p style={{float: "left"}}>Pallet 1:</p><pre style={{float: "left"}}>{" "}</pre><ProgressIndicator percentValue={(debug_temperature_degrees_1/DANGER_VALUE_MAX)*100} state={this.setProgressIndicatorColor(debug_temperature_degrees_1)} displayValue={<p>{debug_temperature_degrees_1}&deg;F</p>}/></div><br/>
                                                <div><p style={{float: "left"}}>Pallet 1:</p><pre style={{float: "left"}}>{" "}</pre><ProgressIndicator percentValue={(debug_temperature_degrees_2/DANGER_VALUE_MAX)*100} state={this.setProgressIndicatorColor(debug_temperature_degrees_2)} displayValue={<p>{debug_temperature_degrees_2}&deg;F</p>}/></div><br/>
                                                <div><p style={{float: "left"}}>Pallet 1:</p><pre style={{float: "left"}}>{" "}</pre><ProgressIndicator percentValue={(debug_temperature_degrees_3/DANGER_VALUE_MAX)*100} state={this.setProgressIndicatorColor(debug_temperature_degrees_3)} displayValue={<p>{debug_temperature_degrees_3}&deg;F</p>}/></div><br/> */}
                                            </Panel.Body>
                                        </Panel>
                                        <Panel colSpan={3}>
                                            <Panel.Body>
                                                <h2>Monitor your Pallets</h2>
                                                <div style={{display: "flex", flexWrap: "nowrap", backgroundColor: "LIGHTYELLOW"}}>
                                                    <Select
                                                        disabled={false}
                                                        valueState={null}
                                                        onChange={(passMeIn)=>{
                                                            this.setState({
                                                                mapControls: {
                                                                    center: {
                                                                        lat: 0,
                                                                        lng: 0
                                                                    },
                                                                    zoom: this.state.mapControls.zoom
                                                                }
                                                            });
                                                            console.log(passMeIn.parameters.selectedOption.innerText+" selected from picker!");
                                                        }}
                                                    >
                                                        {this.state.palletData.map((pallet)=>
                                                            <Option key={pallet["Devicetitle"]}>{pallet["Devicetitle"]}</Option>
                                                        )}
                                                    </Select>
                                                    <div style={{width: "75%"}}></div>
                                                </div>
                                                <LineChart labels={[1,2,3]} datasets={[{data: [28,32,39], label: "Temperature"}]} valueAxisFormatter={(d) => `${d}℉`} categoryAxisFormatter={(d) => `${d}min`}/>
                                            </Panel.Body>
                                        </Panel>
                                    </LayoutGrid>
                                </Panel.Body>
                            </Panel>
                        </LayoutGrid>
                    </Tab>
                    <Tab id="alerts-tab" title=" Alerts" glyph="message-warning">
                        <p>Pallets being retrieved from OData service:</p>
                        <ul>
                            {this.state.palletData.map((pallet)=>
                                <li key={pallet["Devicetitle"]}>{pallet["Devicetitle"]} (temperature is currently {pallet["Kpivalue"]} degrees {pallet["Kpiuom"]}, TOR is {pallet["Tor"]} minutes)</li>
                            )}
                        </ul>
                    </Tab>
                </TabGroup>
            </ThemeProvider>
        );
    }
}


// DEVELOPER NOTES:
// Can maybe use side navigation component from fundamental-react to keep elements on the same line