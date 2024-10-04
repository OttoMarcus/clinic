
export const getColumns = (table) => [
    {
        Header: `${table[0]}`,
        accessor: "name",
    },
    {
        Header: `${table[1]}`,
        accessor: "surname",
    },
    {
        Header: `${table[2]}`,
        accessor: "specialization",
    },
    {
        Header: `${table[3]}`,
        accessor: "phone",
    }
];
