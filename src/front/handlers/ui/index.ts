import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";
import * as bootstrap from "./bootstrap";

export const reducers = combineReducers({
    bootstrap: bootstrap.reducer,
});

export const epics = combineEpics(
    bootstrap.epics,
);
