import React from "react";
import { Shellbar, LayoutGrid, Panel } from "fundamental-react";

// Define App class to render
export default class App extends React.Component {
    render() {
        return (
            <LayoutGrid cols={6}>
                <Panel colSpan={2}>
                    <h1>Test</h1>
                </Panel>
                <Panel colSpan={2}>
                    <h1>Test</h1>
                </Panel>
            </LayoutGrid>
        )
    }
}