import React from 'react'
import renderer from 'react-test-renderer'

import About from '../pages/about'

jest.mock('react-chartjs-2', () => ({
  Line: (props: any) => <data>{JSON.stringify(props)}</data>,
}))

describe('About', () => {
  it('renders the html we want', async () => {
    const component = renderer.create(<About />)
    expect(component.toJSON()).toMatchSnapshot()
  })

  it('render good data', async () => {
    const component = renderer.create(<About />)
    const testInstance = component.root
    const div = testInstance.find((x) => x.type === 'data')
    console.log(div.children.length)
    expect(div.children[0].toString().includes('January')).toBeTruthy()
    // expect(testInstance.findByProps({className: "sub"}).children).toEqual(['Sub']);

    // console.log(component.getInstance()?.findAllByType('div').length)
    // console.log(component.getInstance()?.children.length)
    // console.log(component.toTree()?.find())
    // console.log(component.toTree()?.props)
  })
})
