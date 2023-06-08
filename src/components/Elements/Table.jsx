import { Loader } from "./Loader";

function Table({ props, check, title, style }) {
    if (props.length === 0) {
        return <Loader />;
    }

    let clientName = Object.keys(props[0]);

    return (
        <div
            className={style ? `container__table ${style}` : "container__table"}
        >
            <h2 className="heading">{title}</h2>
            <table className="table">
                <thead>
                    <tr>
                        {check ? <th>{check}</th> : <></>}
                        {clientName.map((item) => (
                            <th>{item}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {props.map((item) => (
                        <tr>
                            {check ? <td data-label="+">{check}</td> : <></>}
                            {clientName.map((i) => (
                                <td data-label="Наименоваие"> {item[i]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export { Table };
