import React, { PureComponent } from "react";
import Position from "types/Position";
import * as Styles from "./Node.scss";

export interface Props {
    title: string;
}

interface State {
    opened: boolean;
    moving: boolean;
    offset: Position;
    position: Position;
}

class Node extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);

        this.onMouseClick = this.onMouseClick.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this);

        this.state = {
            opened: false,
            moving: false,
            offset: { x: 0, y: 0 },
            position: { x: 0, y: 0 },
        };
    }

    public componentDidMount() {
        document.addEventListener("mousemove", this.onDocumentMouseMove);
    }

    public render() {
        const { title } = this.props;
        const { position, opened } = this.state;
    
        return (
            <div 
                className={Styles.Node}
                style={{ 
                    top: position.y + "px", 
                    left: position.x + "px",
                }}
                onMouseDown={this.onMouseDown}
                onMouseUp={this.onMouseUp}
            >
                <header>
                    <strong>{title}</strong>
                    <span onClick={this.onMouseClick} />
                </header>
                {opened && (
                    <section>
                        section
                    </section>
                )}
            </div>
        );
    }

    private onMouseClick(event: React.MouseEvent<HTMLDivElement>) {
        const { moving, opened } = this.state;

        if (!moving) {
            this.setState({ opened: !opened });
        }
    }

    private onMouseDown(event: React.MouseEvent<HTMLDivElement>) {
        const { moving } = this.state;

        if (!moving) {
            const { offsetX, offsetY } = event.nativeEvent;

            this.setState({ 
                moving: true,
                offset: { x: offsetX, y: offsetY },
            });
        }
    }

    private onMouseUp(event: React.MouseEvent<HTMLDivElement>) {
        const { moving } = this.state;

        if (moving) {
            this.setState({ moving: false });
        }
    }

    private onDocumentMouseMove(event: MouseEvent) {
        const { moving, offset } = this.state;

        if (moving) {
            this.setState({
                position: {
                    x: event.pageX - offset.x,
                    y: event.pageY - offset.y,
                },
            });
        }
    }
}

export default Node;