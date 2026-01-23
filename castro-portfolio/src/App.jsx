import "./App.css";

function App() {
  return (
    <div className="app">
      {/* Hero Section */}
      <section className="hero">
        <h1>Joannes Castro Jr.</h1>
        <p className="subtitle">University Student • Aspiring Developer</p>

        <div className="socials">
          <a href="https://github.com/yourusername" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <h2>About Me</h2>
        <p>
          Hi! I’m Joannes. I’m learning web development and building cool projects
          with React, Vite, and JavaScript.
        </p>
      </section>

      {/* Projects Section */}
      <section className="projects">
        <h2>Projects</h2>

        <div className="project-grid">
          <div className="project-card">
            <h3>React Portfolio</h3>
            <p>This personal portfolio built with React and Vite.</p>
            <div className="project-links">
              <a href="#">Live Demo</a>
              <a href="#">Source Code</a>
            </div>
          </div>

          <div className="project-card">
            <h3>Vite Practice App</h3>
            <p>A small app I built to practice modern frontend tooling.</p>
            <div className="project-links">
              <a href="#">Live Demo</a>
              <a href="#">Source Code</a>
            </div>
          </div>

          <div className="project-card">
            <h3>School Projects</h3>
            <p>Various projects and exercises from university coursework.</p>
            <div className="project-links">
              <a href="#">Live Demo</a>
              <a href="#">Source Code</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Joannes Castro Jr.</p>
      </footer>
    </div>
  );
}

export default App;
