//- NODE MODULES -------------------------------------------------
import express from 'express'
import cors from 'cors'
import fs from 'fs' 

import { Remarkable } from 'remarkable'
import 'dotenv/config'
//----------------------------------------------------------------

//- FILE IMPORTS -------------------------------------------------
import { path } from './config/const.js'
import { openRoutes } from './helpers/routeAPI.js';
import { findFiles } from './helpers/fileFinderAPI.js';
import chalk from 'chalk';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto'

const __dirname = dirname(fileURLToPath(import.meta.url));
//----------------------------------------------------------------

//- EXPRESS SERVER -----------------------------------------------

const app = express();
const port = process.env.PORT || 3000

app.use(cors())

app.listen(port, () => {
  return console.log(chalk.blue('[INFO]'), `server is listening on ${port}`)
});

(global as any).home_dir = __dirname

let p = `${__dirname}/${path.ROUTES}`

let files = findFiles(p, '.js')

openRoutes(app, files)

app.get('/', function(req, res) {
  var file = fs.readFileSync(`${__dirname}/endpoints.md`, 'utf8')
  let md = new Remarkable();

  let html =
  `
  <html><body style="margin: 0">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown-dark.min.css" integrity="sha512-USRvpT7dJFA7mrRx4+esmy+2mYr8vlgmDLFpkNeVEd+D5CgQvULKPYVnDV97Ywfek+e//HdSA0NlaPe4oqkwfQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <style>
    .markdown-body {
      box-sizing: border-box;
      min-width: 200px;
      margin: 0 auto;
      padding: 45px 20% 45px 20%;
    }
  </style>
  <div class="markdown-body">
  ${md.render(file)}
  </div>
  </body></html>
  `

  res.send(html)
}); 

//---------------------------------------------------------------- 