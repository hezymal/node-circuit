import { filter, mapTo, delay } from "rxjs/operators";
import { combineEpics, Epic } from "redux-observable";
import FSAction from "types/FSAction";
import BootstrapState from "types/BootstrapState";
import { PING, PONG } from "constants/actionTypes";
import { uiBootstrap as dataKey } from "constants/dataKeys";

function createState(): BootstrapState {
    return {
        value: "INIT",
    };
}

export function reducer(state = createState(), action: FSAction): BootstrapState {
    switch (action.type) {
        case `${dataKey}_${PING}`:
            state = {
                ...state,
                value: "PING",
            };
            break;

        case `${dataKey}_${PONG}`:
            state = {
                ...state,
                value: "PONG",
            };
            break;
    }

    return state;
}

export const pongEpic: Epic<FSAction> = action$ => action$.pipe(
    filter(action => action.type === `${dataKey}_${PING}`),
    delay(1000),
    mapTo({ type: `${dataKey}_${PONG}` }),
);

export const epics = combineEpics(
    pongEpic,
);
