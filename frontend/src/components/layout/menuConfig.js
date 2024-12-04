const menuItems = [
  { title: 'Home', link: '/' },
  { title: 'Quiz', link: '/quiz' },
  {
    title: 'Personality Types',
    link: '/personality-types',
    
  },
  {
    title: 'Theory and Specialties',
    link: '/premium-suites',
    submenu: [
      { title: 'Theory', link: '/theory' },
      { title: 'Specialties', link: '/specialties' },
    ],
  },
  { title: 'About', link: '/about' }
];

export default menuItems;

