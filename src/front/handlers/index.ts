import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";
import * as ui from "./ui";

export const reducers = combineReducers({
    ui: ui.reducers,
});

export const epics = combineEpics(
    ui.epics,
);
