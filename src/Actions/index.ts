import FSAction from "Types/FSAction";
import { PING, PONG } from "Constants/actionTypes";

export const ping = (key: string): FSAction<void> => ({ type: `${key}_${PING}` });
export const pong = (key: string): FSAction<void> => ({ type: `${key}_${PONG}` });
