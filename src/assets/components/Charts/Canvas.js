import {useEffect, useRef} from "react";

import css from './Canvas.module.css'

const Canvas = (props) => {
    const canvasRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current
        canvas.width = `${canvas.clientWidth}`;
        canvas.height = `${canvas.clientHeight}`;
    }, [])

    return (
        <div className={css.canvas}>
            <canvas style={{background: `${props.color}`}} ref={canvasRef}/>
        </div>
    );
};

export default Canvas;