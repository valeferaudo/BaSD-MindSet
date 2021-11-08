const clients = require('../data/clients.json');
const fs = require('fs');

// Get all Clients
const getClients = (req, res) => {
    if (clients.length === 0){
        return res.status(400).json({ msg: 'Clients not found'});
    }
    return res.json(clients);
}

// Get Clients by Company Type
const getClientsByCompanyType = (req, res) => {
    const companyType = req.params.company_type;
    let filterClients = clients.filter(item => item.company_type.toLowerCase().includes(companyType.toLowerCase()))
    if (filterClients.length === 0){
        return res.status(400).json({ msg: `Clients from company type ${companyType} not found`});
    }
    return res.json(filterClients);
}

// Get Client by ID
const getClientsById = (req, res) => {
    const id = req.params.id;
    let filterClientsId = clients.filter(item => item.id == id)
    if (filterClientsId.length === 0){
        return res.status(400).json({ msg: `Client with ID ${id} not found`});
    }
    return res.json(filterClientsId);
}

// Add a new Client
const createClient = (req, res) => {
    const {
        company_name,
        company_type,
        email
    } = req.query;
    if (!company_name || !company_type || !email){
        return res.status(400).json({ msg: 'Missing data to create Client'});
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
            return res.status(400).json({ msg: 'Couldn\'t create Client file'});
        } else {
            return res.status(200).json({ msg: 'New Client succesfully created'});
        }
    })
}

// Delete a Client
const deleteClient = (req, res) => {
    if(!req.params.id) {
        return res.status(400).json({ msg: 'Client ID not found' });
    }
    const clientIndex = clients.findIndex(item => item.id == req.params.id);
    if(clientIndex === -1){
        return res.status(400).json({ msg: 'Couldn\'t find Clients'});
    }
    clients.splice(clientIndex, 1);
    fs.writeFile('./data/clients.json', JSON.stringify(clients), (err) => {
        if (err) {
            return res.status(400).json({ msg: 'Couldn´t Delete Clients'});
        } else {
            return res.status(200).json({ msg: 'Clients succesfully deleted'});
        }
    })
}

//  Update a Counselor
const updateClient = (req, res) => { 
    if(!req.params.id) {
        return res.status(400).json({ msg: 'Client ID not found'});
    }
    const clientIndex = clients.findIndex(item => item.id == req.params.id);
    if(clientIndex === -1){
        return res.status(400).json({ msg: 'Couldn\'t find Client'});
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
            return res.status(400).json({ msg: 'Couldn\'t Update Client'});
        } else {
            return res.status(200).json({ msg: 'Client succesfully updated'});
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