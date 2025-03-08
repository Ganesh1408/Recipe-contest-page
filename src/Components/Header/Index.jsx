import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "./styles.css";

function Header() {
  return (
    <div className="header">
      <h1 className="title">Recipe Contest</h1>
    <AccountCircleIcon sx={{height:"40px",width:"40px",borderRadius:"50%"}}/>
    </div>
  )
}

export default Header
