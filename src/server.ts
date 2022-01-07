// import { } from './config/const';

/// EXPRESS SERVER =======
import express from 'express'
import { autoOpenRoutes } from './helpers/routeAPI';
import cors from 'cors'

const app = express();
const port = process.env.PORT || 3000

app.use(cors())

app.listen(port, () => {
  return console.log(`[INFO] server is listening on ${port}`)
})

global.home_dir = __dirname

autoOpenRoutes(app, `${__dirname}/${path.ROUTES}`)

/// =======================

/// DISCORD BOT =========== 
/// =======================
