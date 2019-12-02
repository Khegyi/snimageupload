var enzyme = require('enzyme')
var Adapter = require('enzyme-adapter-react-16')

enzyme.configure({ adapter: new Adapter() })

Object.defineProperty(window, 'DragEvent', {
  value: class DragEvent {},
})
