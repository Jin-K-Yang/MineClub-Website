import React, { useState, useEffect } from "react";
import Link from "next/link";
import NavLinks from "./nav-links";
import logoImage from "../assets/images/logo-1-2.png";
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';

const HeaderTwo = () => {
  const [sticky, setSticky] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    mobileMenu();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      mobileMenu();
    };
  });

  const connectWalletHandler = () => {
    if (window.ethereum && defaultAccount == null) {
      console.log('provider detected');
    } else {
      console.error("Please install MetaMask!", error);
    }
  }

  const handleScroll = () => {
    if (window.scrollY > 70) {
      setSticky(true);
    } else if (window.scrollY < 70) {
      setSticky(false);
    }
  };

  const mobileMenu = () => {
    let subMenuColse = document.querySelectorAll(".sub-nav-toggler");
    let menuToggler = document.querySelector(".menu-toggler");
    let menuBox = document.querySelector(".main-navigation");
    menuToggler.addEventListener("click", function (e) {
      e.preventDefault();
      menuBox.classList.toggle("active");
    });
    subMenuColse.forEach((subMenuColseBtn) => {
      subMenuColseBtn.addEventListener("click", function (event) {
        let subMenu =
          event.currentTarget.parentElement.parentElement.children[1];
        event.preventDefault();
        subMenu.classList.toggle("active");
      });
    });
  };

  return (
    <header className="site-header header-one home-page-two">
      <nav
        className={`navbar navbar-expand-lg navbar-light header-navigation stricky  ${sticky === true ? "stricky-fixed" : " "
          }`}
      >
        <div className="container clearfix">
          <div className="logo-box clearfix">
            <Link href="/">
              <a className="navbar-brand">
                <img src={logoImage} alt="Awesome Image" />
              </a>
            </Link>
            <button
              className="menu-toggler"
              data-target=".header-one .main-navigation"
            >
              <span className="fa fa-bars"></span>
            </button>
          </div>

          <div className="main-navigation">
            <NavLinks />
          </div>
          <div className="right-side-box">
            <a href='javascript:void(0)' onClick={connectWalletHandler} className="header-btn">
              {connButtonText}
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderTwo;
