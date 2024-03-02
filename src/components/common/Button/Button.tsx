import React from 'react';
import styles from "./Button.module.scss";

interface ButtonProps {
  btnClass: string;
  tittle: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ btnClass, tittle, onClick }) => {
    return (
        <button onClick={onClick} className={`btn ${btnClass} ${styles.commonBtn}`}>{tittle}</button>
    );
}

export default Button;
