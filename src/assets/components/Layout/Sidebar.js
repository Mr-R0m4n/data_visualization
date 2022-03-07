import Datatable from "../Data/Datatable";
import Card from "../UI/Card";

import css from './Sidebar.module.css'

const Sidebar = () => {
    return (
        <Card className={css.sidebar}>
            <Datatable/>
        </Card>
    )
}

export default Sidebar