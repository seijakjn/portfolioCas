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
        // Use URL-encoded body which Formspree accepts reliably
        const params = new URLSearchParams();
        params.append("name", form.name);
        params.append("email", form.email);
        params.append("message", form.message);

        const res = await fetch(FORMSPREE, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
          body: params.toString(),
        });

        const contentType = res.headers.get("content-type") || "";
        let data = {};
        if (contentType.includes("application/json")) {
          data = await res.json().catch(() => ({}));
        } else {
          data = { statusText: await res.text().catch(() => "") };
        }

        console.log("Formspree response status", res.status, data);

        if (res.ok) {
          setStatus("success");
          setTimeout(() => {
            setIsModalOpen(false);
            setForm({ name: "", email: "", message: "" });
            setStatus("idle");
          }, 900);
        } else {
          setStatus("error");
          console.error("Formspree returned error", res.status, data);
        }
      } catch (err) {
        setStatus("error");
        console.error("Network or other error sending to Formspree:", err);
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
        <a href="https://github.com/seijakjn" target="_blank" rel="noreferrer" aria-label="View GitHub profile">
          <img
            src="https://github.com/seijakjn.png"
            alt="Joannes Castro Jr. — GitHub avatar"
            className="avatar"
            loading="lazy"
            width="160"
            height="160"
          />
        </a>
        <h1>Joannes Castro Jr.</h1>
        <p className="subtitle">University Student • Aspiring Developer</p>

        <div className="socials">
          <a href="https://github.com/seijakjn" target="_blank" rel="noreferrer">
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
          {[
            {
              title: "Portfolio App",
              description: "Personal portfolio built with React and Vite.",
              repo: "https://github.com/seijakjn/portfolioCas",
            },
            {
              title: "Laravel Project",
              description: "Laravel project — server-side app and exercises.",
              repo: "https://github.com/seijakjn/castroLaravel",
            },
            {
              title: "SOAP Project",
              description: "Various development projects and exercises.",
              repo: "https://github.com/seijakjn/development",
            },
          ].map((p) => (
            <div className="project-card" key={p.repo}>
              <h3>{p.title.replace(/^[a-z]/, (c) => c.toUpperCase())}</h3>
              <p>{p.description}</p>
              <div className="project-links">
                <a href={p.repo} target="_blank" rel="noreferrer">
                  Source Code
                </a>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 12, textAlign: "center" }}>
          <a
            className="socials-link"
            href="https://github.com/seijakjn"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#38bdf8", fontWeight: 700 }}
          >
            View all projects on GitHub
          </a>
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
                  <button type="submit" disabled={status === "sending"}>
                    {status === "sending" ? "Sending..." : "Send"}
                  </button>
                </div>

                <div style={{ marginTop: 8, minHeight: 20 }}>
                  {status === "success" && <span style={{ color: "#10b981" }}>Message sent ✓</span>}
                  {status === "error" && (
                    <span style={{ color: "#ef4444" }}>Failed to send — check console/network.</span>
                  )}
                </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
