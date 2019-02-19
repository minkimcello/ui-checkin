import { Factory, faker } from '@bigtest/mirage';

export default Factory.extend({
  name: faker.company.catchPhrase(),
  code: faker.company.catchPhrase(),
  discoveryDisplayName: faker.company.catchPhrase(),
  pickupLocation:  true,
  holdShelfExpiryPeriod: {
    duration: 2,
    intervalId: 'Days',
  },
  afterCreate(servicePoint, server) {
    const models = server.schema.staffSlips.all().models;
    const staffSlips = models.map(({ attrs: { id } }) => ({
      id,
      printByDefault: true,
    }));
    servicePoint.update({ staffSlips });
  }
});