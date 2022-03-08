import Card from "../UI/Card";
import Canvas from "./Canvas";

import css from './LineChart.module.css'

const LineChart = () => {

    return (
        <Card className={css.lineChart}>
            <h3>LINECHART</h3>
            <Canvas color={'linear-gradient(to top, #E62F69, #eb5887)'}/>
        </Card>
    )
}

export default LineChart;