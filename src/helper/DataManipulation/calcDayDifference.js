const calcDayDifference = (date1, date2) => {
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);

    const diffTime = secondDate - firstDate;
    const millisecondsInDay = 1000 * 60 * 60 * 24;

    return Math.ceil(diffTime / millisecondsInDay)
}

export default calcDayDifference