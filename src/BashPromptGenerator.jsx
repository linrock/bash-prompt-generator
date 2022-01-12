import { useRef, useState } from 'react';
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


const TputColor = ({ code }) => <>\[$(tput setaf <span className="color-code">{code}</span>)\]</>;
const TputReset = () => <>\[$(tput sgr0)\]</>;

const AnsiColor = ({ code }) => <>\[\e[38;5;<span className="color-code">{code}</span>m\]</>;
const AnsiReset = () => <>\[\033[0m\]</>;

const BashPromptExample = ({ colors }) => <>
  <code className="prompt-preview">
    <span style={{ color: COLORS[colors[0]] }}>user</span>
    <span style={{ color: COLORS[colors[1]] }}>@</span>
    <span style={{ color: COLORS[colors[2]] }}>hostname</span>
    &nbsp;
    <span style={{ color: COLORS[colors[3]] }}>~/path/to/directory</span>
    &nbsp;
    <span className="cmd-separator"
    >$</span>
  </code>

  <code className="prompt-ps1">
    <span className="export">export </span>
    <span className="ps1-var">PS1</span>=
    <span className="bash-string">
      "
      <TputColor code={colors[0]} />\u
      <TputColor code={colors[1]} />@
      <TputColor code={colors[2]} />\h <TputColor code={colors[3]} />\w <TputReset />$ "
    </span>
  </code>
</>;

function BashPromptGenerator() {
  const [selectedColorInd, setSelectedColorInd] = useState(0);
  const [colors, setColors] = useState([226, 220, 214, 33]);
  const inputsRef = useRef(new Array(colors.length));

  function setColorCodeAt(index, code) {
    const colorsCopy = colors.slice();
    colorsCopy[index] = code;
    setColors(colorsCopy);
  }

  // color squares that can be clicked to set the currently-selected color
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
      <section className="bash-prompt-customize">
        <div className="fluid-container">
          <div className="thin-container">
            <code className="prompt-preview">
              <span style={{ color: COLORS[colors[0]] }}
                    onMouseDown={() => setSelectedColorInd(0)}>user</span>
              <span style={{ color: COLORS[colors[1]] }}
                    onMouseDown={() => setSelectedColorInd(1)}>@</span>
              <span style={{ color: COLORS[colors[2]] }}
                    onMouseDown={() => setSelectedColorInd(2)}>hostname</span>
              &nbsp;
              <span style={{ color: COLORS[colors[3]] }}
                    onMouseDown={() => setSelectedColorInd(3)}>~/path/to/directory</span>
              &nbsp;
              <span className="cmd-separator"
              >$</span>
            </code>

            <div className="color-customizer">
              <div className="color-choices">
                {[0, 1, 2, 3].map((ind) => (
                  <div className="color-choice" key={`color-choice-${ind}`}>
                    <div className="color-preview"
                         style={{ background: COLORS[colors[ind]] }}
                         onMouseDown={() => {
                           setTimeout(() => {
                             inputsRef.current[ind].focus();
                             inputsRef.current[ind].select();
                           }, 0);
                           setSelectedColorInd(ind);
                         }}></div>
                    <input type="number" min="0" max="255"
                           ref={el => inputsRef.current[ind] = el}
                           onMouseDown={() => setSelectedColorInd(ind)}
                           value={colors[ind]} onChange={(event) => {
                             const code = Number(event.target.value);
                             if (code >= 0 && code <= 255) {
                               setColorCodeAt(ind, code);
                             }
                           }} />
                    {selectedColorInd === ind && <div className="selection-indicator">↑</div>}
                  </div>
                ))}
              </div>
            </div>

            <code className="prompt-ps1 thin-screen-invis">
              <span className="export">export </span>
              <span className="ps1-var">PS1</span>=
              <span className="bash-string">
                "
                <TputColor code={colors[0]} />\u
                <TputColor code={colors[1]} />@
                <TputColor code={colors[2]} />\h <TputColor code={colors[3]} />\w <TputReset />$ "
              </span>
            </code>
          </div>

          <div className="colors-256">
            <Squares256 />
          </div>
        </div>
      </section>

      <section className="bash-prompt-ps1">
        <div className="container">
          <h2>Bash prompt PS1</h2>
          <p>To use the colors you chose, set the PS1 environment variable:</p>
          <code className="prompt-ps1">
            <span className="export">export </span>
            <span className="ps1-var">PS1</span>=
            <span className="bash-string">
              "
              <TputColor code={colors[0]} />\u
              <TputColor code={colors[1]} />@
              <TputColor code={colors[2]} />\h <TputColor code={colors[3]} />\w <TputReset />$ "
            </span>
          </code>
          <code className="prompt-ps1-ansi">
            <span className="export">export </span>
            <span className="ps1-var">PS1</span>=
            <span className="bash-string">
              "
              <AnsiColor code={colors[0]} />\u
              <AnsiColor code={colors[1]} />@
              <AnsiColor code={colors[2]} />\h <AnsiColor code={colors[3]} />\w <AnsiReset />$ "
            </span>
          </code>
          <p>
            It's up to you to decide between tput and ANSI escape sequences.
            To persist your customized prompt, export PS1 in
            ~/.bashrc or ~/.bash_profile
          </p>
        </div>
      </section>

      <section className="bash-prompt-examples">
        <div className="container">
          <h2>Bash prompt examples</h2>
          <p>Here are some example color schemes from choosing 4 colors above.</p>

          <p>Emerald green</p>
          <BashPromptExample colors={[34, 40, 46, 154]} />

          <p>Desert sand</p>
          <BashPromptExample colors={[216, 220, 222, 229]} />

          <p>Ocean blue</p>
          <BashPromptExample colors={[39, 45, 51, 195]} />

          <p>Fiery orange</p>
          <BashPromptExample colors={[196, 202, 208, 220]} />

          <p>Violet pink</p>
          <BashPromptExample colors={[165, 171, 213, 219]} />

          <p>Monochromatic</p>
          <BashPromptExample colors={[243, 245, 249, 254]} />
        </div>
      </section>
    </>
  );
}

export default BashPromptGenerator;
