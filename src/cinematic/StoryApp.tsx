import { useState, useEffect } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  MapPin,
  Play,
  ScanLine,
} from "lucide-react";
import { ExperienceProvider, useExperience } from "./ExperienceContext";
import { CinematicChapter, BeatCopy } from "./CinematicChapter";
import { PhoneMockup } from "./PhoneMockup";
import { Navigation } from "./Navigation";
import { FilmModal, EvidenceDrawer, ImageDialog } from "./Dialogs";
import { Contribution, InspectionDemo } from "./Interactions";
import { brandLogos, media, phones, type UiAsset } from "../data/cinematic";

function Story() {
  const [modal, setModal] = useState<"film" | "evidence" | null>(null);
  const [image, setImage] = useState<UiAsset | null>(null);

  const [inspection, setInspection] = useState(false);
  const { setActive } = useExperience();
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setActive("film");
      },
      { threshold: 0 },
    );
    observer.observe(document.getElementById("film")!);
    return () => observer.disconnect();
  }, [setActive]);
  return (
    <>
      <Navigation
        onFilm={() => setModal("film")}
        onEvidence={() => setModal("evidence")}
      />
      <main id="main">
        <CinematicChapter
          id="opening"
          number="00"
          label="A neighborhood story"
          video={0}
          length={155}
          className="opening"
        >
          {() => (
            <>
              <div className="hero-copy">
                <h1>
                  Food to share.
                  <br />A community
                  <br />
                  to <em>care.</em>
                </h1>
                <div className="hero-bottom">
                  <p>
                    A proposed AI-assisted, community-verified
                    <br className="desktop-only" /> way to find and share food.
                  </p>
                  <button
                    className="film-link"
                    onClick={() => setModal("film")}
                  >
                    <span className="play-circle">
                      <Play size={17} fill="currentColor" />
                    </span>
                    <span>
                      The Next Neighbor<small>Watch the project film · 42s</small>
                    </span>
                    <ArrowUpRight size={18} />
                  </button>
                </div>
              </div>
              <a className="scroll-invitation" href="#reality">
                <span>SCROLL TO FOLLOW A NEIGHBOR</span>
                <ArrowDown size={17} />
              </a>
              <span className="hero-edition">
                FRIDGESTREET AI
                <br />A DESIGN EXPLORATION
              </span>
            </>
          )}
        </CinematicChapter>
        <CinematicChapter
          id="reality"
          number="01"
          label="The reality"
          video={0}
          length={200}
          className="reality"
        >
          {() => (
            <div className="research-scene">
              <p className="eyebrow">BEHIND A CITY THAT NEVER STOPS</p>
              <h2>
                Not every table
                <br />
                has enough.
              </h2>
              <div className="stat-line">
                <strong>
                  18.3M
                </strong>
                <p>
                  18.3 million U.S. households experienced
                  <br />
                  food insecurity at some time in 2024.
                </p>
              </div>
              <div className="source-line">
                <a
                  href="https://www.ers.usda.gov/publications/113622"
                  target="_blank"
                  rel="noreferrer"
                >
                  USDA ERS · 2024 national household estimate{" "}
                  <ArrowUpRight size={13} />
                </a>
                <button onClick={() => setModal("evidence")}>
                  Read the research <ArrowRight size={14} />
                </button>
              </div>
              <p className="data-qualifier">
                A national annual estimate presented to frame the scale of the issue.
              </p>
            </div>
          )}
        </CinematicChapter>
        <CinematicChapter
          id="need"
          number="02"
          label="A human need"
          video={1}
          beats={2}
          length={220}
          position="60% 50%"
        >
          {({ beat }) => (
            <>
              <div className="cinema-copy">
                <BeatCopy
                  beat={beat}
                  lines={[
                    "Behind every number,\nthere is a neighbor.",
                    "Finding nearby food\nshouldn’t depend on luck.",
                  ]}
                />
                <p>
                  A familiar street. An ordinary day.
                  <br />A little less certainty about what comes next.
                </p>
              </div>
              <div className="design-questions">
                <span className="eyebrow">
                  THREE QUESTIONS THAT SHAPED THE DESIGN
                </span>
                <div>
                  <p>
                    <span>01</span>Uncertain availability
                    <small>Make the source and age of an update visible.</small>
                  </p>
                  <p>
                    <span>02</span>Manual updates
                    <small>Ask less of the neighbor leaving a report.</small>
                  </p>
                  <p>
                    <span>03</span>Fragmented coordination
                    <small>
                      Connect shared observations to a separate check.
                    </small>
                  </p>
                </div>
                <small>Design framing · not field-study findings</small>
              </div>
            </>
          )}
        </CinematicChapter>
        <CinematicChapter
          id="finding"
          number="03"
          label="Finding a way"
          video={2}
          beats={3}
          length={300}
          className="phone-scene"
          position="30% 50%"
        >
          {({ beat, choose }) => (
            <div className="scene-composition">
              <div className="editorial-copy">
                <p className="eyebrow">01 / FIND</p>
                <h2>
                  A place to start.
                  <br />A route to <em>follow.</em>
                </h2>
                <p>
                  Shared photographs offer a starting point. A map turns that
                  possibility into a walk through the neighborhood.
                </p>
                <div className="segmented" aria-label="Explore finding food">
                  {["Map", "Nearby list", "Directions"].map((label, i) => (
                    <button
                      key={label}
                      aria-pressed={beat === i}
                      onClick={() => choose(i)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <div className="route-note">
                  <MapPin size={17} />
                  <div>
                    Bayard St Fridge · Chinatown
                    <small>Illustrative destination and update times</small>
                  </div>
                </div>
              </div>
              <div className="device-column">
                <PhoneMockup
                  asset={phones[beat]}
                  nextAsset={phones[Math.min(2, beat + 1)]}
                  onInspect={setImage}
                />
                <span className="device-caption">
                  {
                    [
                      "The map shows the way.",
                      "Another way to see what’s nearby.",
                      "A few steps closer.",
                    ][beat]
                  }
                </span>
              </div>
            </div>
          )}
        </CinematicChapter>
        <CinematicChapter
          id="arrival"
          number="04"
          label="Discovery & arrival"
          video={3}
          length={210}
          className="phone-scene"
          position="40% 50%"
        >
          {() => (
            <div className="scene-composition">
              <div className="editorial-copy">
                <p className="eyebrow">02 / ARRIVE</p>
                <h2>
                  And there
                  <br />
                  <em>it is.</em>
                </h2>
                <p>
                  Take what you need.
                  <br />
                  Leave what you can.
                </p>
                <p className="subtle-copy">
                  An invitation to contribute, with room to say “Not now.” Food
                  comes first.
                </p>
                <div className="arrival-actions">
                  <a className="pill yellow" href="#open">
                    Not now. Take what you need <ArrowRight size={17} />
                  </a>
                  <a className="text-link" href="#contribute">
                    <ScanLine size={17} />
                    Explore the optional scan
                  </a>
                </div>
              </div>
              <div className="device-column">
                <PhoneMockup asset={phones[3]} onInspect={setImage} />
                <span className="device-caption">
                  The main story follows “Not now.”
                </span>
              </div>
            </div>
          )}
        </CinematicChapter>
        <CinematicChapter
          id="open"
          number="05"
          label="Open to everyone"
          video={4}
          beats={2}
          length={200}
          position="60% 50%"
        >
          {({ beat }) => (
            <div className="cinema-copy low-copy">
              <BeatCopy
                beat={beat}
                lines={[
                  "A fridge.\nOpen to everyone.",
                  "Take what you need.\nNo questions asked.",
                ]}
              />
              <p>
                A shared resource, on a neighborhood street.
                <br />
                No report required. No permission to belong.
              </p>
            </div>
          )}
        </CinematicChapter>
        <CinematicChapter
          id="take"
          number="06"
          label="A simple moment"
          video={5}
          length={185}
          position="60% 50%"
        >
          {() => (
            <div className="cinema-copy low-copy">
              <p className="eyebrow">CARE CAN BE THIS ORDINARY</p>
              <h2>
                One small
                <br />
                moment of <em>care.</em>
              </h2>
              <p>
                A hand reaches for corn.
                <br />
                The day moves on.
              </p>
              <a className="text-link" href="#contribute">
                And if you have a moment… <ArrowDown size={16} />
              </a>
            </div>
          )}
        </CinematicChapter>
        <Contribution onInspect={setImage} />
        <CinematicChapter
          id="check"
          number="08"
          label="The human check"
          video={7}
          beats={3}
          length={260}
          className="phone-scene trust-scene"
          position="35% 50%"
        >
          {({ beat: checkTab, choose: setCheckTab }) => (
            <div className="scene-composition">
              <div className="editorial-copy">
                <p className="eyebrow">04 / CHECK IN PERSON</p>
                <h2>
                  Trust takes
                  <br />
                  <em>someone.</em>
                </h2>
                <p>
                  A photo can start a report. Only a separate, physical visit by
                  an authorized volunteer can create a recently checked record.
                </p>
                <div className="segmented" aria-label="Trust loop screens">
                  <button
                    aria-pressed={checkTab === 0}
                    onClick={() => setCheckTab(0)}
                  >
                    Volunteer Hub
                  </button>
                  <button
                    aria-pressed={checkTab >= 1}
                    onClick={() => setCheckTab(1)}
                  >
                    On-site check
                  </button>
                </div>
                <div className="trust-caption">
                  <Check size={17} />
                  <span>
                    A specific section. A recorded time.
                    <br />A person accountable for the observation.
                  </span>
                </div>
                <button
                  className="pill glass"
                  onClick={() => setInspection(true)}
                >
                  Try the inspection interaction <ArrowUpRight size={16} />
                </button>
                <div className="narrative-aside">
                  <BeatCopy
                    beat={checkTab}
                    lines={[
                      "Technology can suggest. But trust needs people.",
                      "Every verified update begins with a real-world check.",
                      "Checked by a volunteer. Shared with the community.",
                    ]}
                  />
                </div>
                <p className="microcopy">
                  A check does not certify food safety.
                </p>
              </div>
              <div className="device-column">
                <PhoneMockup
                  asset={phones[checkTab === 0 ? 13 : 14]}
                  onInspect={setImage}
                />
                <span className="device-caption">
                  {checkTab === 0
                    ? "Sample queue · reports and inspections remain separate"
                    : "Starts NOT VERIFIED · physical inspection required"}
                </span>
              </div>
            </div>
          )}
        </CinematicChapter>
        <CinematicChapter
          id="neighbor"
          number="09"
          label="The next neighbor"
          video={8}
          beats={3}
          length={300}
          className="phone-scene neighbor-scene"
          position="28% 50%"
        >
          {({ beat }) => (
            <div className="scene-composition">
              <div className="editorial-copy">
                <p className="eyebrow">05 / PASS IT ON</p>
                <h2>
                  Someone else.
                  <br />A little more
                  <br />
                  <em>to go on.</em>
                </h2>
                <p>
                  The next neighbor sees what was checked, by whom, and when.
                  Information to help them decide — never a promise of safety or
                  availability.
                </p>
                <ol className="trust-timeline">
                  <li>Community report</li>
                  <li>Pending review</li>
                  <li>Authorized on-site check</li>
                  <li>Recently Checked</li>
                </ol>
                <div className="narrative-aside">
                  <BeatCopy
                    beat={beat}
                    lines={[
                      "One person’s contribution becomes another person’s confidence.",
                      "A small act reaches someone you’ve never met.",
                      "Food to share. A community to care.",
                    ]}
                  />
                </div>
                <p className="microcopy">
                  Example record · 10:30 AM · Illustrative data
                </p>
              </div>
              <div className="device-column">
                <PhoneMockup asset={phones[15]} onInspect={setImage} />
                <span className="device-caption">
                  A new neighbor. The same circle of care.
                </span>
              </div>
            </div>
          )}
        </CinematicChapter>
        <section id="film" className="closing-section" data-chapter>
          <div className="closing-heading">
            <span className="eyebrow">10 / THE NEXT NEIGHBOR</span>
            <h2>
              What we share
              <br />
              goes <em>further.</em>
            </h2>
            <p>
              Not just food. A little information.
              <br />A little confidence. A little care.
            </p>
          </div>
          <button
            className="film-poster"
            onClick={() => setModal("film")}
            aria-label="Watch The Next Neighbor full film"
          >
            <img
              src={media[9].poster}
              alt="The community fridge from The Next Neighbor film"
              loading="lazy"
            />
            <span className="film-poster-title">
              The Next
              <br />
              <em>Neighbor</em>
            </span>
            <span className="film-play">
              <Play size={22} fill="currentColor" /> WATCH THE FILM
            </span>
            <span className="film-poster-credit">
              A FRIDGESTREET AI FILM · 00:43
            </span>
          </button>
          <div className="design-note">
            <div>
              <span className="eyebrow">THE DESIGN BEHIND THE STORY</span>
              <h3>
                Less effort to share.
                <br />
                More clarity to trust.
              </h3>
              <p>
                FridgeStreet AI proposes a bridge between a neighbor’s quick
                observation and a volunteer’s physical check. AI reduces the
                work of drafting a report. People retain the judgment.
              </p>
              <button
                className="pill blue"
                onClick={() => setModal("evidence")}
              >
                Research & design notes <ArrowUpRight size={17} />
              </button>
              <div className="project-meta">
                <div>
                  <span>DISCIPLINES</span>
                  <p>
                    Interaction design
                    <br />
                    Service design
                    <br />
                    Responsible AI
                  </p>
                </div>
                <div>
                  <span>PROJECT STATUS</span>
                  <p>
                    Concept prototype
                    <br />
                    Illustrative New York setting
                    <br />
                    No live operational data
                  </p>
                </div>
              </div>
            </div>
            <div className="brand-device">
              <PhoneMockup asset={phones[12]} onInspect={setImage} />
            </div>
          </div>
          <footer id="site-footer" className="site-footer" role="contentinfo" aria-label="FridgeStreet AI footer">
            <div className="footer-primary">
              <div className="footer-brand">
                <a className="brand-wordmark" href="#opening">
                  <img src={brandLogos.blue} alt="FridgeStreet AI" width="1234" height="182" />
                </a>
                <p>A community-powered food sharing concept.</p>
              </div>
              <a className="footer-back" href="#opening">
                Back to the beginning <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
            <div className="footer-secondary">
              <p>© 2026 FridgeStreet AI · Concept project</p>
              <a href="https://www.ers.usda.gov/publications/113622" target="_blank" rel="noreferrer">
                Research: USDA ERS
              </a>
            </div>
          </footer>
        </section>
      </main>
      {modal === "film" && <FilmModal onClose={() => setModal(null)} />}{" "}
      {modal === "evidence" && (
        <EvidenceDrawer onClose={() => setModal(null)} />
      )}{" "}
      {image && <ImageDialog asset={image} onClose={() => setImage(null)} />}{" "}
      {inspection && <InspectionDemo onClose={() => setInspection(false)} />}
    </>
  );
}
export default function App() {
  return (
    <ExperienceProvider>
      <Story />
    </ExperienceProvider>
  );
}
