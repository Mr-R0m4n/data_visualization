import Card from "../UI/Card";
import Canvas from "./Canvas";

import css from './PieChart.module.css';

const PieChart = () => {

    return (
        <Card className={css.pieChart}>
            <Canvas
                color={'linear-gradient(to top, #5EB360, #8ec98f)'}
                chart={'pie'}
            />
        </Card>
    );
};

export default PieChart;