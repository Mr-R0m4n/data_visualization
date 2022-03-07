import BarChart from "../Charts/BarChart";
import PieChart from "../Charts/PieChart";
import LineChart from "../Charts/LineChart";
import Card from "../UI/Card";

import css from './Main.module.css'

const Main = () => {
    return (
        <Card className={css.main}>
            <BarChart/>
            <PieChart/>
            <LineChart/>
        </Card>
    )
}

export default Main;