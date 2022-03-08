import Card from "../UI/Card";

import css from'./Datatable.module.css'

const Datatable = () => {

    let tablerows = [];
    for(let i = 0; i <= 10; i++){
        tablerows.push(
            <tr key={i}>
                <td suppressContentEditableWarning={true} contentEditable>0</td>
                <td suppressContentEditableWarning={true} contentEditable>0</td>
            </tr>
        )
    }

    const handler = () => {
        console.log('something')
    }

    return (
        <Card className={css.datatable}>
            <table onChange={handler}>
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