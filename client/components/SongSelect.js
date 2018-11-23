import React, {Component} from 'react'
import anime from 'animejs'

class SongSelection extends Component {
  constructor(props) {
    super(props)
    this.enterPoly = this.enterPoly.bind(this)
    this.exitPoly = this.exitPoly.bind(this)
  }

  enterPoly() {
    console.log('enter working')
    anime({
      targets: '#svgAttributes polygon',
      points: '64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96',
      easing: 'easeInOutExpo',
      duration: 200
    })
  }
  exitPoly() {
    console.log('leave working')
    anime({
      targets: '#svgAttributes polygon',
      points:
        '64 68.86333111206183 8.574 99.98495073368855 63.23955416473961 67.54576054450193 64 3.9849507336885557 64.7604458352604 67.54576054450193 119.426 99.98495073368855 ',
      easing: 'easeInOutExpo',
      duration: 200
    })
  }
  render() {
    return (
      <div
        id="svgAttributes"
        onMouseEnter={this.enterPoly}
        onMouseLeave={this.exitPoly}
      >
        {' '}
        <svg width="128" height="128" viewBox="0 0 128 128">
          <polygon
            points="64 68.86333111206183 8.574 99.98495073368855 63.23955416473961 67.54576054450193 64 3.9849507336885557 64.7604458352604 67.54576054450193 119.426 99.98495073368855 "
            fill="currentColor"
          />
        </svg>{' '}
      </div>
    )
  }
}

export default SongSelection
