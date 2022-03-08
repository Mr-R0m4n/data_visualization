import {useContext, useEffect, useRef} from "react";
import {TabledataContext} from "../../context/tabledata-context";

import css from './Canvas.module.css';

const Canvas = (props) => {
    const [state, dispatch] = useContext(TabledataContext);
    const canvasRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.width = `${canvas.clientWidth}`;
        canvas.height = `${canvas.clientHeight}`;

        const GRAPH_TOP = 50;
        const GRAPH_BOTTOM = canvas.height - 100;
        const GRAPH_LEFT = 100;
        const GRAPH_RIGHT = canvas.width - 50;

        const GRAPH_HEIGHT = GRAPH_BOTTOM - GRAPH_TOP;
        // const GRAPH_WIDTH = GRAPH_RIGHT - GRAPH_LEFT;

        // draw X and Y axis
        context.strokeStyle = "#FFF";
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(GRAPH_RIGHT, GRAPH_BOTTOM);
        context.lineTo(GRAPH_LEFT, GRAPH_BOTTOM);
        context.lineTo(GRAPH_LEFT, GRAPH_TOP);
        context.stroke();

        // draw reference line at the top of the graph
        context.beginPath();
        // set light grey color for reference lines
        // context.strokeStyle = "#BBB";
        context.lineWidth = 0.5;
        context.moveTo(GRAPH_LEFT, GRAPH_TOP);
        context.lineTo(GRAPH_RIGHT, GRAPH_TOP);
        context.stroke();

        // draw reference line 3/4 up from the bottom of the graph
        context.beginPath();
        context.moveTo(GRAPH_LEFT, (GRAPH_HEIGHT) / 4 * 3 + GRAPH_TOP);
        context.lineTo(GRAPH_RIGHT, (GRAPH_HEIGHT) / 4 * 3 + GRAPH_TOP);
        context.stroke();

        // draw reference line 1/2 way up the graph
        context.beginPath();
        context.moveTo(GRAPH_LEFT, (GRAPH_HEIGHT) / 2 + GRAPH_TOP);
        context.lineTo(GRAPH_RIGHT, (GRAPH_HEIGHT) / 2 + GRAPH_TOP);
        context.stroke();

        // draw reference line 1/4 up from the bottom of the graph
        context.beginPath();
        context.moveTo(GRAPH_LEFT, (GRAPH_HEIGHT) / 4 + GRAPH_TOP);
        context.lineTo(GRAPH_RIGHT, (GRAPH_HEIGHT) / 4 + GRAPH_TOP);
        context.stroke();

    }, [canvasRef]);

    return (
        <div className={css.canvas}>
            <canvas style={{background: `${props.color}`}} ref={canvasRef}/>
        </div>
    );
};

export default Canvas;