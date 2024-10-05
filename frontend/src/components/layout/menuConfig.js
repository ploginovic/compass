const menuItems = [
  { title: 'Home', link: '/' },
  { title: 'About', link: '/about' },
  { title: 'Quiz', link: '/quiz' },
  {
    title: 'Personality Types',
    link: '/personality-types',
    submenu: [
      { title: 'Test', link: '/test' },
      { title: 'Specialized Guides', link: '/guides' },
    ],
  },
  {
    title: 'Theory and Specialties',
    link: '/premium-suites',
    submenu: [
      { title: 'New Research', link: '/research' },
      { title: 'Theory', link: '/theory' },
      { title: 'Specialties', link: '/specialties' },
    ],
  },
];

export default menuItems;

