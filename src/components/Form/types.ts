import { FieldValues } from 'react-hook-form';

export type FormProps = {
  onCancel: () => void;
  onSubmit: (data: FieldValues) => void;
  defaults?: {
    title: string;
    description: string;
  };
  loading?: boolean;
  okBtnText?: string;
};
