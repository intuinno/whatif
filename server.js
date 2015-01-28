People = new Mongo.Collection('people');

if (Meteor.isServer) {

  faker = Meteor.npmRequire('faker');

  if (!People.find().count()) {
    Array.apply(0, Array(10)).forEach(function() {
      person = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        avatar: faker.image.avatar(),
        street: faker.address.streetName(),
        city: faker.address.city(),
        zipcode: faker.address.zipCode(),
        companyName: faker.company.companyName(),
        companyCatchPhrase: faker.company.catchPhrase()
      }
      People.insert(person);
    });
  }

  Meteor.publish('basic_info', function() {
    return People.find({}, {fields: {name: 1, city: 1, companyName: 1}});
  });

  Meteor.publish('all_info', function(id) {
    return People.find(id);
  });
}