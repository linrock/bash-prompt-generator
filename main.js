{
  const colorTheme = [
    226,  // '#ffff00'
    220,  // '#ffd700'
    214,  // '#ffaf00'
    33,   // '#005fff'
  ];

  const code0 = colorTheme[0];
  const username = document.querySelector(".username");
  username.style.color = COLORS[code0];
  const usernameColorCode = document.querySelector(".ps1-username-color");
  usernameColorCode.textContent = code0;

  const code1 = colorTheme[1];
  const separator = document.querySelector(".separator");
  separator.style.color = COLORS[code1];
  const separatorColorCode = document.querySelector('.ps1-at-color');
  separatorColorCode.textContent = code1;

  const code2 = colorTheme[2];
  const hostname = document.querySelector(".hostname");
  hostname.style.color = COLORS[code2];
  const hostnameColorCode = document.querySelector('.ps1-hostname-color');
  hostnameColorCode.textContent = code2;

  const code3 = colorTheme[3];
  const relativeDir = document.querySelector(".relative-dir");
  relativeDir.style.color = COLORS[code3];
  const relativeDirColorCode = document.querySelector('.ps1-relative-dir-color');
  relativeDirColorCode.textContent =  code3;

  const cmdSeparator = document.querySelector(".cmd-separator");
  cmdSeparator.style.color = '#fff';
}
