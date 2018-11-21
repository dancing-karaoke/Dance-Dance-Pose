import * as React from 'react'

const TV = props => (
  <div className="tv">
    <div className="tv-inner">
      <div className="tvlines">{props.children}</div>
    </div>
  </div>
)

export default TV
