import Card from "../UI/Card";
import Canvas from "./Canvas";

import css from './BarChart.module.css';

const BarChart = () => {

    return (
        <Card className={css.barChart}>
            <Canvas
                color={'linear-gradient(to top, #3A94EE, #75b4f3)'}
                chart={'bar'}
            />
        </Card>
    );
};

export default BarChart;