import { path } from '../config/const'
import { findFiles } from './fileFinderAPI'

type file = {
  path: string,
  name: string,
  extension: string,
}

export function openRoutes(app: Express.Application, files: file[]) {
  files.forEach((route) => {
    let p = `${global.home_dir}/${path.ROUTES}/${route.path}/${route.name}${route.extension}`

    let r = require(p)
    if(r.get)
      r.get(app, `${route.path}/${route.name}`)
    if(r.post)
      r.post(app, `${route.path}/${route.name}`)
  })
}

export function autoOpenRoutes(app: Express.Application, path: string) {
  let routes = findFiles(path, '.js')
  openRoutes(app, routes)
}