import Link from "next/link"
import Image from "next/image"
import styles from "./Nav.module.css"
import { AuthState } from "./client/auth-state"
import { Locale } from "@/i18n-config"

type NavProps = {
  currentLocale: Locale
}

const Nav = ({ currentLocale }: NavProps) => {
  return (
    <nav id={styles.wrapper}>
      <div id={styles.aurora} />
      <div id={styles.container}>
        <Link href="/" id={styles.home_icon}>
          <Image src="/letter_64.png" width={36} height={36} alt="Home" />
        </Link>
        <AuthState />
      </div>
    </nav>
  )
}

export default Nav
