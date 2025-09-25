import React, { useState } from "react";

export default function Calculator() {
  const [display, setDisplay] = useState("");

  const buttons = [
    "C", "←", "%", "/",
    "7", "8", "9", "*",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0", ".", "="
  ];

  const handleClick = (val) => {
    if (val === "C") {
      setDisplay("");
      return;
    }

    if (val === "←") {
      setDisplay((d) => d.slice(0, -1));
      return;
    }

    if (val === "=") {
      calculate();
      return;
    }

    if (val === "%") {
      try {
        if (!/^[0-9+\-*/(). ]+$/.test(display)) throw new Error("bad");
        const n = eval(display);
        setDisplay(String(n / 100));
      } catch {
        setDisplay("Error");
      }
      return;
    }

    setDisplay((d) => (d === "Error" ? val : d + val));
  };

  const calculate = () => {
    try {
      if (display.trim() === "") return;

      if (!/^[0-9+\-*/(). %]+$/.test(display)) {
        setDisplay("Error");
        return;
      }

      const result = eval(display);

      if (typeof result === "number" && !Number.isFinite(result)) {
        setDisplay("Error");
        return;
      }

      setDisplay(String(result));
    } catch {
      setDisplay("Error");
    }
  };

  return (
    <div className="calculator-page">
      <div className="calculator">
        <div className="display">{display || "0"}</div>

        <div className="buttons">
          {buttons.map((b) => (
            <button
              key={b}
              className={`btn ${
                ["/", "*", "-", "+", "%", "="].includes(b) ? "btn-op" : ""
              } ${b === "C" ? "btn-clear" : ""}`}
              onClick={() => handleClick(b)}
            >
              {b}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
