import React, { useState } from 'react';
import ClipboardIcon from './icons/ClipboardIcon';
import CheckIcon from './icons/CheckIcon';

interface CopyButtonProps {
  textToCopy: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    if (isCopied) return;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert('Failed to copy text.');
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-50 dark:focus:ring-offset-gray-800"
      aria-label={isCopied ? 'Copied to clipboard' : 'Copy to clipboard'}
    >
      {isCopied ? (
        <CheckIcon className="w-5 h-5 text-green-500" />
      ) : (
        <ClipboardIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
      )}
    </button>
  );
};

export default CopyButton;
