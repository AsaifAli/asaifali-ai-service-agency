"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

type DemoProject = {
  slug: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  liveUrl?: string | null;
  githubUrl: string;
  detailsUrl: string;
};

const InteractiveDemo = dynamic(
  () => import("@/components/InteractiveDemo").then((module) => module.InteractiveDemo),
  {
    ssr: false,
    loading: () => (
      <div className="live-workbench-loading" role="status" aria-live="polite">
        Loading the live workbench…
      </div>
    ),
  },
);

export function LiveWorkbench({ projects }: { projects: DemoProject[] }) {
  // InteractiveDemo requires liveUrl to always be a string. Portfolio data can
  // omit it or return null, so normalize only at this component boundary.
  const demoProjects = projects.map((project) => ({
    ...project,
    liveUrl: project.liveUrl ?? "",
  }));

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  function toggleWorkbench() {
    setMounted(true);
    setOpen((value) => !value);
  }

  return (
    <section className="refresh-live-workbench" id="live-workbench" aria-labelledby="live-workbench-title">
      <div className="studio-container">
        <div className="live-workbench-heading">
          <div>
            <p className="studio-eyebrow">04 / ADVANCED LIVE DEMO · BYOK</p>
            <h2 id="live-workbench-title">Go beyond the sample. <em>Run the real workbench.</em></h2>
          </div>
          <div className="live-workbench-intro">
            <p>Use the existing live demo flow with your own provider connection to explore the systems more deeply. The interactive module is loaded only when you open it, so it does not slow down the initial page.</p>
            <p className="live-workbench-safety">Use a test key with a spend limit and synthetic or non-confidential data. Never enter production credentials or sensitive business information.</p>
            <button type="button" className="refresh-button refresh-button-dark" onClick={toggleWorkbench} aria-expanded={open} aria-controls="live-workbench-panel">
              {open ? "Close live workbench" : "Launch live BYOK workbench"}<span aria-hidden="true">{open ? "−" : "↗"}</span>
            </button>
          </div>
        </div>
        <div className="live-workbench-summary" aria-label="Available live workbenches">
          {demoProjects.map((project, index) => (
            <div className="live-workbench-project" key={project.slug}>
              <span>0{index + 1} / {project.category}</span>
              <strong>{project.name}</strong>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
        <div id="live-workbench-panel" className="live-workbench-panel" hidden={!open}>
          {mounted ? <InteractiveDemo projects={demoProjects} /> : null}
        </div>
      </div>
    </section>
  );
}
