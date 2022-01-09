{
  // const colorTheme = [
  //   226,  // '#ffff00'
  //   220,  // '#ffd700'
  //   214,  // '#ffaf00'
  //   33,   // '#005fff'
  // ];

  [...document.querySelectorAll('input[type="number"]')].forEach(el => {
    el.addEventListener('change', () => {
      console.log('color changed!');
      renderPreviewAndPs1();
    });
  });
  [...document.querySelectorAll('input[type="number"]')].forEach(el => {
    el.addEventListener('keyup', () => {
      console.log('color changed!');
      renderPreviewAndPs1();
    });
  });

  const colorTheme = [
    Number(document.querySelector('#color0').value),
    Number(document.querySelector('#color1').value),
    Number(document.querySelector('#color2').value),
    Number(document.querySelector('#color3').value),
  ];
  let selectedColorInd;

  function renderPreviewAndPs1() {
    console.log('rendering...');

    const code0 = colorTheme[0];
    const code1 = colorTheme[1];
    const code2 = colorTheme[2];
    const code3 = colorTheme[3];

    // select color code preview colors based on the theme
    const colorCodePreview0 = document.querySelector('#color0-preview');
    colorCodePreview0.style.background = COLORS[code0];
    colorCodePreview0.addEventListener('click', () => {
      console.log('customizing color0');
      selectedColorInd = 0;
    });

    const colorCodePreview1 = document.querySelector('#color1-preview');
    colorCodePreview1.style.background = COLORS[code1];

    const colorCodePreview2 = document.querySelector('#color2-preview');
    colorCodePreview2.style.background = COLORS[code2];

    const colorCodePreview3 = document.querySelector('#color3-preview');
    colorCodePreview3.style.background = COLORS[code3];

    // set the bash prompt preview colors
    const username = document.querySelector(".username");
    username.style.color = COLORS[code0];
    const usernameColorCode = document.querySelector(".ps1-username-color");
    usernameColorCode.textContent = code0;

    const separator = document.querySelector(".separator");
    separator.style.color = COLORS[code1];
    const separatorColorCode = document.querySelector('.ps1-at-color');
    separatorColorCode.textContent = code1;

    const hostname = document.querySelector(".hostname");
    hostname.style.color = COLORS[code2];
    const hostnameColorCode = document.querySelector('.ps1-hostname-color');
    hostnameColorCode.textContent = code2;

    const relativeDir = document.querySelector(".relative-dir");
    relativeDir.style.color = COLORS[code3];
    const relativeDirColorCode = document.querySelector('.ps1-relative-dir-color');
    relativeDirColorCode.textContent =  code3;

    const cmdSeparator = document.querySelector(".cmd-separator");
    cmdSeparator.style.color = '#fff';

    // build html for the 256 color squares
    let html = '';

    // 2 rows of 8 for the first 16 basic colors
    for (let j = 0; j < 2; j++) {
      for (let i = 0; i < 8; i++) {
        html += `<div class="square" style="background: ${COLORS[j*8 + i]}" data-code="${j*8 + i}"></div>`;
      }
      html += '<div class="clear-left"></div>';
    }
    // 12 rows of length 12
    for (let j = 0; j < 18; j++) {
      for (let i = 0; i < 12; i++) {
        html += `<div class="square" style="background: ${COLORS[16 + j*12 + i]}" data-code="${16 + j*12 + i}"></div>`;
      }
      html += '<div class="clear-left"></div>';
    }
    for (let j = 0; j < 2; j++) {
      for (let i = 0; i < 12; i++) {
        html += `<div class="square" style="background: ${COLORS[232 + j*12 + i]}" data-code="${232 + j*12 + i}"></div>`;
      }
      html += '<div class="clear-left"></div>';
    }
    document.querySelector('.colors-256').innerHTML = html;
    [...document.querySelectorAll('.colors-256 .square')].forEach((squareEl) => {
      squareEl.addEventListener('click', () => {
        const code = Number(squareEl.dataset.code);
        console.log(code);
        if (selectedColorInd) {
          colorTheme[selectedColorInd] = code;
          renderPreviewAndPs1();
        }
      })
    });
  }

  renderPreviewAndPs1();
}
