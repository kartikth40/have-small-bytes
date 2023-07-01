'use client'
import { ToastContainer } from 'react-toastify'

type Props = {}

export default function ClientToastContainer({}: Props) {
  return (
    <div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        closeButton={true}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}
