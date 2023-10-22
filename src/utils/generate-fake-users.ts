import { faker } from '@faker-js/faker';

export function generateFakeUsers(count: number) {
  const users = [];
  for (let i = 0; i < count; i++) {
    users.push({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
    });
  }
  return users;
}
