import './styles.scss';
import { ButtonProps } from './types';
import { FaSpinner } from 'react-icons/fa';

const Button = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  className,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={`btn ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      <span className="content-wrapper">
        {loading && <FaSpinner className="spinner" />}
        {children}
      </span>
    </button>
  );
};

export default Button;
