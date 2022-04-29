import React, { useState, useEffect } from "react";
import Link from "next/link";
import NavLinks from "./nav-links";
import logoImage from "../assets/images/logo-1-2.png";
import { ethers } from 'ethers';

const HeaderTwo = () => {
  const [sticky, setSticky] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');
  const [clipBoardText, setClipBoardText] = useState('Copy to clipboard');

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    mobileMenu();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      mobileMenu();
    };
  });

  const connectWalletHandler = () => {
    if (window.ethereum && defaultAccount == null) {  // Provider detected
      console.log('provider detected');

      // Set ethers provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // MetaMask requires requesting permission to connect users' accounts
      provider.send("eth_requestAccounts", []).then((accounts) => {
        if (accounts.length > 0) {
          setDefaultAccount(accounts[0]);
          setConnButtonText(accounts[0].substr(0, 5) + '...' + accounts[0].substr(41 - 5, 5));
          console.log(accounts[0]);
        }
      }).catch((e) => {
        console.log(e);
      })
    } else if (window.ethereum && defaultAccount) {   // Already connected
      setClipBoardText('Copied!');
      navigator.clipboard.writeText(defaultAccount);
    } else {    // MetaMask not installed
      console.log("Please install MetaMask!");
      alert("Please install MetaMask!!");
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

  const outFun = () => {
    setClipBoardText("Copy to clipboard");
  }

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
            <a href='#!' onClick={connectWalletHandler} className="header-btn" onMouseOut={outFun}>
              <span id="tooltip" className={defaultAccount ? "tooltip-text" : " "}>{defaultAccount ? clipBoardText : ""}</span>
              {connButtonText}
            </a>
          </div>
        </div>
      </nav>
    </header >
  );
};

export default HeaderTwo;
