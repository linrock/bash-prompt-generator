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

  function renderPreviewAndPs1() {
    const colorTheme = [
      Number(document.querySelector('#color0').value),
      Number(document.querySelector('#color1').value),
      Number(document.querySelector('#color2').value),
      Number(document.querySelector('#color3').value),
    ];
    const code0 = colorTheme[0];
    const username = document.querySelector(".username");
    username.style.color = COLORS[code0];
    const usernameColorCode = document.querySelector(".ps1-username-color");
    usernameColorCode.textContent = code0;
    const usernameColorCodePreview = document.querySelector('#color0-preview');
    usernameColorCodePreview.style.background = COLORS[code0];

    const code1 = colorTheme[1];
    const separator = document.querySelector(".separator");
    separator.style.color = COLORS[code1];
    const separatorColorCode = document.querySelector('.ps1-at-color');
    separatorColorCode.textContent = code1;
    const separatorColorCodePreview = document.querySelector('#color1-preview');
    separatorColorCodePreview.style.background = COLORS[code1];

    const code2 = colorTheme[2];
    const hostname = document.querySelector(".hostname");
    hostname.style.color = COLORS[code2];
    const hostnameColorCode = document.querySelector('.ps1-hostname-color');
    hostnameColorCode.textContent = code2;
    const hostnameColorCodePreview = document.querySelector('#color2-preview');
    hostnameColorCodePreview.style.background = COLORS[code2];

    const code3 = colorTheme[3];
    const relativeDir = document.querySelector(".relative-dir");
    relativeDir.style.color = COLORS[code3];
    const relativeDirColorCode = document.querySelector('.ps1-relative-dir-color');
    relativeDirColorCode.textContent =  code3;
    const relativeDirColorCodePreview = document.querySelector('#color3-preview');
    relativeDirColorCodePreview.style.background = COLORS[code3];

    const cmdSeparator = document.querySelector(".cmd-separator");
    cmdSeparator.style.color = '#fff';

    let html = '';
    // 2 rows of 8 for the first 16 basic colors
    for (let j = 0; j < 2; j++) {
      for (let i = 0; i < 8; i++) {
        html += `<div class="square" style="background: ${COLORS[j*8 + i]}"></div>`
      }
      html += '<div class="clear-left"></div>';
    }
    // 12 rows of length 12
    for (let j = 0; j < 12; j++) {
      for (let i = 0; i < 12; i++) {
        html += `<div class="square" style="background: ${COLORS[16 + j*18 + i]}"></div>`
      }
      html += '<div class="clear-left"></div>';
    }
    for (let j = 0; j < 2; j++) {
      for (let i = 0; i < 12; i++) {
        html += `<div class="square" style="background: ${COLORS[232 + j*12 + i]}"></div>`
      }
      html += '<div class="clear-left"></div>';
    }
    document.querySelector('.colors-256').innerHTML = html;
  }

  renderPreviewAndPs1();
}
