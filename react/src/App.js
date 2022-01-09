import { useState } from 'react';
import './App.css';

function App() {
  const [selectedColorInd, setSelectedColorInd] = useState(null);
  const [color0, setColor0] = useState(226);
  const [color1, setColor1] = useState(220);
  const [color2, setColor2] = useState(214);
  const [color3, setColor3] = useState(33);
  return (
    <>
      <section>
        <h2>Bash prompt preview</h2>
        <code className="prompt-preview">
          <span className="username"
          >root</span><span className="separator"
          >@</span><span className="hostname"
          >host</span>
          <span className="relative-dir"
          >~/path/to/dir</span>
          <span className="cmd-separator"
          >$</span>
        </code>
      </section>

      <section>
        <h2>Customize colors</h2>
        <div className="color-wrapper">
          <div className="color-theme">
            <div className="color-choice">
              <div className="color-preview" id="color0-preview"></div>
              <input type="number" min="0" max="255" id="color0" defaultValue={color0} />
            </div>
            <div className="color-choice">
              <div className="color-preview" id="color1-preview"></div>
              <input type="number" min="0" max="255" id="color1" defaultValue={color1} />
            </div>
            <div className="color-choice">
              <div className="color-preview" id="color2-preview"></div>
              <input type="number" min="0" max="255" id="color2" defaultValue={color2} />
            </div>
            <div className="color-choice">
              <div className="color-preview" id="color3-preview"></div>
              <input type="number" min="0" max="255" id="color3" defaultValue={color3} />
            </div>
          </div>

          <div className="colors-256"></div>
        </div>
      </section>

      <section>
        <h2>Bash prompt PS1</h2>
        <code className="prompt-ps1">
          PS1="\[$(tput setaf <span className="ps1-username-color">226</span>)\]\u\[$(tput setaf <span className="ps1-at-color">220</span>)\]@\[$(tput setaf <span className="ps1-hostname-color">214</span>)\]\h
            \[$(tput setaf <span className="ps1-relative-dir-color">33</span>)\]\w \[$(tput sgr0)\]$ "
        </code>
      </section>
    </>
  );
}

export default App;
