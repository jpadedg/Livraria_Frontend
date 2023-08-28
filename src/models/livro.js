const mongoose = require('mongoose');

const esquema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: 'é obrigatório!',
        },
        titulo: {
            type: String,
            required: 'é obrigatório!',
        },
        num_paginas: {
            type: Number,
            required: 'é obrigatório!',
        },
        isbn: {
            type: String,
            required: 'é obrigatório!',
        },
        editora: {
            type: String,
            required: 'é obrigatório!',
        }
    },
    {
        timestamps: true
    }
);

const EsquemaLivro = mongoose.models.Livro || mongoose.model('Tarefa', esquema);
module.exports = EsquemaLivro;