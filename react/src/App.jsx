import { useState } from 'react';
import { COLORS } from './colors';

function sixSquares() {
  const squares = [[], [], [], [], [], []]
  let j = 0
  for (let i = 0; i < 216; i++) {
    if (i > 0 && i % 6 === 0) {
      j = (j + 1) % 6
    }
    squares[j].push(16 + i)
  }
  return squares
}

export default function() {
  const [selectedColorInd, setSelectedColorInd] = useState(0);
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
      }}
      onMouseOver={(event) => {
        if (event.buttons !== 1) {
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
    // 6x squares of 6x6 colors each
    elements = elements.concat(sixSquares().map((sixBySix) => {
      const elements = [];
      sixBySix.forEach((code) => elements.push(<Square code={code} key={code} />));
      return (<div className="six-by-six">{elements}</div>);
    }));
    elements.push(<div className="clear-left" key={`clear-6x6`}></div>);
    // 2 rows of 12 for the last 24 grayscale colors
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
      <div className="container">
        <section>
          <h2>Customize colors</h2>
          <div className="color-wrapper">
            <div className="color-theme">
              <div className="color-choice">
                {selectedColorInd === 0 && <div className="selection-indicator">*</div>}
                <div className="color-preview"
                     style={{ background: COLORS[color0] }}
                     onClick={() => {
                       setSelectedColorInd(0);
                     }}></div>
                <input type="number" min="0" max="255"
                       onMouseDown={() => setSelectedColorInd(0)}
                       value={color0} onChange={(event) => {
                         const code = event.target.value;
                         if (code >= 0 && code <= 255) {
                           setColor0(code);
                         }
                       }} />
              </div>
              <div className="color-choice">
                {selectedColorInd === 1 && <div className="selection-indicator">*</div>}
                <div className="color-preview"
                     style={{ background: COLORS[color1] }}
                     onClick={() => {
                       setSelectedColorInd(1);
                     }}></div>
                <input type="number" min="0" max="255"
                       onMouseDown={() => setSelectedColorInd(1)}
                       value={color1} onChange={(event) => {
                         const code = event.target.value;
                         if (code >= 0 && code <= 255) {
                           setColor1(code);
                         }
                       }} />
              </div>
              <div className="color-choice">
                {selectedColorInd === 2 && <div className="selection-indicator">*</div>}
                <div className="color-preview"
                     style={{ background: COLORS[color2] }}
                     onClick={() => {
                       setSelectedColorInd(2);
                     }}></div>
                <input type="number" min="0" max="255"
                       onMouseDown={() => setSelectedColorInd(2)}
                       value={color2} onChange={(event) => {
                         const code = event.target.value;
                         if (code >= 0 && code <= 255) {
                           setColor2(code);
                         }
                       }} />
              </div>
              <div className="color-choice">
                {selectedColorInd === 3 && <div className="selection-indicator">*</div>}
                <div className="color-preview"
                     style={{ background: COLORS[color3] }}
                     onClick={() => {
                       setSelectedColorInd(3);
                     }}></div>
                <input type="number" min="0" max="255"
                       onMouseDown={() => setSelectedColorInd(3)}
                       value={color3} onChange={(event) => {
                         const code = event.target.value;
                         if (code >= 0 && code <= 255) {
                           setColor3(code);
                         }
                       }} />
              </div>
            </div>

            <div className="colors-256"><Squares256 /></div>
          </div>
        </section>
      </div>

      <section className="bash-prompt-preview">
        <div className="container">
          <h2>Bash prompt preview</h2>
          <code className="prompt-preview">
            <span style={{ color: COLORS[color0] }} >root</span><span style={{ color: COLORS[color1] }}
            >@</span><span style={{ color: COLORS[color2] }}
            >host</span>
            &nbsp;
            <span style={{ color: COLORS[color3] }}>~/path/to/dir</span>
            &nbsp;
            <span className="cmd-separator"
            >$</span>
          </code>
          <code className="prompt-ps1">
            export PS1="\[$(tput setaf {color0})\]\u\[$(tput setaf {color1})\]@\[$(tput setaf {color2})\]\h
              \[$(tput setaf <span>{color3}</span>)\]\w \[$(tput sgr0)\]$ "
          </code>
        </div>
      </section>

      <section>
        <div className="container">
          <h2>Bash prompt PS1</h2>
          <p>Put the above in ~/.bashrc or ~/.bash_profile to customize your bash prompt.</p>
          <p>These are the variable substitutions used above.</p>
          <pre className="legend">{`
\\u    username       root
\\h    hostname       host
\\w    relative dir   ~/path/to/dir
          `.trim()}</pre>
        </div>
      </section>
    </>
  );
}
