import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import moc from "../assets/images/banner-moc-1-2.png";
import { ethers } from 'ethers';

import { nftContractAddress } from '../config.js'
import NFT from '../utils/MineClub.json'

const bannertwo = () => {
  const [inputValue, setInputValue] = useState("");

  const handleClick = async () => {
    if (inputValue > 0 && inputValue < 3) {
      await checkWalletConnected();
      await checkCorrectNetwork();
      await mint(inputValue);
    }
    else {
      alert("input error");
    }
  }

  const checkWalletConnected = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        console.log("account:", accounts);
      }
      else {
        alert("Please connect the wallet.");
      }
    }
    else {
      alert("Please install Metamask.");
    }
  }

  const checkCorrectNetwork = async () => {
    let chainId = await window.ethereum.request({ method: "eth_chainId" });
    console.log("Chain Id:", chainId);

    const rinkebyChainId = '0x4';

    if (chainId !== rinkebyChainId) {
      alert("Please switch to rinkeby network.");
    }
  }

  const mint = async (quantity) => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(nftContractAddress, NFT.abi, signer);

        let nftTx = await nftContract.mint(0, quantity, { value: ethers.utils.parseEther(`0.${quantity}`) });
        console.log("nftTx:", nftTx);
        console.log("nft tx hash:", nftTx.hash);
        alert("minting...");

        let tx = await nftTx.wait();
        console.log("tx:", tx);
        alert("minted");
      }
      else {
        console.log("Please install Metamask.");
      }
    } catch (error) {
      console.log('Error minting NFT', error)
      alert("Error minting NFT");
    }
  }

  return (
    <section className="banner-style-one home-page-two" id="banner">
      <span className="bubble-1"></span>
      <span className="bubble-2"></span>
      <span className="bubble-3"></span>
      <span className="bubble-4"></span>
      <span className="bubble-5"></span>
      <span className="bubble-6"></span>
      <img src={moc} className="banner-mock" alt="Awesome Image" />
      <Container>
        <Row>
          <Col xl={6} lg={8}>
            <div className="content-block">
              <h3>
                Mint Your <br /> Own Pass.
              </h3>
              <input value={inputValue} onChange={(event) => setInputValue(event.target.value)}></input>
              <div className="button-block">
                <a href="#" onClick={() => handleClick()} className="banner-btn">
                  <span>Mint</span>(Maximum 2 per tx)
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section >
  );
};

export default bannertwo;
