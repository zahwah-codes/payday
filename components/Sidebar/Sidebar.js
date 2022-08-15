
import React from 'react'
import Image from 'next/image'
import { HiViewGrid, HiOutlineLogout } from 'react-icons/hi'
import { MdPayment } from 'react-icons/md'
import { TiArrowShuffle } from "react-icons/ti"
import { FiSettings } from 'react-icons/fi'
import { useRouter } from 'next/router'

const Sidebar = () => {

  const router = useRouter()

  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <div className="sidebar__header">
          <div className="sidebar__logo">
            <Image
            src="/payday-logo.svg"
            alt="logo"
            width='25'
            height='25'
            className='logo-image'
            />
            <h2 className='logo-text'> Payday </h2>
          </div>
        </div>

        <div className="sidebar__middle">
          <div
          className='sidebar__dashboard__text'
          onClick={() => router.push(`/`)}>
            <HiViewGrid className='dashboard-icon' style={{marginRight: '10px'}}/>
            Dashboard
          </div>
          <div>
            <MdPayment style={{marginRight: '10px'}}/>
            Payments
          </div>
          <div>
            <TiArrowShuffle style={{marginRight: '10px'}} />
            Transactions
          </div>
          <div>
            <FiSettings style={{marginRight: '10px'}}/>
            Settings
          </div>
          <div>
            <HiOutlineLogout style={{marginRight: '10px'}}/>
            Log out
          </div>
        </div>

        <div className="sidebar__bottom">
          <div className="sidebar__bottom__title"> Invoicing Crash Course</div>
          <button className="sidebar__bottom_button"> Learn More </button>

        </div>
      </div>
    </div>
  )
}

export default Sidebar