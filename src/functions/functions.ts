import React from "react";

export function checkOnClickOverlap(clickEvent: React.MouseEvent, elementToCheck: React.RefObject<HTMLHeadingElement>) {
    const clickCoords = {
      x: clickEvent.clientX,
      y: clickEvent.clientY,
    };

    const contextMenuBtnCoords =
    elementToCheck?.current?.getBoundingClientRect();

    const contextMenuBtnSize = {
      width: elementToCheck?.current?.offsetWidth || 0,
      height: elementToCheck?.current?.offsetHeight || 0,
    };

    return (
      contextMenuBtnCoords?.x !== undefined &&
      contextMenuBtnCoords?.y !== undefined &&
      clickCoords.x >= contextMenuBtnCoords?.x &&
      clickCoords.x <= contextMenuBtnCoords?.x + contextMenuBtnSize.width &&
      clickCoords.y >= contextMenuBtnCoords?.y &&
      clickCoords.y <= contextMenuBtnCoords?.y + contextMenuBtnSize.height
    );
}