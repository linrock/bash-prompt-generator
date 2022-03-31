# Bash prompt generator

A web app for customizing the colors of your bash prompt: https://robotmoon.com/bash-prompt-generator

Screenshot:

<img width="996" alt="image" src="https://user-images.githubusercontent.com/208617/161115862-aec4d996-0632-4e4f-9ca8-4dca67ad31db.png">

Example PS1 prompt:

```bash
PS1="\[$(tput setaf 226)\]\u\[$(tput setaf 220)\]@\[$(tput setaf 214)\]\h \[$(tput setaf 33)\]\w \[$(tput sgr0)\]$ "
```

## Development

This is written with [React](https://reactjs.org/) and requires [node.js](https://nodejs.org/).

First, install all node dependencies:
`yarn install`

Start the dev server with:
`yarn start`


## License

MIT
