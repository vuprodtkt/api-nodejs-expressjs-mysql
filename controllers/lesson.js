const { Sequelize } = require('../models');

const lesson = require('../models').lesson

module.exports = {
    create(req,res) {
        return lesson
            .create({
                name: req.body.lessonName,
            })
            .then(lesson => res.status(201).send(lesson))
            .catch(err => res.status(400).send(err));
    },
    list(req,res){
        return lesson
            .findAll()
            .then(lesson => res.status(200).send(lesson))
            .catch(error => res.status(400).send(error));
    },
    destroy(req,res){
        return lesson
            .findByPk(req.params.lessonId)
            .then(lesson => {
                if(!lesson){
                    return res.status(404).send({message: "Lesson not found!"});
                }
                return lesson.destroy()
                            .then(() => res.status(200).send(lesson))
                            .catch(error => res.status(400).send(error));
            })
            .catch(err => res.status(400).send(err));
    },
    searchById(req,res){
        return lesson
            .findByPk(req.params.lessonId)
            .then(lesson => {
                if(!lesson){
                    return res.status(404).send({message: "Lesson not found!",lessonId:req.params.lessonId});
                }
                // return lesson
                //     .then(() => res.status(200).send(lesson))
                //     .catch(error => res.status(400).send(error));
                return res.status(200).send(lesson);
            })
            .catch(err => res.status(400).send(err));
    },
    searchByName(req,res){
        return lesson
            .findAll({
                where:{
                    name:{
                        [Sequelize.Op.like]: '%' + req.body.lessonName + '%'
                    }
                }
            })
            .then(lesson => {
                if(!lesson){
                    return res.status(404).send({message: "Lesson not found!",lessonName:req.body.lessonName});
                }
                // return lesson
                //     .then(() => res.status(200).send(lesson))
                //     .catch(error => res.status(400).send(error));
                return res.status(200).send(lesson);
            })
            .catch(err => res.status(400).send(err));
    }
};