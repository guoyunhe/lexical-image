import * as members from '.';

test('members match snapshot', async () => {
  expect(members).toMatchSnapshot();
});
