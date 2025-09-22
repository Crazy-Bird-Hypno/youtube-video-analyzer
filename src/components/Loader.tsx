import React from 'react';

const Loader = () => (
  <div className="flex flex-col items-center justify-center space-y-4 py-8">
    <div
      className="w-12 h-12 rounded-full animate-spin border-4 border-solid border-blue-500 border-t-transparent"
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
    <p className="text-gray-600 dark:text-gray-300">Analyzing video... this may take a moment.</p>
  </div>
);

export default Loader;
