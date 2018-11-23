import React, {Component} from 'react'

export default class Loading extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <img
          className="loading"
          src="/images/Loading-Circle.gif"
          width="1000"
        />
        <h2>Loading....</h2>
      </div>
    )
  }
}
