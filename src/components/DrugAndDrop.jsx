import { useEffect, useState } from "react";

function DrugAndDrop() {
    let array = [
        {
            id: 1,
            title: "Сделать",
            items: [
                { id: 1, title: "Пойти в магазин" },
                { id: 2, title: "Выкинуть мусор" },
                { id: 3, title: "Пробежать 10 км" },
            ],
        },
        {
            id: 2,
            title: "Проверить",
            items: [
                { id: 4, title: "Код ревью" },
                { id: 5, title: "Погулять" },
                { id: 6, title: "Покушать" },
            ],
        },
        {
            id: 3,
            title: "Сделано",
            items: [
                { id: 7, title: "Убраться дома" },
                { id: 8, title: "Построить жд" },
                { id: 9, title: "Заняться спортом" },
            ],
        },
    ];

    const [boards, setBoards] = useState(() => {
        return JSON.parse(localStorage.getItem("boards")) || array;
    });
    // текущий board
    const [currentBoard, setCurrentBoard] = useState();
    // текущий item
    const [currentItem, setCurrentItem] = useState();
    // схваченный board
    const [currentCard, setCurrentCard] = useState();

    useEffect(() => {
        localStorage.setItem("boards", JSON.stringify(boards));
    }, [boards]);

    function dragOverHandler(e) {
        e.preventDefault();
        if (e.target.className === "item") {
            e.target.style.boxShadow = "0 2px 4px gray";
        }
    }
    function dragLeaveHandler(e) {
        e.target.style.boxShadow = "none";
    }
    function dragStartHandler(e, board, item) {
        setCurrentBoard(board);
        setCurrentItem(item);
    }

    function dragEndHandler(e) {
        e.target.style.boxShadow = "none";
    }

    // onDrop для items
    function dropHandler(e, board, item) {
        if (currentCard) {
            return;
        }

        e.preventDefault();

        // удаляем item из текущего board
        const currentIndex = currentBoard.items.indexOf(currentItem);
        currentBoard.items.splice(currentIndex, 1);

        // добавляем новый item в новый board
        const dropIndex = board.items.indexOf(item);
        board.items.splice(dropIndex, 0, currentItem);

        // меняем id item для сортировки

        // обновляем состояние boards
        setBoards(
            boards.map((b) => {
                if (b.id === board.id) {
                    return board;
                }
                if (b.id === currentBoard.id) {
                    return currentBoard;
                }
                return b;
            })
        );
    }

    // onDrop для board
    function dropCardHandler(e, board) {
        // если схватили board - меняем id board для сортировки boards
        if (currentCard) {
            setBoards(
                boards.map((b) => {
                    if (b.id === board.id) {
                        return { ...b, id: currentCard.id };
                    }
                    if (b.id === currentCard.id) {
                        return { ...b, id: board.id };
                    }
                    return b;
                })
            );
            // если схватили item и бросаем его на board
        } else if (e.target.className === "board") {
            // удаляем item из текущего board
            const currentIndex = currentBoard.items.indexOf(currentItem);
            currentBoard.items.splice(currentIndex, 1);

            // добавляем item в новый board
            board.items.push(currentItem);

            // обновляем состояние boards
            setBoards(
                boards.map((b) => {
                    if (b.id === board.id) {
                        return board;
                    }
                    if (b.id === currentBoard.id) {
                        return currentBoard;
                    }
                    return b;
                })
            );
        }
    }

    // если перетаскиваем board
    function startCard(e, card) {
        if (e.target.className === "board") {
            setCurrentCard(card);
        } else {
            setCurrentCard(null);
        }
    }

    // сортировка для boards
    function sortCard(a, b) {
        if (a.id > b.id) {
            return 1;
        } else {
            return -1;
        }
    }

    return (
        <div className="app">
            {boards.sort(sortCard).map((board) => (
                <div
                    className="board"
                    draggable={true}
                    onDragOver={(e) => dragOverHandler(e)}
                    onDrop={(e) => dropCardHandler(e, board)}
                    onDragStart={(e) => startCard(e, board)}
                >
                    <div className="board__title">{board.title}</div>
                    {board.items.map((item) => (
                        <div
                            onDragOver={(e) => dragOverHandler(e)}
                            onDragLeave={(e) => dragLeaveHandler(e)}
                            onDragStart={(e) =>
                                dragStartHandler(e, board, item)
                            }
                            onDragEnd={(e) => dragEndHandler(e)}
                            onDrop={(e) => dropHandler(e, board, item)}
                            draggable={true}
                            className="item"
                        >
                            {item.title}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export { DrugAndDrop };
