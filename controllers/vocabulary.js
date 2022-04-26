const { Sequelize } = require('../models');
const vocabulary = require('../models').vocabulary

module.exports = {
    create(req,res) {
        return vocabulary
            .create({
                name: req.body.vocabName,
                type: req.body.type,
                means: req.body.means,
                lessonId: req.params.lessonId,
                isHidden: false,
            })
            .then(vocabulary => res.status(201).send(vocabulary))
            .catch(err => res.status(400).send(err));
    },
    list(req,res){
        return vocabulary
            .findAll({where:{lessonId: req.params.lessonId}})
            .then(vocabulary => {
                if(!vocabulary){
                    return res.status(404).send({message: "vocabulary not found!",lessonId:req.params.lessonId});
                }
                return res.status(200).send(vocabulary);
            })
            .catch(err => res.status(400).send(err));
    },
    destroy(req,res){
        return vocabulary
            .findByPk(req.params.vocabId)
            .then(vocabulary => {
                if(!vocabulary){
                    return res.status(404).send({message: "vocabulary not found!"});
                }
                return vocabulary.destroy()
                            .then(() => res.status(200).send(vocabulary))
                            .catch(error => res.status(400).send(error));
            })
            .catch(err => res.status(400).send(err));
    },
    searchById(req,res){
        return vocabulary
            .findByPk(req.params.vocabId)
            .then(vocabulary => {
                if(!vocabulary){
                    return res.status(404).send({message: "vocabulary not found!",vocabId:req.params.vocabId});
                }
                // return vocabulary
                //     .then(() => res.status(200).send(vocabulary))
                //     .catch(error => res.status(400).send(error));
                return res.status(200).send(vocabulary);
            })
            .catch(err => res.status(400).send(err));
    },
    searchByName(req,res){
        return vocabulary
            .findAll({
                where:{
                    name:{
                        [Sequelize.Op.like]: '%' + req.body.vocabName + '%'
                    },
                    lessonId: req.params.lessonId
                }
            })
            .then(vocabulary => {
                if(!vocabulary){
                    return res.status(404).send({message: "vocabulary not found!",vocabName:req.body.vocabName,lessonId: req.params.lessonId});
                }
                // return vocabulary
                //     .then(() => res.status(200).send(vocabulary))
                //     .catch(error => res.status(400).send(error));
                return res.status(200).send(vocabulary);
            })
            .catch(err => res.status(400).send(err));
    },
    hiddenVocabulary(req,res){
        return vocabulary
            .findOne(
            {
                where:{
                    vocabId: req.params.vocabId
                }
            })
            .then(vocab => {
                if(!vocab){
                    return res.status(404).send({message: "vocabulary not found!",vocabId:req.params.vocabId});
                }
                vocab.set({
                    isHidden: req.body.isHidden
                })
                vocab.save();
                res.status(200).send(vocab)
            })
            .catch(err => res.status(400).send(err));
    },
    searchStudy(req,res){
        return vocabulary
            .findAll({
                where:{
                    isHidden: false,
                    lessonId: req.params.lessonId
                }
            })
            .then(vocabulary => {
                if(!vocabulary){
                    return res.status(404).send({message: "vocabulary not found!",vocabName:req.body.vocabName,lessonId: req.params.lessonId});
                }
                // return vocabulary
                //     .then(() => res.status(200).send(vocabulary))
                //     .catch(error => res.status(400).send(error));
                return res.status(200).send(vocabulary);
            })
            .catch(err => res.status(400).send(err));
    }
}