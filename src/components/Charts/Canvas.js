import {useContext, useEffect, useRef, useState} from "react";
import {TabledataContext} from "../../context/tabledata-context";

import css from './Canvas.module.css';

const Canvas = (props) => {
    const [state] = useContext(TabledataContext);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const pixelRatio = window.devicePixelRatio;
    const ref = useRef(null);
    const canvasRef = useRef();
    const canvas = canvasRef.current;

    useEffect(() => {
        setWidth(ref.current.clientWidth);
        setHeight(ref.current.clientHeight);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const GRAPH_TOP = 50;
        const GRAPH_BOTTOM = canvas.height - 100;
        const GRAPH_LEFT = 100;
        const GRAPH_RIGHT = canvas.width - 50;

        const GRAPH_HEIGHT = GRAPH_BOTTOM - GRAPH_TOP;

        if (props.chart !== 'pie') {
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
        }
    }, [canvas, canvasRef, props.chart, state]);

    useEffect(() => {
        if (props.chart === 'pie') {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');


            const GRAPH_TOP = 0;
            const GRAPH_BOTTOM = canvas.height;
            const GRAPH_LEFT = 0;
            const GRAPH_RIGHT = canvas.width;

            const GRAPH_HEIGHT = GRAPH_BOTTOM - GRAPH_TOP;
            const GRAPH_WIDTH = GRAPH_RIGHT - GRAPH_LEFT;

            const GRAPH_CENTER_X = GRAPH_WIDTH / 2 + GRAPH_LEFT;
            const GRAPH_CENTER_Y = GRAPH_HEIGHT / 2 + GRAPH_TOP;

            const PIE_DIAMETER = GRAPH_WIDTH / 3.5;

            context.clearRect(0, 0, GRAPH_WIDTH, GRAPH_HEIGHT);

            const valueArray = state.values.filter(value => {
                if (!value.isEmpty) {
                    return value;
                } else {
                    return null;
                }
            });

            const colours = ['#ffff00', '#80ff00', '#00ffbf', '#00bfff', '#8000ff']

            let startAngle = 0;
            let endAngle = 0;
            let colourIndex = 0
            let sum = valueArray.reduce((previous, current) => +previous + +current, 0);
            valueArray.map(value => {
                startAngle = endAngle
                endAngle = endAngle + (Math.PI * 2 * (valueArray.length / sum));
                context.fillStyle = colours[colourIndex++];
                context.arc(GRAPH_CENTER_X, GRAPH_CENTER_Y, PIE_DIAMETER, startAngle, endAngle)
                // console.log(startAngle)
                console.log(endAngle)
                context.lineTo(GRAPH_CENTER_X, GRAPH_CENTER_Y)
                context.closePath();
                context.fill();
            })

            // context.arc(GRAPH_WIDTH / 2 + GRAPH_LEFT, GRAPH_HEIGHT / 2 + GRAPH_TOP, (GRAPH_WIDTH / 3.5), 0, 360 * (Math.PI / 180));
            // context.fillStyle = '#fff';
            // context.lineTo(GRAPH_WIDTH / 2 + GRAPH_LEFT, GRAPH_HEIGHT / 2 + GRAPH_TOP);
            // context.closePath();
            // context.fill();
        }
    }, [canvas, props.chart, state]);

    const displayWidth = Math.floor(pixelRatio * width);
    const displayHeight = Math.floor(pixelRatio * height);
    const style = {background: `${props.color}`, width, height};

    return (
        <div ref={ref} className={css.canvas}>
            <canvas style={style}
                    ref={canvasRef}
                    width={displayWidth}
                    height={displayHeight}
            />
        </div>
    );
};

export default Canvas;