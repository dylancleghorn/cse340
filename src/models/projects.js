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

export {getAllProjects}
