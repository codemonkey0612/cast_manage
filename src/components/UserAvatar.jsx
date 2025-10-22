import React from 'react';

const UserAvatar = ({ 
  name, 
  size = 'md', 
  variant = 'default',
  showStatus = false,
  status = 'online',
  onClick = null 
}) => {
  // Generate initials from name
  const getInitials = (fullName) => {
    if (!fullName) return '?';
    const names = fullName.split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
  };

  // Generate background color based on name
  const getBackgroundColor = (name) => {
    if (!name) return 'bg-gray-400';
    
    const colors = [
      'bg-blue-500',
      'bg-green-500', 
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-yellow-500',
      'bg-red-500',
      'bg-teal-500',
      'bg-orange-500',
      'bg-cyan-500'
    ];
    
    const hash = name.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    return colors[Math.abs(hash) % colors.length];
  };

  const getSizeClasses = (size) => {
    switch (size) {
      case 'xs':
        return 'w-6 h-6 text-xs';
      case 'sm':
        return 'w-8 h-8 text-sm';
      case 'md':
        return 'w-10 h-10 text-base';
      case 'lg':
        return 'w-12 h-12 text-lg';
      case 'xl':
        return 'w-16 h-16 text-xl';
      default:
        return 'w-10 h-10 text-base';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'bg-green-400';
      case 'offline':
        return 'bg-gray-400';
      case 'busy':
        return 'bg-red-400';
      case 'away':
        return 'bg-yellow-400';
      default:
        return 'bg-gray-400';
    }
  };

  const getVariantClasses = (variant) => {
    switch (variant) {
      case 'rounded':
        return 'rounded-lg';
      case 'square':
        return 'rounded-none';
      case 'circle':
      default:
        return 'rounded-full';
    }
  };

  return (
    <div className="relative inline-block">
      <div 
        className={`
          ${getSizeClasses(size)} 
          ${getBackgroundColor(name)} 
          ${getVariantClasses(variant)}
          flex items-center justify-center text-white font-semibold
          transition-all duration-200 hover:scale-105 cursor-pointer
          shadow-md hover:shadow-lg
          ${onClick ? 'hover:opacity-80' : ''}
        `}
        onClick={onClick}
      >
        {name ? getInitials(name) : '?'}
      </div>
      
      {/* Status indicator */}
      {showStatus && (
        <div className={`
          absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white
          ${getStatusColor(status)}
        `}></div>
      )}
    </div>
  );
};

export default UserAvatar;
