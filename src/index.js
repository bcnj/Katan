import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import reducers from './reducers';

const store = createStore(reducers);

ReactDOM.render(
    <Provider store={store}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
