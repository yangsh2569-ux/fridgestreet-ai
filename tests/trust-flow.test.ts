import test from "node:test";
import assert from "node:assert/strict";
import {
  newReport,
  reportReducer,
  readyToShare,
  newInspection,
  readyToRecord,
  validQuantity,
} from "../src/data/trust-flow.ts";
test("an unreviewed AI draft cannot be submitted", () => {
  const draft = newReport();
  assert.equal(readyToShare(draft), false);
  assert.deepEqual(reportReducer(draft, { type: "submit" }), draft);
});
test("every retained suggestion requires human confirmation; unknown quantities stay unknown", () => {
  let draft = newReport();
  for (const item of draft.items)
    draft = reportReducer(draft, { type: "confirm", id: item.id });
  assert.equal(readyToShare(draft), true);
  const shared = reportReducer(draft, { type: "submit" });
  assert.equal(shared.submitted, true);
  assert.equal(shared.items[1].quantity, "");
  assert.equal("verified" in shared, false);
  assert.deepEqual(
    reportReducer(shared, { type: "remove", id: "bread" }),
    shared,
  );
});
test("editing clears confirmation and invalid values cannot be confirmed", () => {
  let draft = reportReducer(newReport(), { type: "confirm", id: "bread" });
  draft = reportReducer(draft, {
    type: "edit",
    id: "bread",
    changes: { quantity: "-2" },
  });
  assert.equal(draft.items[0].confirmed, false);
  draft = reportReducer(draft, { type: "confirm", id: "bread" });
  assert.equal(draft.items[0].confirmed, false);
  assert.equal(validQuantity("3.5"), false);
  assert.equal(validQuantity("0"), false);
});
test("removal and optional apples remain under human control", () => {
  let draft = reportReducer(newReport(), { type: "apple" });
  draft = reportReducer(draft, { type: "apple" });
  assert.equal(draft.items.filter((i) => i.id === "apple").length, 1);
  assert.equal(draft.items.at(-1)?.confirmed, false);
  for (const item of draft.items)
    draft = reportReducer(draft, { type: "remove", id: item.id });
  assert.equal(readyToShare(draft), false);
});
test("a check needs a separate visit, temperature and all physical observations", () => {
  const check = newInspection();
  assert.equal(readyToRecord(check), false);
  const complete = {
    ...check,
    temperature: "4.1",
    labels: true,
    packaging: true,
    access: true,
  };
  assert.equal(readyToRecord(complete), false);
  assert.equal(readyToRecord({ ...complete, visited: true }), true);
  assert.equal(
    readyToRecord({ ...complete, visited: true, concern: true }),
    false,
  );
  assert.equal(
    readyToRecord({ ...complete, visited: true, temperature: "" }),
    false,
  );
});
