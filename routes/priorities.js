const DEBUG = true;
const express = require('express');
const db = require('../db/db_connection.js');
const fs = require("fs");
const path = require("path");

let prioritiesRouter = express.Router();