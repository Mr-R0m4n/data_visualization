import Datatable from "../Data/Datatable";

import css from './Sidebar.module.css';

const Sidebar = () => {
    return (
        <aside className={css.sidebar}>
            <Datatable/>
        </aside>
    );
};

export default Sidebar;