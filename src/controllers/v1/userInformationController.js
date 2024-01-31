////get userId from params
const UserInformation = require("../../models/userInformationModel");

exports.createUserInformation = async (req, res) => {
    console.log("createUserInformation hit succesfully")
    const userIdValue = req.params.userId; // Use userId from parameters
    req.body.userId = userIdValue;
    const data = req.body;

    // ... rest of the code remains the same
    try {
        // Check if a user with the same userId already exists
        const existingUser = await UserInformation.findOne({ userId: userIdValue });

        if (existingUser) {
            return res.status(400).json({ status: false, message: 'User information already exists.' });
        }

        const newUserInformation = new UserInformation({
            userId: userIdValue,
            personalDetails: {
                name: data.name,
                gender: data.gender,
                age: data.age,
                maritalStatus: data.maritalStatus,
                contactInformation: {
                    phone: data.phone,
                    alternatephone: data.alternatephone,
                    email: data.email,
                    homeAddress: data.homeAddress,
                    currentAddress: data.currentAddress,
                },
                // Add other personal details fields as needed
            },
            professionalDetails: {
                designation: data.designation,
                department: data.department,
                joiningDate: data.joiningDate,
                salary: data.salary,
                workLocation: data.workLocation,
                skills: data.skills,
                certifications: data.certifications,
                performanceRating: data.performanceRating,
                workSchedule: data.workSchedule,
                // Add other professional details fields as needed
            },
            employmentHistory: {
                previousRoles: [
                    {
                        role: data.previousRoles,  // Sample values, replace with actual data
                        company: data.company,
                        startDate: new Date(data.startDate),
                        endDate: new Date(data.endDate),
                    }
                ],
                promotions: [
                    {
                        promotionDate: new Date(data.promotionDate),
                        newDesignation: data.newDesignation,
                    }
                ],
                transfers: [
                    {
                        transferDate: new Date(data.transferDate),
                        newDepartment: data.newDepartment,
                    }
                ],
            },
        });

        // Save the new user information to the database
        newUserInformation.save()
            .then(savedUserInformation => {
                // console.log('User information saved:', savedUserInformation);
                // Handle successful save
                res.status(201).json({ status: true, message: "information saved", data: [savedUserInformation] });
            })
            .catch(saveError => {
                console.error('Error saving user information:', saveError);
                // Handle save error
            });

    } catch (error) {
        console.error('Error creating user information:', error);
        // Handle other errors during object creation
    }
};

exports.getAllUsersInformation = async (req, res) => {
    try {
        const userId = req.params.userId; // Use userId from parameters
        const users = await UserInformation.find();
        res.status(200).json({ status: true, message: "all information fetched", data: users });
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getUserInformationById = async (req, res) => {
    try {
        const userId = req.params.userId; // Use userId from parameters
        const user = await UserInformation.findOne({ userId: userId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ status: true, message: "user data fetched", data: user });
    } catch (error) {
        console.error('Error getting user by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateUserInformationById = async (req, res) => {
    const userId = req.params.userId; // Use userId from parameters
    const data = req.body;

    try {
        const updatedUser = await UserInformation.findOneAndUpdate(
            { userId: userId },
            {
                // ... rest of the update fields
                personalDetails: {
                    name: data.name,
                    gender: data.gender,
                    age: data.age,
                    maritalStatus: data.maritalStatus,
                    contactInformation: {
                        phone: data.phone,
                        alternatephone: data.alternatephone,
                        email: data.email,
                        homeAddress: data.homeAddress,
                        currentAddress: data.currentAddress,
                    },
                    // Add other personal details fields as needed
                },
                professionalDetails: {
                    designation: data.designation,
                    department: data.department,
                    joiningDate: data.joiningDate,
                    salary: data.salary,
                    workLocation: data.workLocation,
                    skills: data.skills,
                    certifications: data.certifications,
                    performanceRating: data.performanceRating,
                    workSchedule: data.workSchedule,
                    // Add other professional details fields as needed
                },
                employmentHistory: {
                    previousRoles: [
                        {
                            role: data.previousRoles,  // Sample values, replace with actual data
                            company: data.company,
                            startDate: new Date(data.startDate),
                            endDate: new Date(data.endDate),
                        }
                    ],
                    promotions: [
                        {
                            promotionDate: new Date(data.promotionDate),
                            newDesignation: data.newDesignation,
                        }
                    ],
                    transfers: [
                        {
                            transferDate: new Date(data.transferDate),
                            newDepartment: data.newDepartment,
                        }
                    ],
                },
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteUserInformationById = async (req, res) => {
    try {
        const userId = req.params.userId; // Use userId from parameters
        const deletedUser = await UserInformation.findOneAndDelete({ userId: userId});
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(204).send(); // No content in response for successful deletion
    } catch (error) {
        console.error('Error deleting user by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
