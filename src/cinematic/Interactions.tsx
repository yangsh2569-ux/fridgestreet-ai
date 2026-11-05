import { useReducer, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Camera,
  Check,
  Plus,
  RotateCcw,
  Trash2,
} from "lucide-react";
import {
  contributionBeats,
  flatScreens,
  phones,
  type UiAsset,
} from "../data/cinematic";
import {
  newInspection,
  newReport,
  readyToRecord,
  readyToShare,
  reportReducer,
} from "../data/trust-flow";
import { CinematicChapter } from "./CinematicChapter";
import { PhoneMockup } from "./PhoneMockup";
import { Dialog } from "./Dialogs";
export function Contribution({
  onInspect,
}: {
  onInspect: (a: UiAsset) => void;
}) {
  const [review, setReview] = useState(false);
  const [branch, setBranch] = useState<null | "photo" | "added">(null);
  const [report, dispatch] = useReducer(reportReducer, undefined, newReport);
  return (
    <CinematicChapter
      id="contribute"
      number="07"
      label="AI, with people"
      video={6}
      beats={9}
      length={620}
      className="contribution-scene"
    >
      {({ beat, choose }) => {
        const item = contributionBeats[beat];
        const asset =
          branch === "photo"
            ? phones[10]
            : branch === "added"
              ? flatScreens.apple
              : item.asset;
        return (
          <>
            <div className="contribution-wash" />
            <div className="scene-composition">
              <div className="editorial-copy">
                <p className="eyebrow">03 / LEAVE A LITTLE CONTEXT</p>
                <div className="changing-copy" key={item.title}>
                  <h2>
                    {branch === "photo"
                      ? "Two apples.\nOne more detail."
                      : branch === "added"
                        ? "Added by you.\nStill for review."
                        : item.title}
                  </h2>
                  <p>
                    {branch
                      ? "An optional example branch. The photograph and quantity are supplied demo content; no camera or recognition service is running."
                      : item.body}
                  </p>
                </div>
                <div className="contribution-actions">
                  {branch ? (
                    <>
                      <button
                        className="pill blue"
                        onClick={() => {
                          dispatch({ type: "apple" });
                          setBranch("added");
                        }}
                        disabled={branch === "added"}
                      >
                        <Camera size={17} />
                        {branch === "added"
                          ? "Apple added to your draft"
                          : "Use example photo"}
                      </button>
                      <button
                        className="text-link"
                        onClick={() => {
                          setBranch(null);
                          choose(5);
                        }}
                      >
                        <ArrowLeft size={16} />
                        Back to the report
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="pill blue"
                        onClick={() => setReview(true)}
                      >
                        {report.submitted
                          ? "View your example report"
                          : "Try reviewing the draft"}
                        <ArrowUpRight size={16} />
                      </button>
                      {beat >= 3 && beat <= 5 && (
                        <button
                          className="text-link"
                          onClick={() => setBranch("photo")}
                        >
                          <Plus size={17} />
                          Try the optional apple photo
                        </button>
                      )}
                    </>
                  )}
                </div>
                <div className="workflow-status">
                  <span className="status-dot" />
                  <div>
                    {report.submitted
                      ? "Your example: pending community review"
                      : "An illustrative flow. A person stays in control."}
                    <small>
                      {report.submitted
                        ? "No inspection or verification has been created."
                        : "AI suggestions are not a food-safety check."}
                    </small>
                  </div>
                </div>
              </div>
              <div className="device-column">
                <PhoneMockup
                  asset={asset}
                  nextAsset={contributionBeats[Math.min(8, beat + 1)].asset}
                  onInspect={onInspect}
                />
                <span className="device-caption">
                  {branch
                    ? "Optional branch · original Flow V2 screen"
                    : `${String(beat + 1).padStart(2, "0")} / 09 · ${item.label} · Original design`}
                </span>
              </div>
            </div>
            <div className="flow-controller">
              <div className="flow-label">
                <span>THE REPORT, STEP BY STEP</span>
                <span>Scroll or select a step</span>
              </div>
              <div className="flow-steps" aria-label="Report sequence">
                {contributionBeats.map((b, i) => (
                  <button
                    key={b.label}
                    aria-pressed={beat === i && !branch}
                    onClick={() => {
                      setBranch(null);
                      choose(i);
                    }}
                  >
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    {b.label}
                  </button>
                ))}
              </div>
              <div className="flow-arrows">
                <button
                  onClick={() => {
                    setBranch(null);
                    choose(Math.max(0, beat - 1));
                  }}
                  disabled={beat === 0}
                  aria-label="Previous report step"
                >
                  <ArrowLeft size={18} />
                </button>
                <span>{item.label}</span>
                <button
                  onClick={() => {
                    setBranch(null);
                    choose(Math.min(8, beat + 1));
                  }}
                  disabled={beat === 8}
                  aria-label="Next report step"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
            {review && (
              <Dialog
                title="Try a community report"
                kind="interaction-dialog"
                onClose={() => setReview(false)}
              >
                <div className="interaction-panel">
                  <p className="eyebrow">INTERACTIVE DEMONSTRATION</p>
                  <h2>
                    {report.submitted
                      ? "Shared. Still pending."
                      : "AI suggests. You review."}
                  </h2>
                  <p>
                    These are fixed example suggestions. Edit, remove, or
                    confirm each visible item. Leave a quantity blank if it
                    isn’t known.
                  </p>
                  {report.submitted ? (
                    <>
                      <div className="submitted-message" role="status">
                        <Check size={30} />
                        <strong>Pending community review</strong>
                        <p>
                          Your local example has been submitted. A separate
                          authorized visit is still required for an on-site
                          check.
                        </p>
                      </div>
                      <ul className="report-summary">
                        {report.items.map((i) => (
                          <li key={i.id}>
                            <strong>{i.name}</strong>
                            <span>
                              {i.quantity
                                ? `${i.quantity} ${i.unit}`
                                : "Quantity not recorded"}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <button
                        className="pill blue"
                        onClick={() => {
                          setReview(false);
                          choose(7);
                        }}
                      >
                        See the submitted screen <ArrowRight size={16} />
                      </button>
                      <button
                        className="text-link"
                        onClick={() => dispatch({ type: "reset" })}
                      >
                        <RotateCcw size={15} />
                        Reset the example
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="editable-items">
                        {report.items.map((food) => (
                          <fieldset key={food.id}>
                            <legend>
                              {food.confirmed ? "✓ Reviewed" : "Review item"}
                            </legend>
                            <div className="item-inputs">
                              <label>
                                Item name
                                <input
                                  value={food.name}
                                  maxLength={60}
                                  onChange={(e) =>
                                    dispatch({
                                      type: "edit",
                                      id: food.id,
                                      changes: { name: e.target.value },
                                    })
                                  }
                                />
                              </label>
                              <label>
                                Quantity
                                <input
                                  inputMode="numeric"
                                  value={food.quantity}
                                  placeholder="Unknown"
                                  onChange={(e) =>
                                    dispatch({
                                      type: "edit",
                                      id: food.id,
                                      changes: { quantity: e.target.value },
                                    })
                                  }
                                />
                              </label>
                              <label>
                                Unit
                                <select
                                  value={food.unit}
                                  onChange={(e) =>
                                    dispatch({
                                      type: "edit",
                                      id: food.id,
                                      changes: { unit: e.target.value },
                                    })
                                  }
                                >
                                  <option>pieces</option>
                                  <option>loaf</option>
                                  <option>bags</option>
                                  <option>packs</option>
                                </select>
                              </label>
                            </div>
                            <div className="item-actions">
                              <button
                                onClick={() =>
                                  dispatch({ type: "confirm", id: food.id })
                                }
                                className={food.confirmed ? "confirmed" : ""}
                              >
                                <Check size={16} />
                                {food.confirmed ? "Confirmed" : "Confirm item"}
                              </button>
                              <button
                                aria-label={`Remove ${food.name}`}
                                onClick={() =>
                                  dispatch({ type: "remove", id: food.id })
                                }
                              >
                                <Trash2 size={16} />
                                Remove
                              </button>
                            </div>
                          </fieldset>
                        ))}
                      </div>
                      <button
                        className="text-link"
                        disabled={report.items.some((i) => i.id === "apple")}
                        onClick={() => dispatch({ type: "apple" })}
                      >
                        <Plus size={17} />
                        Add the example apples
                      </button>
                      <p className="microcopy">
                        Use a whole quantity from 1–999, or leave it blank.
                        Changes require confirmation again.
                      </p>
                      <button
                        className="pill blue submit-report"
                        disabled={!readyToShare(report)}
                        onClick={() => dispatch({ type: "submit" })}
                      >
                        Share community report <ArrowRight size={17} />
                      </button>
                      <p className="microcopy">
                        {report.items.filter((i) => i.confirmed).length} of{" "}
                        {report.items.length} items confirmed · demo only,
                        nothing is uploaded
                      </p>
                    </>
                  )}
                </div>
              </Dialog>
            )}
          </>
        );
      }}
    </CinematicChapter>
  );
}
export function InspectionDemo({ onClose }: { onClose: () => void }) {
  const [check, setCheck] = useState(newInspection);
  const [recorded, setRecorded] = useState(false);
  return (
    <Dialog
      title="Try the on-site check"
      kind="interaction-dialog"
      onClose={onClose}
    >
      <div className="interaction-panel">
        <span className="eyebrow">AUTHORIZED VOLUNTEER · DEMONSTRATION</span>
        <h2>
          {recorded
            ? "An observation,\nwith a source."
            : "A photograph\nisn’t a visit."}
        </h2>
        <p>Bayard St, Chinatown · Main refrigerator</p>
        <div
          className={`inspection-status ${recorded ? "recorded" : ""}`}
          role="status"
        >
          {recorded
            ? "Recently Checked · example record, 10:30 AM"
            : "NOT VERIFIED · no check recorded"}
        </div>
        {recorded ? (
          <>
            <p>
              This local example records a separate physical inspection of the
              main refrigerator by an authorized volunteer. It does not verify
              other sections, future availability, or food safety.
            </p>
            <dl className="check-record">
              <div>
                <dt>Measured temperature</dt>
                <dd>{check.temperature} °C</dd>
              </div>
              <div>
                <dt>Source</dt>
                <dd>Authorized volunteer · example</dd>
              </div>
              <div>
                <dt>Observation</dt>
                <dd>10:30 AM · illustrative time</dd>
              </div>
            </dl>
            <button
              className="pill blue"
              onClick={() => {
                setRecorded(false);
                setCheck(newInspection());
              }}
            >
              <RotateCcw size={16} />
              Reset the check
            </button>
          </>
        ) : (
          <>
            <label className="temperature-field">
              Measured temperature (°C)
              <input
                type="number"
                min="-50"
                max="60"
                step="0.1"
                value={check.temperature}
                placeholder="Enter a reading"
                onChange={(e) =>
                  setCheck({ ...check, temperature: e.target.value })
                }
              />
            </label>
            {(
              [
                ["labels", "Labels & dates inspected"],
                ["packaging", "Packaging & condition inspected"],
                ["access", "Cleanliness & access inspected"],
                [
                  "visited",
                  "Simulate a separate visit by an authorized volunteer",
                ],
              ] as const
            ).map(([key, label]) => (
              <label key={key} className="check-row">
                <input
                  type="checkbox"
                  checked={check[key]}
                  onChange={(e) =>
                    setCheck({ ...check, [key]: e.target.checked })
                  }
                />
                <span>{label}</span>
              </label>
            ))}
            <label className="check-row concern">
              <input
                type="checkbox"
                checked={check.concern}
                onChange={(e) =>
                  setCheck({ ...check, concern: e.target.checked })
                }
              />
              <span>Flag a possible safety concern</span>
            </label>
            {check.concern && (
              <p role="alert" className="concern-note">
                Follow-up required. In the proposed service, contact the fridge
                operator. This demo cannot contact an operator or record a
                Recently Checked status while a concern is unresolved.
              </p>
            )}
            <button
              className="pill blue"
              disabled={!readyToRecord(check)}
              onClick={() => setRecorded(true)}
            >
              Review & record example check <ArrowRight size={16} />
            </button>
          </>
        )}
        <p className="microcopy">
          A check does not certify food safety. Example only; no live inspection
          is created. Temperature is recorded as an observation, not
          automatically judged safe.
        </p>
      </div>
    </Dialog>
  );
}
