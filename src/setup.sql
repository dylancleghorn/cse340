-- ========================================
-- Organization Table
-- ========================================

DROP TABLE IF EXISTS service_project;
DROP TABLE IF EXISTS organization;

CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- ========================================
-- Insert sample data: Organizations
-- ========================================

INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
    ('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
    ('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
    ('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

-- ========================================
-- Service Project Table
-- ========================================

CREATE TABLE service_project (
    service_project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(150) NOT NULL,
    project_date DATE NOT NULL,
    CONSTRAINT fk_service_project_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization (organization_id)
);

-- ========================================
-- Insert sample data: Service Projects
-- ========================================

INSERT INTO service_project (organization_id, title, description, location, project_date)
VALUES
    (1, 'Community Park Restoration', 'Volunteers will clean, paint, and refresh local park amenities for neighborhood families.', 'Riverfront Park', '2026-05-10'),
    (1, 'Habitat Cleanup Day', 'Support a local habitat restoration effort by removing debris and preparing native planting areas.', 'Oak Ridge Preserve', '2026-05-17'),
    (1, 'Neighborhood Trail Repair', 'Assist with trail edging, trash pickup, and minor surface repairs along a community trail.', 'Pine Creek Trail', '2026-05-24'),
    (1, 'Senior Center Garden Refresh', 'Help replace worn garden beds and plant seasonal flowers around the senior center.', 'Maple Senior Center', '2026-06-01'),
    (1, 'Schoolyard Mural Prep', 'Prepare outdoor walls and common spaces for a student-led mural project.', 'Westside Elementary', '2026-06-08'),

    (2, 'Urban Farm Harvest', 'Gather, sort, and package fresh produce for local food distribution partners.', 'Downtown Grow House', '2026-05-11'),
    (2, 'Seedling Transplant Workshop', 'Assist with transplanting seedlings and teaching families how to start gardens at home.', 'GreenHarvest Learning Farm', '2026-05-18'),
    (2, 'Community Compost Build', 'Help construct compost bins and organize composting materials for neighborhood use.', 'East Market Garden', '2026-05-25'),
    (2, 'Farm Stand Support', 'Set up produce displays and welcome visitors at a weekend community farm stand.', 'Central Plaza', '2026-06-02'),
    (2, 'Pollinator Habitat Planting', 'Plant native flowers and mulching areas designed to support pollinators.', 'Sunrise Community Plot', '2026-06-09'),

    (3, 'Food Pantry Sorting', 'Sort donated food and prepare distribution bags for households in need.', 'UnityServe Distribution Center', '2026-05-12'),
    (3, 'Shelter Linen Drive', 'Collect, sort, and organize donated linens and personal care items for a local shelter.', 'Northside Shelter', '2026-05-19'),
    (3, 'Weekend Meal Prep', 'Prepare meal kits and coordinate pickup for community meal outreach.', 'Hope Center Kitchen', '2026-05-26'),
    (3, 'Community Resource Fair', 'Welcome guests, direct traffic, and help at information tables for a local service fair.', 'Civic Hall', '2026-06-03'),
    (3, 'Neighborhood Supply Kits', 'Assemble hygiene and school supply kits for distribution through partner agencies.', 'UnityServe Office', '2026-06-10');

-- ========================================
-- Verify data
-- ========================================

SELECT * FROM organization;
SELECT * FROM service_project;
