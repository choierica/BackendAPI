const knex = require('knex');
const knexdb = knex({client: 'pg', connection: 'postgres://localhost/tests'});
const bookshelf = require('bookshelf');
const securePassworld = require('bookshelf-secure-password');

const db = bookshelf(knexdb);
db.plugin(securePassworld);


module.exports = db;