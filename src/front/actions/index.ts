import FSAction from "types/FSAction";
import { PING, PONG } from "constants/actionTypes";

export const ping = (key: string): FSAction<void> => ({ type: `${key}_${PING}` });
export const pong = (key: string): FSAction<void> => ({ type: `${key}_${PONG}` });
