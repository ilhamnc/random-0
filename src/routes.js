const {
    addUsersHandler,
    getUserHandler,
} = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/user',
        handler: addUsersHandler,
    },
    {
        method: 'GET',
        path: '/user/{userId}',
        handler: getUserHandler,
    },
];

module.exports = routes;