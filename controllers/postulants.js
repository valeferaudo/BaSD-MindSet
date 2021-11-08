const fs = require('fs');
const { stringify } = require('querystring');
const Postulants = require('../data/postulants.json');

const getPostulants = (req, res) => {
  res.status(200).json(Postulants);
}

const addPostulant = (req, res) => {
  //Convertion of field "open_to_work" from "string" to "boolean"
  const boolOpenToWork = req.query.open_to_work.toLowerCase() === 'true';

  const newPostulant = {
    id: (Postulants.length) + 1,
    first_name: req.query.first_name,
    last_name: req.query.last_name,
    gender: req.query.gender,
    date_of_birth: req.query.date_of_birth,
    email: req.query.email,
    phone: req.query.phone,
    city: req.query.city,
    state: req.query.state,
    country: req.query.country,
    elementary_school: {
      name: req.query.elementary_school_name,
      graduate_year: req.query.elementary_school_graduate_year,
    },
    high_school: {
      name: req.query.high_school_name,
      graduate_year: req.query.high_school_graduate_year,
    },
    junior_college: {
      name: req.query.junior_college_name,
      degree: req.query.junior_college_degree,
      graduate_year: req.query.junior_college_graduate_year,
    },
    university: {
      name: req.query.university_name,
      degree: req.query.university_degree,
      graduate_year: req.query.university_graduate_year,
    },
    open_to_work: boolOpenToWork,
    work_experience: {
      title: req.query.work_experience_title,
      start: req.query.work_experience_start,
      end: req.query.work_experience_end,
      company: req.query.work_experience_company,
      description: req.query.work_experience_description,
    },
    professional_training: {
      description: req.query.professional_training_description,
      year: req.query.professional_training_year,
    },
    languages: [req.query.languages0, req.query.languages1, req.query.languages2],
    hobbies: req.query.hobbies,
    family_members: {
      name: req.query.family_members_name,
      bond: req.query.family_members_bond
    },
    availability: {
      from: req.query.availability_from,
      to: req.query.availability_to,
      day: 
        [
          req.query.availability_day1, req.query.availability_day2, req.query.availability_day3, 
          req.query.availability_day4, req.query.availability_day5, req.query.availability_day6, 
          req.query.availability_day7
        ],
    }
  }
  
  Postulants.push(newPostulant);
  fs.writeFile('./data/postulants.json', JSON.stringify(Postulants), (err) => {
    if (err) {
      res.status(400).json({msg: "Error. Check the data sended and try again."});
    }else{
      res.status(200).json({msg: `The Postulant with the ID: ${newPostulant.id} has been created.`});
      }
  })
}

const getPostulantsById = (req, res) => {
  const found = Postulants.some(postulant => postulant.id === parseInt(req.params.id));
    if (found) {
        res.json(Postulants.filter(postulant => postulant.id === parseInt(req.params.id)))
    } else {
        res.status(400).json({ msg: 'Postulant not found' })
    }
}

const getPostulantsByLastName = (req, res) => {
  const found = Postulants.some(postulant => postulant.last_name === req.params.last_name);
    if (found) {
        res.json(Postulants.filter(postulant => postulant.last_name === req.params.last_name))
    } else {
        res.status(400).json({ msg: 'Postulant not found' })
    }
}

const updatePostulant = (req, res) => {
  let postulantPosition = -1;
  let postulantToUpdate = Postulants.find((postulant, index) => {
    if (postulant.id === parseInt(req.params.id)) {
      postulantPosition = index;
      return postulant;
    }
  });
  if (postulantToUpdate) {
    postulantToUpdate = {
      id: postulantToUpdate.id,
      first_name: req.query.first_name || postulantToUpdate.first_name,
      last_name: req.query.last_name || postulantToUpdate.last_name,
      gender: req.query.gender || postulantToUpdate.gender,
      date_of_birth: req.query.date_of_birth || postulantToUpdate.date_of_birth,
      email: req.query.email || postulantToUpdate.email,
      phone: req.query.phone || postulantToUpdate.first_name,
      address: req.query.address || postulantToUpdate.address,
      city: req.query.city || postulantToUpdate.city,
      state: req.query.state || postulantToUpdate.state,
      country: req.query.country || postulantToUpdate.country,
      elementary_school: {
        name: req.query.elementary_school_name || postulantToUpdate.elementary_school.name,
        graduate_year: req.query.elementary_school_graduate_year || postulantToUpdate.elementary_school.graduate_year,
      },
      high_school: {
        name: req.query.high_school_name || postulantToUpdate.high_school.name,
        graduate_year: req.query.high_school_gradaute_year || postulantToUpdate.high_school.graduate_year,
      },
      junior_college: {
        name: req.query.junior_college_name || postulantToUpdate.junior_college.name,
        degree: req.query.junior_college_degree || postulantToUpdate.junior_college.degree,
        graduate_year: req.query.junior_college_graduate_year || postulantToUpdate.junior_college.graduate_year,
      },
      university: {
        name: req.query.university_name || postulantToUpdate.university.name,
        degree: req.query.university_degree || postulantToUpdate.university.degree,
        graduate_year: req.query.university_name || postulantToUpdate.university.name,
      },
      open_to_work: req.query.open_to_work || postulantToUpdate.open_to_work,
      work_experience: {
        title: req.query.work_experience_title || postulantToUpdate.work_experience.title,
        start: req.query.work_experience_start || postulantToUpdate.work_experience.start,
        end: req.query.work_experience_end || postulantToUpdate.work_experience.end,
        company: req.query.work_experience_company || postulantToUpdate.work_experience.company,
        description: req.query.work_experience_description || postulantToUpdate.work_experience.description,
      },
      professional_training: {
        description: req.query.professional_training_description || postulantToUpdate.professional_training.description,
        year: req.query.professional_training_year || postulantToUpdate.professional_training.year,
      },
      languages: [req.query.languages0, req.query.languages1, req.query.languages2],
      hobbies: req.query.hobbies_title || postulantToUpdate.hobbies.title,
      family_members: {
        name: req.query.family_members_name || postulantToUpdate.family_members.name,
        bond: req.query.family_members_bond || postulantToUpdate.family_members.bond,
      },
      availability: {
        from: req.query.availability_from || postulantToUpdate.availability_from,
        to: req.query.availability_to || postulantToUpdate.availability_to,
        day :
          [
            req.query.availability_day1 || postulantToUpdate.availability[0], 
            req.query.availability_day2 || postulantToUpdate.availability[1],
            req.query.availability_day3 || postulantToUpdate.availability[2],
            req.query.availability_day4 || postulantToUpdate.availability[3],
            req.query.availability_day5 || postulantToUpdate.availability[4],
            req.query.availability_day6 || postulantToUpdate.availability[5],
            req.query.availability_day7 || postulantToUpdate.availability[6], 
          ]
      }
    }
    Postulants[postulantPosition] = postulantToUpdate;
  } else {
    res.status(400).json({ msg: ` Error! Postulant with the ID ${req.params.id} not found. Check and try again.` });
  }
  fs.writeFile('./data/postulants.json',JSON.stringify(Postulants),err => {
    if (err) { res.status(500).json({ msg: `Error while saving the Postulants with the updated Postulant` });
    } else {
    res.json({ msg: 'Postulant updated!', postulantToUpdate});
    }})
};

const deletePostulant = (req, res) => {
  const found = Postulants.some(postulant => postulant.id === parseInt(req.params.id));
    if (found) {
      const indexToBeDeleted = Postulants.findIndex(postulant => postulant.id === parseInt(req.params.id));
      Postulants.splice(indexToBeDeleted, 1);
      fs.writeFile('./data/postulants.json',JSON.stringify(Postulants),err => {
        if (err) { 
          res.status(500).json({ msg: `Error while saving the Postulants with the deleted Postulant` });
        } else {
          res.json({ msg: 'Postulant deleted!'});
        }})        
    } else {
      res.status(400).json({ msg: 'Postulant not found' })
    }
}

module.exports = {
  getPostulants : getPostulants,
  getPostulantsById : getPostulantsById,
  getPostulantsByLastName : getPostulantsByLastName,
  addPostulant : addPostulant,
  updatePostulant : updatePostulant,
  deletePostulant : deletePostulant
};