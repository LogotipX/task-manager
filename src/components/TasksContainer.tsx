import React, { useEffect, useState } from "react";

function TasksContainer() {
  const [width, setWidth] = useState(window.innerWidth);

  function getWindowWidth() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", getWindowWidth);

    return () => window.removeEventListener("resize", getWindowWidth);
  }, []);

  return (
    <div className="text-slate-100 bg-slate-800 sm:w-1/3 border-2 border-dashed border-slate-100 rounded-sm">
      {width}
    </div>
  );
}

export default TasksContainer;
