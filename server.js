import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';

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

/**
 * Configure Express middleware
 */

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/layout');
app.locals.currentYear = currentYear;

/**
 * Routes
 */
app.get('/', renderPage('index', 'Home', 'home'));
app.get('/organizations', renderPage('organizations', 'Organizations', 'organizations'));
app.get('/projects', renderPage('projects', 'Projects', 'projects'));
app.get('/categories', renderPage('categories', 'Categories', 'categories'));

app.listen(PORT, () => {
  console.log(`Server is running at http://127.0.0.1:${PORT}`);
  console.log(`Environment: ${NODE_ENV}`);
});
