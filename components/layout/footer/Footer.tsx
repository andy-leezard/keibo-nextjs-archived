"use client"

import Link from "next/link"
import Image from "next/image"
import styles from "./Footer.module.css"
import { FaDiscord, FaLinkedin } from "react-icons/fa"
import { AiFillTwitterCircle } from "react-icons/ai"

const Footer = () => {
  return (
    <footer id={styles.wrapper}>
      <div className={styles.line}>
        <div className={styles.line_division}>
          <Link href="/" id={styles.home_icon}>
            Keibo
          </Link>
          <ul>
            <li>
              <a href="">
                <FaLinkedin size={22} />
              </a>
            </li>
            <li>
              <a href="">
                <AiFillTwitterCircle size={22} />
              </a>
            </li>
            <li>
              <a href="">
                <FaDiscord size={22} />
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.line_division}>
            <span>Keibo ©2023</span>
            <span></span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
