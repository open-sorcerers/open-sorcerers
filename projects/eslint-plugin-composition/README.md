# eslint-plugin-composition

Tools for fools

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-composition`:

```
$ npm install eslint-plugin-composition --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-composition` globally.

## Usage

Add `composition` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "composition"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "composition/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





