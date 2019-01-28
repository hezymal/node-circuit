import React, { ReactElement } from "react";
import * as Styles from "./Circuit.scss";

export interface Props {
    children: ReactElement<any>;
}

function Circuit(props: Props) {
    const { children } = props;

    return (
        <div className={Styles.Circuit}>
            {children}
        </div>
    );
}

export default Circuit;