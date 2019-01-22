import * as React from "react";
import * as Styles from "./Bootstrap.scss";

export interface Props {
    value: string;
    ping: () => void;
}

function Bootstrap(props: Props) {
    const { value, ping } = props;

    return (
        <div className={Styles.Bootstrap}>
            <button onClick={ping}>Button</button>
            {value}
        </div>
    );
};

export default Bootstrap;