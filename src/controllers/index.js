// Define any controller functions
const showHomePage = async (req, res) => {
  const title = 'Home';

  res.render('index', { title, currentPage: 'home' });
};

// Export any controller functions
export { showHomePage };
