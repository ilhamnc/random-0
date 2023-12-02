const {
    addUsersHandler,
    getUserHandler,
    loginHandler,
    refreshTokenHandler,
    // logoutHandler,
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
    {
        method: 'POST',
        path: '/auth',
        handler: loginHandler,
    },
    {
        method: 'PUT',
        path: '/auth',
        handler: refreshTokenHandler,
    },
    // {
    //     method: 'DELETE',
    //     path: '/auth',
    //     handler: logoutHandler,
    // },
];

module.exports = routes;