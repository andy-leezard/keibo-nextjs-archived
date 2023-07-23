import Link from "next/link"
import styles from "./Footer.module.css"
import { FaDiscord, FaGithubSquare, FaLinkedin } from "react-icons/fa"
import { AiFillTwitterCircle } from "react-icons/ai"
import { WithLocale } from "@/i18n-config"

const Footer = ({ currentLocale }: WithLocale) => {
  return (
    <footer id={styles.wrapper}>
      <div className={styles.line}>
        <div className={styles.line_division}>
          <Link href="/" id={styles.home_icon}>
            Keibo
          </Link>
          <ul>
            <li>
              <a href="https://www.linkedin.com/in/andy-lee-4b913719a/">
                <FaLinkedin size={22} />
              </a>
            </li>
            <li>
              <a href="https://github.com/AndyLeezard">
                <FaGithubSquare size={22} />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/andyleedev">
                <AiFillTwitterCircle size={22} />
              </a>
            </li>
            {/* <li>
              <a href="">
                <FaDiscord size={22} />
              </a>
            </li> */}
          </ul>
        </div>
        <div className={styles.line_division}>
          <span style={{ minWidth: "102px" }}>Keibo ©2023</span>
          {/* <ThemeState /> */}
          {/* <LocaleSwitcher
            currentLocale={currentLocale}
            placement="top"
            hideLabel
          /> */}
        </div>
      </div>
    </footer>
  )
}

export default Footer
