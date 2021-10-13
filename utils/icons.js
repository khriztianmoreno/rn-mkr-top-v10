const iconsName = (routeName) => {
  const icons = {
    Characters: 'users',
    Episodes: 'tv',
    Locations: 'map-marker',
  };

  return icons[routeName] || 'users';

  // switch (routeName) {
  //   case 'Characters':
  //     return 'users';
  //   case 'Episodes':
  //     return 'tv';
  //   case 'Locations':
  //     return 'map-marker';
  //   default:
  //     return 'users';
  // }
};

export default iconsName;
