import { useState } from 'react';
import { useProjects } from '../../hooks/useProjects';
import ProjectCard from '../ProjectCard/ProjectCard';
import './ProjectList.css';

export default function ProjectList() {
  const { projects, loading } = useProjects();
  const [search, setSearch] = useState('');

  const filteredProjects = projects.filter(
    (project) =>
      search === '' ||
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.description.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="wrapper">
        <div className="container">
          <div className="loading">Загрузка проектов...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="container">
        <div className="search-section">
          <input
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск проектов..."
            type="text"
          />
          <div className="search-stats">
            Найдено проектов: {filteredProjects.length}
          </div>
        </div>

        {filteredProjects.length === 0 && search !== '' && (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>Проекты не найдены</h3>
            <p>Попробуйте изменить поисковый запрос</p>
          </div>
        )}

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
