import React, { useState } from 'react';
import ClipboardIcon from './icons/ClipboardIcon';
import CheckIcon from './icons/CheckIcon';

interface CopyButtonProps {
  textToCopy: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  const buttonStyle: React.CSSProperties = {
    background: 'none',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '0.5rem',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
  };

  return (
    <button onClick={handleCopy} style={buttonStyle} title="Copy to clipboard">
      {copied ? <CheckIcon /> : <ClipboardIcon />}
    </button>
  );
};

export default CopyButton;
