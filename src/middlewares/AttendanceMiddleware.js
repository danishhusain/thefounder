// middleware/checkWeekday.js
exports.checkWeekday = (req, res, next) => {
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    
    if (dayOfWeek === 0 || dayOfWeek === 6) {
        // Weekend (Sunday or Saturday)
        res.status(400).json({ error: 'Sorry, it\'s the weekend!' });
    } else {
        // Weekday
        // console.log("next")
        next();
    }
};

