// @see https://github.com/Marak/faker.js/issues/167
const Faker = require('faker/lib')
const faker = new Faker({
  locale: 'en',
  localeFallback: 'en',
  locales: { en: require('faker/lib/locales/en') },
})

const { name, internet, image, helpers, ...rest } = faker

module.exports = {
  image,
  internet,
  name,
  email(firstName = name.firstName(), lastName = name.lastName()) {
    return internet.email(firstName, lastName, 'example.com')
  },
  helpers,
  faker: rest,
}
