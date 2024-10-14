import React from 'react';
import { User } from 'lucide-react'; // Assuming you're using lucide-react for icons

const UserAvatar = ({ user }) => {
  return (
    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center">
      {user.photoURL ? (
        <img src={user.photoURL} alt={user.displayName || 'User'} className="w-full h-full object-cover" />
      ) : (
        <User className="w-6 h-6 text-gray-600" />
      )}
    </div>
  );
};

export default UserAvatar;
