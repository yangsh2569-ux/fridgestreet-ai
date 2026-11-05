import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
type Preferences = {
  reduced: boolean;
  still: boolean;
  setStill: (value: boolean) => void;
  paused: boolean;
  setPaused: (value: boolean) => void;
  active: string;
  setActive: (id: string) => void;
};
const Context = createContext<Preferences>({
  reduced: false,
  still: false,
  setStill: () => {},
  paused: false,
  setPaused: () => {},
  active: "opening",
  setActive: () => {},
});
export const useExperience = () => useContext(Context);
export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [reduced, setReduced] = useState(
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [paused, setPaused] = useState(false);
  const [still, setStill] = useState(false);
  const [active, setActive] = useState("opening");
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle(
      "still-experience",
      still || reduced,
    );
    return () => document.documentElement.classList.remove("still-experience");
  }, [still, reduced]);
  return (
    <Context.Provider
      value={{
        reduced: reduced || still,
        still,
        setStill,
        paused,
        setPaused,
        active,
        setActive,
      }}
    >
      {children}
    </Context.Provider>
  );
}
