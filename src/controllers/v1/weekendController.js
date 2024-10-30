// controllers/weekendController.js
const Weekend = require('../../models/weekEnd');


exports.createWeekend = async (req, res) => {
  console.log("createWeekend");
  try {
    const { dayNames, companyId } = req.body;
    const days = dayNames?.length
    console.log("days", days)

    // Create a new weekend instance
    const weekend = new Weekend({
      companyId,
      dayNames,
      days
    });

    // Save the weekend instance
    const savedWeekend = await weekend.save();

    res.status(201).json(savedWeekend);
  } catch (error) {
    console.error("Error saving weekend:", error.message);
    res.status(500).json({ message: error.message });
  }
};


exports.getWeekendByCompanyId = async (req, res) => {
  try {
    const { companyId } = req.params;

    // Find weekends by companyId
    const weekends = await Weekend.find({ companyId });

    if (!weekends || weekends.length === 0) {
      return res.status(404).json({ message: 'No weekends found for the provided company ID' });
    }

    res.status(200).json(weekends);
  } catch (error) {
    console.error("Error fetching weekends:", error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to update a weekend
exports.updateWeekend = async (req, res) => {
  console.log("updateWeekend", req.body)

  try {
    const { companyId } = req.params;
    const { dayNames } = req.body;
    const days = dayNames?.length


    // Find the weekend by ID
    const weekend = await Weekend.findOneAndUpdate(
      { companyId: companyId },
      { dayNames, days },
      { new: true }
    );

    if (!weekend) {
      return res.status(404).json({ message: 'Weekend not found' });
    }

    // Update the weekend properties
    weekend.dayNames = dayNames;
    weekend.days = days;

    // Save the updated weekend instance
    const updatedWeekend = await weekend.save();

    res.json(updatedWeekend); // Respond with the updated weekend instance
  } catch (error) {
    console.error("Error updating weekend:", error.message); // Log error message
    res.status(500).json({ message: error.message });
  }
};
