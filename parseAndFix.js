import { readFile, writeFile } from 'fs/promises';

let data = await readFile('./db.json', { encoding: 'utf8' });
data = JSON.parse(data);

let lastId = 0;
for (const movie of data.movies) {
  if ('id' in movie) {
    lastId = movie.id;
  } else {
    movie.id = ++lastId;
  }
}

await writeFile('./db.json', JSON.stringify(data));
