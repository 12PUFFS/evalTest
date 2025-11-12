import { useState } from 'react';
import { useProjects } from '../../hooks/useProjects';
import ProjectCard from '../ProjectCard/ProjectCard';
import './ProjectList.css';

export default function ProjectList() {
  const { projects, loading } = useProjects();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      search === '' ||
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.description.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      activeFilter === 'all' || project.status === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const statusFilters = [
    { key: 'all', label: 'All Projects' },
    { key: 'active', label: 'Active' },
    { key: 'in-progress', label: 'In Progress' },
    { key: 'completed', label: 'Completed' },
    { key: 'planning', label: 'Planning' },
  ];

  return (
    <div className="wrapper">
      <div className="container">
        {/* Page Header */}
        <div className="page-header"></div>

        {/* Unified Control Panel */}
        <div className="control-panel">
          {/* Search Section */}
          <div className="search-container"></div>

          {/* Filters Section */}
          <div className="filters-section">
            <div className="filters-header">
              <h3 className="filters-title">Status Filters</h3>
              <div className="search-stats">
                Projects found: {filteredProjects.length}
              </div>
            </div>

            <div className="filter-tags">
              {statusFilters.map((filter) => (
                <button
                  key={filter.key}
                  className={`filter-tag ${
                    activeFilter === filter.key ? 'active' : ''
                  }`}
                  onClick={() => setActiveFilter(filter.key)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="empty-state">
            <div className="loading">Loading projects...</div>
          </div>
        ) : (
          <>
            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <div className="empty-state">
                <input
                  className="search-input"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by project name or description..."
                  type="text"
                />
                <div className="empty-desc">
                  <div className="empty-icon">
                    {search || activeFilter !== 'all' ? '📁' : ''}
                  </div>
                  <h3>
                    {search || activeFilter !== 'all'
                      ? 'No projects found'
                      : 'No projects available'}
                  </h3>
                  <p>
                    {search
                      ? 'Try adjusting your search terms or reset filters'
                      : activeFilter !== 'all'
                      ? 'Try selecting a different status or reset filters'
                      : 'Start by creating a new project'}
                  </p>
                </div>
              </div>
            )}

            {/* Projects Grid */}
            {filteredProjects.length > 0 && (
              <div className="projects-grid">
                <input
                  className="search-input"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by project name or description..."
                  type="text"
                />
                <div className="listic">
                  {filteredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
