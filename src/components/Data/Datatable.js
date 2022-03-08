import Card from "../UI/Card";

import css from './Datatable.module.css'

const Datatable = () => {

    let tablerows = [];
    for(let i = 0; i <= 10; i++){
        tablerows.push(
            <tr key={i}>
                <td suppressContentEditableWarning={true} contentEditable></td>
                <td suppressContentEditableWarning={true} contentEditable></td>
            </tr>
        )
    }

    const tableInputHandler = () => {
        console.log('something')
    }

    return (
        <Card className={css.datatable}>
            <table onInput={tableInputHandler}>
                <thead>
                    <tr>
                        <th contentEditable suppressContentEditableWarning={true}>X</th>
                        <th contentEditable suppressContentEditableWarning={true}>X</th>
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