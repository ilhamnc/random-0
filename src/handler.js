const {nanoid} = require('nanoid');
const users = require('./users');
const Joi = require('joi');

const addUsersHandler = (request, h) => {
    const { username, email, password, confirmPassword } = request.payload;
    
    const id = nanoid(10);

    const newUser = {
        id, username, email, password, confirmPassword,
    };

    // Validasi input menggunakan Joi
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
        .messages({
            'string.pattern.base': 'Password harus mengandung setidaknya satu huruf kecil, satu huruf besar, satu angka, dan satu karakter khusus',
        }),
        confirmPassword: Joi.any().valid(Joi.ref('password')).required(),
        username: Joi.string().required()
    });
    const results = schema.validate(request.payload);
    if (results.error) {
        const response = h.response({
            status: 'fail',
            message: results.error.details[0].message,
        });
        response.code(400);
        return response;
    }

    users.push(newUser);

    const isSuccess = users.filter((user) => user.id === id).length > 0;
    if(isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'User berhasil ditambahkan',
            data: {
                userId: id,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'User gagal ditambahkan',
      });
      response.code(500);
      return response;
};

const getUserHandler = (request, h) => {
    const { userId } = request.params;

    const user = users.filter((usr) => usr.id === userId)[0];

    if (user !== undefined) {
        const response = h.response({
            status: 'success',
            data: {
                user,
            },
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'User not found',
    });
    response.code(404);
    return response;
};

module.exports = {
    addUsersHandler,
    getUserHandler,
};