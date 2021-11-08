const applications = require('../data/applications.json');
const uuid = require('uuid');
const fs = require('fs');
const { stringify } = require('querystring');



//Get All Applications

const getAllApplications = (req , res) => {
   
    res.json(applications)
};

//Get Application By ID

const getApplicationById = (req, res) => {
    
    const found = applications.some(application => application.id === parseInt(req.params.id));

    if (found) {
        res.json(applications.filter(application => application.id === parseInt(req.params.id)))
    } else {
        res.status(400).json({ msg: `Application whit ID ${req.params.id} not found` })
    }}

//Get Single Application By Company ID

const getApplicationByCompanyId = (req, res) => {
    
    const found = applications.some(application => application.company_id === parseInt(req.params.id));

    if (found) {
        res.json(applications.filter(application => application.company_id === parseInt(req.params.id)))
    } else {
        res.status(400).json({ msg: `Application whit ID ${req.params.id} not found` })
    }}

//Get Single Application By Position ID

const getApplicationByPositionId = (req, res) => {
    
    const found = applications.some(application => application.position_id === parseInt(req.params.id));

    if (found) {
        res.json(applications.filter(application => application.position_id === parseInt(req.params.id)))
    } else {
        res.status(400).json({ msg: `Application whit ID ${req.params.id} not found` })
    }}

//Create Application
    
const createApplication = (req, res) => {

    const newApplication = {
        id: uuid.v4(),
        position_id: req.body.position_id,
        company_id: req.body.company_id,
        postulants_id: [],
        application_state: false,
    }

    if (!newApplication.position_id || !newApplication.company_id) {
        return res.status(400).json({ msg: 'Must include company and job title ID' })
    } else {
        applications.push(newApplication);
        fs.writeFile('./data/applications.json', JSON.stringify(applications), err => {
            if (err) {
                res.status(500).json({ msg: 'There was a problem saving the new application' });
            }
        })
        res.json({ msg : 'Application created ', newApplication });
    }   
}

//Modify Application (falta hacer que el postulant se agregue al array)

const modifyApplication = (req, res) => {
    const found = applications.some(application => application.id === parseInt(req.params.id));

    if (found) {
        const updApp = req.body;
        applications.forEach(application => {
            if (application.id === parseInt(req.params.id)) {
                application.postulants_id = updApp.postulants_id ? updApp.postulants_id : application.postulants_id;
                application.application_state = updApp.application_state ? updApp.application_state : application.application_state;

                res.json({ msg : 'Application updated ', application })
                fs.writeFile('./data/applications.json', JSON.stringify(applications), err => {
                    if (err) {
                        res.status(500).json({ msg: 'There was a problem saving the new application' });
                    }
                })
            }
        });
    } else {
        res.status(400).json({ msg: `Application whit ID ${req.params.id} not found` })
    }
}

//Delete Application

const deleteApplication = (req, res) => {
    let appPosition = 0;
    let foundedApp = applications.find((app, index) => {
        if (app.id === parseInt(req.params.id)) {
            appPosition = index;
            return app;
        }
    });
    if (!foundedApp) {
        res.status(400).json({ msg: `Application whit ID ${req.params.id} not found` });
    } else {
        applications.splice(appPosition, 1);
        fs.writeFile('./data/applications.json', JSON.stringify(applications), (err) => {
            if (err) {
                res.status(400).json({ msg: 'There was a problem deleted the application' });
            } else {
                res.status(200).json({ msg: `Application with id ${req.params.id} succesfully deleted` });
            }
        })
    }
};

//Exports

module.exports = {
    getAllApplications, 
    getApplicationById, 
    createApplication,
    getApplicationByCompanyId,
    getApplicationByPositionId,
    modifyApplication,
    deleteApplication,
    }