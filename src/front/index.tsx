import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import Bootstrap from "components/Bootstrap";
import { reducers, epics } from "handlers";

function runClient() {
    const epicMiddleware = createEpicMiddleware()
    
    const store = createStore(
        reducers, 
        applyMiddleware(epicMiddleware),
    );
    
    epicMiddleware.run(epics);
    
    render(
        <Provider store={store}>
            <Bootstrap />
        </Provider>, 
        document.getElementById("root")
    );
}

runClient();

// @ts-ignore
if (module.hot) {
    // @ts-ignore
    module.hot.accept();
}
