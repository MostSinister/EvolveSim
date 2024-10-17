// src/components/Modal.js

// This component creates a reusable modal dialog with a smooth transition effect.
// It can be used to display various types of content in a popup window.

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Transition } from '@headlessui/react'; // For smooth transitions

function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    // Prevent background scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <Transition show={isOpen}>
      {/* Overlay */}
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
        <Transition.Child
          enter="transition ease-out duration-300 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-200 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {/* Modal content */}
          <div className="relative w-full max-w-lg p-6 mx-4 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
              aria-label="Close Modal"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal content (passed as children) */}
            <div>{children}</div>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
}

export default Modal;
