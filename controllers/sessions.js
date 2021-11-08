const sessions = require('../data/sessions.json');
const fs = require('fs');
const { stringify } = require('querystring');

const getAllSessions = (req, res) => {
    res.send(sessions);
};

const getSessionById = (req, res) => {
    const founded = sessions.some(session => {
        return session.id === parseInt(req.params.id);
    });
    if (founded) {
        res.status(200).json(sessions.filter(session => session.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `There is no session with this id: ${req.params.id}` });
    }
};

const getSessionByPostulantId = (req, res) => {
    const founded = sessions.some(session => {
        return session.postulant_id === parseInt(req.params.postulant_id);
    });
    if (founded) {
        res.status(200).json(sessions.filter(session => session.postulant_id === parseInt(req.params.postulant_id)));
    } else {
        res.status(400).json({ msg: `There is no session with this postulant Id: ${req.params.postulant_id}` });
    }
};

const getSessionByCouncelorId = (req, res) => {
    const founded = sessions.some(session => {
        return session.councelor_id === parseInt(req.params.councelor_id);
    });
    if (founded) {
        res.status(200).json(sessions.filter(session => session.councelor_id === parseInt(req.params.councelor_id)));
    } else {
        res.status(400).json({ msg: `There is no session with this councelor Id: ${req.params.councelor_id}` });
    }
};

const getSessionByAccomplishedState = (req, res) => {
    const founded = sessions.some(session => {
        return session.accomplished.toString() === req.params.accomplished;
    });
    if (founded) {
        res.status(200).json(sessions.filter(session => session.accomplished.toString() === req.params.accomplished));
    } else {
        res.status(400).json({ msg: `There is no session with this accomplished state: ${req.params.accomplished.toString()}` });
    }
};

const createNewSession = (req, res) => {
    if (!req.query.postulant_id || !req.query.councelor_id || !req.query.day || !req.query.time || !req.query.accomplished) {
        res.status(400).json({ msg: "Missing some data fields" });
    } else {
        const newSession = {
            id: (sessions.length) + 1,
            postulant_id: parseInt(req.query.postulant_id),
            councelor_id: parseInt(req.query.councelor_id),
            day: req.query.day,
            time: req.query.time,
            accomplished: req.query.accomplished
        }
        sessions.push(newSession);
        fs.writeFile('./data/sessions.json', JSON.stringify(sessions), (err) => {
            if (err) {
                res.status(400).json({ msg: "Couldn´t update data file" });
            } else {
                res.status(200).json({ msg: "New session succesfully created" });
            }
        })
    }
};

const editSessionById = (req, res) => {
    let sessionPosition = 0;
    let foundedSession = sessions.find((session, index) => {
        if (session.id === parseInt(req.params.id)) {
            sessionPosition = index;
            return session;
        }
    });
    if (!foundedSession) {
        res.status(400).json({ msg: "This Id doesn´t exist" });
    } else {
        foundedSession = {
            id: foundedSession.postulant_id,
            postulant_id: parseInt(req.query.postulant_id) || foundedSession.postulant_id,
            councelor_id: parseInt(req.query.councelor_id) || foundedSession.councelor_id,
            day: req.query.day || foundedSession.day,
            time: req.query.time || foundedSession.time,
            accomplished: req.query.accomplished || foundedSession.accomplished
        }
        sessions[sessionPosition] = foundedSession;
        fs.writeFile('./data/sessions.json', JSON.stringify(sessions), (err) => {
            if (err) {
                res.status(400).json({ msg: "Couldn´t update data file" });
            } else {
                res.status(200).json({ msg: `Session with id ${req.params.id} succesfully edited` });
            }
        })
    }
};

const deleteSessionById = (req, res) => {
    let sessionPosition = 0;
    let foundedSession = sessions.find((session, index) => {
        if (session.id === parseInt(req.params.id)) {
            sessionPosition = index;
            return session;
        }
    });
    if (!foundedSession) {
        res.status(400).json({ msg: `There is no session with this id: ${req.params.id}` });
    } else {
        sessions.splice(sessionPosition, 1);
        fs.writeFile('./data/sessions.json', JSON.stringify(sessions), (err) => {
            if (err) {
                res.status(400).json({ msg: "Couldn´t update data file" });
            } else {
                res.status(200).json({ msg: `Session with id ${req.params.id} succesfully deleted` });
            }
        })
    }
};

module.exports = {
    getAllSessions,
    getSessionById,
    deleteSessionById,
    createNewSession,
    editSessionById,
    getSessionByPostulantId,
    getSessionByCouncelorId,
    getSessionByAccomplishedState
}