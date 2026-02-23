import { useEffect } from "react";
import "./App.css";

type CardProps = { title: string; desc: string };

function Card({ title, desc }: CardProps) {
  return (
    <article className="card">
      <div className="cardTitle">{title}</div>
      <div className="cardDesc">{desc}</div>
    </article>
  );
}

export default function App() {
  // ✅ 텍스트는 여기만 바꾸면 됨 (태그 안 건드리기)
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
    aboutP2: "관심 분야: (예: 디자인, 개발, AI) / 현재 목표: (예: 홈페이지 완성하기)",
    projectsTitle: "Projects",
    contactTitle: "Contact",
    emailLabel: "Email:",
    email: "kjhrich1110@gmail.com",
    linksLabel: "Links:",
    github: "GitHub",
    instagram: "Instagram",
    emailSubject: "안녕하세요 (홈페이지 통해 연락드립니다)",
  };

  // ✅ 스크롤 등장 애니메이션 (섹션 보이면 visible 붙임)
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

  // ✅ 버튼 기능: 프로젝트 섹션으로 이동 + 잠깐 강조
  const goProjects = () => {
    const el = document.querySelector<HTMLElement>("#projects");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    el?.classList.add("flash");
    window.setTimeout(() => el?.classList.remove("flash"), 700);
  };

  // ✅ 버튼 기능: 메일 앱 열기 (mailto)
  const mailtoHref = `mailto:${copy.email}?subject=${encodeURIComponent(copy.emailSubject)}`;

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
            <Card title="프로젝트 1" desc="한 줄 설명 (무엇을 만들었는지)" />
            <Card title="프로젝트 2" desc="한 줄 설명 (어떤 문제를 해결했는지)" />
            <Card title="프로젝트 3" desc="한 줄 설명 (결과/성과/배운 점)" />
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
    </div>
  );
}