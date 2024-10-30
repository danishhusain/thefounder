
const Branch = require("../../models/branch");

// Create a new branch
exports.createBranch = async (req, res) => {
    const companyId = req.headers['x-company-id'];

    try {
        const branchData = req.body
        branchData.companyId = companyId

        const branch = new Branch(branchData);
        await branch.save();
        res.status(201).json({ status: true, message: "new branch created successfully!", data: branch });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all branches
exports.getAllBranches = async (req, res) => {
    const companyId = req.headers['x-company-id'];

    try {
        const branches = await Branch.find({ userId: req.params.userId, companyId: companyId });
        res.status(200).json({ status: true, message: "all branch fetched", data: branches });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get branch by ID
exports.getBranchById = async (req, res) => {
    const companyId = req.headers['x-company-id'];

    try {
        const branch = await Branch.findOne({ branchId: req.params.branchId, companyId: companyId });
        if (!branch) {
            return res.status(404).json({ message: 'Branch not found' });
        }
        res.status(200).json({ status: true, message: "branch fetched", data: branch });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update branch by ID
exports.updateBranchById = async (req, res) => {
    const companyId = req.headers['x-company-id'];

    try {
        const branch = await Branch.findOneAndUpdate({ branchId: req.params.branchId, companyId: companyId }, req.body, {
            new: true,
        });
        if (!branch) {
            return res.status(404).json({ message: 'Branch not found' });
        }
        res.status(200).json(branch);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Delete branch by ID
exports.deleteBranchById = async (req, res) => {
    const companyId = req.headers['x-company-id'];

    try {
        const branch = await Branch.findOneAndDelete({ branchId: req.params.branchId, companyId: companyId });
        if (!branch) {
            return res.status(404).json({ message: 'Branch not found' });
        }
        res.status(204).json({
            status: true,
            message: "branch deleted succesfuly"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
