import styles from "./ThemeSVG.module.css"

type ThemeSVGProps = {
  size: number
  theme?: string
}

const ThemeSVG = ({ size, theme }: ThemeSVGProps) => {
  const themed_moon = `${theme ? styles[theme] : ""} ${styles.moon}`
  const themed_sun = `${theme ? styles[theme] : ""} ${styles.sun}`
  
  return (
    <svg
      className={styles.theme_btn}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        pathLength="1"
        className={themed_moon}
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
      ></path>
      <circle
        pathLength="1"
        className={themed_sun}
        cx="12"
        cy="12"
        r="5"
      ></circle>
      <line
        pathLength="1"
        className={themed_sun}
        x1="12"
        y1="1"
        x2="12"
        y2="3"
      ></line>
      <line
        pathLength="1"
        className={themed_sun}
        x1="12"
        y1="21"
        x2="12"
        y2="23"
      ></line>
      <line
        pathLength="1"
        className={themed_sun}
        x1="4.22"
        y1="4.22"
        x2="5.64"
        y2="5.64"
      ></line>
      <line
        pathLength="1"
        className={themed_sun}
        x1="18.36"
        y1="18.36"
        x2="19.78"
        y2="19.78"
      ></line>
      <line
        pathLength="1"
        className={themed_sun}
        x1="1"
        y1="12"
        x2="3"
        y2="12"
      ></line>
      <line
        pathLength="1"
        className={themed_sun}
        x1="21"
        y1="12"
        x2="23"
        y2="12"
      ></line>
      <line
        pathLength="1"
        className={themed_sun}
        x1="4.22"
        y1="19.78"
        x2="5.64"
        y2="18.36"
      ></line>
      <line
        pathLength="1"
        className={themed_sun}
        x1="18.36"
        y1="5.64"
        x2="19.78"
        y2="4.22"
      ></line>
    </svg>
  )
}

export default ThemeSVG
