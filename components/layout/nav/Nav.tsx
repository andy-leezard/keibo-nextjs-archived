import Link from "next/link"
import Image from "next/image"
import styles from "./Nav.module.css"
import Button from "../button"
/* import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from "next-auth/react" */

const Nav = () => {
  return (
    <nav id={styles.wrapper}>
      <div id={styles.aurora}/>
      <div id={styles.container}>
        <Link href="/" id={styles.home_icon}>
          <Image src="/letter_64.png" width={36} height={36} alt="Home" />
        </Link>
        <Button>
            Sign in
        </Button>
      </div>
    </nav>
  )
}

export default Nav
