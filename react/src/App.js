import { useState } from 'react';

import { COLORS } from './colors';
import './App.css';

export default function() {
  const [selectedColorInd, setSelectedColorInd] = useState(null);
  const [color0, setColor0] = useState(226);
  const [color1, setColor1] = useState(220);
  const [color2, setColor2] = useState(214);
  const [color3, setColor3] = useState(33);

  // color squares that can be clicked to set the color
  const Square = ({ code }) => (
    <div className="square"
      style={{ background: COLORS[code] }}
      onMouseDown={() => {
        if (selectedColorInd === null) {
          return;
        }
        if (selectedColorInd === 0) setColor0(code);
        if (selectedColorInd === 1) setColor1(code);
        if (selectedColorInd === 2) setColor2(code);
        if (selectedColorInd === 3) setColor3(code);
      }}></div>
  );

  // build html for the 256 color squares
  const Squares256 = () => {
    let elements = [];

    // 2 rows of 8 for the first 16 basic colors
    for (let j = 0; j < 2; j++) {
      for (let i = 0; i < 8; i++) {
        const code = j*8 + i;
        elements.push(<Square code={code} key={code} />);
      }
      elements.push(<div className="clear-left" key={`clear-${j}`}></div>);
    }
    // 12 rows of length 12
    for (let j = 0; j < 18; j++) {
      for (let i = 0; i < 12; i++) {
        const code = 16 + j*12 + i;
        elements.push(<Square code={code} key={code} />);
      }
      elements.push(<div className="clear-left" key={`clear-${16 + j}`}></div>);
    }
    for (let j = 0; j < 2; j++) {
      for (let i = 0; i < 12; i++) {
        const code = 232 + j*12 + i;
        elements.push(<Square code={code} key={code} />);
      }
      elements.push(<div className="clear-left" key={`clear-${232 + j}`}></div>);
    }
    return <>{elements}</>;
  }

  return (
    <>
      <section>
        <h2>Bash prompt preview</h2>
        <code className="prompt-preview">
          <span style={{ color: COLORS[color0] }}
          >root</span><span style={{ color: COLORS[color1] }}
          >@</span><span style={{ color: COLORS[color2] }}
          >host</span>
          <span style={{ color: COLORS[color3] }}>~/path/to/dir</span>
          <span className="cmd-separator"
          >$</span>
        </code>
      </section>

      <section>
        <h2>Customize colors</h2>
        <div className="color-wrapper">
          <div className="color-theme">
            <div className="color-choice">
              {selectedColorInd === 0 && <div className="selection-indicator">*</div>}
              <div className="color-preview"
                   style={{ background: COLORS[color0] }}
                   onClick={() => {
                     console.log('set selected color index 0');
                     setSelectedColorInd(0);
                   }}></div>
              <input type="number" min="0" max="255"
                     value={color0} />
            </div>
            <div className="color-choice">
              {selectedColorInd === 1 && <div className="selection-indicator">*</div>}
              <div className="color-preview"
                   style={{ background: COLORS[color1] }}
                   onClick={() => {
                     console.log('set selected color index 1');
                     setSelectedColorInd(1);
                   }}></div>
              <input type="number" min="0" max="255"
                     value={color1} />
            </div>
            <div className="color-choice">
              {selectedColorInd === 2 && <div className="selection-indicator">*</div>}
              <div className="color-preview"
                   style={{ background: COLORS[color2] }}
                   onClick={() => {
                     console.log('set selected color index 2');
                     setSelectedColorInd(2);
                   }}></div>
              <input type="number" min="0" max="255"
                     value={color2} />
            </div>
            <div className="color-choice">
              {selectedColorInd === 3 && <div className="selection-indicator">*</div>}
              <div className="color-preview"
                   style={{ background: COLORS[color3] }}
                   onClick={() => {
                     console.log('set selected color index 3');
                     setSelectedColorInd(3);
                   }}></div>
              <input type="number" min="0" max="255"
                     value={color3} />
            </div>
          </div>

          <div className="colors-256"><Squares256 /></div>
        </div>
      </section>

      <section>
        <h2>Bash prompt PS1</h2>
        <code className="prompt-ps1">
          PS1="\[$(tput setaf {color0})\]\u\[$(tput setaf {color1})\]@\[$(tput setaf {color2})\]\h
            \[$(tput setaf <span>{color3}</span>)\]\w \[$(tput sgr0)\]$ "
        </code>
      </section>
    </>
  );
}
