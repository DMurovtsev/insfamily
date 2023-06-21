import { Loader } from "./Loader";

function Table({
    props,
    check,
    title,
    style,
    header,
    scrollHandler,
    loading,
    setLoading,
    currentPage,
    setCurrentPage,
    setPolicies,
}) {
    let propsTd = "";
    if (props.length != 0) {
        propsTd = Object.keys(props[0]);
    }

    return (
        <div
            onScroll={
                scrollHandler
                    ? (e) => {
                          scrollHandler(
                              e,
                              currentPage,
                              setCurrentPage,
                              loading,
                              setLoading,
                              setPolicies
                          );
                      }
                    : undefined
            }
            className={style ? `container__table ${style}` : "container__table"}
        >
            <h2 className="heading">{title}</h2>
            <table className="table">
                <thead className="table_thead">
                    <tr>
                        {check ? <th>{check}</th> : <></>}
                        {header ? header.map((item) => <th>{item}</th>) : <></>}
                    </tr>
                </thead>

                <tbody>
                    {props.map((item) => (
                        <tr id={item ? item.id : ""} className="trTableSales">
                            {check ? <td data-label="+">{check}</td> : <></>}
                            {propsTd.map((i) => (
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
