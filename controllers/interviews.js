const fs = require('fs');
const { stringify } = require('querystring');
const interviews =  require('../data/interviews.json');


//Getting all interviews
const getInterviews = (req, res) => {
    return res.json(interviews);
};
//Getting a single interview by Job Title
const getInterviewsByJobTitle= (req, res) => {
    let filtInterviews= interviews.filter(item => item.job_title.includes(req.params.job_title));
    return res.json(filtInterviews);
};
//Getting a single interview by Company

const getInterviewsByCompany= (req, res) => {
    let filtInterviews2= interviews.filter(item => item.company_name === req.params.company_name);
    return res.json(filtInterviews2);
};
//Creating an interview
function createInterview(req, res) {
    const newInterview = {
        id: (interviews.length) + 1,
        job_title: req.query.job_title,
        company_name: req.query.company_name,
        date: req.query.date,
        time: req.query.time,
    };
    if (!newInterview.job_title || !newInterview.company_name || !newInterview.date || !newInterview.time) {
        return res.status(400).json({ msg: 'Please include a job title, company name, date and time' });
    }
    interviews.push(newInterview);
    fs.writeFile('./data/interviews.json', JSON.stringify(interviews), err => {
        if (err) {
            res.status(500).json({ msg: `Error while saving data` });
        }
    });
    res.json(interviews);
}

//Updating an interview
const updateInterview = (req, res) => {
    let itemPosition = -1;
    let filtInterviews3= interviews.find((item,index) => {
        if (item.id === parseInt(req.params.id)) {
            itemPosition = index
            return item;
    }})
    if (filtInterviews3) {
        filtInterviews3 = {
            id: filtInterviews3.id,
            job_title: req.query.job_title || filtInterviews3.job_title,
            date: req.query.date || filtInterviews3.date,
            time: req.query.time || filtInterviews3.time,
        }
        interviews[itemPosition] = filtInterviews3;
    } else {
        res.status(400).json({ msg: ` error . no interview with the id of ${req.params.id} ` });
    }
        fs.writeFile('./data/interviews.json',JSON.stringify(interviews),err => {
            if (err) { res.status(500).json({ msg: `Error while saving interviews with updated item` });
            } else {
            res.json({ msg: 'Interview updated', filtInterviews3});
            }})
};

//Deleting an interview
const deleteInterview = (req, res) => {
    let itemPosition = -1;
    let filtInterviews4= interviews.find((item,index) => {
        if (item.id === parseInt(req.params.id)) {
            itemPosition = index
            return item;
    }})
    if (filtInterviews4) {
        interviews.splice(itemPosition, 1);
        fs.writeFile('./data/interviews.json',JSON.stringify(interviews),err => {
            if (err) { res.status(500).json({ msg: `Error while saving interviews with deleted item` });
            }})
        res.json({ msg: `Interview with id of ${req.params.id} deleted`});
        } else {
        res.status(400).json({ msg: `No interview with the id of ${req.params.id} to delete` });
    }};

module.exports = {
    getInterviews,
    getInterviewsByJobTitle,
    getInterviewsByCompany,
    createInterview,
    updateInterview,
    deleteInterview
}
