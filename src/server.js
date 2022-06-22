import { createServer, Model } from 'miragejs';

export default function makeServer({ environment = 'development' } = {}) {
  const server = createServer({
    environment,

    models: {
      product: Model,
    },

    seeds(server) {
      // 商品
      // server.create('product', {
      //   id: '1',
      //   subid: '1',
      //   name: '韓式泡菜',
      //   brand: '慶尚北道',
      //   price: '200',
      //   weight: '600',
      //   unit: 'g',
      //   sales_channel: '1',
      //   buy_date: '2022-06-22',
      // });
    },

    routes() {
      this.get('/api/GET/products', () => ({
        products: [
          {
            id: 1,
            belongid: 1,
            pic: 'pickle.jpg',
            name: '韓式泡菜',
            brand: '慶尚北道',
            price: '200',
            weight: '600',
            unit: 'g',
            sales_channel: '1',
            discount: '0',
            buy_date: '2022-06-22',
          },
          {
            id: 2,
            belongid: 2,
            pic: 'lemon.jpg',
            name: '農榨金桔檸檬飲',
            brand: '味全',
            price: '45',
            weight: '900',
            unit: 'ml',
            sales_channel: '2',
            discount: '0',
            buy_date: '2022-06-23',
          },
          {
            id: 3,
            belongid: 1,
            pic: 'pickle.jpg',
            name: '韓式泡菜',
            brand: '慶尚北道',
            price: '188',
            weight: '600',
            unit: 'g',
            sales_channel: '1',
            discount: '1',
            buy_date: '2022-06-24',
          },
        ],
      }));

      let newId = 4;
      this.post('/api/POST/product', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        newId += 1;
        attrs.id = newId;
        console.log(attrs);
        return { reminder: attrs };
      });
    },
  });

  return server;
}
