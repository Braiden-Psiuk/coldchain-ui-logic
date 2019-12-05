[![Build Status](https://img.shields.io/github/forks/Braiden-Psiuk/coldchain-ui)](https://github.com/Braiden-Psiuk/coldchain-ui) [![Build Status](https://img.shields.io/github/stars/Braiden-Psiuk/coldchain-ui)](https://github.com/Braiden-Psiuk/coldchain-ui) [![License](https://img.shields.io/github/license/Braiden-Psiuk/coldchain-ui)](https://github.com/Braiden-Psiuk/coldchain-ui)

# Coldchain UI
Demo UI for the Coldchain Track and Trace scenario, based on the popular React framework.
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting started
1. Make sure you have a recent copy of Node.js. [**Node version 12.3.0**](https://nodejs.org/download/release/v12.3.0/) was used during development. *An equal or higher version will most likely work.*
2. Clone the project:
```bash
git clone https://github.com/Braiden-Psiuk/coldchain-ui.git
```
3. navigate to the project directory, install dependencies, and start a development server:
```bash
cd coldchain-ui
npm i
npm start
```
*If the development server doesn't start, you may need to run the following:*
```bash
npm i react-scripts@2.1.8
npm start
```
Optionally, here's a Bash one-liner that sets up everything for you:
```bash
git clone https://github.com/Braiden-Psiuk/coldchain-ui.git && cd coldchain-ui && npm i && npm start
```
The app should now be accessable at [**localhost:3000**](localhost:3000).

## 🚧 Security Information 🚧
The included Google Maps API key used in this application is not intended for production use. The key has been restricted and is only usable if the application is being served from http://localhost. If you deploy the application to a remote server, the provided API key will no longer work.

*This key has the same rate limits associated with a free Google Cloud Platform account, so please be considerate and do not abuse it.*

## To Do:
- Replace [fundamental-react](https://github.com/SAP/fundamental-react) components with [ui5-webcomponents-react](https://github.com/SAP/ui5-webcomponents-react) components
- Update *Warehouse Locator* search bar functionality
- Add ondrag event listener to the map, so that state can be updated with current view data to prevent broken map functionality when using drag controls
- Adjust color pallette for MicroBarChart + fix tailing data object generator function

## Fixes & Additions:
- Added Google Map panning functionality
- Added ability to consume multiple alerts via OData endpoint and map through them to generate display components
- Fixed the "runaway chart" bug (When using react-vis charts by Uber)
- Replaced react-vis with @ui5/webcomponents-react