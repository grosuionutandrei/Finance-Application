function main() {
  const elements = document.querySelectorAll('[data-products]');

  const data = fetch('http://localhost:3005/products/20', {
    method: 'POST',
  }).then((res) => res.json());

  for (const elem in elements) {
    elem.innerText = data.elem.dataset.product;
  }
}

main;
