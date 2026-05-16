# Picky

English | [한국어(Korean)](https://github.com/hooray804/Picky/blob/main/README-ko.md)

Picky is a userscript tool designed for inspecting web elements and extracting CSS selectors for ad-blocking purposes. It allows you to select and analyze elements instantly, even in mobile environments, and generates optimized CSS selectors. You can also view the webpage's source code. Notably, the Advanced version provides an element zapper feature that permanently hides selected distracting elements on the site.

> [!IMPORTANT]
> **Picky (Standard) is no longer receiving updates.** Please switch to the Advanced version to stay up to date with the latest features.

> [!NOTE]
> **Picky Advanced includes all the features of Picky.** Do not install and use both versions simultaneously.

* [Install Picky Advanced (English)](https://raw.githubusercontent.com/hooray804/Picky/main/PickyAdvanced-en.user.js)
* [Install Picky (English)](https://raw.githubusercontent.com/hooray804/Picky/main/Picky-en.user.js)
* [Install Picky Advanced (Korean)](https://raw.githubusercontent.com/hooray804/Picky/main/PickyAdvanced.user.js)
* [Install Picky (Korean)](https://raw.githubusercontent.com/hooray804/Picky/main/Picky.user.js)

## Key Features

* **Intelligent CSS Selector Generation**: Recommends the most unique selectors by analyzing IDs, classes, attributes (e.g., data-test), and nth-of-type.
* **Permanent Element Blocking (Advanced)**: Selecting an element and clicking 'Block' records it in browser storage (GM_setValue), ensuring the element remains hidden even upon return visits. This feature may not work in Safari's Private Browsing mode or with certain userscript managers.
* **Code and Resource Inspection**: 
    * **HTML/CSS/JS**: Inspect the code of the selected element and its applied styles.
    * **Cookie Management**: View, edit, or delete cookies for the current page. Due to permission restrictions, some cookies may be excluded on most websites.
    * **Fingerprinting Info**: Displays a summary of system information, including browser User Agent, resolution, and WebGL renderer.
* **Shadow DOM Support**: Includes features for exploring and injecting styles into elements inside a Shadow Root, which are typically difficult to access with standard selectors.
* **Hierarchy Navigation**: Easily navigate and analyze the scope by moving to parent or child elements based on the selected element.
* **Mobile Optimization**: Provides a minimal mode to reduce screen occupancy and options to change the UI position (top/bottom).

## Version Comparison

| Feature | Picky (Standard) | Picky Advanced |
| :--- | :--- | :--- |
| **Status** | Deprecated (No updates) | Active (Maintained) |
| Core Purpose | Element analysis & CSS extraction | Element analysis & personalized blocking rules |
| Element Blocking | Temporary hide (reset on refresh) | Persistent blocking with saved rules |
| Resources | Very Low | Low (Max 30MB) |
| Required Permissions | `none` | `GM_setValue`, `GM_getValue` |

## How to Install

To use this script, you must have a userscript manager extension installed, such as [Tampermonkey](https://www.tampermonkey.net/) or [Userscripts](https://github.com/quoid/userscripts).

1. Install a userscript manager.
2. Click the link for your preferred version below or copy the URL:
    * [Install Picky Advanced (English)](https://raw.githubusercontent.com/hooray804/Picky/main/PickyAdvanced-en.user.js)
    * [Install Picky Advanced (Korean)](https://raw.githubusercontent.com/hooray804/Picky/main/PickyAdvanced.user.js)
3. Click the 'Install' button displayed in your browser or apply it within your userscript manager.
4. If there’s a problem, copy the URL below and add it manually. The first URL is the English version.

```
https://raw.githubusercontent.com/hooray804/Picky/main/PickyAdvanced-en.user.js
```
```
https://raw.githubusercontent.com/hooray804/Picky/main/PickyAdvanced.user.js
```

## How to Use

1. After installation, the script will load automatically when you visit a website.
2. Select an element by clicking or tapping via the Picky UI on the screen.
3. **CSS Button**: Copies the generated selector to the clipboard.
4. **Rule Button**: Copies an ad-blocker rule, including the domain and the generated selector, to the clipboard.
5. **Block Button (Advanced Only)**: Select an ad or distracting element and click this to hide it permanently on that site.
6. **Reset Button**: Deselects the current element and returns to the initial state.

## License

This project is licensed under the Mozilla Public License 2.0 (MPL-2.0).

## Screenshots

* Picky Advanced Main Interface in Korean
![IMG_1](https://github.com/user-attachments/assets/ac251cb6-d4f9-4183-aaa0-c5f9872b1292)

* View Page HTML
![IMG_2](https://github.com/user-attachments/assets/a42417d0-732f-47bc-852f-1102889512a9)

* Picky Advanced Settings Screen
![IMG_3](https://github.com/user-attachments/assets/cbff6a8f-1559-4f7c-a4cc-74b74b4a364d)

* Using the URL Button
![IMG_4](https://github.com/user-attachments/assets/a39f1253-7553-4182-9cb3-3872852b232d)
