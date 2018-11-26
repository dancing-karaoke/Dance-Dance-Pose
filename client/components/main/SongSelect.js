import React, {Component} from 'react'
import anime from 'animejs'
import Wad from 'web-audio-daw'

class SongSelection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      song: new Wad({source: '/songs/dancingqueen.m4a'})
    }
    this.enterPoly = this.enterPoly.bind(this)
    this.exitPoly = this.exitPoly.bind(this)
  }

  enterPoly() {
    console.log('enter working')
    this.state.song.play()

    anime({
      targets: '#svgAttributes polygon',
      points: '64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96',
      easing: 'easeInOutExpo',
      duration: 200
    })
  }
  exitPoly() {
    console.log('leave working')
    this.state.song.stop()
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
      <div id="svgAttributes">
        {' '}
        <svg
          width="128"
          height="128"
          viewBox="0 0 128 128"
          onMouseEnter={this.enterPoly}
          onMouseLeave={this.exitPoly}
        >
          <polygon
            points="64 68.86333111206183 8.574 99.98495073368855 63.23955416473961 67.54576054450193 64 3.9849507336885557 64.7604458352604 67.54576054450193 119.426 99.98495073368855 "
            fill="currentColor"
          />
          <defs>
            <clipPath id="clip">
              <polygon points="64 68.86333111206183 8.574 99.98495073368855 63.23955416473961 67.54576054450193 64 3.9849507336885557 64.7604458352604 67.54576054450193 119.426 99.98495073368855 " />
            </clipPath>
          </defs>

          <image
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            href="https://cdn.shopify.com/s/files/1/0067/2072/products/250762723682_grande.jpg?v=1479988071"
            clipPath="url(#clip)"
          />
          <span>ES 335 Cherry</span>
        </svg>
      </div>
    )
  }
}

export default SongSelection
