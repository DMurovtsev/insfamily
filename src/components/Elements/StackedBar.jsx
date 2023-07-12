import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
function StackedBar() {
    const data = [
        {
            name: "Апрель",
            Дозвон: 100,
            Недозвон: 150,
            Всего: 250,
        },
        {
            name: "Май",
            Дозвон: 500,
            Недозвон: 250,
            Всего: 750,
        },
        {
            name: "Июнь",
            Дозвон: 300,
            Недозвон: 150,
            Всего: 450,
        },
        {
            name: "Июль",
            Дозвон: 400,
            Недозвон: 150,
            Всего: 550,
        },
        {
            name: "Август",
            Дозвон: 370,
            Недозвон: 50,
            Всего: 420,
        },
    ];

    return (
        <BarChart
            width={700}
            height={300}
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend align="center" verticalAlign="bottom" layout="horizontal" />
            <Bar dataKey="Дозвон" stackId="a" fill="#8884d8" />
            <Bar dataKey="Недозвон" stackId="b" fill="#82ca9d" />
            <Bar dataKey="Всего" stackId="c" fill="#ffc658" />
            {/* <Bar dataKey="value3" stackId="a" fill="#" />
            <Bar dataKey="value4" stackId="a" fill="#ffs658" /> */}
        </BarChart>
    );
}
export { StackedBar };
