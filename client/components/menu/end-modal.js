import React from 'react'
import EndMenu from './end-menu'

export const EndModal = ({hideModal, show}) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none'

  return (
    <div className={`${showHideClassName} modal`}>
      <section>
        <EndMenu hideModal={() => hideModal('EndMenu')} />
      </section>
    </div>
  )
}
