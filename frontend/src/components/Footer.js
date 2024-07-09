import React from "react";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="">
      <div className="mt-1 w-full bg-slate-200 px-6">
        <div className="row">
          <div className="footer-col ">
            <h4>company</h4>
            <ul>
              <li>
                <a href="/">about us</a>
              </li>
              <li>
                <a href="/">our services</a>
              </li>
              <li>
                <a href="/">privacy policy</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>get help</h4>
            <ul>
              <li>
                <a href="/">FAQ</a>
              </li>
              <li>
                <a href="/">shipping</a>
              </li>
              <li>
                <a href="/">returns</a>
              </li>

              <li>
                <a href="/">payment options</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>online shop</h4>
            <ul>
              <li>
                <a href="/">watch</a>
              </li>
              <li>
                <a href="/">Mobiles</a>
              </li>
              <li>
                <a href="/">Airpodes</a>
              </li>
              <li>
                <a href="/">earphones</a>
              </li>
              <li>
                <a href="/">Printer</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>follow us</h4>
            <div className="social-links ">
              <a href="/">
                <FaFacebook className="w-8 h-8" />
              </a>
              <a href="/">
                <FaInstagram className="w-8 h-8" />
              </a>
              <a href="/">
                <FaTwitter className="w-8 h-8" />
              </a>
              <a href="/">
                <FaLinkedin className="w-8 h-8" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className=" text-center text-lg ">
        <p className="bg-slate-200 text-red-700 font-medium p-1">
          Copyright © 2024 Jigar.m
        </p>
      </div>
    </footer>
  );
};

export default Footer;
