import { Link } from 'react-router-dom';
import './ProjectCard.css';

export default function ProjectCard({ project }) {
  return (
    <div className="project_card">
      <div className="project-info">
        <Link to={`/projects/${project.id}`}>
          <p
            className="cat"
            style={{
              color:
                project.status === 'completed'
                  ? 'green'
                  : project.status === 'in-progress'
                  ? 'orange'
                  : project.status === 'active'
                  ? 'red'
                  : 'white',
            }}
          >
            {project.status}
          </p>
          <h2>{project.title}</h2>
        </Link>
      </div>
    </div>
  );
}
