// controllers/companyController.js
const Company = require("../../models/company");

// Create a new company
exports.createCompany = async (req, res) => {
    const companyId = req.headers['x-company-id'];

    try {
        const existingCompany = await Company.findOne({ userId: req.body.userId });

        if (existingCompany) {
            return res.status(400).json({ message: 'Company already exists for this user' });
        }
        const companyData = req.body;
        companyData.companyId = companyId;
        const company = new Company(companyData);

        await company.save();
        res.status(201).json(company);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get all companies
exports.getAllCompanies = async (req, res) => {
    const companyId = req.headers['x-company-id'];
    try {
        const companies = await Company.find({ companyId: companyId });
        res.status(200).json({ status: true, message: "all company fetched", data: companies });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get company by ID
exports.getCompanyById = async (req, res) => {
    const companyId = req.headers['x-company-id'];

    try {
        const company = await Company.findOne({ companyId: req.params.companyId });
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.status(200).json({ status: true, message: "company fetched", data: company });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Update company by ID
exports.updateCompanyById = async (req, res) => {

    try {
        const company = await Company.findOneAndUpdate({ companyId: req.params.companyId }, req.body, {
            new: true,
        });

        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        res.status(200).json({ status: true, message: "company fetched", data: company });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Delete company by ID
exports.deleteCompanyById = async (req, res) => {
    try {
        const company = await Company.findByIdAndDelete(req.params.companyId);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
