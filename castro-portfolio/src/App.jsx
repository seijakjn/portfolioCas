import "./App.css";
import { useState } from "react";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  const FORMSPREE = import.meta.env.VITE_FORMSPREE_ENDPOINT || null;

  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    if (FORMSPREE) {
      try {
        setStatus("sending");
        const res = await fetch(FORMSPREE, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
        });
        const data = await res.json().catch(() => ({}));
        if (res.ok) {
          setStatus("success");
          setTimeout(() => {
            setIsModalOpen(false);
            setForm({ name: "", email: "", message: "" });
            setStatus("idle");
          }, 900);
        } else {
          setStatus("error");
          console.error("Formspree error", data);
        }
      } catch (err) {
        setStatus("error");
        console.error(err);
      }
    } else {
      // fallback to mailto (opens user's mail client)
      const recipient = "joannes.castro@urios.edu.ph";
      const subject = `Contact from ${form.name || "Website"}`;
      const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
      const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
      setIsModalOpen(false);
    }
  }

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
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noreferrer">
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

      {/* Floating Email Tab */}
      <button className="email-tab" onClick={() => setIsModalOpen(true)}>
        Email Me
      </button>

      {/* Modal contact form (mailto) */}
      {isModalOpen && (
        <div className="email-modal" role="dialog" aria-modal="true">
          <div className="email-modal-content">
            <button
              className="email-close"
              aria-label="Close contact form"
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>
            <h3>Contact Me</h3>
            <form onSubmit={handleSubmit}>
              <label>
                Name
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                />
              </label>

              <label>
                Email
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />
              </label>

              <label>
                Message
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Write your message..."
                />
              </label>

              <div className="actions">
                <button type="button" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit">Send</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
