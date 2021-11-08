const counselors = require('../data/counselors.json');

// Getting all Counselors
const getCounselors = (req, res) => {
    if (counselors.length === 0){
        return res.status(400).json({ msg: `Counselors not found` })
    }
    return res.json(counselors);
}

// Getting Counselors by Country
const getCounselorsByCountry = (req, res) => {
    const country = req.params.country;
    let filterCounselors = counselors.filter(item => item.country.toLowerCase().includes(country.toLowerCase()))
    if (filterCounselors.length === 0){
        return res.status(400).json({ msg: `Counselors from country ${country} not found` })
    }
    return res.json(filterCounselors);
}

// Getting Counselor by ID
const getCounselorsById = (req, res) => {
    const id = req.params.id;
    let filterCounselorsId = counselors.filter(item => item.id == id)
    if (filterCounselorsId.length === 0){
        return res.status(400).json({ msg: `Counselor with ID ${id} not found` })
    }
    return res.json(filterCounselorsId);
}



module.exports = {
    getCounselors,
    getCounselorsByCountry,
    getCounselorsById,
};