# Bash prompt generator

A web app for customizing the colors of your bash prompt:

https://robotmoon.com/bash-prompt-generator

Screenshot:

<img width="996" alt="image" src="https://user-images.githubusercontent.com/208617/161115862-aec4d996-0632-4e4f-9ca8-4dca67ad31db.png">

Example: Emerald green prompt

```bash
export PS1="\[$(tput setaf 34)\]\u\[$(tput setaf 40)\]@\[$(tput setaf 46)\]\h \[$(tput setaf 154)\]\w \[$(tput sgr0)\]$ "
```

Example: Fiery orange prompt

```bash
export PS1="\[$(tput setaf 196)\]\u\[$(tput setaf 202)\]@\[$(tput setaf 208)\]\h \[$(tput setaf 220)\]\w \[$(tput sgr0)\]$ "
```

Example: Ocean blue prompt

```bash
export PS1="\[$(tput setaf 39)\]\u\[$(tput setaf 45)\]@\[$(tput setaf 51)\]\h \[$(tput setaf 195)\]\w \[$(tput sgr0)\]$ "
```

## Development

This is written with [React](https://reactjs.org/) and requires [node.js](https://nodejs.org/).

First, install all node dependencies:
`yarn install`

Start the dev server with:
`yarn start`


## License

MIT
