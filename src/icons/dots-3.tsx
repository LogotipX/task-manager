import React from "react";

type Props = {
  className?: string;
};

export default function SvgDots(props: Props) {
  return (
    <>
      {/* <?xml version="1.0" encoding="UTF-8" standalone="no"?> */}
      <svg
        className={props.className}
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        enableBackground="new 0 0 92 92"
        viewBox="0 0 64 14"
        height="14"
        width="64"
        y="0px"
        x="0px"
        id="Layer_1"
        version="1.1"
      >
        <path
          id="XMLID_30_"
          d="M 7,14 C 5.2,14 3.3,13.2 2,11.9 0.7,10.6 0,8.8 0,7 0,5.2 0.8,3.4 2,2 3.3,0.7 5.1,0 7,0 8.8,0 10.6,0.8 11.9,2 13.2,3.3 14,5.1 14,7 14,8.8 13.2,10.6 11.9,11.9 10.6,13.2 8.8,14 7,14 Z M 36.9,11.9 C 38.2,10.6 39,8.8 39,7 39,5.2 38.2,3.4 36.9,2 35.6,0.7 33.8,0 32,0 c -1.8,0 -3.7,0.8 -5,2 -1.3,1.3 -2,3.1 -2,5 0,1.8 0.8,3.6 2,4.9 1.3,1.3 3.1,2.1 5,2.1 1.8,0 3.6,-0.8 4.9,-2.1 z m 25,0 C 63.2,10.6 64,8.8 64,7 64,5.2 63.2,3.4 61.9,2 60.6,0.7 58.8,0 57,0 c -1.8,0 -3.7,0.8 -5,2 -1.3,1.3 -2,3.1 -2,5 0,1.8 0.8,3.6 2,4.9 1.3,1.3 3.1,2.1 5,2.1 1.8,0 3.6,-0.8 4.9,-2.1 z"
        />
      </svg>
    </>
  );
}
