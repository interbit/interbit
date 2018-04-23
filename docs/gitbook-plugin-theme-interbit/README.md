# Gitbook custom theme for Interbit SDK

This is a plugin for Gitbook, version 3.0.0 or higher

It adds a new block with logo. The Interbit theme extends HTML templates, CSS styles and JS scripts of a base GitBook theme [gitbook-plugin-theme-default](https://www.npmjs.com/package/gitbook-plugin-theme-default).

The plugin can be used as a blank theme template for GitBook.

## Usage

Add the theme to your book's configuration `book.json`:

```js
{
    "plugins": [
        "theme-interbit"
    ],
    "variables": {
        "themeInterbit": {
        }
    }
},
```

Install by command:

``` bash
gitbook install
```