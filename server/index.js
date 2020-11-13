const server = require('./app');

// listen for incoming connections

// server.listen(3000, () => {
//     console.log('Server is listening at http://localhost:3000');
// });

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Server is listening on ${PORT}`));