import React from 'react'
import SelectedSongMenu from './selected-song-menu'

export const Modal = ({hideModal, show}) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none'

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <SelectedSongMenu hideModal={() => hideModal('SelectedSongMenu')} />
      </section>
    </div>
  )
}
