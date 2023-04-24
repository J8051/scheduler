import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setMode(newMode);

    if (replace) {
      setHistory((prevHistory) => {
        const sliceHistory = prevHistory.slice(0, prevHistory.length - 1);
        return [...sliceHistory, newMode];
      });
    } else {
      setHistory((prevHistory) => [...prevHistory, newMode]);
    }
  }

  function back() {
    if (history.length > 1) {
      const sliceHistory = history.slice(0, history.length - 1);
      setHistory(sliceHistory);
      setMode(sliceHistory[sliceHistory.length - 1]);
    }
  }

  return {
    mode,
    transition,
    back,
  };
}
