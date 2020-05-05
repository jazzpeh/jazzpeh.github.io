import CsvToTable from '../modules/csv-to-table';

const csv = () => {
    [...document.querySelectorAll('code.language-csv')].forEach(e => new CsvToTable(e));
};

export default csv;