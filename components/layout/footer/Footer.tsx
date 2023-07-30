import Link from "next/link"
import styles from "./Footer.module.css"
import { FaDiscord, FaGithubSquare, FaLinkedin } from "react-icons/fa"
import { AiFillTwitterCircle } from "react-icons/ai"
import { WithLocale } from "@/i18n-config"

type FooterProps = WithLocale & {
  discreet?: boolean
}

const Footer = ({ currentLocale, discreet }: FooterProps) => {
  return (
    <footer className="relative flex justify-center items-center left-0 right-0 pt-2 pb-2 pl-1 pr-1 bg-gray-400 dark:bg-black">
      {discreet ? (
        <span>Keibo ©2023</span>
      ) : (
        <div className={styles.line}>
          <div className={styles.line_division}>
            <Link href="/" className="text-2xl font-bold">
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
      )}
    </footer>
  )
}

export default Footer
