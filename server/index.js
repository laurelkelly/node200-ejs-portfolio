const server = require('./app');

// listen for incoming connections
server.listen(3000, () => {
    console.log('Server is listening at http://localhost:3000');
});