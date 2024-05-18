const menuItems = [
  { title: 'Home', link: '/' },
  { title: 'About', link: '/about' },
  { title: 'Quiz', link: '/quiz' },
  {
    title: 'Personality Types',
    link: '/personality-types',
    submenu: [
      { title: 'Articles', link: '/articles' },
      { title: 'Specialized Guides', link: '/guides' },
    ],
  },
  {
    title: 'Whatevs',
    link: '/premium-suites',
    submenu: [
      { title: 'New Research', link: '/research' },
      { title: 'Theory', link: '/theory' },
    ],
  },
];

export default menuItems;

