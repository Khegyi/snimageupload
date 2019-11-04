import { mount, shallow } from 'enzyme'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { Snackbar } from '@material-ui/core'
import { UploadControll } from '../src/components/UploadControll'
import { RepositoryContext } from '../src/context/repository-provider'

describe('UploadControll', () => {
  const testprop = {
    uploadsetdata: jest.fn(),
  }
  it('Matches snapshot', () => {
    const wrapper = shallow(<UploadControll {...testprop} />)
    expect(wrapper).toMatchSnapshot()
  })
  it('Upload function', async () => {
    const repository = {
      upload: {
        fromFileList: jest.fn(),
      },
    }
    const wrapper = mount(
      <RepositoryContext.Provider value={repository as any}>
        <UploadControll {...testprop} />
      </RepositoryContext.Provider>,
    )
    await act(async () => {
      wrapper.find('input').simulate('change')
    })
    expect(repository.upload.fromFileList).toBeCalled()
    expect(
      wrapper
        .update()
        .find(Snackbar)
        .prop('open'),
    ).toBe(true)
    expect(testprop.uploadsetdata).toBeCalled()
  })
  it('Close SnackBar', async () => {
    const repository = {
      upload: {
        fromFileList: jest.fn(),
      },
    }
    const wrapper = mount(
      <RepositoryContext.Provider value={repository as any}>
        <UploadControll {...testprop} />
      </RepositoryContext.Provider>,
    )
    await act(async () => {
      wrapper.find('input').simulate('change')
    })
    act(() => {
      wrapper
        .update()
        .find(Snackbar)
        .prop('onClose')!({} as any, 'a')
    })
    expect(
      wrapper
        .update()
        .find(Snackbar)
        .prop('open'),
    ).toBe(false)
  })
  it('Close SnackBar on Icon', async () => {
    const repository = {
      upload: {
        fromFileList: jest.fn(),
      },
    }
    const wrapper = mount(
      <RepositoryContext.Provider value={repository as any}>
        <UploadControll {...testprop} />
      </RepositoryContext.Provider>,
    )
    await act(async () => {
      wrapper.find('input').simulate('change')
    })
    act(() => {
      wrapper
        .update()
        .find(Snackbar)
        .prop('onClose')!({} as any, 'clickaway')
    })
    expect(
      wrapper
        .update()
        .find(Snackbar)
        .prop('open'),
    ).toBe(true)
  })
})
