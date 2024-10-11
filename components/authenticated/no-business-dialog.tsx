import React from "react";

interface NoBusinessDialogProps {
  open: boolean;
  onClose: () => void;
}

const NoBusinessDialog: React.FC<NoBusinessDialogProps> = ({
  open,
  onClose,
}) => {
  return <h1>Test</h1>;
};

export default NoBusinessDialog;
