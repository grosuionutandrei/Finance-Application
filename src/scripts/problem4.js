(async function () {
  const data = await fetch('http://localhost:3005/products/20');

  const product = {
    data,
    price2Ron: () => {
      this.price * 5;
    },
  };

  console.log('Price:', data.price2Ron());
})();
