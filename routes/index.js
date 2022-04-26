var express = require('express');
const lesson = require('../controllers/lesson');
const vocabulary = require('../controllers/vocabulary');
const grammar = require('../controllers/grammarCT');
var router = express.Router();

let cors = require('cors')
router.use(cors());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express API for study website!' });
});

router.get('/lesson',lesson.list);
router.post('/lesson/create',lesson.create);
router.get('/lesson/destroy/:lessonId',lesson.destroy);
router.get('/lesson/searchbyid/:lessonId',lesson.searchById);
router.post('/lesson/searchbyname',lesson.searchByName);

router.get('/:lessonId/vocabulary',vocabulary.list);
router.get('/:lessonId/vocabulary/study',vocabulary.searchStudy);
router.post('/:lessonId/vocabulary/create',vocabulary.create);
router.get('/:lessonId/vocabulary/destroy/:vocabId',vocabulary.destroy);
router.get('/:lessonId/vocabulary/searchbyid/:vocabId',vocabulary.searchById);
router.post('/:lessonId/vocabulary/searchbyname',vocabulary.searchByName);
router.post('/:lessonId/vocabulary/hidden/:vocabId',vocabulary.hiddenVocabulary);

router.get('/:lessonId/grammar',grammar.list);
router.get('/:lessonId/grammar/study',grammar.searchStudy);
router.post('/:lessonId/grammar/create',grammar.create);
router.get('/:lessonId/grammar/destroy/:grammarId',grammar.destroy);
router.get('/:lessonId/grammar/searchbyid/:grammarId',grammar.searchById);
router.post('/:lessonId/grammar/searchbyname',grammar.searchByName);
router.post('/:lessonId/grammar/hidden/:grammarId',grammar.hiddenGrammar);

module.exports = router;
