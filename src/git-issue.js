import React from "react";
import { Shellbar, LayoutGrid, Panel } from "fundamental-react";

// Define App class to render
export default class App extends React.Component {
    render() {
        return (
            <>
                <Shellbar logo={<img alt="SAP" src="//unpkg.com/fundamental-styles/dist/images/sap-logo.png"/>} productTitle="Issue Demo" profileMenu={[]}/>
                
                <h1>"nogap" Prop Test</h1>
                {/* the cols prop works, but setting nogap has no effect */}
                <LayoutGrid cols={6} nogap={true}>
                    <Panel colSpan={2}>
                        <Panel.Body>
                            <h3>Panel 1</h3>
                        </Panel.Body>
                    </Panel>
                    <Panel colSpan={4}>
                        <Panel.Body>
                            <h3>Panel 2</h3>
                        </Panel.Body>
                    </Panel>
                </LayoutGrid>

                <br/>
                <h1>"disableStyles" Prop Test</h1>

                {/* the cols prop works, but setting disableStyles has no effect */}
                <LayoutGrid cols={6} disableStyles={true}>
                    <Panel colSpan={4}>
                        <Panel.Body>
                            <h3>Panel 1</h3>
                        </Panel.Body>
                    </Panel>
                    <Panel colSpan={2}>
                        <Panel.Body>
                            <h3>Panel 2</h3>
                        </Panel.Body>
                    </Panel>
                </LayoutGrid>
            </>
        )
    }
}