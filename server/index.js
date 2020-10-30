const server = require('./app');

// listen for incoming connections
server.listen(8080, () => {
    console.log('Server is listening at http://localhost:8080');
});