import React, { useContext, memo, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import SortUp from '../../../Components/icons/SortUp/SortUp.jsx';
import SortDown from '../../../Components/icons/SortDown/SortDown.jsx';
import SearchInput from '../../../Components/SearchInput/SearchInput.jsx';

import { useTable, useSortBy } from 'react-table';
import { getColumns } from './Columns.js';

import LanguagesContext from '../../../store/Context/LanguageContext/LanguagesContext.jsx';
import { translation } from '../../../store/Context/LanguageContext/translation/translation.js';

import cn from 'classnames';
import styles from './DocTable.module.scss';

const DocTable = ({ doctors }) => {
    const { lang } = useContext(LanguagesContext);
    const { table, specialists } = translation[lang];

    const [searchQuery, setSearchQuery] = useState('');

    const filteredData = useMemo(() => {
        return doctors.filter(doctor =>
            Object.values(doctor).some(value =>
                String(value).toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [doctors, searchQuery]);

    const data = useMemo(() => filteredData, [filteredData]);
    const columns = useMemo(() => getColumns(table), [lang, table]);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data }, useSortBy);

    return (
        <>
            <div className={styles.searchWrapper}>
                <h3 className={styles.title}>{specialists}</h3>
                <SearchInput value={searchQuery} onChange={setSearchQuery}/>
            </div>

            <div className={styles.tableContainer}>

                <table {...getTableProps()} className={styles.frame}>
                    <thead className={styles.headerWrapper}>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}
                                    className={cn(styles.headerName, {[styles.active]: column.isSorted})}>
                                    {column.render('Header')}
                                    <span className={styles.sortIcon}>
                                    {column.isSorted ? (column.isSortedDesc ? <SortUp/> : <SortDown/>) : ''}
                                </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

DocTable.propTypes = {
    doctors: PropTypes.array
};

DocTable.defaultProps = {
    doctors: []
};

export default memo(DocTable);
