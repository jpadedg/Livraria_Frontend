var express = require('express');
var router = express.Router();
const tratarErrosEsperados = require('../functions/tratarErrosEsperados');
const EsquemaLivro = require('../models/livro');
const conectarBancoDados = require('../middlewares/conectarBD');

/* GET users listing. */
router.post('/livros/cadastro', conectarBancoDados, async function(req, res) {
  try{
    
    let { id, titulo, num_paginas, isbn, editora } = req.body;

    const respostaBD = await EsquemaLivro.create({ id, titulo, num_paginas, isbn, editora });

    res.status(200).json({
      status: "OK",
      statusMensagem: "Livro criado com sucesso!",
      resposta: respostaBD
    })

  } catch (error) {
    return tratarErrosEsperados(res, error);
  }
});

router.get('/livros', conectarBancoDados, async function(req, res) {
  try{

    const respostaBD = await EsquemaLivro.find();
    console.log(respostaBD);

    res.status(200).json({
      status: "OK",
      statusMensagem: "Livros buscados no BD!",
      resposta: respostaBD
    })

  } catch (error) {
    return tratarErrosEsperados(res, error);
  }
});

router.get('/livro/:id', conectarBancoDados, async function(req, res) {
  try{

    let idLivro = req.params.id;

    const livro = await EsquemaLivro.findOne({ id: idLivro })

    res.status(200).json({
      status: "OK",
      statusMensagem: "Livro localizado com sucesso!",
      resposta: livro
    })

  } catch (error) {
    return tratarErrosEsperados(res, error);
  }
});


router.put('/livros/edicao/:id', conectarBancoDados, async function(req, res) {
  try{

    let idLivro = req.params.id;
    let { id, titulo, num_paginas, isbn, editora } = req.body;

    const respostaBD = await EsquemaLivro.findOne({ id: idLivro });
    if(!respostaBD){
      throw new Error("Livro não encontrado!");
    }
    
    const livroAtualizado = await EsquemaLivro.updateOne({ id: idLivro }, { id, titulo, num_paginas, isbn, editora });
    if(livroAtualizado?.modifiedCount > 0){
      res.status(200).json({
        status: "OK",
        statusMensagem: "Livro alterado com sucesso!",
        resposta: respostaBD
      })
    }
  } catch (error) {
    return tratarErrosEsperados(res, error);
  }
});

router.delete('/delete/livro/:id', conectarBancoDados, async function(req, res) {
  try{

    let idLivro = req.params.id;
    const checkLivro = await EsquemaLivro.findOne({ id: idLivro });
    if(!checkLivro){
      throw new Error("Livro não encontrado!");
    }

    const respostaBD = await EsquemaLivro.deleteOne({ id: idLivro});

    res.status(200).json({
      status: "OK",
      statusMensagem: "Livro apagado com sucesso!",
      resposta: respostaBD
    })
  } catch (error) {
    return tratarErrosEsperados(res, error);
  }
});


module.exports = router;
