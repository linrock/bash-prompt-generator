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
  const [colors, setColors] = useState([226, 220, 214, 33]);

  function setColorCodeAt(index, code) {
    const colorsCopy = colors.slice();
    colorsCopy[index] = code;
    setColors(colorsCopy);
  }

  // color squares that can be clicked to set the color
  const Square = ({ code }) => (
    <div className="square"
      style={{ background: COLORS[code] }}
      onMouseDown={() => {
        if (selectedColorInd !== null) {
          setColorCodeAt(selectedColorInd, code);
        }
      }}
      onMouseOver={(event) => {
        // if the left mouse button is held down while hovering over the color squares
        if (event.buttons === 1) {
          setColorCodeAt(selectedColorInd, code);
        }
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
    elements = elements.concat(sixSquares().map((sixBySix, i) => {
      const squares = [];
      sixBySix.forEach((code) => squares.push(<Square code={code} key={code} />));
      return (<div className="six-by-six" key={`six-by-six-${i}`}>{squares}</div>);
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
              {[0, 1, 2, 3].map((ind) => (
                <div className="color-choice" key={`color-choice-${ind}`}>
                  {selectedColorInd === ind && <div className="selection-indicator">*</div>}
                  <div className="color-preview"
                       style={{ background: COLORS[colors[ind]] }}
                       onMouseDown={() => setSelectedColorInd(ind)}></div>
                  <input type="number" min="0" max="255"
                         onMouseDown={() => setSelectedColorInd(ind)}
                         value={colors[ind]} onChange={(event) => {
                           const code = event.target.value;
                           if (code >= 0 && code <= 255) {
                             setColorCodeAt(ind, code);
                           }
                         }} />
                </div>
              ))}
            </div>
            <div className="colors-256">
              <Squares256 />
            </div>
          </div>
        </section>
      </div>

      <section className="bash-prompt-preview">
        <div className="container">
          <h2>Bash prompt preview</h2>
          <code className="prompt-preview">
            <span style={{ color: COLORS[colors[0]] }} >root</span><span style={{ color: COLORS[colors[1]] }}
            >@</span><span style={{ color: COLORS[colors[2]] }}
            >host</span>
            &nbsp;
            <span style={{ color: COLORS[colors[3]] }}>~/path/to/dir</span>
            &nbsp;
            <span className="cmd-separator"
            >$</span>
          </code>
          <p>To use the prompt, choose between tput and ANSI escape sequences for PS1:</p>
          <code className="prompt-ps1">
            export PS1="\[$(tput setaf {colors[0]})\]\u\[$(tput setaf {colors[1]})\]@\[$(tput setaf {colors[2]})\]\h
              \[$(tput setaf {colors[3]})\]\w \[$(tput sgr0)\]$ "
          </code>
          <code className="prompt-ps1-ansi">
            export PS1="\[\e[38;5;{colors[0]}m\]\u\[\e[38;5;{colors[1]}m\]@\[\e[38;5;{colors[2]}m\]\h
              \[\e[38;5;{colors[3]}m\]\w \[\033[0m\]$ "
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
