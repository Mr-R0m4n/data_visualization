import Card from "../UI/Card";

import css from './LineChart.module.css'
import {useRef} from "react";

const LineChart = () => {
    const canvasRef = useRef()

    return (
        <Card className={css.lineChart}>
            <h3>LINECHART</h3>
            <Card className={css.canvas}>
                <canvas ref={canvasRef}/>
            </Card>
        </Card>
    )
}

export default LineChart;