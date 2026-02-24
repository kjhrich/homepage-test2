import { useEffect, useMemo, useState } from "react";
import "./App.css";

type Project = {
  id: string;
  title: string;
  desc: string;
  image: string; // ✅ public 기준 URL
};

function Modal({
  open,
  onClose,
  project,
}: {
  open: boolean;
  onClose: () => void;
  project: Project | null;
}) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open || !project) return null;

  return (
    <div className="modalOverlay" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modalHeader">
          <div>
            <div className="modalTitle">{project.title}</div>
            <div className="modalDesc">{project.desc}</div>
          </div>
          <button className="iconBtn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div className="modalBody">
          <img className="modalImg" src={project.image} alt={project.title} />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const projects: Project[] = useMemo(
    () => [
      {
        id: "p1",
        title: "프로젝트 1",
        desc: "작업물 미리보기 (클릭하면 크게 열림)",
        image: "/projects/project-01.jpg",
      },
      {
        id: "p2",
        title: "프로젝트 2",
        desc: "작업물 미리보기 (클릭하면 크게 열림)",
        image: "/projects/project-02.jpg",
      },
      {
        id: "p3",
        title: "프로젝트 3",
        desc: "작업물 미리보기 (클릭하면 크게 열림)",
        image: "/projects/project-03.jpg",
      },
    ],
    []
  );

  const [selected, setSelected] = useState<Project | null>(null);

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // 섹션 fade-in (옵션)
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(".section");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible"));
      },
      { threshold: 0.12 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="app">
      <header className="header">
        <div className="brand">JUNHAK</div>
        <nav className="nav">
          <button className="navBtn" onClick={() => goTo("projects")}>
            Projects
          </button>
          <button className="navBtn" onClick={() => goTo("contact")}>
            Contact
          </button>
        </nav>
      </header>

      <main className="container">
        <section className="hero">
          <span className="pill">⚡ Building in public</span>

          <h1 className="h1">
            만들고, 기록하고,
            <br />
            보여준다.
          </h1>

          <p className="sub">
            프로젝트를 만들고, 정리하고, 보여주는 홈페이지. 가장 기본 버전부터 빠르게 완성하고 계속
            다듬어 갑니다.
          </p>

          <div className="row">
            <button className="btnPrimary" onClick={() => goTo("projects")}>
              프로젝트 보기
            </button>

            <a className="btnGhost" href="mailto:your@email.com?subject=안녕하세요">
              연락하기
            </a>
          </div>
        </section>

        <section id="about" className="section">
          <h2 className="h2">About</h2>
          <p className="p">
            저는 만들면서 배우는 걸 좋아합니다. 이 페이지는 작업물과 생각을 정리하는 공간이에요.
          </p>
          <p className="p muted">(여기에 한 줄 소개/관심 분야/현재 목표를 적어주세요)</p>
        </section>

        <section id="projects" className="section">
          <h2 className="h2">Projects</h2>

          <div className="grid">
            {projects.map((p) => (
              <article
                key={p.id}
                className="card clickable"
                onClick={() => setSelected(p)}
                role="button"
              >
                <img
                  className="cardImg"
                  src={p.image}
                  alt={p.title}
                  onError={(e) => {
                    // 이미지가 안 뜰 때 바로 티 나게 처리
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="cardTitle">{p.title}</div>
                <div className="cardDesc">{p.desc}</div>
                <div className="cardHint">클릭해서 크게 보기</div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section">
          <h2 className="h2">Contact</h2>
          <div className="contactBox">
            <div>
              Email: <a href="mailto:your@email.com">your@email.com</a>
            </div>
            <div>
              Links:{" "}
              <a href="https://github.com/yourname" target="_blank" rel="noreferrer">
                GitHub
              </a>{" "}
              ·{" "}
              <a href="https://instagram.com/yourname" target="_blank" rel="noreferrer">
                Instagram
              </a>
            </div>
          </div>
        </section>

        <footer className="footer">© {new Date().getFullYear()} Junhak</footer>
      </main>

      <Modal open={!!selected} onClose={() => setSelected(null)} project={selected} />
    </div>
  );
}