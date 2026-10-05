import { useEffect, useState } from 'react';
import Hero from './Hero.jsx';
import Lab from './Lab.jsx';

const AWARDS = [
  'BCS London Central Branch Prize 2026',
  'Outstanding Project of the Year 2026',
  'CDT Outstanding Final Project 2026',
  'Project Implementation Finalist 2026',
  'Operations Pro runner-up 2026',
  'UEL Volunteering Recognition Award 2024',
  'Azure AI Fundamentals',
];

// Two copies of the list for a seamless loop
const Ticker = () => (
  <section className="ticker" aria-label="Awards">
    <div className="ticker__track">
      {[false, true].map((hidden) => (
        <ul className="ticker__list" key={String(hidden)} aria-hidden={hidden || undefined}>
          {AWARDS.map((a) => <li key={a}>{a}</li>)}
        </ul>
      ))}
    </div>
  </section>
);

// Mobile: menu button + dropdown. Desktop shows the links inline and hides the button.
function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="nav" aria-label="Main" data-open={open || undefined} onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}>
      <a className="nav__logo" href="#top" onClick={() => setOpen(false)}>aditya.</a>
      <button type="button" className="nav__toggle" aria-expanded={open} aria-controls="nav-links" onClick={() => setOpen(!open)}>
        {open ? 'Close' : 'Menu'}
      </button>
      <ul className="nav__links" id="nav-links" onClick={() => setOpen(false)}>
        <li><a href="#research">Research</a></li>
        <li><a href="#work">Work</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
}

// Mobile: clamps long text to a few lines with a toggle. Desktop: plain paragraph, button hidden.
function More({ className, children }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <p className={className} data-clamp={open ? undefined : ''}>{children}</p>
      <button type="button" className="more" aria-expanded={open} onClick={() => setOpen(!open)}>
        {open ? 'Show less' : 'Read more'}
      </button>
    </>
  );
}

export default function App() {
  // Touch screens: animate illustrations when in view
  useEffect(() => {
    if (!window.matchMedia('(hover: none)').matches) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.target.classList.toggle('in-view', e.isIntersecting));
    }, { threshold: 0.5 });
    document.querySelectorAll('.tile').forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>

      <Nav />

      <main id="main">
        {/* Hero */}
        <Hero />

        {/* Awards ticker */}
        <Ticker />

        {/* Research */}
        <section className="section section--violet" id="research" aria-labelledby="research-h">
          <div className="wrap stack-xl">
            <div className="split split--end">
              <h2 className="display" id="research-h">Classical in,<br />quantum out.</h2>
              <div className="prose prose--on-dark">
                <More>My dissertation, a conventional-to-quantum code transpiler, uses transformer-based neural machine translation to turn everyday code into Qiskit circuits. Built in Python with PyTorch and Qiskit, evaluated across several programming paradigms.</More>
                <p className="strong">It won Outstanding Project of the Year at UEL and the BCS London Central Branch Prize for quantum computing applications.</p>
              </div>
            </div>

            <Lab />
          </div>
        </section>

        {/* Work */}
        <section className="section" id="work" aria-labelledby="work-h">
          <div className="wrap stack-xl">
            <div className="split split--end split--between">
              <h2 className="display" id="work-h">Things I've built</h2>
              <p className="lede">AI tools, computer vision, dashboards and client apps. Hover a project to set it moving.</p>
            </div>

            <div className="tiles">
              <article className="tile">
                <div className="tile__art art--plum">
                  <svg viewBox="0 0 400 240" aria-hidden="true">
                    <rect className="a eq" x="40" y="80" width="10" height="80" rx="5" fill="#FF8BC6"/>
                    <rect className="a eq" x="58" y="60" width="10" height="120" rx="5" fill="#FF8BC6" style={{ animationDelay: '.15s' }}/>
                    <rect className="a eq" x="76" y="95" width="10" height="50" rx="5" fill="#FF8BC6" style={{ animationDelay: '.3s' }}/>
                    <rect className="a eq" x="94" y="50" width="10" height="140" rx="5" fill="#FF8BC6" style={{ animationDelay: '.1s' }}/>
                    <rect className="a eq" x="112" y="85" width="10" height="70" rx="5" fill="#FF8BC6" style={{ animationDelay: '.25s' }}/>
                    <rect className="a eq" x="130" y="70" width="10" height="100" rx="5" fill="#FF8BC6" style={{ animationDelay: '.05s' }}/>
                    <rect className="a eq" x="148" y="100" width="10" height="40" rx="5" fill="#FF8BC6" style={{ animationDelay: '.2s' }}/>
                    <path className="a march sa" d="M175 120H222" strokeWidth="3" strokeDasharray="8 10" strokeLinecap="round" fill="none"/>
                    <path className="sa" d="M218 110l10 10-10 10" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="246" y="38" width="118" height="164" rx="12" fill="#F7F3FF"/>
                    <rect x="262" y="58" width="60" height="10" rx="5" fill="#24123A"/>
                    <rect x="262" y="84" width="86" height="6" rx="3" fill="#B7A8D6"/>
                    <rect x="262" y="98" width="72" height="6" rx="3" fill="#B7A8D6"/>
                    <rect x="262" y="112" width="80" height="6" rx="3" fill="#B7A8D6"/>
                    <circle className="fa" cx="266" cy="140" r="4"/><rect x="276" y="137" width="66" height="6" rx="3" fill="#B7A8D6"/>
                    <circle className="fa" cx="266" cy="158" r="4"/><rect x="276" y="155" width="54" height="6" rx="3" fill="#B7A8D6"/>
                    <circle className="fa" cx="266" cy="176" r="4"/><rect x="276" y="173" width="60" height="6" rx="3" fill="#B7A8D6"/>
                  </svg>
                </div>
                <h3 className="tile__title">AI meeting minutes</h3>
                <p className="stack-list">Python  FastAPI  OpenAI  Vite  Docker</p>
                <p className="tile__desc">Drop in a meeting recording and get clean, accurate minutes back. OpenAI models do the language work; a FastAPI backend and Vite frontend, shipped in Docker.</p>
              </article>

              <article className="tile">
                <div className="tile__art art--mint">
                  <svg viewBox="0 0 400 240" aria-hidden="true">
                    <rect x="28" y="28" width="52" height="150" rx="14" fill="#24123A"/>
                    <circle cx="54" cy="58" r="12" fill="none" stroke="#5CF0C0" strokeWidth="3"/>
                    <rect x="42" y="88" width="24" height="24" rx="3" fill="none" stroke="#F7F3FF" strokeWidth="3"/>
                    <path d="M54 124l13 24H41z" fill="none" stroke="#F7F3FF" strokeWidth="3" strokeLinejoin="round"/>
                    <path className="a march" d="M150 170 205 60l57 68 56-76 32 128z" fill="none" stroke="#24123A" strokeWidth="4" strokeDasharray="14 10" strokeLinejoin="round"/>
                    <circle cx="205" cy="60" r="7" fill="#24123A"/>
                    <circle cx="318" cy="52" r="7" fill="#24123A"/>
                    <circle className="a pulse" cx="350" cy="180" r="18" fill="none" stroke="#24123A" strokeWidth="3"/>
                    <circle cx="350" cy="180" r="10" fill="#FF8BC6" stroke="#24123A" strokeWidth="3"/>
                    <path d="M110 70a24 24 0 1 1 .1 0" fill="none" stroke="#24123A" strokeWidth="3" strokeDasharray="4 6"/>
                  </svg>
                </div>
                <h3 className="tile__title">Gesture drawing canvas</h3>
                <p className="stack-list">Python  OpenCV  NumPy</p>
                <p className="tile__desc">Draw without touching anything. Hand tracking reads gestures in real time to pick shapes, resize, rotate and recolour them on screen.</p>
              </article>

              <article className="tile">
                <div className="tile__art art--pink">
                  <svg viewBox="0 0 400 240" aria-hidden="true">
                    <rect x="56" y="52" width="104" height="140" rx="10" fill="#F7F3FF" stroke="#24123A" strokeWidth="3"/>
                    <rect x="44" y="40" width="104" height="140" rx="10" fill="#F7F3FF" stroke="#24123A" strokeWidth="3"/>
                    <rect x="58" y="58" width="50" height="9" rx="4" fill="#24123A"/>
                    <rect x="58" y="80" width="74" height="6" rx="3" fill="#B7A8D6"/>
                    <rect x="58" y="94" width="64" height="6" rx="3" fill="#B7A8D6"/>
                    <rect x="58" y="108" width="70" height="6" rx="3" fill="#B7A8D6"/>
                    <rect x="58" y="128" width="40" height="6" rx="3" fill="#B7A8D6"/>
                    <path className="a march" d="M160 110c30 0 30-34 62-34" fill="none" stroke="#24123A" strokeWidth="3" strokeDasharray="6 8"/>
                    <rect x="222" y="44" width="140" height="56" rx="20" fill="#24123A"/>
                    <rect x="240" y="64" width="80" height="7" rx="3.5" fill="#F7F3FF"/>
                    <rect x="240" y="78" width="54" height="7" rx="3.5" fill="#B7A8D6"/>
                    <rect x="200" y="120" width="160" height="74" rx="20" fill="#F7F3FF" stroke="#24123A" strokeWidth="3"/>
                    <circle className="a blink" cx="236" cy="157" r="7" fill="#24123A"/>
                    <circle className="a blink" cx="260" cy="157" r="7" fill="#24123A" style={{ animationDelay: '.2s' }}/>
                    <circle className="a blink" cx="284" cy="157" r="7" fill="#24123A" style={{ animationDelay: '.4s' }}/>
                  </svg>
                </div>
                <h3 className="tile__title">GitHub wiki chatbot</h3>
                <p className="stack-list">LangChain  OpenAI  Beautiful Soup  Vite</p>
                <p className="tile__desc">Ask a question, get an answer grounded in a project's GitHub wiki. Beautiful Soup crawls the pages and LangChain feeds the right context to the model.</p>
              </article>

              <article className="tile">
                <div className="tile__art art--lilac">
                  <svg viewBox="0 0 400 240" aria-hidden="true">
                    <rect x="36" y="32" width="328" height="176" rx="16" fill="#F7F3FF" stroke="#24123A" strokeWidth="3"/>
                    <circle cx="56" cy="50" r="5" fill="#FF8BC6"/><circle cx="72" cy="50" r="5" fill="#B7A8D6"/><circle cx="88" cy="50" r="5" fill="#B7A8D6"/>
                    <path d="M60 184h160" stroke="#B7A8D6" strokeWidth="2"/>
                    <rect className="a grow" x="70" y="120" width="26" height="64" rx="5" fill="#24123A"/>
                    <rect className="a grow" x="108" y="90" width="26" height="94" rx="5" fill="#24123A" style={{ animationDelay: '.2s' }}/>
                    <rect className="a grow" x="146" y="132" width="26" height="52" rx="5" fill="#24123A" style={{ animationDelay: '.4s' }}/>
                    <rect className="a grow fa" x="184" y="74" width="26" height="110" rx="5" stroke="#24123A" strokeWidth="2.5" style={{ animationDelay: '.1s' }}/>
                    <circle className="fa" cx="262" cy="92" r="14" stroke="#24123A" strokeWidth="2.5"/><rect x="284" y="88" width="56" height="8" rx="4" fill="#24123A"/>
                    <circle cx="262" cy="130" r="14" fill="#FF8BC6" stroke="#24123A" strokeWidth="2.5"/><rect x="284" y="126" width="42" height="8" rx="4" fill="#24123A"/>
                    <circle cx="262" cy="168" r="14" fill="#E2D6F5" stroke="#24123A" strokeWidth="2.5"/><rect x="284" y="164" width="30" height="8" rx="4" fill="#24123A"/>
                  </svg>
                </div>
                <h3 className="tile__title">Performance dashboard</h3>
                <p className="stack-list">Metabase  FastAPI  Python</p>
                <p className="tile__desc">Scores individual performance with a points-based algorithm over crawled, cleaned data, then lays it out in interactive Metabase charts.</p>
              </article>

              <article className="tile">
                <div className="tile__art art--violet">
                  <svg viewBox="0 0 400 240" aria-hidden="true">
                    <rect x="40" y="40" width="230" height="160" rx="12" fill="#F7F3FF"/>
                    <rect x="40" y="40" width="230" height="26" rx="12" fill="#E2D6F5"/>
                    <circle cx="56" cy="53" r="4" fill="#24123A"/><circle cx="70" cy="53" r="4" fill="#24123A"/>
                    <path className="a march" d="M70 170c40-60 80 20 120-50s50-30 60-24" fill="none" stroke="#24123A" strokeWidth="3" strokeDasharray="6 8" strokeLinecap="round"/>
                    <circle cx="70" cy="170" r="7" fill="#FF8BC6" stroke="#24123A" strokeWidth="2.5"/>
                    <g className="a bob"><path className="fa" d="M250 98c-14-18-14-34 0-34s14 16 0 34z" stroke="#24123A" strokeWidth="2.5"/><circle cx="250" cy="76" r="4.5" fill="#24123A"/></g>
                    <rect x="268" y="70" width="96" height="150" rx="18" fill="#24123A" stroke="#F7F3FF" strokeWidth="3"/>
                    <rect x="280" y="90" width="72" height="44" rx="8" fill="#FF8BC6"/>
                    <rect x="280" y="144" width="56" height="7" rx="3.5" fill="#F7F3FF"/>
                    <rect x="280" y="158" width="40" height="7" rx="3.5" fill="#B7A8D6"/>
                    <rect className="fa" x="280" y="180" width="72" height="22" rx="11"/>
                  </svg>
                </div>
                <h3 className="tile__title">Freelance client work</h3>
                <p className="stack-list">React  Flutter  TypeScript  Dart</p>
                <p className="tile__desc">Websites and apps for clients, including Smart-Travel, a trip planner; Nina-Sky, a responsive web app; and KT-Travels, a travel platform with bookings.</p>
              </article>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="section section--lilac" id="experience" aria-labelledby="exp-h">
          <div className="wrap split split--top">
            <div className="stack-l exp__intro">
              <h2 className="display" id="exp-h">Where I've worked</h2>
              <div className="edu">
                <svg viewBox="0 0 200 120" aria-hidden="true">
                  <path className="fa" d="M100 18l82 32-82 32-82-32z" stroke="#F7F3FF" strokeWidth="3" strokeLinejoin="round"/>
                  <path d="M56 66v26c0 16 88 16 88 0V66" fill="none" stroke="#F7F3FF" strokeWidth="3"/>
                  <path d="M170 55v31" stroke="#F7F3FF" strokeWidth="3"/>
                  <circle cx="170" cy="96" r="10" fill="none" stroke="#FF8BC6" strokeWidth="3"/>
                  <path d="M170 86v20M160 96h20" stroke="#FF8BC6" strokeWidth="3"/>
                </svg>
                <p className="edu__title">BSc (Hons) Computer Science</p>
                <p className="edu__meta">University of East London, 2026. Microsoft Certified: Azure AI Fundamentals.</p>
              </div>
            </div>

            <ol className="timeline">
              <li className="job">
                <div className="job__icon" aria-hidden="true">
                  <svg viewBox="0 0 40 40"><rect className="sa" x="11" y="3" width="18" height="34" rx="4" fill="none" strokeWidth="2.5"/><rect x="15" y="9" width="10" height="8" rx="2" fill="#FF8BC6"/><path d="M15 22h10M15 27h6" stroke="#F7F3FF" strokeWidth="2.5" strokeLinecap="round"/></svg>
                </div>
                <div className="job__body">
                  <span className="job__when">Feb 2025 – now</span>
                  <h3 className="job__role">Full-stack developer intern</h3>
                  <p className="job__org">Rennted, London</p>
                  <More className="job__desc">Building cross-platform Flutter apps for Android and iOS with BLoC and Cubit state management, Supabase for auth, realtime data and storage, and an admin dashboard for company analytics.</More>
                </div>
              </li>
              <li className="job">
                <div className="job__icon" aria-hidden="true">
                  <svg viewBox="0 0 40 40"><rect className="sa" x="4" y="6" width="32" height="22" rx="3" fill="none" strokeWidth="2.5"/><path d="M13 13l-4 4 4 4M27 13l4 4-4 4M22 12l-4 10" stroke="#F7F3FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/><path className="sa" d="M14 28l-3 8M26 28l3 8" strokeWidth="2.5" strokeLinecap="round"/></svg>
                </div>
                <div className="job__body">
                  <span className="job__when">May 2024 – now</span>
                  <h3 className="job__role">Student ambassador</h3>
                  <p className="job__org">University of East London</p>
                  <More className="job__desc">Running programming taster sessions for students in years 10 to 12 and representing the university at events. Runner-up for Operations Pro, 2026.</More>
                </div>
              </li>
              <li className="job">
                <div className="job__icon" aria-hidden="true">
                  <svg viewBox="0 0 40 40"><path className="sa" d="M4 8h20v13H12l-6 5v-5H4z" fill="none" strokeWidth="2.5" strokeLinejoin="round"/><path d="M16 25v3h12l6 5v-5h2V15h-8" fill="none" stroke="#FF8BC6" strokeWidth="2.5" strokeLinejoin="round"/></svg>
                </div>
                <div className="job__body">
                  <span className="job__when">Dec 2024 – May 2025</span>
                  <h3 className="job__role">Student mentor</h3>
                  <p className="job__org">University of East London</p>
                  <More className="job__desc">Mentored junior students in web development and advanced Java through hands-on coding sessions, Git workflows and assessment prep.</More>
                </div>
              </li>
              <li className="job">
                <div className="job__icon" aria-hidden="true">
                  <svg viewBox="0 0 40 40"><path d="M20 34S5 25 5 14a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 11-15 20-15 20z" fill="none" stroke="#FF8BC6" strokeWidth="2.5" strokeLinejoin="round"/><path className="sa" d="M14 18h4l2-4 2 8 2-4h4" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="job__body">
                  <span className="job__when">Feb 2024 – now</span>
                  <h3 className="job__role">Community volunteer</h3>
                  <p className="job__org">Care homes and community centres, London</p>
                  <More className="job__desc">Teaching older residents to use smartphones, video calls and online banking, and helping run food distribution drives. UEL Volunteering Recognition Award, 2024.</More>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* Skills */}
        <section className="section" aria-labelledby="skills-h">
          <div className="wrap split split--center">
            <div className="stack-l skills__intro">
              <h2 className="display" id="skills-h">Toolkit</h2>
              <svg className="bloch" viewBox="0 0 400 400" aria-hidden="true">
                <circle cx="200" cy="200" r="150" fill="#E2D6F5" stroke="#24123A" strokeWidth="3"/>
                <ellipse cx="200" cy="200" rx="150" ry="44" fill="none" stroke="#24123A" strokeWidth="2" strokeDasharray="6 8"/>
                <path d="M200 40v320M40 200h320" stroke="#B7A8D6" strokeWidth="2"/>
                <text x="200" y="30" textAnchor="middle">|0⟩</text>
                <text x="200" y="388" textAnchor="middle">|1⟩</text>
                <g className="spin">
                  <circle cx="200" cy="200" r="118" fill="none" stroke="#FF8BC6" strokeWidth="2.5" strokeDasharray="2 12" strokeLinecap="round"/>
                  <path d="M200 200l84-84" stroke="#24123A" strokeWidth="5" strokeLinecap="round"/>
                  <circle className="fa" cx="284" cy="116" r="16" stroke="#24123A" strokeWidth="3"/>
                </g>
                <circle cx="200" cy="200" r="8" fill="#24123A"/>
              </svg>
            </div>
            <div className="skills">
              <div className="tier">
                <h3 className="tier__name">Daily drivers</h3>
                <ul className="tier__chips tier--solid">
                  <li>Python</li><li>React</li><li>FastAPI</li><li>Flutter</li><li>Dart</li><li>TypeScript</li><li>SQL</li>
                </ul>
              </div>
              <div className="tier">
                <h3 className="tier__name">Comfortable with</h3>
                <ul className="tier__chips tier--accent">
                  <li>Node.js</li><li>Java</li><li>Supabase</li><li>MongoDB</li><li>Docker</li><li>OpenCV</li><li>Vite</li><li>PyTorch</li><li>Qiskit</li>
                </ul>
              </div>
              <div className="tier">
                <h3 className="tier__name">Learning</h3>
                <ul className="tier__chips tier--dashed">
                  <li>Microsoft Azure</li><li>Power BI</li><li>LangChain</li><li>Web scraping</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Contact */}
      <footer className="section section--plum contact" id="contact">
        <div className="wrap stack-xl">
          <div className="split split--center">
            <div className="stack-l contact__text">
              <h2 className="display display--xl">Let's build<br />something.</h2>
              <a className="contact__email" href="mailto:actually.adityya@gmail.com">actually.adityya@gmail.com</a>
            </div>
            <svg className="contact__art" viewBox="0 0 480 260" aria-hidden="true">
              <text x="0" y="136">|you⟩</text>
              <path className="march" d="M66 130h374" stroke="#6E5A92" strokeWidth="3" strokeDasharray="10 8"/>
              <rect x="96" y="104" width="52" height="52" rx="10" fill="#FF8BC6"/>
              <text className="gate-label" x="122" y="140" textAnchor="middle">H</text>
              <rect x="196" y="96" width="92" height="68" rx="12" fill="#F7F3FF"/>
              <path d="M210 150a32 32 0 0 1 64 0" fill="none" stroke="#24123A" strokeWidth="3"/>
              <g className="swing"><path d="M242 150v-38" stroke="#24123A" strokeWidth="3.5" strokeLinecap="round"/></g>
              <g className="bob">
                <rect className="fa" x="330" y="84" width="120" height="88" rx="12" stroke="#F7F3FF" strokeWidth="3"/>
                <path d="M332 90l58 46 58-46" fill="none" stroke="#24123A" strokeWidth="3.5" strokeLinejoin="round"/>
              </g>
            </svg>
          </div>
          <div className="contact__bar">
            <ul className="contact__links">
              <li><a href="https://linkedin.com/in/actuallyadityya" rel="me">LinkedIn</a></li>
              <li><a href="https://github.com/actuallyADITYYA" rel="me">GitHub</a></li>
            </ul>
            <p>Based in London. © <span>{new Date().getFullYear()}</span> Aditya Prakash</p>
          </div>
        </div>
      </footer>
    </>
  );
}
