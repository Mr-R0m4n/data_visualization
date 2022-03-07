import Card from "../UI/Card";

import css from './BarChart.module.css'
import {useRef} from "react";

const BarChart = () => {
    const canvasRef = useRef()

    return (
        <Card className={css.barChart}>
            <h3>BARCHART</h3>
            <Card className={css.canvas}>
                <canvas ref={canvasRef} width={200}/>
            </Card>
        </Card>
    )
}

export default BarChart;