const mongoose = require('mongoose');




exports.createUtilityData = async (req, res) => {
    // Route to store data without a predefined schema
    const data = req.body;

    try {
        // Insert the document without a predefined schema
        // const result = await UtilityModel.collection.insertOne(data);
        const result = await mongoose.connection.collection('utilities').insertOne(data);

        res.status(201).json({ status: true, message: 'Document inserted successfully', result });

    } catch (insertErr) {
        console.error('Error inserting document:', insertErr);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




exports.updateUtilityData = async (req, res) => {

    const { _id, ...dataWithoutId } = req.body;

    try {

        // Validate that _id is provided in the request body
        if (!_id) {
            return res.status(400).json({ status: false, message: '_id is required in the request body' });
        }

        // Use Mongoose to update the document based on _id
        const result = await mongoose.connection.collection('utilities').updateOne(
            { _id: new mongoose.Types.ObjectId(_id) }, // Use 'new' keyword here
            { $set: dataWithoutId }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ status: false, message: 'Document not found' });
        }

        res.status(200).json({ status: true, message: 'Document updated successfully', data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
