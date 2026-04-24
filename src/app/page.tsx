import type { Metadata } from "next";
import Link from "next/link";
import "./portfolio.css";
import PortfolioScripts from "./_components/PortfolioScripts";

export const metadata: Metadata = {
  title: "Артем Козыренко — Senior Business Analyst",
  description:
    "Портфолио Senior Business Analyst с 6+ лет опыта в финтехе, ретейле и аналитике данных. Sber, Tinkoff, X5 Group. Открыт к предложениям.",
  openGraph: {
    title: "Артем Козыренко — Senior Business Analyst",
    description:
      "Портфолио Senior Business Analyst. Финтех, ретейл, платформы. 6+ лет, 34 проекта.",
  },
};

export default function Home() {
  return (
    <div className="portfolio-page">
      <Link href="/os" className="fab-os">
        <div className="os-indicator" />
        ЗАПУСТИТЬ ОС
      </Link>

      <nav>
        <div className="nav-logo">
          <div className="os-indicator-red" />
          АК
        </div>
        <ul className="nav-links">
          <li><a href="#about">О себе</a></li>
          <li><a href="#skills">Навыки</a></li>
          <li><a href="#projects">Проекты</a></li>
          <li><a href="#stack">Стек</a></li>
          <li><a href="#contact" className="nav-cta">Написать</a></li>
        </ul>
      </nav>

      {/* ── HERO ── */}
      <section id="hero">
        <div className="hero-chip">
          <div className="chip-dot" />
          Открыт к новым проектам
        </div>
        <h1 className="hero-name reveal visible">
          Артем<br />
          <span className="dim">Козыренко</span>
        </h1>
        <p className="hero-sub reveal d1 visible">
          <strong>Senior Business Analyst.</strong> Превращаю сложные бизнес-задачи в чёткие системные решения.
          Финтех, ретейл, платформы.
        </p>
        <div className="hero-actions reveal d2 visible">
          <a href="#projects" className="btn btn-primary">Смотреть проекты ↓</a>
          <a href="#contact" className="btn btn-ghost">Написать мне</a>
        </div>
        <div className="hero-stats reveal d3 visible">
          <div className="hstat"><span className="hstat-num">6+</span><span className="hstat-label">Лет опыта</span></div>
          <div className="hstat"><span className="hstat-num">34</span><span className="hstat-label">Проектов</span></div>
          <div className="hstat"><span className="hstat-num">12</span><span className="hstat-label">Доменов</span></div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about">
        <div className="section-wrap">
          <div className="reveal">
            <div className="section-label">О себе</div>
            <h2 className="section-title">Аналитик,<br />который думает системно</h2>
          </div>
          <div className="about-grid">
            <div className="about-body reveal d1">
              <p>
                <strong>Занимаюсь системным анализом бизнес-процессов</strong> — выявляю требования,
                моделирую процессы и проектирую архитектуру аналитических решений.
                Работаю на стыке бизнеса и технологий уже более шести лет.
              </p>
              <p>
                Умею переводить задачи с языка бизнеса на язык систем и обратно.
                Считаю, что лучший аналитик — тот, кто задаёт правильные вопросы
                до того, как начинает искать ответы.
              </p>
              <p>
                Вне работы — механические часы, архитектура, классические
                автомобили и кофе со специями.
              </p>
            </div>
            <div className="timeline-v2 reveal d2">
              <div className="tv-item">
                <div className="tv-dot-col"><div className="tv-dot" /><div className="tv-line" /></div>
                <div><div className="tv-year">2023 — н.в.</div><div className="tv-role">Senior Business Analyst</div><div className="tv-co">Sber · Digital Platforms</div></div>
              </div>
              <div className="tv-item">
                <div className="tv-dot-col"><div className="tv-dot" /><div className="tv-line" /></div>
                <div><div className="tv-year">2021 — 2023</div><div className="tv-role">Business Analyst</div><div className="tv-co">Tinkoff · Fintech Products</div></div>
              </div>
              <div className="tv-item">
                <div className="tv-dot-col"><div className="tv-dot" /><div className="tv-line" /></div>
                <div><div className="tv-year">2019 — 2021</div><div className="tv-role">Systems Analyst</div><div className="tv-co">X5 Group · Retail Tech</div></div>
              </div>
              <div className="tv-item">
                <div className="tv-dot-col"><div className="tv-dot" /></div>
                <div><div className="tv-year">2013 — 2017</div><div className="tv-role">Прикладная математика</div><div className="tv-co">НИУ ВШЭ</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills">
        <div className="section-wrap">
          <div className="reveal">
            <div className="section-label">Компетенции</div>
            <h2 className="section-title">Что я умею</h2>
            <p className="section-desc">Широкий стек от сбора требований до проектирования интеграций и аналитики данных.</p>
          </div>
          <div className="skills-grid">
            <div className="skill-card reveal d1">
              <div className="sc-icon">📋</div>
              <div className="sc-title">Требования</div>
              <div className="sc-desc">Сбор, анализ и документирование бизнес и системных требований.</div>
              <div className="sc-tags"><span className="sc-tag hot">BABOK</span><span className="sc-tag">User Story</span><span className="sc-tag">Use Case</span><span className="sc-tag">BDD</span></div>
            </div>
            <div className="skill-card reveal d2">
              <div className="sc-icon">🔀</div>
              <div className="sc-title">Моделирование</div>
              <div className="sc-desc">Проектирование бизнес-процессов и архитектурных решений.</div>
              <div className="sc-tags"><span className="sc-tag hot">BPMN 2.0</span><span className="sc-tag">UML</span><span className="sc-tag">ArchiMate</span><span className="sc-tag">TOGAF</span></div>
            </div>
            <div className="skill-card reveal d3">
              <div className="sc-icon">📊</div>
              <div className="sc-title">Данные</div>
              <div className="sc-desc">Работа с данными: аналитика, визуализация, управление качеством.</div>
              <div className="sc-tags"><span className="sc-tag hot">SQL</span><span className="sc-tag">Python</span><span className="sc-tag">Power BI</span><span className="sc-tag">dbt</span></div>
            </div>
            <div className="skill-card reveal d1">
              <div className="sc-icon">🔌</div>
              <div className="sc-title">Интеграции</div>
              <div className="sc-desc">Проектирование межсистемного взаимодействия и API.</div>
              <div className="sc-tags"><span className="sc-tag hot">REST / OpenAPI</span><span className="sc-tag">Kafka</span><span className="sc-tag">gRPC</span></div>
            </div>
            <div className="skill-card reveal d2">
              <div className="sc-icon">🚀</div>
              <div className="sc-title">Методологии</div>
              <div className="sc-desc">Управление проектами и процессами разработки продуктов.</div>
              <div className="sc-tags"><span className="sc-tag hot">Agile / SAFe</span><span className="sc-tag">Scrum</span><span className="sc-tag">Design Sprint</span><span className="sc-tag">DDD</span></div>
            </div>
            <div className="skill-card reveal d3">
              <div className="sc-icon">🛠</div>
              <div className="sc-title">Инструменты</div>
              <div className="sc-desc">Ежедневный рабочий стек для документирования и совместной работы.</div>
              <div className="sc-tags"><span className="sc-tag hot">Confluence</span><span className="sc-tag">Jira</span><span className="sc-tag">Miro</span><span className="sc-tag">Figma</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects">
        <div className="section-wrap">
          <div className="reveal">
            <div className="section-label">Кейсы</div>
            <h2 className="section-title">Избранные проекты</h2>
            <p className="section-desc">Реальные задачи, реальные результаты.</p>
          </div>
          <div className="projects-list">
            <div className="proj-row reveal d1">
              <div className="pr-left">
                <div className="pr-domain">Fintech · Sber</div>
                <div className="pr-title">Автоматизация кредитного конвейера</div>
                <div className="pr-desc">Полный реинжиниринг процесса выдачи кредитов физлицам. Цифровой путь от заявки до выдачи без участия операциониста. BPMN-модели, интеграция с бюро кредитных историй, скоринговыми системами и фронт-офисом.</div>
                <div className="pr-chips"><span className="pr-chip">BPMN</span><span className="pr-chip">Kafka</span><span className="pr-chip">Oracle DB</span><span className="pr-chip">Jira</span></div>
              </div>
              <div className="pr-right"><div className="pr-metric-big">−68%</div><div className="pr-metric-label">Time-to-credit</div><div className="pr-arrow">↗</div></div>
            </div>
            <div className="proj-row reveal d2">
              <div className="pr-left">
                <div className="pr-domain">Retail · X5 Group</div>
                <div className="pr-title">MDM — единое управление ассортиментом</div>
                <div className="pr-desc">Проектирование мастер-системы управления данными для 200K+ SKU в омниканальной среде. Интеграция 14 систем-источников, построение единой модели данных, управление жизненным циклом товара.</div>
                <div className="pr-chips"><span className="pr-chip">ArchiMate</span><span className="pr-chip">REST API</span><span className="pr-chip">Confluence</span><span className="pr-chip">OpenAPI</span></div>
              </div>
              <div className="pr-right"><div className="pr-metric-big">14</div><div className="pr-metric-label">Систем интегрировано</div><div className="pr-arrow">↗</div></div>
            </div>
            <div className="proj-row reveal d3">
              <div className="pr-left">
                <div className="pr-domain">Analytics · Tinkoff</div>
                <div className="pr-title">Data Governance платформа</div>
                <div className="pr-desc">Построение архитектуры управления данными банка: каталог данных, data lineage, политики качества и классификации, ролевые модели. Охват 40+ доменов, рост качества данных в 4×.</div>
                <div className="pr-chips"><span className="pr-chip">Collibra</span><span className="pr-chip">dbt</span><span className="pr-chip">SQL</span><span className="pr-chip">Python</span></div>
              </div>
              <div className="pr-right"><div className="pr-metric-big">4×</div><div className="pr-metric-label">Рост качества данных</div><div className="pr-arrow">↗</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STACK ── */}
      <section id="stack">
        <div className="section-wrap">
          <div className="reveal">
            <div className="section-label">Инструменты</div>
            <h2 className="section-title">Технический стек</h2>
          </div>
          <div className="stack-grid">
            <div className="stack-group reveal d1">
              <div className="sg-title">Анализ</div>
              <div className="sg-items">
                <div className="sg-item primary"><div className="dot" />BABOK / IIBA</div>
                <div className="sg-item primary"><div className="dot" />BPMN 2.0</div>
                <div className="sg-item"><div className="dot" />UML</div>
                <div className="sg-item"><div className="dot" />ArchiMate</div>
                <div className="sg-item"><div className="dot" />TOGAF 9.2</div>
              </div>
            </div>
            <div className="stack-group reveal d2">
              <div className="sg-title">Данные</div>
              <div className="sg-items">
                <div className="sg-item primary"><div className="dot" />SQL</div>
                <div className="sg-item primary"><div className="dot" />Python</div>
                <div className="sg-item"><div className="dot" />Power BI</div>
                <div className="sg-item"><div className="dot" />Tableau</div>
                <div className="sg-item"><div className="dot" />dbt</div>
              </div>
            </div>
            <div className="stack-group reveal d3">
              <div className="sg-title">Интеграции</div>
              <div className="sg-items">
                <div className="sg-item primary"><div className="dot" />REST / OpenAPI</div>
                <div className="sg-item primary"><div className="dot" />Kafka</div>
                <div className="sg-item"><div className="dot" />gRPC</div>
                <div className="sg-item"><div className="dot" />SOAP / XML</div>
                <div className="sg-item"><div className="dot" />GraphQL</div>
              </div>
            </div>
            <div className="stack-group reveal d1">
              <div className="sg-title">Инструменты</div>
              <div className="sg-items">
                <div className="sg-item primary"><div className="dot" />Confluence</div>
                <div className="sg-item primary"><div className="dot" />Jira</div>
                <div className="sg-item"><div className="dot" />Miro</div>
                <div className="sg-item"><div className="dot" />Figma</div>
                <div className="sg-item"><div className="dot" />Camunda</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact">
        <div className="section-wrap">
          <div className="reveal">
            <div className="avail-pill"><div className="ap-dot" />Открыт к предложениям</div>
            <div className="section-label">Контакт</div>
            <h2 className="section-title">Давайте&nbsp;поговорим</h2>
            <p className="section-desc">Открыт для новых проектов, консультаций и интересных задач. Отвечаю в течение 24 часов.</p>
          </div>
          <div className="contact-grid">
            <a className="contact-card reveal d1" id="copyEmail" href="#contact">
              <div className="cc-icon">✉️</div>
              <div>
                <div className="cc-label">Email</div>
                <div className="cc-val" id="emailText">arti.k.renko@gmail.com</div>
              </div>
              <div className="cc-arrow">→</div>
            </a>
            <a className="contact-card reveal d1" href="/pdf.pdf" download="Resume_Artem_Kozyrenko.pdf">
              <div className="cc-icon">🧾</div>
              <div><div className="cc-label">Резюме</div><div className="cc-val">Скачать PDF</div></div>
              <div className="cc-arrow">↓</div>
            </a>
            <a className="contact-card reveal d2" href="https://t.me/SleepyCoffeeT" target="_blank" rel="noopener noreferrer">
              <div className="cc-icon">✈️</div>
              <div><div className="cc-label">Telegram</div><div className="cc-val">@SleepyCoffeeT</div></div>
              <div className="cc-arrow">→</div>
            </a>
            <a className="contact-card reveal d3" href="https://t.me/sleepycoffeem" target="_blank" rel="noopener noreferrer">
              <div className="cc-icon">✈️</div>
              <div><div className="cc-label">Telegram Канал</div><div className="cc-val">@sleepycoffeem</div></div>
              <div className="cc-arrow">→</div>
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-left">© 2026 · Артем Козыренко</div>
        <div className="footer-right">Business Analyst · Omsk</div>
      </footer>

      <PortfolioScripts />
    </div>
  );
}
