import { useNavigate, useParams } from 'react-router-dom';
import { useProjects } from '../../hooks/useProjects';
import './ProjectDetails.css';

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, loading } = useProjects();
  const project = projects.find((p) => p.id === parseInt(id));

  if (loading) {
    return (
      <div className="wrapper">
        <div className="loading">Loading project...</div>
      </div>
    );
  }

  if (!project) {
    return <div className="loading">Project not found</div>;
  }

  return (
    <div className="wrappero">
      <div className="containero">
        <div className="item">
          <h2>{project.title}</h2>

          <p className="project-description">{project.description}</p>

          <div className="meta-grid">
            <div className="meta-item">
              <span className="meta-label">Created Date</span>
              <span className="meta-value">{project.createdAt}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Owner</span>
              <span className="meta-value">{project.owner}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Priority</span>
              <span className="meta-value">{project.priority}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Deadline</span>
              <span className="meta-value">{project.deadline}</span>
            </div>
          </div>

          <div className="budget-card">
            <span className="budget-label">Budget</span>
            <span className="budget-value">{project.budget}</span>
          </div>

          <div className="data-card">
            <span className="data-label">Team</span>
            <div className="data-content">
              {Array.isArray(project.team)
                ? project.team.join(', ')
                : project.team}
            </div>
          </div>

          <div className="data-card">
            <span className="data-label">Technologies</span>
            <div className="data-content">
              {Array.isArray(project.technologies)
                ? project.technologies.join(', ')
                : project.technologies}
            </div>
          </div>

          <div className="progress-section">
            <div className="progress-header">
              <span className="progress-label">Progress</span>
              <span className="progress-value">{project.progress}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          </div>

          <div className="meta-grid">
            <div className="meta-item">
              <span className="meta-label">Tasks Completed</span>
              <span className="meta-value">{project.tasksCompleted}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Total Tasks</span>
              <span className="meta-value">{project.totalTasks}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Last Update</span>
              <span className="meta-value">{project.lastUpdate}</span>
            </div>
          </div>

          <div className="data-card">
            <span className="data-label">Client</span>
            <div className="data-content">{project.client}</div>
          </div>

          <div className="data-card">
            <span className="data-label">Requirements</span>
            <div className="data-content">
              {Array.isArray(project.requirements)
                ? project.requirements.map((req, index) => (
                    <div key={index} className="requirement-item">
                      • {req}
                    </div>
                  ))
                : project.requirements}
            </div>
          </div>

          <div className="data-card goal-card">
            <span className="data-label">Project Goal</span>
            <div className="data-content goal-content">{project.goal}</div>
          </div>

          <button onClick={() => navigate(-1)}>Back to List</button>
        </div>
      </div>
    </div>
  );
}
