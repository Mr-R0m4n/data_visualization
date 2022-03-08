import Datatable from "../Data/Datatable";

import css from './Sidebar.module.css'

const Sidebar = () => {
    return (
        <aside className={css.sidebar}>
            <h3>DATATABLE</h3>
            <Datatable/>
        </aside>
    )
}

export default Sidebar