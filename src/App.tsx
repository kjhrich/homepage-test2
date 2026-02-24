import { useMemo, useState } from "react";
import "./App.css";

type Project = {
  title: string;
  desc: string;
  image: string; // public/projects/... => "/projects/파일명"
};

export default function App() {
  const projects = useMemo<Project[]>(
    () => [
      {
        title: "프로젝트 1",
        desc: "사진 편집물",
        image: "/projects/project-01.jpg",
      },
      {
        title: "프로젝트 2",
        desc: "금속 펜던트 제작",
        image: "/projects/project-02.jpg",
      },
      {
        title: "프로젝트 3",
        desc: "회화 작업물",
        image: "/projects/project-03.jpg",
      },
    ],
    []
  );

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);

  const openModal = (p: Project) => {
    setSelected(p);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setSelected(null);
  };

  return (
    <div className="app">
      <header className="hero">
        <div className="pill">⚡ Building in public</div>
        <h1 className="title">만들고, 기록하고, 보여준다.</h1>
        <p className="subtitle">
          프로젝트를 만들고, 정리하고, 보여주는 홈페이지. 가장 기본 버전부터
          빠르게 완성하고 계속 다듬어 갑니다.
        </p>

        <div className="heroActions">
          <a className="btn primary" href="#projects">
            프로젝트 보기
          </a>
          <a className="btn" href="#contact">
            연락하기
          </a>
        </div>
      </header>

      <main className="container">
        <section id="about" className="section">
          <h2>About</h2>
          <p>
            저는 만들면서 배우는 걸 좋아합니다. 이 페이지는 작업물과 생각을 정리하는
            공간이에요.
          </p>
          <p className="muted">(여기에 한 줄 소개/관심 분야/현재 목표를 적어주세요)</p>
        </section>

        <section id="projects" className="section">
          <h2>Projects</h2>

          <div className="cards">
            {projects.map((p) => (
              <button
                key={p.title}
                className="card"
                onClick={() => openModal(p)}
                type="button"
              >
                <div className="cardText">
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <span className="linklike">클릭해서 크게 보기</span>
                </div>

                <div className="thumbWrap">
                  <img className="thumb" src={p.image} alt={p.title} />
                </div>
              </button>
            ))}
          </div>
        </section>

        <section id="contact" className="section">
          <h2>Contact</h2>
          <div className="contactBox">
            <div>
              Email:{" "}
              <a href="mailto:your@email.com" target="_blank" rel="noreferrer">
                your@email.com
              </a>
            </div>
            <div>
              Links:{" "}
              <a href="https://github.com/" target="_blank" rel="noreferrer">
                GitHub
              </a>{" "}
              ·{" "}
              <a href="https://instagram.com/" target="_blank" rel="noreferrer">
                Instagram
              </a>
            </div>
            <div className="muted">이메일/링크를 본인 걸로 바꾸면 완성.</div>
          </div>
          <footer className="footer">© 2026 Junhak</footer>
        </section>
      </main>

      {open && selected && (
        <div className="modalOverlay" onClick={closeModal} role="presentation">
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="modalHeader">
              <div>
                <div className="modalTitle">{selected.title}</div>
                <div className="muted">{selected.desc}</div>
              </div>
              <button className="iconBtn" onClick={closeModal} type="button">
                ✕
              </button>
            </div>

            <div className="modalBody">
              <img className="modalImg" src={selected.image} alt={selected.title} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}