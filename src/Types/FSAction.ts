import { Action } from "redux";

interface FSAction<P = any> extends Action<string> {
    payload?: P;
    error?: boolean;
}

export default FSAction;