import { state } from '../pages/about'

test('data test', () => {
  expect(state.labels).toContain('January')
})
