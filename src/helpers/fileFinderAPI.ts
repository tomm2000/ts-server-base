import fs from 'fs'

type file = {
  path: string,
  name: string,
  extension: string,
  complete: string,
}

export function findFiles(start: string, extension: string, path: string = ''): file[] {
  let search = []

  try {
    search = fs.readdirSync(start + path)
  } catch (error) {
    console.log('[WARN] file folder not found!')
    return []
  }
  let files: file[] = []

  search.forEach((thing) => {
    if(thing.endsWith(extension)) {
      files.push({
        name: thing.replace(extension, ''),
        path,
        extension,
        complete: `${start}/${path}/${thing}`
      })
    } else if(!thing.includes('.')) {
      files = files.concat(findFiles(start, extension, `${path}/${thing}`))
    }
  })

  return files
}