import Card from "../UI/Card";

import css from './PieChart.module.css'
import {useRef} from "react";

const PieChart = () => {
    const canvasRef = useRef()

    return (
        <Card className={css.pieChart}>
            <h3>PIECHART</h3>
            <Card className={css.canvas}>
                <canvas ref={canvasRef}/>
            </Card>
        </Card>
    )
}

export default PieChart;