import './styles.scss';
import { ModalProps } from './types';

const Modal = ({ open, title, content, onClose }: ModalProps) => {
  return open ? (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        {content}
      </div>
    </div>
  ) : null;
};

export default Modal;
