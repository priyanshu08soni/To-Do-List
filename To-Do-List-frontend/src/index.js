import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
//using provider to use it globaly.
import { Provider } from 'react-redux';
import {store} from "./app/store"
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store} >
        <App/>
    </Provider>
);



