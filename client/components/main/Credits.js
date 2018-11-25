import React from 'react'
import {Link} from 'react-router-dom'

function confirmSound() {
  const confirmSound = new Audio('/assets/game-start.ogg')
  confirmSound.play()
}

const Credits = () => (
  <div>
    <h1 className="homeLogo" style={{textDecorationLine: 'underline'}}>
      CREDITS
    </h1>
    <h3 className="sudbury">* JIMMY HUANG * </h3>
    <h3 className="sudbury">* JOE COSTA *</h3>
    <h3 className="sudbury">* PAOLA NEIRA *</h3>
    <h3 className="sudbury">* SEAN RYAN *</h3>
    <video id="background-video" loop autoPlay>
      <source src="/assets/disco-lights.mp4" type="video/mp4" />
    </video>
    <Link to="/">
      <h5 className="backButton" onClick={confirmSound}>
        Back
      </h5>
    </Link>
  </div>
)

export default Credits
