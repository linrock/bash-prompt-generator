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


const TputColor = ({ code }) => <>
  \[$(tput setaf <span className="color-code">{code}</span>)\]
</>;

const AnsiColor = ({ code }) => <>
  \[\e[38;5;<span className="color-code">{code}</span>m\]
</>;

function BashPromptGenerator() {
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
      <section className="bash-prompt-preview">
        <div className="container">
          <h2>Bash prompt preview</h2>
          <code className="prompt-preview">
            <span style={{ color: COLORS[colors[0]] }} >user</span><span style={{ color: COLORS[colors[1]] }}
            >@</span><span style={{ color: COLORS[colors[2]] }}
            >hostname</span>
            &nbsp;
            <span style={{ color: COLORS[colors[3]] }}>~/path/to/directory</span>
            &nbsp;
            <span className="cmd-separator"
            >$</span>
          </code>
        </div>
      </section>

      <div className="container">
        <section>
          <h2>Customize colors</h2>
          <div className="color-wrapper">
            <div className="color-theme">
              {[0, 1, 2, 3].map((ind) => (
                <div className="color-choice" key={`color-choice-${ind}`}>
                  {selectedColorInd === ind && <div className="selection-indicator">→</div>}
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
          <h2>Bash prompt PS1</h2>
          <p>To try the colors you chose, set the PS1 environment variable in your shell:</p>
          <code className="prompt-ps1">
            <span className="export">export </span>
            <span className="ps1-var">PS1</span>=
            <span className="bash-string">
              "
              <TputColor code={colors[0]} />\u
              <TputColor code={colors[1]} />@
              <TputColor code={colors[2]} />\h <TputColor code={colors[3]} />\w \[$(tput sgr0)\]$ "
            </span>
          </code>
          <code className="prompt-ps1-ansi">
            <span className="export">export </span>
            <span className="ps1-var">PS1</span>=
            <span className="bash-string">
              "
              <AnsiColor code={colors[0]} />\u
              <AnsiColor code={colors[1]} />@
              <AnsiColor code={colors[2]} />\h <AnsiColor code={colors[3]} />\w \[\033[0m\]$ "
            </span>
          </code>
          <p>
            It's up to you to decide between tput and ANSI escape sequences.
            To persist your customized prompt, put one of the above into
            ~/.bashrc or ~/.bash_profile
          </p>
        </div>
      </section>
    </>
  );
}

export default BashPromptGenerator;
