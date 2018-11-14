import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import Webcam from './components/webcam'

const App = () => {
  return (
    <div>
      <Navbar />
      <Webcam />
      <Routes />
    </div>
  )
}

export default App
