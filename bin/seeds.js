require('../config/db.config')

const User = require('../models/user.model')
const faker = require('faker')

Promise.all([
  User.deleteMany(),
])
    .then(() => {
        for (let i = 0; i < 80; i++) {
            const user = new User({
                name: faker.name.firstName(),
                surname: faker.name.lastName(),
                username: faker.internet.userName(),
                uplayNick: faker.internet.userName(),
                discordNick: faker.internet.userName(),
                email: faker.internet.email(),
                password: '12341234',
                avatar: faker.image.avatar(),
                dni: faker.random.number(),
                age:faker.random.number()
            })
            user.save()
            .then(user => {
              console.log(user.username)
            })
            .catch(console.error)
        }

    })