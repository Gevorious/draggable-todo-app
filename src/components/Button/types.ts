export type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
