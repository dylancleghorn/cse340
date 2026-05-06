import db from './db.js'

const getAllProjects = async() => {
    const query = `
        SELECT
            service_project.service_project_id,
            service_project.organization_id,
            organization.name AS organization_name,
            service_project.title,
            service_project.description,
            service_project.location,
            service_project.project_date
        FROM public.service_project
        INNER JOIN public.organization
            ON service_project.organization_id = organization.organization_id
        ORDER BY project_date, title;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getUpcomingProjects = async (number_of_projects) => {
    const query = `
        SELECT
            sp.service_project_id AS project_id,
            sp.title,
            sp.description,
            sp.project_date AS date,
            sp.location,
            sp.organization_id,
            o.name AS organization_name
        FROM public.service_project sp
        INNER JOIN public.organization o
            ON sp.organization_id = o.organization_id
        WHERE sp.project_date >= CURRENT_DATE
        ORDER BY sp.project_date ASC, sp.title ASC
        LIMIT $1;
    `;

    const queryParams = [number_of_projects];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const getProjectDetails = async (id) => {
    const query = `
        SELECT
            sp.service_project_id AS project_id,
            sp.title,
            sp.description,
            sp.project_date AS date,
            sp.location,
            sp.organization_id,
            o.name AS organization_name
        FROM public.service_project sp
        INNER JOIN public.organization o
            ON sp.organization_id = o.organization_id
        WHERE sp.service_project_id = $1;
    `;

    const queryParams = [id];
    const result = await db.query(query, queryParams);

    return result.rows.length > 0 ? result.rows[0] : null;
};

const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT
            service_project_id,
            organization_id,
            title,
            description,
            location,
            project_date
        FROM public.service_project
        WHERE organization_id = $1
        ORDER BY project_date;
    `;

    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

export { getAllProjects, getUpcomingProjects, getProjectDetails, getProjectsByOrganizationId };
