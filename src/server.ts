//- NODE MODULES -------------------------------------------------
import express from 'express'
import cors from 'cors'
import fs from 'fs'

//----------------------------------------------------------------

//- FILE IMPORTS -------------------------------------------------
import { path } from './config/const'
import { openRoutes } from './helpers/routeAPI';
import { findFiles } from './helpers/fileFinderAPI';
//----------------------------------------------------------------

//- EXPRESS SERVER -----------------------------------------------

const app = express();
const port = process.env.PORT || 3000

app.use(cors())

app.listen(port, () => {
  return console.log(`[INFO] server is listening on ${port}`)
})

global.home_dir = __dirname

let p = `${__dirname}\\${path.ROUTES}`

let files = findFiles(p, '.js')

openRoutes(app, files)

//---------------------------------------------------------------- 
