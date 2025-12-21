import styles from "./Button.module.css";
const Button = ({children , onClick , type, disabled}) => {
  return (
      <button disabled={disabled} className={`${styles.btn} ${styles[type]} ${disabled ? styles.disabled : ''}`} onClick={onClick}>{children}</button>
  )
}

export default Button