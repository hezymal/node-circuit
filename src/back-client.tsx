import * as React from "react";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import Bootstrap from "Components/BootstrapContainer";
import { reducers, epics } from "Handlers";

function renderClient() {
    const epicMiddleware = createEpicMiddleware()
    
    const store = createStore(
        reducers, 
        applyMiddleware(epicMiddleware),
    );
    
    epicMiddleware.run(epics);
    
    return renderToString(
        <Provider store={store}>
            <Bootstrap />
        </Provider>
    );
}

export default renderClient;
