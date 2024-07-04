import React from 'react';
import classes from './Hamburger.module.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5';

const Hamburger = ({ open, onClick }) => {
  return (
    <div className={classes.Hamburger} onClick={onClick}>
      {open ? (
        <IoClose
          style={{
            color: 'white',
            width: '3rem',
            marginTop: '16px',
            height: '2.5rem',
            cursor: 'pointer',
          }}
        />
      ) : (
        <GiHamburgerMenu
          style={{
            color: 'white',
            width: '3rem',
            marginTop: '16px',
            height: '2.5rem',
            cursor: 'pointer',
          }}
        />
      )}
    </div>
  );
};

export default Hamburger;
