import {useContext, useEffect, useRef, useState} from "react";
import {TabledataContext} from "../../context/tabledata-context";

import css from './Canvas.module.css';

const Canvas = (props) => {
    const [state] = useContext(TabledataContext);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const divRef = useRef(null);
    const canvasRef = useRef();

    useEffect(() => {
        if (props.chart === 'pie') {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            context.clearRect(0, 0, canvas.width, canvas.height);

            const GRAPH_CENTER_X = canvas.width / 2;
            const GRAPH_CENTER_Y = canvas.height / 2;
            const PIE_DIAMETER = canvas.height / 2.6;

            const values = state.values.filter(value => {
                if (!value.isEmpty) {
                    return value;
                } else {
                    return null;
                }
            });
           let sum = values.reduce((previous, current) => +previous + +current, 0);

            const colours = ['#ff4000', '#ffbf00', '#bfff00', '#80ff00', '#00ff40', '#00ffff', '#0080ff', '#0040ff', '#8000ff', '#ff00ff'];
            const PI2 = (2 * Math.PI);
            let startAngle = 0;
            let endAngle = 0;
            let labelXPos;
            let labelYPos;
            let label;

            for (let i = 0; i < values.length; i++) {
                context.beginPath();
                context.moveTo(GRAPH_CENTER_X, GRAPH_CENTER_Y);

                startAngle = endAngle;
                endAngle = startAngle + (values[i] / sum) * PI2;
                context.arc(GRAPH_CENTER_X, GRAPH_CENTER_Y, PIE_DIAMETER, startAngle, endAngle);

                context.lineTo(GRAPH_CENTER_X, GRAPH_CENTER_Y);
                if (i <= 0) {
                    context.closePath();
                }

                context.lineWidth = 10;
                context.strokeStyle = '#73BD75';
                context.stroke();
                context.fillStyle = colours[i];
                context.fill();

                context.beginPath();
                context.arc(GRAPH_CENTER_X, GRAPH_CENTER_Y, PIE_DIAMETER / 3, 0, PI2);
                context.fillStyle = '#73BD75';
                context.fill();
                context.lineWidth = 3;
                context.stroke();
                context.closePath();

                labelXPos = GRAPH_CENTER_X + PIE_DIAMETER * 1.2 * Math.cos(startAngle + Math.PI * values[i] / sum);
                labelYPos = GRAPH_CENTER_Y + PIE_DIAMETER * 1.2 * Math.sin(startAngle + Math.PI * values[i] / sum);
                label = state.titles[i];
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.font = "bold 20px";
                context.fillStyle = "#000";
                context.fillText(label, labelXPos, labelYPos);

                labelXPos = GRAPH_CENTER_X + PIE_DIAMETER * 0.8 * Math.cos(startAngle + Math.PI * values[i] / sum);
                labelYPos = GRAPH_CENTER_Y + PIE_DIAMETER * 0.8 * Math.sin(startAngle + Math.PI * values[i] / sum);
                label = `${Math.round(values[i] / sum * 100)}%`;
                context.font = "bold 20px Arial";
                context.fillStyle = "#fff";
                context.fillText(label, labelXPos, labelYPos);
            }
        }
    }, );

    useEffect(() => {
        if (props.chart === 'bar') {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            const GRAPH_TOP = 50;
            const GRAPH_BOTTOM = canvas.height - 100;
            const GRAPH_LEFT = 100;
            const GRAPH_RIGHT = canvas.width - 50;

            const GRAPH_HEIGHT = GRAPH_BOTTOM - GRAPH_TOP;

            context.clearRect(0, 0, canvas.width, canvas.height);
            drawCoordinateSystem();

            const values = state.values.filter(value => {
                if (!value.isEmpty) {
                    return +value;
                } else {
                    return null;
                }
            }).sort( function(a , b) { return a - b; } );

            if(values.length > 0){

                let label = `${values[values.length-1]}`;
                context.textAlign = 'right';
                context.textBaseline = 'middle';
                context.font = "bold 20px Arial";
                context.fillStyle = "#fff";
                context.fillText(label, GRAPH_RIGHT, GRAPH_TOP - 15);

                label = `${+(values[values.length-1])*3/4}`;
                context.font = "bold 20px Arial";
                context.fillStyle = "#fff";
                context.fillText(label, GRAPH_RIGHT, GRAPH_TOP + GRAPH_HEIGHT / 4 - 15);

                label = `${+(values[values.length-1])/2}`;
                context.font = "bold 20px Arial";
                context.fillStyle = "#fff";
                context.fillText(label, GRAPH_RIGHT, GRAPH_TOP + GRAPH_HEIGHT / 2 - 15);

                label = `${+(values[values.length-1])/4}`;
                context.font = "bold 20px Arial";
                context.fillStyle = "#fff";
                context.fillText(label, GRAPH_RIGHT, GRAPH_TOP + GRAPH_HEIGHT * 3 / 4 - 15);

                const colours = ['#ff4000', '#ffbf00', '#bfff00', '#80ff00', '#00ff40', '#00ffff', '#0080ff', '#0040ff', '#8000ff', '#ff00ff'];

                context.beginPath()
                context.rect(GRAPH_LEFT + 50, GRAPH_BOTTOM, 50, - GRAPH_HEIGHT)
                context.fillStyle = colours[0];
                context.fill();
                context.closePath();
            }
        }
    }, );

    // useEffect(() => {
    //     if (props.chart === 'line') {
    //         const canvas = canvasRef.current;
    //         const context = canvas.getContext('2d');
    //
    //         context.clearRect(0, 0, canvas.width, canvas.height);
    //         drawCoordinateSystem();
    //
    //         const values = state.values.filter(value => {
    //             if (!value.isEmpty) {
    //                 return value;
    //             } else {
    //                 return null;
    //             }
    //         });
    //
    //         const colours = ['#ff4000', '#ffbf00', '#bfff00', '#80ff00', '#00ff40', '#00ffff', '#0080ff', '#0040ff', '#8000ff', '#ff00ff'];
    //     }
    // }, );

    const drawCoordinateSystem = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const GRAPH_TOP = 50;
        const GRAPH_BOTTOM = canvas.height - 100;
        const GRAPH_LEFT = 100;
        const GRAPH_RIGHT = canvas.width - 50;

        const GRAPH_HEIGHT = GRAPH_BOTTOM - GRAPH_TOP;

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

    const resize = () => {
        setHeight(divRef.current.clientHeight);
        setWidth(divRef.current.clientWidth);
    }

    const pixelRatio = window.devicePixelRatio;
    const displayWidth = Math.floor(pixelRatio * width);
    const displayHeight = Math.floor(pixelRatio * height);
    const style = {background: `${props.color}`, width, height};

    window.addEventListener('load', resize, false)
    window.addEventListener('resize', resize, false)

    return (
        <div ref={divRef} className={css.canvas}>
            <canvas style={style}
                    ref={canvasRef}
                    width={displayWidth}
                    height={displayHeight}
            />
        </div>
    );
};

export default Canvas;