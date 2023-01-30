import styles from 'styles/Button.module.css'

const Button = ({ children, onClick, disabled }) => {
    return <>
        <button className={styles.button} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    </>
}

export default Button