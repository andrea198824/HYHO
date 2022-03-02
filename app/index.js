const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    console.log("test Moris y JarviZ")
    console.log('otro console log Jenny'); // eslint-disable-line no-console
  });
});