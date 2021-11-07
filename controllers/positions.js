const fs = require('fs');
const positions =  require('../data/positions.json');

//Getting all job positions
const getAllPositions = (req, res) => {
    return res.json(positions)
};
//Getting a single job position
const getPositionsByJobTitle= (req, res) => {
    let filtPositions= positions.filter(item => item.job_title.includes(req.params.job_title));
    return res.json(filtPositions);
};
//Creating a job position
const createJobPosition = (req, res) => {
    const newPosition = {
        id: (positions.length)+1,
        job_title: req.query.job_title,
        company_id: req.query.company_id,
        company_name: req.query.company_name,
        job_descriptions: req.query.job_descriptions,
        city: req.query.city,
        country: req.query.country,
        date_posted: req.query.date_posted,
        closing_date: req.query.closing_date,
    }
    if (!newPosition.job_title || !newPosition.company_id || !newPosition.company_name || !newPosition.job_descriptions || 
        !newPosition.city || !newPosition.country || !newPosition.date_posted || !newPosition.closing_date) {
        return res.status(400).json({ msg: 'Please include all fields to create a new Job Position', });
    } else {
        positions.push(newPosition);
        res.status(200).json({ msg: `Position with the id of ${newPosition.id} created` });
    }
    fs.writeFile('./data/positions.json', JSON.stringify(positions), err => {
        if (err) {
            res.status(500).json({ msg: `Error while saving created position` });
        } else {
            res.status(200).json({ msg: 'Position created', newPosition});
        }})
};
//Updating a position
const updatePosition = (req, res) => {
    let itemPosition = -1;
    let filtPositions3= positions.find((item,index) => {
        if (item.id === parseInt(req.params.id)) {
            itemPosition = index
            return item;
    }})
    if (filtPositions3) {
        filtPositions3 = {
            id: filtPositions3.id,
            job_title: req.query.job_title || filtPositions3.job_title,
            company_id: req.query.company_id || filtPositions3.company_id,
            company_name: req.query.company_name || filtPositions3.company_name,
            job_descriptions: req.query.job_descriptions || filtPositions3.job_descriptions,
            city: req.query.city || filtPositions3.city,
            country: req.query.country || filtPositions3.country,
            date_posted: req.query.date_posted || filtPositions3.date_posted,
            closing_date: req.query.closing_date || filtPositions3.closing_date,
        }
        positions[itemPosition] = filtPositions3;
        } else {
            res.status(400).json({ msg: ` No position with the id of ${req.params.id} to update` });
        }
        fs.writeFile('./data/positions.json',JSON.stringify(positions),err => {
            if (err) { res.status(500).json({ msg: `Error while saving positions with updated item` });
            } else {
            res.json({ msg: 'Position updated', filtPositions3});
            }})
};

//Deleting an interview
const deletePosition = (req, res) => {
    let itemPosition = -1;
    let filtPositions4= positions.find((item,index) => {
        if (item.id === parseInt(req.params.id)) {
            itemPosition = index
            return item;
    }})
    if (filtPositions4) {
        positions.splice(itemPosition, 1);
        fs.writeFile('./data/positions.json',JSON.stringify(positions),err => {
            if (err) { res.status(500).json({ msg: `Error while saving positions with deleted item` });
            }})
        res.json({ msg: `position with id of ${req.params.id} deleted`});
        } else {
        res.status(400).json({ msg: `No position with the id of ${req.params.id} to delete` });
    }};

module.exports= {
                getAllPositions,
                getPositionsByJobTitle,
                createJobPosition,
                updatePosition,
                deletePosition
};
