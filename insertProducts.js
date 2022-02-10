import { faker } from '@faker-js/faker';
import { readFile, writeFile } from 'fs/promises';

let data = await readFile('./db.json', { encoding: 'utf8' });
data = JSON.parse(data);

const products = [];
for (let i = 0; i < 20; i++) {
  const product = {
    id: i + 1,
    userId: getRandomInt(2, 1),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    material: faker.commerce.productMaterial(),
    color: faker.commerce.color(),
    tags: getRandomAdjectives(),
    categoryId: getRandomInt(5, 1),
  };

  products.push(product);
}

function getRandomAdjectives() {
  const adj = [];

  const count = getRandomInt(5, 1);
  for (let i = 0; i < count; i++) {
    adj.push(faker.commerce.productAdjective());
  }

  return adj;
}

function getRandomInt(max, min = 1) {
  return Math.floor(Math.random() * max + min);
}

const categories = [];
for (let i = 0; i < 5; i++) {
  const category = {
    id: i + 1,
    name: faker.commerce.department(),
  };
  categories.push(category);
}

data.products = products;
data.categories = categories;

await writeFile('./db.json', JSON.stringify(data, null, 2));
