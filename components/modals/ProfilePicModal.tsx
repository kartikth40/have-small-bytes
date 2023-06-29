'use client'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import styles from '@/app/page.module.scss'
import { getAllProfileAvatars } from '@/services'
import Image from 'next/image'

export default function ProfilePicModal() {
  const [avatars, setAvatars] = useState<
    Array<{ filename: string; url: string }>
  >([])
  useEffect(() => {
    async function getAvatars() {
      const ava = await getAllProfileAvatars()
      setAvatars(ava)
    }
    getAvatars()
  }, [])
  const [showModal, setShowModal] = useState(false)
  const {
    profilePicModal,
    modalContainer,
    hideBackground,
    modalBG,
    modalHeader,
    modalContent,
    avatarsContainer,
    avatarContainer,
  } = styles
  const closeOnClick = () => setShowModal(false)

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
            <div className={modalHeader}>
              <h1>Choose your profile pic</h1>
              <button type="button" onClick={() => setShowModal(false)}>
                close
              </button>
            </div>
            <div className={modalContent}>
              <div className={avatarsContainer}>
                {avatars.map((avatar) => (
                  <div key={avatar.filename} className={avatarContainer}>
                    <Image
                      src={avatar.url}
                      alt={avatar.filename}
                      width={100}
                      height={100}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>,
          document.querySelector('#profilePics')!
        )}
    </>
  )
}
