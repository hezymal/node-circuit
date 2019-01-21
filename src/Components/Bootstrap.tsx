import * as React from "react";

export interface Props {
    value: string;
    ping: () => void;
}

function Bootstrap(props: Props) {
    const { value, ping } = props;

    return (
        <div>
            <button onClick={ping}>Button</button>
            {value}
        </div>
    );
};

export default Bootstrap;