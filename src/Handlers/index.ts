import { combineReducers } from "redux";
import * as ui from "./ui";
import { combineEpics } from "redux-observable";

export const reducers = combineReducers({
    ui: ui.reducers,
});

export const epics = combineEpics(
    ui.epics,
);
