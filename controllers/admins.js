const admins = require('../data/admins.json');
const fs = require('fs');

const getAllAdmins = (req, res) => {
    res.send(admins);
};

const getAdminById = (req, res) => {
    const founded = admins.some(admin => {
        return admin.id === parseInt(req.params.id);
    });
    if (founded) {
        res.status(200).json(admins.filter(admin => admin.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `There is no admin with this id: ${req.params.id}` });
    }
};

const getAdminByEmail = (req, res) => {
    const founded = admins.some(admin => {
        return admin.email === req.params.email;
    });
    if (founded) {
        res.status(200).json(admins.filter(admin => admin.email === req.params.email));
    } else {
        res.status(400).json({ msg: `There is no admin with this email: ${req.params.email}` });
    }
};

const createNewAdmin = (req, res) => {
    if (!req.query.email) {
        res.status(400).json({ msg: "Missing some data fields" });
    } else {
        const newAdmin = {
            id: (admins.length) + 1,
            email: req.query.email
        }
        admins.push(newAdmin);
        fs.writeFile('./data/admins.json', JSON.stringify(admins), (err) => {
            if (err) {
                res.status(400).json({ msg: "Couldn´t update data file" });
            } else {
                res.status(200).json({ msg: "New Admin succesfully created" });
            }
        })
    }
};

const editAdminById = (req, res) => {
    let adminPosition = -1;
    let foundedAdmin = admins.find((admin, index) => {
        if (admin.id === parseInt(req.params.id)) {
            adminPosition = index;
            return admin;
        }
    });
    if (!foundedAdmin) {
        res.status(400).json({ msg: "This Id doesn´t exist" });
    } else {
        foundedAdmin = {
            id: foundedAdmin.id,
            email: req.query.email || foundedAdmin.email,
        }
        admins[adminPosition] = foundedAdmin;
        fs.writeFile('./data/admins.json', JSON.stringify(admins), (err) => {
            if (err) {
                res.status(400).json({ msg: "Couldn´t update data file" });
            } else {
                res.status(200).json({ msg: `Admin with id ${req.params.id} succesfully edited` });
            }
        })
    }
};

const deleteAdminById = (req, res) => {
    let adminPosition = 0;
    let foundedAdmin = admins.find((admin, index) => {
        if (admin.id === parseInt(req.params.id)) {
            adminPosition = index;
            return admin;
        }
    });
    if (!foundedAdmin) {
        res.status(400).json({ msg: `There is no admin with this id: ${req.params.id}` });
    } else {
        admins.splice(adminPosition, 1);
        fs.writeFile('./data/admins.json', JSON.stringify(admins), (err) => {
            if (err) {
                res.status(400).json({ msg: "Couldn´t update data file" });
            } else {
                res.status(200).json({ msg: `Admin with id ${req.params.id} succesfully deleted` });
            }
        })
    }
};

module.exports = {
    getAllAdmins,
    getAdminById,
    getAdminByEmail,
    deleteAdminById,
    createNewAdmin,
    editAdminById,
}