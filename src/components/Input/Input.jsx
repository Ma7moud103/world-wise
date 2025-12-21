import { memo } from "react";
import styles from "../Form/Form.module.css";

const Input = memo(({
    label,
    type,
    id,
    onChange,
    value,
    error
}) => {
    return (
        <div className={styles.row}>
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                id={id}
                onChange={onChange}
                value={value}
                className={error ? styles.error : ""}
            />
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
});

// Input.displayName = 'Input';

export default Input;