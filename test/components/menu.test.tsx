import React from 'react'
import renderer from 'react-test-renderer'
import { Menu } from '../../components/menu'

describe('Index', () => {
  it('renders the html we want', async () => {
    console.log(renderer)
    const component = renderer.create(<Menu />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
