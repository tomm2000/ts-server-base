import express from 'express'

export function get(app: express.Application, route: string) {
  console.log(`[INFO] laoded route: ${route} : get`)

  app.get(`${route}`, (req: express.Request, res) => {

    res.send()
  })
}
