const clients = require('../data/clients.json');
const fs = require('fs');

const getClients = (req, res) => {
    return res.json(clients);
}

const getClientsByCompanyType = (req, res) => {
    const companyType = req.params.company_type;
    let filterClients = clients.filter(item => item.company_type.toLowerCase().includes(companyType.toLowerCase()))
    return res.json(filterClients);
}

const getClientsById = (req, res) => {
    const id = req.params.id;
    let filterClientsId = clients.filter(item => item.id == id)
    if (filterClientsId.length === 0){
        return res.status(404).send(`Client with ID ${id} not found`);
    }
    return res.json(filterClientsId);
}

const createClient = (req, res) => {
    const {
        company_name,
        company_type,
        email
    } = req.query;
    if (!company_name || !company_type || !email){
        return res.status(400).send('Missing data to create Client');
    } 
    const newClient = {
        id: clients.length + 1,
        company_name: company_name,
        company_type: company_type,
        address: req.query.address,
        city: req.query.city,
        country: req.query.country,
        company_description: req.query.company_description,
        email: email,
        phone: req.query.phone,
        open_positions: [],
    }
    clients.push(newClient);
    fs.writeFile('./data/clients.json', JSON.stringify(clients), (err) => {
        if (err) {
            return res.status(400).send('Couldn\'t create Client file');
        } else {
            return res.status(201).send('New Client succesfully created');
        }
    })
}

const deleteClient = (req, res) => {
    if(!req.params.id) {
        return res.status(400).send('Client ID not found');
    }
    const clientIndex = clients.findIndex(item => item.id == req.params.id);
    if(clientIndex === -1){
        return res.status(400).send('Couldn\'t find Clients');
    }
    clients.splice(clientIndex, 1);
    fs.writeFile('./data/clients.json', JSON.stringify(clients), (err) => {
        if (err) {
            return res.status(400).send('Couldn´t Delete Clients');
        } else {
            return res.status(200).send('Clients succesfully deleted');
        }
    })
}

const updateClient = (req, res) => { 
    if(!req.params.id) {
        return res.status(400).send('Client ID not found');
    }
    const clientIndex = clients.findIndex(item => item.id == req.params.id);
    if(clientIndex === -1){
        return res.status(400).send('Couldn\'t find Client');
    }
    const updateClient = {
        id: req.params.id,
        company_name: req.query.company_name || clients[clientIndex].company_name,
        company_type: req.query.company_type || clients[clientIndex].company_type,
        address: req.query.address || clients[clientIndex].address,
        city: req.query.city || clients[clientIndex].city,
        country: req.query.country || clients[clientIndex].country,
        company_description: req.query.company_description || clients[clientIndex].company_description,
        email: req.query.email || clients[clientIndex].email,
        phone: req.query.phone || clients[clientIndex].phone,
        open_positions: req.query.open_positions || clients[clientIndex].open_positions,
    }
    clients[clientIndex] = updateClient;
    fs.writeFile('./data/clients.json', JSON.stringify(clients), (err) => {
        if (err) {
            return res.status(400).send('Couldn\'t Update Client');
        } else {
            return res.status(200).send('Client succesfully updated');
        }
    })
}

module.exports = {
    getClients,
    getClientsByCompanyType,
    getClientsById,
    createClient,
    deleteClient,
    updateClient,
};