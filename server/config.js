"use strict";
exports.__esModule = true;
exports.PORT = parseInt(process.env.PORT, 10);
exports.DB_NAME = process.env.DB_NAME;
exports.DB_PASSWORD = process.env.DB_PASSWORD;
exports.DB_SSL = process.env.DB_SSL === 'true';
exports.DB_USERNAME = process.env.DB_USERNAME;
exports.DB_HOST = process.env.DB_HOST;
exports.DB_PORT = parseInt(process.env.DB_PORT, 10);
