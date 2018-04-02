This is to fix styled components use with next js and .babelrc

From: https://github.com/zeit/next.js/issues/3706

```javascript
{
  "plugins": ["babel-plugin-styled-components"],
  "env": {
    "development": {
      "plugins": [
        [
          "styled-components",
          {
            "ssr": true,
            "displayName": true
          }
        ]
      ],
      "presets": "next/babel"
    },
    "production": {
      "presets": "next/babel"
    }
  }
}
```
