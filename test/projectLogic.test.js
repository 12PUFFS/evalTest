// Простые unit тесты для логики приложения
const filterProjects = (projects, search, statusFilter) => {
  return projects.filter((project) => {
    const matchesSearch =
      search === '' ||
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.description.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      statusFilter === 'all' || project.status === statusFilter;

    return matchesSearch && matchesFilter;
  });
};

test('filters projects by search term', () => {
  const projects = [
    {
      id: 1,
      title: 'Mobile App',
      description: 'React Native application',
      status: 'active',
    },
    {
      id: 2,
      title: 'Website',
      description: 'Corporate website',
      status: 'completed',
    },
  ];

  const result = filterProjects(projects, 'mobile', 'all');

  expect(result).toHaveLength(1);
  expect(result[0].title).toBe('Mobile App');
});

test('filters projects by status', () => {
  const projects = [
    {
      id: 1,
      title: 'Project A',
      description: 'Description A',
      status: 'active',
    },
    {
      id: 2,
      title: 'Project B',
      description: 'Description B',
      status: 'completed',
    },
    {
      id: 3,
      title: 'Project C',
      description: 'Description C',
      status: 'active',
    },
  ];

  const result = filterProjects(projects, '', 'active');

  expect(result).toHaveLength(2);
  expect(result[0].status).toBe('active');
  expect(result[1].status).toBe('active');
});

test('combines search and status filters', () => {
  const projects = [
    { id: 1, title: 'Mobile App', description: 'React app', status: 'active' },
    {
      id: 2,
      title: 'Mobile Website',
      description: 'Responsive site',
      status: 'completed',
    },
    {
      id: 3,
      title: 'Desktop App',
      description: 'Windows application',
      status: 'active',
    },
  ];

  const result = filterProjects(projects, 'mobile', 'active');

  expect(result).toHaveLength(1);
  expect(result[0].title).toBe('Mobile App');
});

test('empty search returns all matching status', () => {
  const projects = [
    { id: 1, title: 'Project 1', description: 'Desc 1', status: 'active' },
    { id: 2, title: 'Project 2', description: 'Desc 2', status: 'completed' },
  ];

  const result = filterProjects(projects, '', 'all');

  expect(result).toHaveLength(2);
});

test('case insensitive search', () => {
  const projects = [
    {
      id: 1,
      title: 'REACT Application',
      description: 'Mobile app',
      status: 'active',
    },
  ];

  const result = filterProjects(projects, 'react', 'all');

  expect(result).toHaveLength(1);
  expect(result[0].title).toBe('REACT Application');
});
