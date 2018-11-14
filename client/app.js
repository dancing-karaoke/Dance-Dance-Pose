import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import Webcam from './components/webcam'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <Webcam />
    </div>
  )
}

export default App
