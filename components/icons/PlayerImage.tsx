import Svg, { Path, G, Ellipse } from "react-native-svg";
import { styled } from "styled-components/native";

export function PlayerImages() {
  return (
    <ViewStyled>
      <Svg viewBox="0 0 500 500">
        <Path id="BACKGROUND" d="M0 0h500v500H0z" fill="#d4f4ef" />
        <G id="OBJECT">
          <Path
            d="M425.9 423.7s19.89-60.06 1.71-85.03-32.6-35.99-23.49-56.13c9.11-20.14 5.05-53.05-19.02-62.94-24.08-9.89-12.9-47.1-39.56-68.47-26.66-21.37-48.39-11.7-61.17-38.06-11.22-23.15-34.51-44.97-57.81-22.54-5.11 4.92-8.54 11.33-10.32 18.27-1.86 7.26-8.37 19.82-30.35 32.38-33.82 19.33-20.41 31.79-33.99 54.11-13.58 22.33-57.13 11.09-73.47 53.92-16.34 42.83 18.92 57.21 16.06 82.81-2.86 25.6-19.8 39.57-9.48 90.97"
            fill="none"
            strokeMiterlimit={10}
          />
          <Path
            d="M435.51 424.35s23.27-66.45 3.65-91.68c-19.62-25.24-35.17-36.37-25.34-56.72s5.45-53.61-20.52-63.6c-25.98-9.99-13.92-47.6-42.68-69.19-28.76-21.59-48.01-19.53-61.8-46.16-12.11-23.39-41.43-37.74-66.58-15.07-5.51 4.97-9.21 11.45-11.13 18.46-2.01 7.33-9.03 20.03-32.75 32.72-36.49 19.53-22.02 32.12-36.68 54.68-14.66 22.56-55.17 14.82-73.29 52.61-20.2 42.14 11.18 59.08 8.09 84.95-3.09 25.87-10.84 46.41.29 98.35"
            fill="none"
            strokeMiterlimit={10}
          />
          <Path
            d="M229.74 103.92c-4.99 4.92-8.34 11.33-10.08 18.27-1.82 7.26-8.18 19.82-29.65 32.38-33.03 19.33-19.93 31.79-33.2 54.11-13.27 22.33-51.06 5.2-67.02 48.03-15.96 42.83 20.83 62.16 18.04 87.77s-24.76 27.11-14.68 78.51h332.97s17.76-45.95 0-70.93c-17.76-24.97-31.84-36-22.94-56.13 8.9-20.14 4.94-53.05-18.58-62.94s-12.6-47.1-38.64-68.47c-26.04-21.37-47.26-11.7-59.75-38.06-10.96-23.15-33.71-44.97-56.47-22.54Z"
            fill="#82bdb4"
          />
          <Path
            d="M231.05 115.96c-4.77 4.7-7.98 10.84-9.64 17.47-1.74 6.94-7.82 18.96-28.36 30.98-31.59 18.49-19.07 30.41-31.76 51.76-12.69 21.35-48.84 4.97-64.11 45.94-15.26 40.97 19.93 59.46 17.26 83.95-2.67 24.49-23.68 25.93-14.04 75.09h318.48s16.99-43.95 0-67.84-30.45-34.43-21.94-53.69c8.51-19.26 4.72-50.75-17.77-60.2s-12.05-45.05-36.95-65.49c-24.9-20.44-45.21-11.2-57.15-36.41-10.49-22.14-32.24-43.02-54.01-21.56Z"
            fill="none"
            strokeMiterlimit={10}
            stroke="#fff"
          />
          <Path
            d="M353.94 237.34c-1.96-1.14-4.54-.32-4.96-.95s2.11-2.61 2.93-4.69c.82-2.07-.1-7.44-3.44-4.91-3.34 2.53-3.49 6.84-3.49 6.84s-.05.24-.1.63c-1.13-2.67-.52-6.34-.52-6.39a.38.38 0 0 0-.3-.43c-.21-.03-.39.1-.42.3-.03.16-.51 3.1.21 5.76-1.76-2.02-4.31-3.25-4.45-3.32-.18-.09-.4 0-.49.18-.09.18 0 .4.18.49.04.02 3.68 1.77 5.1 4.4-.44-.32-.75-.48-.75-.48s-3.36-2.7-7.45-1.82c-4.09.88-.63 5.08 1.47 5.82 2.1.74 5.25.11 5.46.84.21.74-2.1 2.15-2.52 4.38-.42 2.23 2.2 4.55 3.67 4.65 1.33.09 3.35-4.38 3.32-7.72 2.58 2.03 6.91 3.26 7.67 2.24.88-1.18.84-4.68-1.12-5.82ZM136.6 271.95c-.37-1.83-2.28-2.97-2.11-3.58.16-.61 2.76-.12 4.48-.75s4.52-4.11 1.15-4.79c-3.37-.68-6.1 1.57-6.1 1.57s-.18.1-.44.28c1.02-2.15 3.61-3.78 3.64-3.79.14-.09.19-.27.1-.42a.288.288 0 0 0-.41-.1c-.11.07-2.19 1.37-3.43 3.26.29-2.18-.35-4.43-.38-4.55a.307.307 0 0 0-.37-.21c-.16.05-.25.21-.21.37 0 .03.91 3.23.07 5.54-.04-.44-.11-.72-.11-.72s-.17-3.54-2.94-5.58-3.47 2.38-2.78 4.07c.69 1.69 2.79 3.29 2.45 3.82-.34.53-2.46-.12-4.07.83s-1.6 3.83-.86 4.8c.67.87 4.51-.32 6.56-2.16.15 2.69 1.75 6.03 2.8 5.94 1.21-.1 3.34-2.03 2.97-3.86ZM249.03 143.44c-.37-1.83-2.28-2.97-2.11-3.58.16-.61 2.76-.12 4.48-.75 1.72-.63 4.52-4.11 1.15-4.79-3.37-.68-6.1 1.57-6.1 1.57s-.18.1-.44.28c1.02-2.15 3.61-3.78 3.64-3.79.14-.09.19-.27.1-.42a.288.288 0 0 0-.41-.1c-.11.07-2.19 1.37-3.43 3.26.29-2.18-.35-4.43-.38-4.55a.307.307 0 0 0-.37-.21c-.16.05-.25.21-.21.37 0 .03.91 3.23.07 5.54-.04-.44-.11-.72-.11-.72s-.17-3.54-2.94-5.58-3.47 2.38-2.78 4.07c.69 1.69 2.79 3.29 2.45 3.82-.34.53-2.46-.12-4.07.83-1.6.96-1.6 3.83-.86 4.8.67.87 4.51-.32 6.56-2.16.15 2.69 1.75 6.03 2.8 5.94 1.21-.1 3.34-2.03 2.97-3.86Z"
            fill="#33f1d8"
          />
          <Path
            d="M197.99 193.09c-.35.48-1.03.58-1.5.22-.48-.35-.58-1.03-.22-1.51.35-.48 1.03-.58 1.5-.22.48.35.58 1.03.22 1.51ZM200.76 188.5c-.35.48-1.03.58-1.5.22-.48-.35-.58-1.03-.22-1.51s1.03-.58 1.5-.22.58 1.03.22 1.51ZM203.99 195.73c-.35.48-1.03.58-1.5.22-.48-.35-.58-1.03-.22-1.51.35-.48 1.03-.58 1.5-.22.48.35.58 1.03.22 1.51ZM342.71 205.7c-.35.48-1.03.58-1.5.22s-.58-1.03-.22-1.51 1.03-.58 1.5-.22c.48.35.58 1.03.22 1.51ZM345.49 201.11c-.35.48-1.03.58-1.5.22-.48-.35-.58-1.03-.22-1.51.35-.48 1.03-.58 1.5-.22.48.35.58 1.03.22 1.51ZM348.71 208.34c-.35.48-1.03.58-1.5.22-.48-.35-.58-1.03-.22-1.51s1.03-.58 1.5-.22c.48.35.58 1.03.22 1.51ZM291.67 162.06c-.35.48-1.03.58-1.5.22-.48-.35-.58-1.03-.22-1.51.35-.48 1.03-.58 1.5-.22.48.35.58 1.03.22 1.51ZM294.44 157.47c-.35.48-1.03.58-1.5.22-.48-.35-.58-1.03-.22-1.51s1.03-.58 1.5-.22c.48.35.58 1.03.22 1.51ZM297.67 164.7c-.35.48-1.03.58-1.5.22-.48-.35-.58-1.03-.22-1.51s1.03-.58 1.5-.22c.48.35.58 1.03.22 1.51ZM305.57 224.68c-.46-.38-.52-1.06-.14-1.51.38-.46 1.06-.52 1.51-.14.46.38.52 1.06.14 1.51-.38.46-1.06.52-1.51.14ZM310 227.69c-.46-.38-.52-1.06-.14-1.51.38-.46 1.06-.52 1.51-.14s.52 1.06.14 1.51c-.38.46-1.06.52-1.51.14ZM302.62 230.54c-.46-.38-.52-1.06-.14-1.51.38-.46 1.06-.52 1.51-.14.46.38.52 1.06.14 1.51-.38.46-1.06.52-1.51.14ZM150.76 247.28c0 .76-.61 1.37-1.37 1.37s-1.37-.61-1.37-1.37.61-1.37 1.37-1.37 1.37.61 1.37 1.37ZM333.95 176.76c0 .94-.76 1.7-1.7 1.7s-1.7-.76-1.7-1.7.76-1.7 1.7-1.7 1.7.76 1.7 1.7ZM216.63 229.71c0 .94-.76 1.7-1.7 1.7s-1.7-.76-1.7-1.7.76-1.7 1.7-1.7 1.7.76 1.7 1.7ZM249.08 118.77c0 .57-.46 1.04-1.04 1.04s-1.04-.46-1.04-1.04.46-1.04 1.04-1.04 1.04.46 1.04 1.04ZM328.32 270.98a1.54 1.54 0 1 1-3.081-.001 1.54 1.54 0 0 1 3.081.001ZM227.33 153.79a1.54 1.54 0 1 1-3.081-.001 1.54 1.54 0 0 1 3.081.001Z"
            fill="#fff"
          />
          <Path
            d="M57.58 411.82h411.07c3.03 0 3.86 4.17 1.06 5.32-27.49 11.3-100.41 36.88-202.6 39.81-95.03 2.72-174.42-22.01-211.22-35.97-4.92-1.87-3.58-9.15 1.68-9.15Z"
            fill="#82bdb4"
          />
          <Path
            d="M194.6 325.72c-.91-16.24-17.93-19.5-19.63-23.54-1.7-4.04-4.45-12.31-16.7-16.2-12.25-3.9-19.88 3.31-26.74-1.11-6.87-4.41-12.98-8.06-21.16-2.51-8.18 5.55-13.98 3.51-25.8 2.17-11.81-1.34-21.2 10.06-21.2 10.06-4.62 4.24-.16 9.61 10.73 12.24 15.38 3.72 10.99 13.71 19.19 17.76 8.2 4.05 17.95.04 24.12 4.94 6.18 4.9 5.71 13.79 13.36 15.87 7.65 2.09 16.67-2.99 21.05.01 4.38 3.01 6.76 11.91 11.98 14.99 5.22 3.08 20 3.84 20 3.84l3.57-.86s8.13-21.41 7.22-37.65Z"
            fill="#618580"
          />
          <Path
            d="M184.95 358.26s-3.86-33.15-26.65-48.24c-22.8-15.1-60.18-15.46-71.51-16.08l-11.33-.63s45.75-2.91 68.43 6.32c31.15 12.67 40.03 33.37 41.06 58.64Z"
            fill="#fffbf4"
          />
          <Path
            d="M168.23 323.36s-19.06-17.03-21.93-31.2 5.55-19.47-.12-26.64c-5.67-7.18-3.14-20.05 2.97-23.32 6.11-3.27 8.61-10.4 9.2-20.26s8.11-13.53 10.44-10.79c6.41 7.53 3.22 15.23 13.03 20.02 9.81 4.79 13.28 14.71 10.82 22.84-2.46 8.12 8.35 10.72 15.51 23.12s1.97 22.77-1.06 30.55c-3.04 7.78 5.38 17.15 2.32 26.12-3.06 8.97-24.15 23.73-24.15 23.73s-10.2-3.77-17.03-34.15Z"
            fill="#8faca8"
          />
          <Path
            d="M168.04 224.88s6.29 24.27 13.87 55.56c7.58 31.29 8.86 69.88 8.86 69.88s4.39-28.01-1.3-54.29c-5.69-26.28-20.95-67.1-21.43-71.15Z"
            fill="#fffbf4"
          />
          <Path
            d="M170.79 336.03c-2.6-13.33 10.51-19.47 11.06-23.09.55-3.62 1.07-10.88 10.19-16.55s16.77-1.41 21.43-6.39c4.65-4.98 8.85-9.19 16.62-6.38 7.77 2.81 12.04-.03 21.33-3.54 9.29-3.51 19.23 3.79 19.23 3.79 4.61 2.48 2.11 7.74-6.17 12.11-11.69 6.17-6.08 13.36-11.89 18.32-5.81 4.96-14.52 3.72-18.52 8.95-4 5.24-1.79 12.34-7.56 15.6-5.76 3.26-14.11 1-17.04 4.33-2.93 3.33-3.03 11.03-6.62 14.6-3.6 3.56-15.41 7.22-15.41 7.22l-3.07.03s-10.98-15.66-13.58-29Z"
            fill="#618580"
          />
          <Path
            d="M185.28 360.4s-3.69-27.63 11.67-44.54 45.55-24.88 54.6-27.71l9.05-2.83s-37.64 7.04-54.11 19.17c-22.62 16.66-25.56 35.24-21.2 55.91Z"
            fill="#fffbf4"
          />
          <Path
            d="M176.27 360.35s-25.11-6.88-38.3-.84c-13.19 6.03-15.62 14.32-15.62 14.32s5.65 1.98 16.39.47c10.74-1.5 12.35-7.87 19.84-4.84s9.95 5.94 16.25 4.13c6.3-1.81 9.54-8.56 9.54-8.56l-8.1-4.68Z"
            fill="#9a9b82"
          />
          <Path
            d="M188.63 361.25s6.75-7.78 16.55-7.27c9.8.52 11.52 3.93 16.31 4.15 4.8.22 7.45-1.3 14 .94 6.48 2.21 10.32 5.25 10.32 5.25s-6.66 9.64-17.03 7.14c-10.37-2.5-18.21-4.11-21.61-.63-3.39 3.47-24.7-2.86-24.7-2.86l6.15-6.73Z"
            fill="#9a9b82"
          />
          <Path
            d="M334 330.34s14.12 9.06 43.15 14.12c29.04 5.06 41.29-3.2 42.89-7.06 1.6-3.86-3.2-5.99-22.11-9.46-18.91-3.46-23.97-7.73-14.65-8.79 9.32-1.07 22.38 7.19 33.56 7.19s18.91-5.95 19.18-10.03c.27-4.08-33.56-5.15-37.83-11.01-4.26-5.86 21.93.27 33.21 1.86 11.28 1.6 15.81-7.19 15.01-10.12-.8-2.93-28.24-3.88-30.9-7.93s11.45-2.61 23.71 0 18.38-6.45 16.78-8.58c-1.6-2.13-24.24-3.73-26.64-7.73s12.25-2.93 19.71-1.33c7.46 1.6 15.45-5.59 12.79-7.99-2.66-2.4-19.45-3.2-19.98-6.66-.53-3.46 22.36-1.6 20.5-6.66-1.86-5.06-8.25-9.8-18.1-9.96s-18.91 10.23-24.24 7.03c-5.33-3.2 13.05-10.92 8.26-13.85s-15.45-1.33-19.18 3.73c-3.73 5.06-4 13.59-7.99 13.32-4-.27 2.93-12.25-.53-14.92-3.46-2.66-12.52 2.93-14.38 8.26-1.86 5.33.27 15.98-3.46 16.52-3.73.53.9-17.05-2.35-18.65-3.25-1.6-13.63 8.79-13.9 15.18s3.2 16.46-2.4 18.09c-5.59 1.62-4.53-18.35-8.79-20.22-4.26-1.86-12.79 10.35-11.45 20.36 1.33 10.01 4.26 18.19.27 18.23-4 .03-6.93-12.75-10.12-14.88-3.2-2.13-6.08 3.2-6.9 16.78-.82 13.59 5.58 31.83 6.9 35.16Z"
            fill="#7a9a95"
          />
          <Path
            d="M329.44 352.22s14.96-38.38 32.37-59.65c17.41-21.27 51-34.09 67.18-35.01 0 0-38.29 7.12-62.91 37.56-24.62 30.44-33.9 72.07-33.9 72.07l-6.72-1.32 3.97-13.64Z"
            fill="#fffbf4"
          />
          <Path
            d="M58.33 408.59s2.14-7.96 12.62-11.65c10.49-3.69 12.04 6.22 18.65 5.83 6.6-.39 9.67 12.43 9.67 12.43H56l2.33-6.6Z"
            fill="#849a97"
          />
          <Path
            d="M83.69 414.74c-.61-3.02-1.54-6.42-2.7-10.06 1.9-3.69 7.28-15.4 7.15-29.58-.16-17.21-12.08-35.25-12.08-35.25s-3.13 29.44 2.06 56.52c-3.59-9.69-8.2-20.2-12.46-29.39 1.81-3.8 5.08-11.98 5.05-21.68-.03-13.41-9.24-27.54-9.24-27.54s-2.47 21.85 1.04 42.55a658.44 658.44 0 0 0-7.5-15.2c-.29-4.54-1.41-12.5-5.54-20.31-6.27-11.86-20.98-20.09-20.98-20.09s9.27 23.83 23.78 41.03c1.31 2.58 3.52 6.97 6.16 12.43-2.02-2.96-4.59-6.1-7.83-8.96-10.06-8.87-26.74-11.35-26.74-11.35s18.96 21.04 39.9 31.58c2.18 4.72 4.42 9.74 6.56 14.8-2.42-3.29-5.39-6.69-8.97-9.81-12.98-11.29-34.4-14.33-34.4-14.33s23.19 25.41 49.27 39.07c2.16 5.96 3.88 11.52 4.8 16.11l2.66-.54Z"
            fill="#618580"
          />
          <Path
            d="M425.91 406.61h13.17s5.96-10.98 20.39-18.51c14.43-7.53 16-16.61 16.62-20.85.63-4.24-5.65-2.05-15.06 3.6s-11.92 19.01-16 18.76-1.57-15.62 7.21-20.64c8.78-5.02 15.68-17.25 17.88-25.09s-15.68-2.2-24.15 7.21c-8.47 9.41-7.21 32.39-13.49 35.33-6.27 2.94 4.7-16.35-8-24.22-5.09-3.16-6.43 5.87-4.86 17.3 1.57 11.43 9.41 16.76 6.27 27.11Z"
            fill="#73807e"
          />
          <Path
            d="M403.73 413.44s23.13 2.52 41 2.52 24.73-1.6 24.73-1.6-3.89-7.33-15.34-10.08-12.6 4.12-17.63 0c-5.04-4.12-14.2-7.1-22.22-4.81s-10.54 13.97-10.54 13.97Z"
            fill="#adc7c3"
          />
          <Ellipse
            cx={256.44}
            cy={423.16}
            rx={138.31}
            ry={11.33}
            fill="#9be4da"
          />
          <Path
            d="m385.13 360.62-10.51 11.08s0 .01-.01.03l-1.98 2.07-.02.01-.12.13s-.03-.02-.04-.03c-22.68-14.03-44.56-34.93-50.07-40.32-2.83-2.55-5.49-5.6-7.55-9.24-4.84-8.57-11.38-24.58-15.94-36.3l-.6 2.55-8.21 34.79c3.51 5.39 8.32 13.65 12.44 23.83 2.09 5.17 4 10.85 5.47 16.88l-47.19 27.76v.7l-.63-.34-.63.36v-.7l-48.24-25.93c1.56-7.64 3.83-14.72 6.29-20.97.04-.1.08-.21.12-.31 3.36-8.43 7.08-15.34 9.92-20.1l-9.69-35-1.31-4.71-.7-2.54c-4.61 11.45-13.11 31.86-19.04 41.89-2.13 3.6-4.83 6.6-7.73 9.09-5.6 5.28-27.92 25.79-50.86 39.4l-2.1-2.29-10.29-11.27 52.3-49.17 17.67-50.53c10.18-21.84 17.81-22.14 17.81-22.14 1.41-1.17 3.01-2.17 4.81-2.88.58-.23 1.17-.46 1.78-.71h.01c3.45-1.43 7.31-3.24 11.18-5.51 4.56-2.69 9.12-6.04 13.03-10.18.57-3.89.78-9.42.86-13.01.04-2.14.04-3.6.04-3.6l11.12 1.14 11.07-1.57s.1 2.89.36 6.51c.25 3.26.61 7.12 1.16 10.06 1.81 1.78 3.75 3.4 5.76 4.85 6.97 5.13 14.74 8.42 20.85 10.54 1.58.55 3.02 1.32 4.33 2.24 1.59.4 8.49 3.16 17.02 22.43l16.71 50.85 51.36 50.16Z"
            fill="#416270"
          />
          <Path
            d="M274.88 224.41c-1.79 2.01-7.27 6.32-22.79 9.89-20.99 4.82-31.8 1.42-31.8 1.42h.01c3.45-1.43 7.31-3.24 11.18-5.51 4.56-2.69 9.12-6.04 13.03-10.18.57-3.89.78-9.42.86-13.01l22.59 2.48c.25 3.26.61 7.12 1.16 10.06 1.81 1.78 3.75 3.4 5.76 4.85ZM286.7 299.46c-7.37 3.26-20.24-3.06-31.17.47-10.93 3.53-16.35 13.65-18.47 26.59-2.12 12.93 3.29 31.74 3.29 31.74s-9.77 2.71-22.65-11.57c3.36-8.43 7.08-15.34 9.92-20.1l-11-39.71-.7-2.54s-2.62-13.58 3.96-23.93c0 0-2.05 11.07 1.8 21.18 3.84 10.11 12.91 10.11 22.37 9.88 9.46-.23 9.33-3.48 20.02-1.17 17.84 3.84 24.81 2.12 28.97-3.74 2.74-3.86 1 9.65-6.36 12.92Z"
            fill="#2e424a"
          />
          <Path
            d="M235.94 191.4s-2.53-5.17-5.87-4.96c-3.33.2-4.45 7.32.25 12.86 4.7 5.54 8.96 3.17 8.96 3.17l-3.34-11.06ZM277.75 190.6s2.33-5.26 5.67-5.19c3.34.07 4.73 7.14.25 12.86s-8.83 3.51-8.83 3.51l2.91-11.18Z"
            fill="#ea8d78"
          />
          <Path
            d="M279.25 179.93c.4 20.65-11.91 39.1-21.71 39.29-11.89.23-23.39-19.16-23.76-38.42-.27-14.24 8.27-25.96 22.51-26.23 14.24-.27 22.67 11.12 22.95 25.36Z"
            fill="#ffa488"
          />
          <Path
            d="M238.89 181.84s3.34-.95 6.96-1.22c4.54-.33 6.21.14 6.21.14s-.87-2.54-4.69-2.47c-3.82.07-8.48 3.55-8.48 3.55Z"
            fill="#2f2a00"
          />
          <Path
            d="M251.83 187.41s-2.68-3.6-6.12-3.64c-3.44-.04-6.5 3.88-6.5 3.88s.94 1.03 5.83 1.24c5.01.22 6.79-1.49 6.79-1.49Z"
            fill="#ea8d78"
          />
          <Path
            d="M245.61 188.61c-3.24.03-5.88-.78-6.33-.93l-.05-.02h-.03.01c-.57.37-1.74.47-1.74.47 1.21.38 2.16.25 2.59.16.94.64 2.59 1.47 5.56 1.44 4.26-.05 6.19-2.31 6.19-2.31s-2.65 1.16-6.21 1.2ZM273.98 181.16s-3.38-.82-7-.95c-4.54-.16-6.2.38-6.2.38s.77-2.57 4.59-2.65c3.82-.07 8.61 3.22 8.61 3.22Z"
            fill="#2f2a00"
          />
          <Path
            d="M261.26 187.23s2.54-3.7 5.98-3.87c3.44-.17 6.64 3.63 6.64 3.63s-.9 1.07-5.78 1.47c-5 .41-6.84-1.22-6.84-1.22Z"
            fill="#ea8d78"
          />
          <Path
            d="M275.63 187.4s-1.17-.05-1.76-.4h.01-.03l-.05.03c-.44.16-3.05 1.08-6.29 1.17-3.56.1-6.25-.96-6.25-.96s2.01 2.19 6.28 2.07c2.97-.08 4.59-.98 5.5-1.65.43.08 1.39.17 2.58-.26Z"
            fill="#2f2a00"
          />
          <Path
            d="M253.59 199.79s1.83 1.11 3.33 1.19c1.5.08 3.28-1.31 3.28-1.31s-1.39-.15-3.06-.18c-1.67-.04-3.54.31-3.54.31Z"
            fill="#ea8d78"
          />
          <Path
            d="M252.31 206.62s.78 1.11 3.66 1.81 4.97-.49 6.7-1.59c0 0-1.56 2.98-4.81 3.38-3.25.4-5.43-3.16-5.55-3.6Z"
            fill="#ea8d78"
          />
          <Path
            d="M265.44 166.81s-4.95-2.62-11.62-2.28c-6.67.34-11.85 5.55-13.78 9.24-1.93 3.69-3.89 4.74-3.89 4.74s.61 8.94-1.1 12.75c0 0-2.31-3.86-4.97-4.82 0 0-2.28-8.16-.88-16.85 1.4-8.68 10.61-18.04 22.99-19.32 12.39-1.28 18.66 4.75 18.66 4.75s8.23 4.64 10.67 12.52c2.45 7.88.35 18.11.35 18.11s-2.12 1.07-3.48 4.77c0 0-3.96-5.98-2.94-12.68 0 0-1.62-10.65-10-10.94Z"
            fill="#743f3d"
          />
          <Path
            d="M272.81 159.47c-2.48.79-18.51-7.89-18.51-7.89s-.08-1.4.37-3.22c.63-2.5 2.26-5.8 6.53-7.34.73-.26 1.46-.45 2.16-.58 6.42-1.09 11.75 3.31 13.28 7.79 1.7 4.98-1.33 10.45-3.82 11.23Z"
            fill="#743f3d"
          />
          <Path
            d="M252.06 180.76s1.55 2.91 2.43 7.33c.87 4.42.15 7.59.15 7.59s-.86-12.5-7.22-15.15c0 0 3.49-.08 4.64.23Z"
            fill="#ea8d78"
          />
          <Path
            d="M265.44 166.81s-7.91-2.65-14.65.28-6.58 7.2-11.25 7.57l-.6-1.12s1.25.24 4.1-2.01 8.86-10.33 22.41-4.72Z"
            fill="#743f3d"
          />
          <Path
            d="M233.26 402.99s-6.47.83-8.73 1.26c0 0-9.04-1.3-12.84-1.13-3.8.16-5.87 4.68-8.02 9.59-2.14 4.91-10.46 10.13-13.39 13.19-2.94 3.05-3.02 7.53-2.95 8.48.06.95-1.85 3.65-.84 5.86 1.01 2.22 2.1 1.48 3.03 1.22.94-.25 1.59-1.82 1.59-1.82s2.39.12 3.41-.32c1.02-.45.14-.68 2.42-.83 2.27-.15 3.49-.43 4.88-1 1.39-.57 10.91-10.45 16.07-13.08 5.15-2.63 13.1-2.02 13.1-2.02l2.26-19.4Z"
            fill="#ffa488"
          />
          <Path
            d="M379.38 409.71c-15.37 8.6-40.83 11.98-70.29 13.77-3.59.22-7.23.42-10.93.59l.5 12.78s-2.24-.02-6.2-.08c-12.15-.14-40.49-.5-70.03-1.1-47.78-.94-85.78-12.8-96.76-23.37-5.29-5.1-8.43-13.24-7.31-20.84.89-6.02 4.46-11.69 11.74-15.28 1.73-.86 4.76-1.94 8.86-3.11 12.84-3.68 36.08-8.12 61.72-8.37.41-.03.79-.05 1.16-.09 3.38-5.07 15.87-17.94 15.87-17.94s8.78 7.39 20.79 11.78c6.35 2.32 13.6 3.81 20.94 2.92 21.21-2.56 42.52-14.38 42.52-14.38 4.31 4.29 8.44 14.37 8.44 14.37 21.23.2 56.39 6.64 63.96 10.43.05.03.1.07.14.09 5.14 1.38 9.42 4.37 12.35 8.17 6.8 8.79 6.35 21.94-7.47 29.65Z"
            fill="#e9835b"
          />
          <Path
            d="M125.92 361.15s-5.34-.82-7.49-.77c-2.14.04-6.46 1.41-8.91 1.82-2.44.41-3.66.5-3.6.87s.88 1.27 3.58 1.65c2.7.38 5.01-.34 6.45-.37 1.44-.03 1.76.82 1.76.82s-1.46 3.89-6.16 4.71c-4.7.83-6.55.13-6.87-.54-.32-.67 1.68-5.24 1.15-6.94-.52-1.7-1.32-1.57-2.31 1.15-.99 2.71-2.72 5.32-2.68 7.09s3.06 3.31 3.06 3.31-5.83-.68-7.58.94c-1.74 1.63 1.75 1.68 4.51 1.93s5.35 1.06 7 .85c0 0-7.41-.1-8.86 1.09-1.45 1.19 1.51 1.99 4.32 1.94 2.82-.05 6.62.55 7.24.53 0 0-6.6.8-6.38 2.45.22 1.65 1.42.52 5.04.88s6.62.3 10.03-.74c3.41-1.05 16.96-11.39 16.96-11.39l-10.29-11.27Z"
            fill="#ffa488"
          />
          <Path
            d="M354.22 377.32c-28.24 4.01-107.28 24.24-107.28 24.24s-41.64-19.06-69.56-23.53c-26.51-4.24-41.98-2.13-38.43-4.96 12.84-3.68 36.08-8.12 61.72-8.37.41-.03.79-.05 1.16-.09 3.38-5.07 15.87-17.94 15.87-17.94s8.78 7.39 20.79 11.78c.97 4.65 17.62 27.57 29.62 23.8 12-3.75 27.75-8.94 35.28-6.35 7.53 2.59 22.82 1.17 33.36-1.2 10.53-2.37 17.45 2.6 17.45 2.6Z"
            fill="#cc6a4c"
          />
          <Path
            d="M374.63 371.7s0 .01-.01.03c-.1.21-.6 1.23-1.98 2.07-.01.01-.02.01-.02.01-.05.03-.11.07-.16.1-22.68-14.03-44.56-34.93-50.07-40.32-2.83-2.55-5.49-5.6-7.55-9.24-4.84-8.57-11.38-24.58-15.94-36.3l2.62-21.84s9.8 42.25 20.16 55.87c10.35 13.61 52.96 49.62 52.96 49.62ZM217.94 291.58l-1.31-4.71-.7-2.54c-4.61 11.45-13.11 31.86-19.04 41.89-2.13 3.6-4.83 6.6-7.73 9.09-5.6 5.28-27.92 25.79-50.86 39.4l-2.1-2.29s45.2-38.6 58.47-53.78c13.26-15.18 21.42-48.29 21.42-48.29l1.84 21.23Z"
            fill="#2e424a"
          />
          <Path
            d="M379.38 409.71c-15.37 8.6-40.83 11.98-70.29 13.77-12.32-2.02-21.11-6.82-21.11-6.82v-1.46l-41-13.62c.35.09 7.09-1.81 7.09-1.81 18.67 4.16 64.68 16.7 88.63 11.21 30.82-7.06 31.99-20.02 37.63-26.48 2.21-2.52 4.52-3.81 6.52-4.44 6.8 8.79 6.35 21.94-7.47 29.65Z"
            fill="#cc6a4c"
          />
          <Path
            d="M287.98 416.65s6.45.95 8.7 1.43c0 0 9.06-1.12 12.86-.88 3.79.24 5.78 4.79 7.83 9.74s10.26 10.33 13.13 13.45c2.88 3.11 2.87 7.59 2.78 8.54s1.78 3.68.73 5.88-2.13 1.44-3.06 1.16c-.93-.27-1.56-1.85-1.56-1.85s-2.39.08-3.4-.39-.13-.68-2.4-.88c-2.27-.2-3.49-.49-4.86-1.09s-10.71-10.66-15.81-13.39c-5.1-2.73-13.06-2.28-13.06-2.28l-1.88-19.44ZM385.14 360.63s5.36-.71 7.5-.63c2.14.08 6.44 1.53 8.87 1.99 2.43.46 3.65.57 3.58.93-.08.36-.91 1.25-3.61 1.58-2.71.33-5.01-.44-6.44-.49-1.44-.06-1.78.79-1.78.79s1.38 3.91 6.07 4.83c4.68.91 6.55.25 6.88-.41.33-.66-1.58-5.27-1.02-6.96.56-1.69 1.35-1.54 2.28 1.19s2.61 5.37 2.54 7.14c-.07 1.77-3.13 3.25-3.13 3.25s5.84-.57 7.56 1.09c1.71 1.66-1.78 1.65-4.54 1.85-2.77.2-5.37.96-7.01.71 0 0 7.41.04 8.84 1.26 1.42 1.22-1.55 1.96-4.36 1.86-2.81-.11-6.63.42-7.25.4 0 0 6.58.93 6.34 2.57-.25 1.64-1.43.5-5.05.79-3.63.29-6.62.18-10.01-.93s-16.74-11.71-16.74-11.71l10.5-11.08Z"
            fill="#ffa488"
          />
          <Path
            d="M292.46 436.77c-12.15-.14-40.49-.5-70.03-1.1-47.78-.94-85.78-12.8-96.76-23.37-5.29-5.1-8.43-13.24-7.31-20.84 4.04 3.14 11.85 8.61 26.73 16.05 24.46 12.24 69.62 18.83 105.39 22.27 35.76 3.45 38.97 1.93 38.97 1.93l3.01 5.05Z"
            fill="#cc6a4c"
          />
          <Path
            d="M267.38 153.91c-4.83-2.36-12.47-3.8-12.47-3.8-.13-.61-.21-1.19-.25-1.74.63-2.5 2.26-5.8 6.53-7.34.73-.26 1.46-.45 2.16-.58-.81.83-1.64 2.37-.91 4.93 1.25 4.36 9.76 10.88 4.94 8.53ZM262.89 162.89s-8.9-3.37-17.41 0-9.7 12.46-11.69 13.36c0 0 1.72-12.2 10.87-14.85 9.14-2.66 18.23 1.5 18.23 1.5ZM269.62 157.28l-3.37 7.59s4.6-2.09 3.37-7.59Z"
            fill="#603030"
          />
        </G>
      </Svg>
    </ViewStyled>
  );
}

const ViewStyled = styled.View`
  flex: auto;
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 20px;
  margin: 25px 0 30px;
`;
