import BarChart from "../Charts/BarChart";
import PieChart from "../Charts/PieChart";
import LineChart from "../Charts/LineChart";

import css from './Main.module.css'

const Main = () => {
    return (
        <main className={css.main}>
            <BarChart/>
            <PieChart/>
            <LineChart/>
        </main>
    )
}

export default Main;