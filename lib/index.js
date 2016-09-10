'use strict';

const Hapi = require('hapi');
const Fs = require('fs');
const Path = require('path');

const server = new Hapi.Server();
server.connection({ port: 8000 });

const data = JSON.parse(Fs.readFileSync(Path.join(__dirname, '..', 'package.json'), 'utf8'));

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world!');
    }
});

server.route({
    method: 'GET',
    path: '/version',
    handler: function (request, reply) {
        reply(data.version);
    }
});


server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
