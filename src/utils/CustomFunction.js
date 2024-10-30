// // CustomFunction.js




// const currentYearMonthDay = (format) => {
//     const date = new Date();
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

//     if (format === 'YYYY-MM-DD') {
//         return `${year}-${month}-${day}`;
//     } else if (format === 'YYYY') {
//         return year;
//     } else if (format === 'MM') {
//         return month;
//     } else if (format === 'ddd') {
//         const dayIndex = date.getDay();
//         return dayNames[dayIndex];
//     }
// };



// // Function to get current month name
// const monthName = () => {
//     const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//     const monthIndex = new Date().getMonth();
//     return months[monthIndex];
// };

// // Function to get current date in YYYY-MM-DD format
// const currentDate = () => {
//     return currentYearMonthDay('YYYY-MM-DD');
// };

// // Function to get current time in HH:MM:SS format
// const currentTime = () => {
//     const date = new Date();
//     const hours = String(date.getHours()).padStart(2, '0');
//     const minutes = String(date.getMinutes()).padStart(2, '0');
//     const seconds = String(date.getSeconds()).padStart(2, '0');
//     return `${hours}:${minutes}:${seconds}`;
// };

// const currentYear = () => {
//     const date = new Date();
//     return date.getFullYear();
// };



// module.exports = {
//     currentYearMonthDay,
//     monthName,
//     currentDate,
//     currentTime,
//     currentYear
// };



///////////
// CustomFunction.js



const moment = require("moment");


const currentYearMonthDay = (format) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    if (format === 'YYYY-MM-DD') {
        return `${year}-${month}-${day}`;
    } else if (format === 'YYYY') {
        return year;
    } else if (format === 'MM') {
        return month;
    } else if (format === 'ddd') {
        const dayIndex = date.getDay();
        return dayNames[dayIndex];
    }
};



// Function to get current month name
const monthName = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthIndex = new Date().getMonth();
    return months[monthIndex];
};

// Function to get current date in YYYY-MM-DD format
const currentDate = () => {
    return currentYearMonthDay('YYYY-MM-DD');
};

// Function to get current time in HH:MM:SS format
const currentTime = () => {
    const time = moment().format('HH:mm:ss')
    return time;
};

const currentYear = () => {
    const date = new Date();
    return date.getFullYear();
};

let counter = 10000; // Initialize the counter
function generateCustomId() {
    counter++; // Increment the counter
    return counter.toString(); // Convert the counter to a string
  }
  
  
  



module.exports = {
    currentYearMonthDay,
    monthName,
    currentDate,
    currentTime,
    currentYear,
    generateCustomId
};
