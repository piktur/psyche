module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true,
    "mocha": true,
  },
  "globals": {
    "browser": true, // wdio testrunner
    "cy": true,
  },
  "extends": "eslint:recommended",
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "classes": true,
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "never"
    ]
  }
};
