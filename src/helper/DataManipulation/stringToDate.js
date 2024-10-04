
const getMonthName = (date) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[date];
}


const stringToDate = (date) => {
    const extractedDate = new Date(date);
    const monthValue = extractedDate.getMonth()
    const monthName = getMonthName(monthValue);
    const dayValue = extractedDate.getDate();
    const yearValue = extractedDate.getFullYear();
    return (dayValue + ' ' + monthName + ' ' + yearValue)
    //extractedDate.toLocaleDateString(); // Виведе дату у форматі локалі
}

export default stringToDate