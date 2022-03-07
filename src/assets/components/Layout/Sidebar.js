import Datatable from "../Data/Datatable";

import css from './Sidebar.module.css'
import Card from "../UI/Card";

const Sidebar = () => {
    return (
        <Card
            className={css.sidebar}>
            <Datatable/>
        </Card>
    )
}

export default Sidebar