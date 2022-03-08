import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import TabledataProvider from "./context/tabledata-context";

ReactDOM.render(
    <TabledataProvider>
        <App/>
    </TabledataProvider>,
    document.getElementById('root')
);
