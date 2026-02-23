import { useEffect, useMemo, useState } from "react";
import "./App.css";

// ✅ 지금 assets 폴더에 있는 파일명을 그대로 사용
import img1 from "./assets/IMG_0933 2.jpg";
import img2 from "./assets/IMG_1036.JPG";
import img3 from "./assets/IMG_1894.jpg";

type Project = {
  id: string;
  title: string;
  desc: string;
  image: string;
  tags?: string[];
};

function Modal({
  open,
  onClose,
  title,
  image,
  desc,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  image: string;
  desc: string;
}) {
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modalOverlay" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modalHeader">
          <div>
            <div className="modalTitle">{title}</div>
            <div className="modalDesc">{desc}</div>
          </div>
          <button className="iconBtn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="modalBody">
          <img className="modalImg" src={image} alt={title} />
        </div>
      </div>
    </div>
  );
}

function Card({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <article className="card clickable" onClick={onClick} role="button">
      <img className="cardImg" src={project.image} alt={project.title} />
      <div className="cardTitle">{project.title}</div>
      <div className="cardDesc">{project.desc}</div>
      {project.tags?.length ? (
        <div className="tags">
          {project.tags.map((t) => (
            <span className="tag" key={t}>
              {t}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}

export default function App() {
  const copy = {
    brand: "JUNHAK",
    pill: "⚡︎ Building in public",
    heroTitle1: "만들고, 기록하고,",
    heroTitle2: "보여준다.",
    heroDesc:
      "프로젝트를 만들고, 정리하고, 보여주는 홈페이지. 가장 기본 버전부터 빠르게 완성하고 계속 다듬어 갑니다.",
    ctaProjects: "프로젝트 보기",
    ctaContact: "연락하기",
    aboutTitle: "About",
    aboutP1:
      "저는 만들면서 배우는 걸 좋아합니다. 이 페이지는 작업물과 생각을 정리하는 공간이에요.",
    aboutP2: "관심 분야 / 목표를 한 줄로 적어보세요.",
    projectsTitle: "Projects",
    contactTitle: "Contact",
    emailLabel: "Email:",
    email: "your@email.com",
    linksLabel: "Links:",
    github: "GitHub",
    instagram: "Instagram",
    emailSubject: "안녕하세요 (홈페이지 통해 연락드립니다)",
  };

  const projects: Project[] = useMemo(
    () => [
      {
        id: "p1",
        title: "작업 1",
        desc: "클릭하면 크게 보기",
        image: img1,
        tags: ["Art", "Mixed media"],
      },
      {
        id: "p2",
        title: "작업 2",
        desc: "클릭하면 크게 보기",
        image: img2,
        tags: ["Design", "Poster"],
      },
      {
        id: "p3",
        title: "작업 3",
        desc: "클릭하면 크게 보기",
        image: img3,
        tags: ["Sketch", "Study"],
      },
    ],
    []
  );

  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(".section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) (e.target as HTMLElement).classList.add("visible");
        });
      },
      { threshold: 0.12 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const goProjects = () => {
    const el = document.querySelector<HTMLElement>("#projects");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    el?.classList.add("flash");
    window.setTimeout(() => el?.classList.remove("flash"), 700);
  };

  const mailtoHref = `mailto:${copy.email}?subject=${encodeURIComponent(
    copy.emailSubject
  )}`;

  return (
    <div className="app">
      <header className="header">
        <div className="brand">{copy.brand}</div>
        <nav className="nav">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main className="container">
        <section className="hero">
          <span className="pill">{copy.pill}</span>

          <h1 className="h1">
            {copy.heroTitle1}
            <br />
            {copy.heroTitle2}
          </h1>

          <p className="sub">{copy.heroDesc}</p>

          <div className="row">
            <button className="btnPrimary" type="button" onClick={goProjects}>
              {copy.ctaProjects}
            </button>

            <a className="btnGhost" href={mailtoHref}>
              {copy.ctaContact}
            </a>
          </div>
        </section>

        <section id="about" className="section">
          <h2 className="h2">{copy.aboutTitle}</h2>
          <div className="panel">
            <p className="p">{copy.aboutP1}</p>
            <p className="p muted">{copy.aboutP2}</p>
          </div>
        </section>

        <section id="projects" className="section">
          <h2 className="h2">{copy.projectsTitle}</h2>
          <div className="grid">
            {projects.map((p) => (
              <Card key={p.id} project={p} onClick={() => setSelected(p)} />
            ))}
          </div>
        </section>

        <section id="contact" className="section">
          <h2 className="h2">{copy.contactTitle}</h2>
          <div className="panel">
            <div className="contactGrid">
              <div>
                {copy.emailLabel} <b>{copy.email}</b>
              </div>
              <div className="muted">
                {copy.linksLabel}{" "}
                <a href="#" onClick={(e) => e.preventDefault()}>
                  {copy.github}
                </a>{" "}
                ·{" "}
                <a href="#" onClick={(e) => e.preventDefault()}>
                  {copy.instagram}
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className="footer">© {new Date().getFullYear()} Junhak</footer>
      </main>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.title ?? ""}
        desc={selected?.desc ?? ""}
        image={selected?.image ?? ""}
      />
    </div>
  );
}