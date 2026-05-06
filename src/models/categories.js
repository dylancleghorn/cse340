import db from './db.js'

const getAllCategories = async() => {
    const query = `
        SELECT category_id, name, description
        FROM public.category
        ORDER BY name;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getCategoryDetails = async (categoryId) => {
    const query = `
        SELECT category_id, name, description
        FROM public.category
        WHERE category_id = $1;
    `;

    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);

    return result.rows.length > 0 ? result.rows[0] : null;
};

const getProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT
            sp.service_project_id AS project_id,
            sp.organization_id,
            o.name AS organization_name,
            sp.title,
            sp.description,
            sp.location,
            sp.project_date AS date
        FROM public.service_project sp
        INNER JOIN public.service_project_category spc
            ON sp.service_project_id = spc.service_project_id
        INNER JOIN public.organization o
            ON sp.organization_id = o.organization_id
        WHERE spc.category_id = $1
        ORDER BY sp.project_date ASC, sp.title ASC;
    `;

    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

export { getAllCategories, getCategoryDetails, getProjectsByCategoryId };
