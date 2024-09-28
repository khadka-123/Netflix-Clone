import React from 'react'
import logo from './logo.png'
import {Link} from 'react-router-dom'
import { CiSearch } from "react-icons/ci";
const Header = () => {
  console.log("header is rendering")
  return (
    <nav className='header'>
        <img src={logo} alt="logo" />

        <div>
          <Link to="/tvShows" >TV Shows</Link>
          <Link to="/movies" >Movies</Link>
          <Link to="/recentlyadded" >Recently Added</Link>
          <Link to="/mulist" >My List</Link>
        </div>
           <CiSearch />
    </nav>
  )
}

export default Header