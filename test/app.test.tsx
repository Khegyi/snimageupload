import { mount, shallow } from 'enzyme'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { App } from '../src/app'
import { RepositoryContext } from '../src/context/repository-provider'
//import { SimpleAppBar } from '../src/components/SimpleAppBar'
import { SimpleAppBar } from '../src/components/SimpleAppBar'
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
    expect(wrapper).toMatchSnapshot()
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
      expect(wrapper).toMatchSnapshot()
    })
  })
  it('Close SnackBar', async () => {
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
})
