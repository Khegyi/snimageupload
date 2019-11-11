import { mount, shallow } from 'enzyme'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { DropFileArea } from '../src/components/DropFileArea'
import { RepositoryContext } from '../src/context/repository-provider'

describe('DropFileArea', () => {
  const testprop = {
    uploadsetdata: jest.fn(),
    notificationControll: jest.fn(),
    uploadPath: 'string',
    style: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    setDragOver: jest.fn(),
    isDragOver: false,
  }
  it('Matches snapshot', () => {
    const wrapper = shallow(<DropFileArea {...testprop} />)
    expect(wrapper).toMatchSnapshot()
  })
  it('onDragEnter', () => {
    const wrapper = mount(<DropFileArea {...testprop} />)
    act(() => {
      wrapper.find('.dropfilearea').prop('onDragEnter')!({
        stopPropagation: () => undefined,
        preventDefault: () => undefined,
      } as any)
    })

    expect(testprop.setDragOver).toBeCalledWith(true)
  })
  it('onDragLeave', () => {
    const wrapper = mount(<DropFileArea {...testprop} />)
    act(() => {
      wrapper.find('.dropfilearea').prop('onDragLeave')!({
        stopPropagation: () => undefined,
        preventDefault: () => undefined,
      } as any)
    })

    expect(testprop.setDragOver).toBeCalledWith(false)
  })
  it('onDragOver', () => {
    const wrapper = mount(<DropFileArea {...testprop} />)
    act(() => {
      wrapper.find('.dropfilearea').prop('onDragOver')!({
        stopPropagation: () => undefined,
        preventDefault: () => undefined,
      } as any)
    })

    expect(testprop.setDragOver).toBeCalledWith(true)
  })
  it('onDrop', async () => {
    const repository = {
      upload: {
        fromDropEvent: jest.fn(),
      },
    }

    const wrapper = mount(
      <RepositoryContext.Provider value={repository as any}>
        <DropFileArea {...testprop} />
      </RepositoryContext.Provider>,
    )
    await act(async () => {
      wrapper.find('.dropfilearea').prop('onDrop')!({
        stopPropagation: () => undefined,
        preventDefault: () => undefined,
      } as any)
    })

    expect(testprop.setDragOver).toBeCalledWith(false)
    expect(repository.upload.fromDropEvent).toBeCalled()
    expect(testprop.uploadsetdata).toBeCalled()
    expect(testprop.notificationControll).toBeCalled()
  })
})
