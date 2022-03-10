import {useContext, useRef} from "react";
import {TabledataContext} from "../../context/tabledata-context";

import Card from "../UI/Card";

import css from './Datatable.module.css';


const Datatable = () => {
    const [state ,dispatch] = useContext(TabledataContext);

    const tableRef = useRef();

    const tableInputHandler = () => {
        let titleArray = [];
        let valueArray = [];

        for (let i = 1, row; row = tableRef.current.rows[i]; i++) {
            titleArray.push(row.cells[0].innerHTML);
        }
        for (let i = 1, row; row = tableRef.current.rows[i]; i++) {
            valueArray.push(row.cells[1].innerHTML);
        }

        dispatch({
            type: 'TITLE',
            payload: titleArray
        });
        dispatch({
            type: 'VALUE',
            payload: valueArray
        });
    };

    let tablerows = [];
    for (let i = 0; i < 10; i++) {
        tablerows.push(
            <tr key={i}>
                <td suppressContentEditableWarning={true} contentEditable></td>
                <td suppressContentEditableWarning={true} contentEditable></td>
            </tr>
        );
    }

    return (
        <Card className={css.datatable}>
            <table ref={tableRef} onInput={tableInputHandler}>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Value</th>
                </tr>
                </thead>
                <tbody>
                {tablerows}
                </tbody>
            </table>
        </Card>
    );
};

export default Datatable;