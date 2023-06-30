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
    modalBtns,
    chooseProfilePicBtn,
  } = styles
  const closeOnClick = () => setShowModal(false)

  return (
    <>
      <button
        className={chooseProfilePicBtn}
        type="button"
        onClick={() => setShowModal(true)}
      >
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
            </div>
            <div className={modalContent}>
              <div className={avatarsContainer}>
                {avatars.map((avatar) => (
                  <div key={avatar.filename} className={avatarContainer}>
                    <Image
                      src={avatar.url}
                      alt={avatar.filename}
                      width={70}
                      height={70}
                    />
                  </div>
                ))}
              </div>
              <div className={modalBtns}>
                <button type="button" onClick={() => {}}>
                  Update
                </button>
                <button type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>,
          document.querySelector('#profilePics')!
        )}
    </>
  )
}
