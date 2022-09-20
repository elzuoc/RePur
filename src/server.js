import { createServer, Model } from 'miragejs';

export default function makeServer({ environment = 'development' } = {}) {
  let server = createServer();

  server = createServer({
    environment,
    seeds(server) {
      server.db; // {} the db is empty
      server.db.loadData({
        products: [
          {
            id: 1,
            belongid: 0,
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
            belongid: 0,
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
      });
    },

    routes() {
      // all product
      this.get('/api/GET/products', (schema, request) => {
        let mainProds = schema.db.products.filter((item) => !item.belongid);

        // query: search
        if (
          Object.prototype.hasOwnProperty.call(request.queryParams, 'search') &&
          request.queryParams.search !== 'null'
        )
          mainProds = mainProds.filter((item) => item.name.includes(request.queryParams.search));

        // query: sort
        if (
          Object.prototype.hasOwnProperty.call(request.queryParams, 'sort') &&
          request.queryParams.sort
        ) {
          mainProds = mainProds.sort((current, next) => {
            let isCurrentLarger = false;

            if (request.queryParams.sortField === 'buy_date') {
              isCurrentLarger =
                new Date(current[request.queryParams.sortField]) >
                new Date(next[request.queryParams.sortField]);
            }

            // console.log('isCurrentLarger', isCurrentLarger);
            console.log('request.queryParams.sortType', request.queryParams.sortType);
            console.log('isCurrentLarger', isCurrentLarger);
            if (
              (request.queryParams.sortType === 'asc' && isCurrentLarger) ||
              (request.queryParams.sortType === 'desc' && !isCurrentLarger)
            )
              return 1;

            return -1;
          });
          console.log('mainProds', mainProds);
        }

        return mainProds;
      });

      // new one product
      let newId = 4;
      this.post('/api/POST/product', (schema, request) => {
        // console.log('request', request);
        // console.log('schema', schema);
        const attrs = JSON.parse(request.requestBody);
        newId += 1;
        attrs.id = newId;

        return schema.db.products.insert(attrs);
      });
    },
  });

  return server;
}
