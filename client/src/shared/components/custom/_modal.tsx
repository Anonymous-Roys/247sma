import React from "react";
import {
  Dialog,

  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog"; // Ensure you have the correct import based on your setup
import CompsButton from "./_btn";
import {ModalProps} from '../../types/types'



const CompsModal: React.FC<ModalProps> = ({
  isOpen,
  onOpenChange,
  title,
  description,
  children,
  confirmText = "Confirm",
  onConfirm,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="mt-4">{children}</div>

        <div className="flex justify-end mt-4">
          <CompsButton
            onClick={() => onOpenChange(false)}
            className="mr-2 text-gray-500 hover:text-gray-700"
            error={true}
          >
            Cancel
          </CompsButton>
          <CompsButton
            onClick={onConfirm}
            className="px-4 py-2 text-white bg-green-900 rounded hover:bg-green-800"
          >
            {confirmText}
          </CompsButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompsModal;
