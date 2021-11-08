const counselors = require('../data/counselors.json');
const fs = require('fs');

// Getting all Counselors
const getCounselors = (req, res) => {
    if (counselors.length === 0){
        return res.status(400).json({ msg: 'Counselors not found'});
    }
    return res.json(counselors);
}

// Getting Counselors by Country
const getCounselorsByCountry = (req, res) => {
    const country = req.params.country;
    let filterCounselors = counselors.filter(item => item.country.toLowerCase().includes(country.toLowerCase()))
    if (filterCounselors.length === 0){
        return res.status(400).json({ msg: `Counselors from country ${country} not found`});
    }
    return res.json(filterCounselors);
}

// Getting Counselor by ID
const getCounselorsById = (req, res) => {
    const id = req.params.id;
    let filterCounselorsId = counselors.filter(item => item.id == id)
    if (filterCounselorsId.length === 0){
        return res.status(400).json({ msg: `Counselor with ID ${id} not found`});
    }
    return res.json(filterCounselorsId);
}

// Add a new Counselor
const createCounselor = (req, res) => {
    const {
        first_name,
        last_name,
        email
    } = req.query;
    if (!first_name || !last_name || !email){
        return res.status(400).json({ msg: 'Missing data to create Counselor'});
    } 
    const newCounselor = {
        id: counselors.length + 1,
        first_name: first_name,
        last_name: last_name,
        email: email,
        gender: req.query.gender,
        address: req.query.address,
        city: req.query.city,
        country: req.query.country,
        phone: req.query.phone,
        availability: {
            from: req.query.from,
            to: req.query.to,
            day: req.query.day,
        }
    }
    counselors.push(newCounselor);
    fs.writeFile('./data/counselors.json', JSON.stringify(counselors), (err) => {
        if (err) {
            return res.status(400).json({ msg: 'Couldn\'t create Counselor file'});
        } else {
            return res.status(200).json({ msg: 'New Counselor succesfully created'});
        }
    })
}

// Delete a Counselor
const deleteCounselor = (req, res) => {
    if(!req.params.id) {
        return res.status(400).json({ msg: 'Counselor ID not found' });
    }
    const counselorIndex = counselors.findIndex(item => item.id == req.params.id);
    if(counselorIndex === -1){
        return res.status(400).json({ msg: 'Couldn\'t find Counselor'});
    }
    counselors.splice(counselorIndex, 1);
    fs.writeFile('./data/counselors.json', JSON.stringify(counselors), (err) => {
        if (err) {
            return res.status(400).json({ msg: 'Couldn´t Delete Counselor'});
        } else {
            return res.status(200).json({ msg: 'Counselor succesfully deleted'});
        }
    })
}

//  Update a Counselor
const updateCounselor = (req, res) => { 
    if(!req.params.id) {
        return res.status(400).json({ msg: 'Counselor ID not found'});
    }
    const counselorIndex = counselors.findIndex(item => item.id == req.params.id);
    if(counselorIndex === -1){
        return res.status(400).json({ msg: 'Couldn\'t find Counselor'});
    }
    const updateCounselor = {
        id: req.params.id,
        first_name: req.query.first_name || counselors[counselorIndex].first_name,
        last_name: req.query.last_name || counselors[counselorIndex].last_name,
        email: req.query.email || counselors[counselorIndex].email,
        gender: req.query.gender || counselors[counselorIndex].gender,
        address: req.query.address || counselors[counselorIndex].address,
        city: req.query.city || counselors[counselorIndex].city,
        country: req.query.country || counselors[counselorIndex].country,
        phone: req.query.phone || counselors[counselorIndex].phone,
        availability: {
            from: req.query.from || counselors[counselorIndex].availability.from,
            to: req.query.to || counselors[counselorIndex].availability.to,
            day: req.query.day || counselors[counselorIndex].availability.day,
        }
    }
    counselors[counselorIndex] = updateCounselor;
    fs.writeFile('./data/counselors.json', JSON.stringify(counselors), (err) => {
        if (err) {
            return res.status(400).json({ msg: 'Couldn\'t Update Counselor'});
        } else {
            return res.status(200).json({ msg: 'Counselor succesfully updated'});
        }
    })
}

module.exports = {
    getCounselors,
    getCounselorsByCountry,
    getCounselorsById,
    createCounselor,
    deleteCounselor,
    updateCounselor,
};