import Datatable from "../Data/Datatable";

import css from './Sidebar.module.css';

const Sidebar = (props) => {
    return (
        <aside style={{display:`${props.display}`}} className={css.sidebar}>
            <Datatable/>
        </aside>
    );
};

export default Sidebar;