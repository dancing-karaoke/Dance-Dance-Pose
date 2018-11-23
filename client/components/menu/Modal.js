import React from 'react'
import {SelectedSongMenu} from './selected-song-menu'

//Notes to team: I'm (Joe) is still working on this...

export const Modal = ({hideModal, show}) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none'

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <SelectedSongMenu hideModal={() => hideModal('SelectedSongMenu')} />
        <button type="button" onClick={() => handleClose()}>
          close
        </button>
      </section>
    </div>
  )
}
