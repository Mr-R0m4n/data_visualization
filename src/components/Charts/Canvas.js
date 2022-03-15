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

            let values = state.values.filter(value => {
                if (!value.isEmpty) {
                    return value
                } else {
                    return null;
                }
            });
            values = values.map(value => {return Math.abs(value)})
            let sum = values.reduce((previous, current) => +previous + +current, 0);

            const colours = ['#ff4000', '#ffbf00', '#bfff00', '#80ff00', '#00ff40', '#00ffff', '#0080ff', '#0040ff', '#8000ff', '#ff00ff'];
            const PI2 = (2 * Math.PI);
            let startAngle = 0;
            let endAngle = 0;
            let labelXPos;
            let labelYPos;
            let label;

            let gradiant = context.createLinearGradient(
                GRAPH_CENTER_X + (PIE_DIAMETER),
                GRAPH_CENTER_Y + (PIE_DIAMETER),
                GRAPH_CENTER_X - (PIE_DIAMETER),
                GRAPH_CENTER_Y - (PIE_DIAMETER)
            );
            gradiant.addColorStop(0, '#5EB360');
            gradiant.addColorStop(1, '#8ec98f');

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
                context.strokeStyle = gradiant;
                context.stroke();
                context.fillStyle = colours[i];
                context.fill();
                context.closePath()

                context.beginPath();
                context.arc(GRAPH_CENTER_X, GRAPH_CENTER_Y, PIE_DIAMETER / 3, 0, PI2);
                context.fillStyle = gradiant;
                context.fill();
                context.lineWidth = 3;
                context.stroke();
                context.closePath();
            }

            for (let i = 0; i < values.length; i++) {
                context.beginPath();
                startAngle = endAngle;
                endAngle = startAngle + (values[i] / sum) * PI2;

                labelXPos = GRAPH_CENTER_X + PIE_DIAMETER * 1.2 * Math.cos(startAngle + Math.PI * values[i] / sum);
                labelYPos = GRAPH_CENTER_Y + PIE_DIAMETER * 1.2 * Math.sin(startAngle + Math.PI * values[i] / sum);
                label = state.titles[i];
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.font = "bold 20px Arial";
                context.fillStyle = "#000";
                context.fillText(label, labelXPos, labelYPos);

                labelXPos = GRAPH_CENTER_X + PIE_DIAMETER * 0.8 * Math.cos(startAngle + Math.PI * values[i] / sum);
                labelYPos = GRAPH_CENTER_Y + PIE_DIAMETER * 0.8 * Math.sin(startAngle + Math.PI * values[i] / sum);
                label = `${Math.round(values[i] / sum * 100)}%`;
                context.font = "bold 20px Arial";
                context.fillStyle = "#fff";
                context.fillText(label, labelXPos, labelYPos);
                context.closePath()
            }
        }
    },);

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
                    return value;
                } else {
                    return null;
                }
            });

            if (values.length) {
                let label = `${Math.max(...values)}`;
                context.textAlign = 'right';
                context.textBaseline = 'middle';
                context.font = "bold 20px Arial";
                context.fillStyle = "#fff";
                context.fillText(label, GRAPH_RIGHT, GRAPH_TOP - 15);

                label = `${Math.max(...values) * 3 / 4}`;
                context.fillText(label, GRAPH_RIGHT, GRAPH_TOP + GRAPH_HEIGHT / 4 - 15);

                label = `${Math.max(...values) / 2}`;
                context.fillText(label, GRAPH_RIGHT, GRAPH_TOP + GRAPH_HEIGHT / 2 - 15);

                label = `${Math.max(...values) / 4}`;
                context.fillText(label, GRAPH_RIGHT, GRAPH_TOP + GRAPH_HEIGHT * 3 / 4 - 15);

                const colours = ['#ff4000', '#ffbf00', '#bfff00', '#80ff00', '#00ff40', '#00ffff', '#0080ff', '#0040ff', '#8000ff', '#ff00ff'];
                const ratio = (GRAPH_RIGHT - GRAPH_LEFT) / 12;
                let distance = ratio;
                let labelXPos;
                let labelYPos;

                for (let i = 0; i < values.length; i++) {
                    context.save();
                    context.beginPath();
                    context.rect(GRAPH_LEFT + distance, GRAPH_BOTTOM - 1, ratio / 2, -GRAPH_HEIGHT * (values[i] / Math.max(...values)));
                    context.fillStyle = colours[i];
                    context.fill();
                    context.closePath();

                    labelXPos = GRAPH_LEFT + distance;
                    labelYPos = GRAPH_BOTTOM + 12;
                    context.translate(labelXPos, labelYPos);
                    context.rotate(Math.PI * 1.8);
                    label = state.titles[i];
                    context.textAlign = 'right';
                    context.textBaseline = 'middle';
                    context.font = "bold 20px";
                    context.fillStyle = "#000";
                    context.fillText(label, 0, 0);
                    context.restore();

                    distance = distance + ratio;
                }
            }
        }
    },);

    useEffect(() => {
        if (props.chart === 'line') {
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
                    return value;
                } else {
                    return null;
                }
            });

            if (values.length) {
                let label = `${Math.max(...values)}`;
                context.textAlign = 'right';
                context.textBaseline = 'middle';
                context.font = "bold 20px Arial";
                context.fillStyle = "#fff";
                context.fillText(label, GRAPH_LEFT - 20, GRAPH_TOP);

                label = `${Math.max(...values) * 3 / 4}`;
                context.fillText(label, GRAPH_LEFT - 20, GRAPH_TOP + GRAPH_HEIGHT / 4);

                label = `${Math.max(...values) / 2}`;
                context.fillText(label, GRAPH_LEFT - 20, GRAPH_TOP + GRAPH_HEIGHT / 2);

                label = `${Math.max(...values) / 4}`;
                context.fillText(label, GRAPH_LEFT - 20, GRAPH_TOP + GRAPH_HEIGHT * 3 / 4);

                const colours = ['#ff4000', '#ffbf00', '#bfff00', '#80ff00', '#00ff40', '#00ffff', '#0080ff', '#0040ff', '#8000ff', '#ff00ff'];
                const ratio = (GRAPH_RIGHT - GRAPH_LEFT) / 9.5;
                let distance = ratio;
                let yPoint = GRAPH_BOTTOM - GRAPH_HEIGHT * (values[0] / Math.max(...values));
                let xPoint = GRAPH_LEFT;

                for (let i = 1; i < values.length; i++) {
                    context.beginPath();
                    context.moveTo(xPoint, yPoint);
                    context.lineTo(GRAPH_LEFT + distance, GRAPH_BOTTOM - GRAPH_HEIGHT * (values[i] / Math.max(...values)));
                    context.lineWidth = 4;
                    context.strokeStyle = '#fff'
                    context.stroke();
                    context.closePath();

                    yPoint = GRAPH_BOTTOM - GRAPH_HEIGHT * (values[i] / Math.max(...values));
                    xPoint = GRAPH_LEFT + distance;

                    distance = distance + ratio;
                }

                distance = ratio;
                xPoint = GRAPH_LEFT;

                for (let i = 0; i <= values.length; i++) {
                    yPoint = GRAPH_BOTTOM - GRAPH_HEIGHT * (values[i] / Math.max(...values));

                    context.beginPath();
                    context.arc(xPoint, yPoint, 10, 0, 2 * Math.PI)
                    context.strokeStyle = '#fff'
                    context.lineWidth = 8;
                    context.stroke();
                    context.fillStyle = colours[i]
                    context.fill();
                    context.closePath();

                    context.beginPath();
                    label = state.titles[i];
                    context.textAlign = 'right';
                    context.textBaseline = 'middle';
                    context.font = "bold 20px";
                    context.fillStyle = "#000";
                    context.fillText(label, xPoint - 20, yPoint - 20);
                    context.closePath();

                    xPoint = GRAPH_LEFT + distance;
                    distance = distance + ratio;
                }
            }
        }
    },);

    const drawCoordinateSystem = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const GRAPH_TOP = 50;
        const GRAPH_BOTTOM = canvas.height - 100;
        const GRAPH_LEFT = 100;
        const GRAPH_RIGHT = canvas.width - 50;

        const GRAPH_HEIGHT = GRAPH_BOTTOM - GRAPH_TOP;

        context.strokeStyle = "#FFF";
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(GRAPH_RIGHT, GRAPH_BOTTOM);
        context.lineTo(GRAPH_LEFT, GRAPH_BOTTOM);
        context.lineTo(GRAPH_LEFT, GRAPH_TOP);
        context.stroke();

        context.beginPath();
        context.lineWidth = 0.5;
        context.moveTo(GRAPH_LEFT, GRAPH_TOP);
        context.lineTo(GRAPH_RIGHT, GRAPH_TOP);
        context.stroke();

        context.beginPath();
        context.moveTo(GRAPH_LEFT, (GRAPH_HEIGHT) / 4 * 3 + GRAPH_TOP);
        context.lineTo(GRAPH_RIGHT, (GRAPH_HEIGHT) / 4 * 3 + GRAPH_TOP);
        context.stroke();

        context.beginPath();
        context.moveTo(GRAPH_LEFT, (GRAPH_HEIGHT) / 2 + GRAPH_TOP);
        context.lineTo(GRAPH_RIGHT, (GRAPH_HEIGHT) / 2 + GRAPH_TOP);
        context.stroke();

        context.beginPath();
        context.moveTo(GRAPH_LEFT, (GRAPH_HEIGHT) / 4 + GRAPH_TOP);
        context.lineTo(GRAPH_RIGHT, (GRAPH_HEIGHT) / 4 + GRAPH_TOP);
        context.stroke();
    };

    const resize = () => {
        setHeight(divRef.current.clientHeight);
        setWidth(divRef.current.clientWidth);
    };

    const pixelRatio = window.devicePixelRatio;
    const displayWidth = Math.floor(pixelRatio * width);
    const displayHeight = Math.floor(pixelRatio * height);
    const style = {background: `${props.color}`, width, height};

    window.addEventListener('load', resize, false);
    window.addEventListener('resize', resize, false);

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