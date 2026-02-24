import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import "./index.css";

import portraitImage from "../../Daniel Portrait.jpeg";
import bookCoverImage from "../../kleptocracy book cover.jpeg";

type RevealProps = {
  children: ReactNode;
};

const awards = [
  { year: "2025", title: "Winner – GITEX Nigeria Discovery Pitch Zone" },
  { year: "2022", title: "Exhibitor – GITEX Global Dubai" },
  { year: "2022", title: "Financial Times African Summit (London)" },
  { year: "2023", title: "Global Inclusivity & AI Africa Conference" },
  { year: "2024", title: "JAMB Equal Opportunity Access Conference" },
];

const mediaLinks = [
  { label: "YourStudyPath.com", href: "https://yourstudypath.com" },
  { label: "BusinessDay article", href: "#" },
  { label: "TechCabal features", href: "#" },
  { label: "ThisDayLive article", href: "#" },
  { label: "PressReader feature", href: "#" },
];

const Reveal = ({ children }: RevealProps) => {
  return <div className="reveal">{children}</div>;
};

function App() {
  const [timeLeft, setTimeLeft] = useState("");
  const [email, setEmail] = useState("");

  const targetDate = useMemo(() => {
    const now = new Date();
    let target = new Date(now.getFullYear(), 4, 31, 23, 59, 59);
    if (now > target) {
      target = new Date(now.getFullYear() + 1, 4, 31, 23, 59, 59);
    }
    return target;
  }, []);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        setTimeLeft("Launch day is here.");
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);
      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!email) {
      return;
    }
    alert("Thank you. You will be notified when pre-order opens.");
    setEmail("");
  };

  return (
    <main>
      <section className="hero">
        <div className="hero-overlay" />
        <div className="container hero-content">
          <Reveal>
            <p className="eyebrow">Daniel Egunjobi Ololade</p>
            <h1>Building Systems That Empower the African Mind.</h1>
            <p className="lead">
              Entrepreneur. Researcher. Systems Thinker. Founder &amp; CEO of Your Study Path, building scalable education and logistics infrastructure across Africa.
            </p>
            <div className="cta-row">
              <a href="#book" className="btn btn-gold">Pre-Order Kleptocracy (Paystack)</a>
              <a href="#speaking" className="btn btn-outline">Book Daniel to Speak</a>
            </div>
          </Reveal>
          <Reveal>
            <img src={portraitImage} alt="Daniel Egunjobi Ololade portrait" className="portrait" />
          </Reveal>
        </div>
      </section>

      <section className="section container">
        <Reveal>
          <h2>About Daniel</h2>
          <p>
            Daniel Egunjobi Ololade is a Nigerian entrepreneur with over six years of experience building ventures that solve Afro-centric structural problems across education and logistics.
          </p>
          <p>
            He is the Founder &amp; CEO of Your Study Path, one of Nigeria’s most affordable online learning platforms helping thousands of students prepare for WAEC, UTME, and IELTS.
          </p>
          <p className="credentials">
            BSc Mechanical Engineering – University of Lagos • MBA – University of Lagos • Certificate in Entrepreneurial Management – Lagos Business School
          </p>
          <p>
            He has built and scaled ventures from zero to structured multi-team organizations, transforming ideas into operational systems. He believes Africa’s greatest constraint is not talent — but broken systems.
          </p>
          <div className="tags">
            <span>Education reform</span><span>International logistics</span><span>AI &amp; emerging tech in education</span><span>Youth empowerment</span>
          </div>
        </Reveal>
      </section>

      <section className="section panel">
        <div className="container split-grid">
          <Reveal>
            <article className="card">
              <h3>Your Study Path</h3>
              <ul>
                <li>Scaled from 0 to 3,000+ users in the first four months.</li>
                <li>Built team growth from 2 founders to 15 staff.</li>
                <li>Forged strategic ecosystem partnerships.</li>
                <li>Exhibitor at GITEX Global (Dubai).</li>
              </ul>
            </article>
          </Reveal>
          <Reveal>
            <article className="card">
              <h3>BuyAndShip Limited</h3>
              <p>
                International shipping and logistics infrastructure enabling Nigerians to shop seamlessly from the US and UK.
              </p>
              <ul>
                <li>Overseas warehouses &amp; consolidation</li>
                <li>Customs processing and compliance</li>
                <li>Doorstep delivery with cross-border coordination</li>
                <li>Resilient operations in volatile forex environments</li>
              </ul>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="section container">
        <Reveal>
          <h2>Academic Research &amp; Publications</h2>
          <div className="publication">
            <p className="citation">Ololade, D.E. (2025).</p>
            <h3>Revolutionizing Learning: The Impact of Augmented Reality (AR) and Artificial Intelligence (AI) on Education</h3>
            <p>Positioning policy, product, and pedagogy where AI, AR, Blockchain, and education converge.</p>
            <a className="btn btn-outline" href="#">View Publication</a>
          </div>
        </Reveal>
      </section>

      <section id="book" className="section book-section">
        <div className="container split-grid">
          <Reveal>
            <img src={bookCoverImage} alt="Kleptocracy book cover" className="book-cover" />
          </Reveal>
          <Reveal>
            <h2>Kleptocracy (Our Leaders Are Mad, The People Are Madder)</h2>
            <blockquote>
              “This is not just a political book. It is a societal mirror.”
            </blockquote>
            <p>
              Fearless. Confrontational. A mirror held up to leadership failure and civic complacency — challenging the everyday compromises that sustain decay.
            </p>
            <form onSubmit={handleSubmit} className="email-form">
              <input
                type="email"
                placeholder="Enter email for launch access"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <button type="submit" className="btn btn-gold">Notify Me</button>
            </form>
            <div className="countdown">Countdown to May 31st: {timeLeft}</div>
            <div className="cta-row">
              <a className="btn btn-gold" href="#">Pre-order via Paystack</a>
              <a className="btn btn-outline" href="#">Flutterwave integration</a>
            </div>
            <div className="testimonial-grid">
              <p>“Urgent, unsettling, necessary.”</p>
              <p>“A generation-defining call to conscience.”</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section container">
        <Reveal>
          <h2>Awards &amp; Global Exposure</h2>
          <div className="timeline">
            {awards.map((award) => (
              <div key={award.title} className="timeline-item">
                <span>{award.year}</span>
                <p>{award.title}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="speaking" className="section panel">
        <div className="container split-grid">
          <Reveal>
            <h2>Speaking &amp; Media</h2>
            <p>
              Invite Daniel for universities, youth summits, edtech events, policy discussions, technology conferences, and entrepreneurship workshops.
            </p>
            <a className="btn btn-gold" href="mailto:bookings@yourstudypath.com">Invite Daniel to Speak</a>
          </Reveal>
          <Reveal>
            <div className="media-grid">
              {mediaLinks.map((item) => (
                <a key={item.label} href={item.href} className="media-card">{item.label}</a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

export default App;
