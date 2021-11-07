const sessions = require('../data/sessions.json');

const getAllSessions = (req , res) => {
 res.send(sessions);
}


module.exports = {
 getAllSessions
}