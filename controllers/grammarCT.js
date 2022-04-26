const { Sequelize } = require('../models');
const grammar = require('../models').grammar

module.exports = {
    create(req,res) {
        return grammar
            .create({
                name: req.body.grammarName,
                verbType: req.body.verbType,
                lessonId: req.params.lessonId,
                isHidden: false,
            })
            .then(grammar => res.status(201).send(grammar))
            .catch(err => res.status(400).send(err));
    },
    list(req,res){
        return grammar
            .findAll({where:{lessonId: req.params.lessonId}})
            .then(grammar => {
                if(!grammar){
                    return res.status(404).send({message: "grammar not found!",lessonId:req.params.lessonId});
                }
                return res.status(200).send(grammar);
            })
            .catch(err => res.status(400).send(err));
    },
    destroy(req,res){
        return grammar
            .findByPk(req.params.grammarId)
            .then(grammar => {
                if(!grammar){
                    return res.status(404).send({message: "grammar not found!"});
                }
                return grammar.destroy()
                            .then(() => res.status(200).send(grammar))
                            .catch(error => res.status(400).send(error));
            })
            .catch(err => res.status(400).send(err));
    },
    searchById(req,res){
        return grammar
            .findByPk(req.params.grammarId)
            .then(grammar => {
                if(!grammar){
                    return res.status(404).send({message: "grammar not found!",vocabId:req.params.vocabId});
                }
                // return grammar
                //     .then(() => res.status(200).send(grammar))
                //     .catch(error => res.status(400).send(error));
                return res.status(200).send(grammar);
            })
            .catch(err => res.status(400).send(err));
    },
    searchByName(req,res){
        return grammar
            .findAll({
                where:{
                    name:{
                        [Sequelize.Op.like]: '%' + req.body.grammarName + '%'
                    },
                    lessonId: req.params.lessonId
                }
            })
            .then(grammar => {
                if(!grammar){
                    return res.status(404).send({message: "grammar not found!",vocabName:req.body.grammarName,lessonId: req.params.lessonId});
                }
                // return grammar
                //     .then(() => res.status(200).send(grammar))
                //     .catch(error => res.status(400).send(error));
                return res.status(200).send(grammar);
            })
            .catch(err => res.status(400).send(err));
    },
    hiddenGrammar(req,res){
        return grammar
            .findOne(
            {
                where:{
                    grammarId: req.params.grammarId
                }
            })
            .then(gram => {
                if(!gram){
                    return res.status(404).send({message: "grammar not found!",gramId:req.params.grammarId});
                }
                gram.set({
                    isHidden: req.body.isHidden
                })
                gram.save();
                res.status(200).send(gram)
            })
            .catch(err => res.status(400).send(err));
    },
    searchStudy(req,res){
        return grammar
            .findAll({
                where:{
                    isHidden: false,
                    lessonId: req.params.lessonId
                }
            })
            .then(grammar => {
                if(!grammar){
                    return res.status(404).send({message: "grammar not found!",vocabName:req.body.grammarName,lessonId: req.params.lessonId});
                }
                // return grammar
                //     .then(() => res.status(200).send(grammar))
                //     .catch(error => res.status(400).send(error));
                return res.status(200).send(grammar);
            })
            .catch(err => res.status(400).send(err));
    }

}