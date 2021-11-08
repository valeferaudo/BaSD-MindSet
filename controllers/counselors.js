const counselors = require('../data/counselors.json');

// Getting all Counselors
const getCounselors = (req, res) => {
    console.log('GET COUNSELORS');
    return res.json(counselors);
}

// Getting Counselors by Country
const getCounselorsByCountry = (req, res) => {
    const country = req.params.country;
    console.log(country);
    let filterCounselors = counselors.filter(item => item.country.toLowerCase().includes(country.toLowerCase()))
    console.log('GET COUNSELORS BY COUNTRY');
    return res.json(filterCounselors);
}

// Getting Counselor by ID
const getCounselorsById = (req, res) => {
    const id = req.params.id;
    console.log(id);
    let filterCounselorsId = counselors.filter(item => item.id == id)
    console.log('GET COUNSELORS BY ID');
    return res.json(filterCounselorsId);
}


module.exports = {
    getCounselors,
    getCounselorsByCountry,
    getCounselorsById,

};