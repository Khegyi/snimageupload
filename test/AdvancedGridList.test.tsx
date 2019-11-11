import { mount, shallow } from 'enzyme'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { AdvancedGridList, pickTile } from '../src/components/AdvancedGridList'
import { DropFileArea } from '../src/components/DropFileArea'
import { images } from './mocks/images'

describe('AdvancedGridList', () => {
  const testprops = {
    imgList: images as any[],
    uploadsetdata: jest.fn(),
    notificationControll: jest.fn(),
  }
  it('Matches snapshot', () => {
    const wrapper = shallow(<AdvancedGridList {...testprops} />)
    expect(wrapper).toMatchSnapshot()
  })
  it.only('DragSetter', () => {
    const wrapper = mount(<AdvancedGridList {...testprops} />)
    act(() => {
      wrapper
        .update()
        .find(DropFileArea)
        .prop('setDragOver')(true)
    })
    expect(
      wrapper
        .update()
        .find(DropFileArea)
        .prop('isDragOver'),
    ).toBe(true)
  })
})
describe('pickTile', () => {
  it('should return 2', () => {
    const value = pickTile(456)
    expect(value).toBe(2)
  })
})
