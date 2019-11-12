import { mount, shallow } from 'enzyme'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { Snackbar } from '@material-ui/core'
import { App } from '../src/app'
import { RepositoryContext } from '../src/context/repository-provider'
import { SimpleAppBar } from '../src/components/SimpleAppBar'
import { AdvancedGridList } from '../src/components/AdvancedGridList'
import { images } from './mocks/images'

describe('App Layout', () => {
  it('Matches snapshot', () => {
    const l = shallow(<App />)
    expect(l).toMatchSnapshot()
  })
  it('getselectedImage with result', async () => {
    const repository = {
      loadCollection: () => {
        return { d: { results: images } }
      },
      configuration: {
        repositoryUrl: 'url',
      },
    }
    let wrapper: any
    await act(async () => {
      wrapper = mount(
        <RepositoryContext.Provider value={repository as any}>
          <App />
        </RepositoryContext.Provider>,
      )
    })
    expect(
      wrapper
        .update()
        .find(AdvancedGridList)
        .prop('imgList'),
    ).not.toBe([])
  })
  it('getselectedImage without result', async () => {
    const repository = {
      loadCollection: () => {
        return { d: { results: [] } }
      },
      configuration: {
        repositoryUrl: 'url',
      },
    }
    let wrapper: any
    await act(async () => {
      wrapper = mount(
        <RepositoryContext.Provider value={repository as any}>
          <App />
        </RepositoryContext.Provider>,
      )
      expect(
        wrapper
          .update()
          .find(AdvancedGridList)
          .prop('imgList'),
      ).toStrictEqual([])
    })
  })
  it('Reload Images', async () => {
    const repository = {
      loadCollection: jest.fn(() => {
        return { d: { results: images } }
      }),
      configuration: {
        repositoryUrl: 'url',
      },
    }
    let wrapper: any
    await act(async () => {
      wrapper = mount(
        <RepositoryContext.Provider value={repository as any}>
          <App />
        </RepositoryContext.Provider>,
      )
    })
    expect(repository.loadCollection).toBeCalledTimes(1)
    await act(async () => {
      wrapper.find(SimpleAppBar).prop('uploadsetdata')()
    })
    expect(repository.loadCollection).toBeCalledTimes(2)
  })
  it('Show Notification', async () => {
    const repository = {
      loadCollection: () => {
        return { d: { results: [] } }
      },
      configuration: {
        repositoryUrl: 'url',
      },
    }
    let wrapper: any
    await act(async () => {
      wrapper = mount(
        <RepositoryContext.Provider value={repository as any}>
          <App />
        </RepositoryContext.Provider>,
      )
      await act(async () => {
        wrapper
          .update()
          .find(AdvancedGridList)
          .prop('notificationControll')(true)
      })
      expect(
        wrapper
          .update()
          .find(Snackbar)
          .prop('open'),
      ).toBe(true)
    })
  })
  it('Close Notification', async () => {
    const repository = {
      loadCollection: () => {
        return { d: { results: [] } }
      },
      configuration: {
        repositoryUrl: 'url',
      },
    }
    let wrapper: any
    await act(async () => {
      wrapper = mount(
        <RepositoryContext.Provider value={repository as any}>
          <App />
        </RepositoryContext.Provider>,
      )
      await act(async () => {
        wrapper
          .update()
          .find(Snackbar)
          .prop('onClose')()
      })
      expect(
        wrapper
          .update()
          .find(Snackbar)
          .prop('open'),
      ).toBe(false)
    })
  })
})
