import React, {Component} from 'react'
import EndMenu from './end-menu'

export class EndModal extends Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   video: true
    // }
  }

  componentDidMount() {}

  render() {
    // const video = this.state.video ? (
    //   <video
    //     className="loading"
    //     src="/assets/babies-dance.mov"
    //     autoPlay
    //     muted
    //   />
    // ) : (
    //   <h1 />
    // )
    // setTimeout(() => {
    //   this.setState({video: false})
    // }, 5000)
    const {hideModal, show} = this.props
    const showHideClassName = show
      ? 'modal display-block'
      : 'modal display-none'

    return (
      <div>
        {/* <div>{video}</div> */}

        <div className={`${showHideClassName} modal`}>
          <section>
            <EndMenu hideModal={() => hideModal('EndMenu')} />
          </section>
        </div>
      </div>
    )
  }
}
