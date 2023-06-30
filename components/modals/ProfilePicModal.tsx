'use client'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import styles from '@/app/page.module.scss'
import { getAllProfileAvatars } from '@/services'
import Image from 'next/image'

export default function ProfilePicModal({
  setNewAvatarId,
  src,
  alt,
  loading,
}: {
  setNewAvatarId: React.Dispatch<React.SetStateAction<string>>
  src: string
  alt: string
  loading: boolean
}) {
  const [avatars, setAvatars] = useState<
    Array<{ id: string; filename: string; url: string }>
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
    loader,
  } = styles
  const closeOnClick = () => {
    setNewAvatarId('')

    setShowModal(false)
  }
  const handleClick = (id: string) => {
    setNewAvatarId(id)
  }
  const handleUpdateBtn = () => {
    setShowModal(false)
  }
  return (
    <>
      <div className={chooseProfilePicBtn} onClick={() => setShowModal(true)}>
        {loading || !src ? (
          <div className={loader}>loading...</div>
        ) : (
          <Image src={src} alt={alt} width={100} height={100} />
        )}
      </div>
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
                {avatars.map((avatar, index) => (
                  <div
                    key={index}
                    className={avatarContainer}
                    onClick={() => handleClick(avatar.id)}
                  >
                    <input type="radio" id={avatar.id} name="radio" />
                    <label htmlFor={avatar.id}>
                      <Image
                        src={avatar.url}
                        alt={'avatar'}
                        width={70}
                        height={70}
                      />
                    </label>
                  </div>
                ))}
              </div>
              <div className={modalBtns}>
                <button type="button" onClick={handleUpdateBtn}>
                  OK
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
