'use client'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import styles from '@/app/page.module.scss'

export default function ProfilePicModal() {
  const [showModal, setShowModal] = useState(false)
  const { profilePicModal, modalContainer, hideBackground, modalBG } = styles
  const closeOnClick = () => {
    console.log('close')
    setShowModal(false)
  }
  return (
    <>
      <button type="button" onClick={() => setShowModal(true)}>
        Show modal
      </button>
      <div className={modalContainer} id="profilePics"></div>
      <div
        onClick={closeOnClick}
        className={`${showModal && hideBackground} ${modalBG}`}
      ></div>
      {showModal &&
        createPortal(
          <div className={profilePicModal}>
            <h1>Choose your profile pic</h1>
            <button type="button" onClick={() => setShowModal(false)}>
              close
            </button>
          </div>,
          document.querySelector('#profilePics')!
        )}
    </>
  )
}
