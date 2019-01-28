import { Factory, faker, trait } from '@bigtest/mirage';

export default Factory.extend({
  requestType: () => 'Hold',
  requestDate: () => faker.date.recent().toISOString(),
  requesterId: () => faker.random.uuid(),
  status: () => 'Open - Not yet filled',
  position: () => 1,
  requester: () => ({
    lastName: faker.name.lastName(),
    firstName: faker.name.firstName(),
    middleName : faker.name.firstName(),
    barcode : Math.floor(Math.random() * 9000000000000) + 1000000000000,
  }),
  withItem: trait({
    afterCreate(request, server) {
      const item = server.create('item');
      item.save();
    }
  })
});
