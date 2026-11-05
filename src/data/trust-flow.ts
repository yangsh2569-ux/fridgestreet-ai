export type FoodItem = {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  confirmed: boolean;
};
export type Report = { items: FoodItem[]; submitted: boolean };
export const newReport = (): Report => ({
  items: [
    {
      id: "bread",
      name: "Bread",
      quantity: "1",
      unit: "loaf",
      confirmed: false,
    },
    {
      id: "peppers",
      name: "Green peppers",
      quantity: "",
      unit: "pieces",
      confirmed: false,
    },
    {
      id: "corn",
      name: "Corn",
      quantity: "",
      unit: "pieces",
      confirmed: false,
    },
  ],
  submitted: false,
});
export function validQuantity(value: string) {
  return (
    value === "" ||
    (/^\d{1,3}$/.test(value) && Number(value) > 0 && Number(value) <= 999)
  );
}
export function readyToShare(report: Report) {
  return (
    !report.submitted &&
    report.items.length > 0 &&
    report.items.every(
      (item) =>
        item.confirmed &&
        item.name.trim().length > 0 &&
        validQuantity(item.quantity),
    )
  );
}
export type ReportAction =
  | {
      type: "edit";
      id: string;
      changes: Partial<Pick<FoodItem, "name" | "quantity" | "unit">>;
    }
  | { type: "confirm" | "remove"; id: string }
  | { type: "apple" }
  | { type: "submit" }
  | { type: "reset" };
export function reportReducer(report: Report, action: ReportAction): Report {
  if (action.type === "reset") return newReport();
  if (report.submitted) return report;
  if (action.type === "submit")
    return readyToShare(report) ? { ...report, submitted: true } : report;
  if (action.type === "apple")
    return report.items.some((i) => i.id === "apple")
      ? report
      : {
          ...report,
          items: [
            ...report.items,
            {
              id: "apple",
              name: "Apple",
              quantity: "2",
              unit: "pieces",
              confirmed: false,
            },
          ],
        };
  if (action.type === "remove")
    return { ...report, items: report.items.filter((i) => i.id !== action.id) };
  return {
    ...report,
    items: report.items.map((item) =>
      item.id !== action.id
        ? item
        : action.type === "edit"
          ? { ...item, ...action.changes, confirmed: false }
          : {
              ...item,
              name: item.name.trim(),
              confirmed:
                Boolean(item.name.trim()) && validQuantity(item.quantity),
            },
    ),
  };
}
export type Inspection = {
  temperature: string;
  labels: boolean;
  packaging: boolean;
  access: boolean;
  visited: boolean;
  concern: boolean;
};
export const newInspection = (): Inspection => ({
  temperature: "",
  labels: false,
  packaging: false,
  access: false,
  visited: false,
  concern: false,
});
export function readyToRecord(check: Inspection) {
  return (
    check.temperature.trim() !== "" &&
    Number.isFinite(Number(check.temperature)) &&
    Number(check.temperature) >= -50 &&
    Number(check.temperature) <= 60 &&
    check.labels &&
    check.packaging &&
    check.access &&
    check.visited &&
    !check.concern
  );
}
