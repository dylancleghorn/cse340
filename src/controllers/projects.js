// Import any needed model functions
import { getUpcomingProjects, getProjectDetails } from '../models/projects.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

// Define any controller functions
const showProjectsPage = async (req, res, next) => {
  try {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';

    res.render('projects', {
      title,
      currentPage: 'projects',
      projects,
    });
  } catch (error) {
    next(error);
  }
};

const showProjectDetailsPage = async (req, res, next) => {
  try {
    const projectId = req.params.id;
    const project = await getProjectDetails(projectId);

    if (!project) {
      const err = new Error('Page Not Found');
      err.status = 404;
      throw err;
    }

    res.render('project', {
      title: 'Service Project Details',
      currentPage: 'projects',
      project,
    });
  } catch (error) {
    next(error);
  }
};

// Export any controller functions
export { showProjectsPage, showProjectDetailsPage };
