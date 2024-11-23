import React, { FC } from 'react';
interface IConfirmModalProps {
  onClose: () => void;
  handleEvent: () => void;
}

const ConfirmModal: FC<IConfirmModalProps> = ({ onClose, handleEvent }) => {
  return (
    <div>
      <h4 className="">Are you sure?</h4>
      <div className="">
        <button className="" type="button" onClick={onClose}>
          No
        </button>
        <button className="" type="button" onClick={handleEvent}>
          Yes
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
