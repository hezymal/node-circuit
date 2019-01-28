import * as React from "react";
import Circuit from "components/Circuit";
import Node from "components/Node";
import * as Styles from "./Bootstrap.scss";

export interface Props {
    value: string;
    ping: () => void;
}

function Bootstrap(props: Props) {
    const { value, ping } = props;

    return (
        <div className={Styles.Bootstrap}>
            <Circuit>
                <Node title="Node #001" />
            </Circuit>
        </div>
    );
};

export default Bootstrap;