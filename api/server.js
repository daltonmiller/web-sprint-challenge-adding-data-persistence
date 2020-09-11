const express = require('express');
const ProjectRouter = require('../data/project-router');

const db = require('../data/config');

const server = express();

server.use(express.json());
server.use('/api', ProjectRouter)
module.exports = server;