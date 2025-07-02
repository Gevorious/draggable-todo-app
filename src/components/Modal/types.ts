import { ReactElement } from 'react';

export type ModalProps = {
  title: string;
  content: ReactElement | string;
  onClose: () => void;
  open: boolean;
};
