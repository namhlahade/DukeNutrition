import React from 'react';

function ProjectPage() {
  const projects = [
    {
      title: "Project 1",
      description: "This is a sample project that demonstrates how to build a simple website using React.js",
      image: "prison-walk.jpeg"
    },
    {
      title: "Project 2",
      description: "This is another sample project that demonstrates how to create a responsive navigation bar using Bootstrap",
      image: "garden-yard.jpeg"
    },
    {
      title: "Project 3",
      description: "This is a sample project that demonstrates how to create a simple online shopping cart using React and Redux",
      image: "sunflower-pot.jpeg"
    }
  ];

  return (
    <div>
      <h1>My Projects</h1>
      {projects.map((project, index) => (
        <div key={index} className="card">
          <img src={project.image} alt={project.title} />
          <div className="card-body">
            <h2>{project.title}</h2>
            <p>{project.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectPage;
