import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';
import db, { testConnection } from './src/models/db.js';
import { getAllOrganizations } from './src/models/organizations.js';

// Define the application environment
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';

// Define the port number the server will listen on
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const currentYear = new Date().getFullYear();
const renderPage = (viewName, title, currentPage) => (req, res) => {
  res.render(viewName, { title, currentPage });
};

const organizationsPage = async (req, res, next) => {
  try {
    const organizations = await getAllOrganizations();
    res.render('organizations', {
      title: 'Our Partner Organizations',
      currentPage: 'organizations',
      organizations,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Configure Express middleware
 */

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/layout');
app.locals.currentYear = currentYear;

/**
 * Routes
 */
app.get('/', renderPage('index', 'Home', 'home'));
app.get('/organizations', organizationsPage);
app.get('/projects', renderPage('projects', 'Projects', 'projects'));
app.get('/categories', renderPage('categories', 'Categories', 'categories'));

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send('Internal Server Error');
});

app.listen(PORT, async () => {
  try {
    await testConnection();
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
});
