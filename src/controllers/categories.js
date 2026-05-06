// Import any needed model functions
import { getAllCategories, getCategoryDetails, getProjectsByCategoryId } from '../models/categories.js';

// Define any controller functions
const showCategoriesPage = async (req, res, next) => {
  try {
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('categories', {
      title,
      currentPage: 'categories',
      categories,
    });
  } catch (error) {
    next(error);
  }
};

const showCategoryDetailsPage = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const categoryDetails = await getCategoryDetails(categoryId);

    if (!categoryDetails) {
      const err = new Error('Page Not Found');
      err.status = 404;
      throw err;
    }

    const projects = await getProjectsByCategoryId(categoryId);

    res.render('category', {
      title: categoryDetails.name,
      currentPage: 'categories',
      categoryDetails,
      projects,
    });
  } catch (error) {
    next(error);
  }
};

// Export any controller functions
export { showCategoriesPage, showCategoryDetailsPage };
