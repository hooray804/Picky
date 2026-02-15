# Picky

English | [한국어(Korean)](https://github.com/hooray804/Picky/blob/main/README-ko.md)

Picky is a userscript tool designed for inspecting web elements and extracting CSS selectors for ad-blocking purposes. It allows you to select and analyze elements instantly, even in mobile environments, and generates optimized CSS selectors. You can also view the webpage's source code. Notably, the Advanced version provides a blocking feature that permanently hides selected distracting elements on the site.

> [!IMPORTANT]
> **Picky (Standard) is no longer receiving updates.** Please switch to the Advanced version to stay up to date with the latest features.

> [!NOTE]
> **Picky Advanced includes all the features of Picky.** Do not install and use both versions simultaneously.

* [Install Picky Advanced (English)](https://raw.githubusercontent.com/hooray804/Picky/main/PickyAdvanced-en.user.js)
* [Install Picky (Korean)](https://raw.githubusercontent.com/hooray804/Picky/main/Picky.user.js)
* [Install Picky Advanced (Korean)](https://raw.githubusercontent.com/hooray804/Picky/main/PickyAdvanced.user.js)

## 1. Key Features

* **Intelligent CSS Selector Generation**: Recommends the most unique selectors by analyzing IDs, classes, attributes (e.g., data-test), and nth-of-type.
* **Permanent Element Blocking (Advanced)**: Selecting an element and clicking 'Block' records it in browser storage (GM_setValue), ensuring the element remains hidden even upon return visits. This feature may not work in Safari's Private Browsing mode or with certain userscript managers.
* **Code and Resource Inspection**: 
    * **HTML/CSS/JS**: Inspect the code of the selected element and its applied styles.
    * **Cookie Management**: View, edit, or delete cookies for the current page. Due to permission restrictions, some cookies may be excluded on most websites.
    * **Fingerprinting Info**: Displays a summary of system information, including browser User Agent, resolution, and WebGL renderer.
* **Shadow DOM Support**: Includes features for exploring and injecting styles into elements inside a Shadow Root, which are typically difficult to access with standard selectors. Advanced element selection capabilities are currently under development and compatibility will be expanded in the future.
* **Hierarchy Navigation**: Easily navigate and analyze the scope by moving to parent or child elements based on the selected element.
* **Mobile Optimization**: Provides a minimal mode to reduce screen occupancy and options to change the UI position (top/bottom).

## 2. Version Comparison

| Feature | Picky (Standard) | Picky Advanced |
| :--- | :--- | :--- |
| Status | Deprecated (No updates) | Active (Maintained) |
| **Core Purpose** | Element analysis & CSS extraction | Element analysis & personalized blocking rules |
| **Element Blocking** | Temporary hide (reset on refresh) | Persistent blocking with saved rules |
| **Resources** | Low | Relatively high |
| **Required Permissions** | `none` | `GM_setValue`, `GM_getValue` |

## 3. How to Install

To use this script, you must have a userscript manager extension installed, such as [Tampermonkey](https://www.tampermonkey.net/) or [Userscripts](https://github.com/quoid/userscripts).

1. Install a userscript manager.
2. Click the link for your preferred version below or copy the URL:
    * [Install Picky Advanced (English)](https://raw.githubusercontent.com/hooray804/Picky/main/PickyAdvanced-en.user.js)
    * [Install Picky Advanced (Korean)](https://raw.githubusercontent.com/hooray804/Picky/main/PickyAdvanced.user.js)
3. Click the 'Install' button displayed in your browser or apply it within your userscript manager.

## 4. How to Use

1. After installation, the script will load automatically when you visit a website.
2. Select an element by clicking or tapping via the Picky UI on the screen.
3. **CSS Button**: Copies the generated selector to the clipboard.
4. **Rule Button**: Copies an ad-blocker rule, including the domain and the generated selector, to the clipboard.
5. **Block Button (Advanced Only)**: Select an ad or distracting element and click this to hide it permanently on that site.
6. **Reset Button**: Deselects the current element and returns to the initial state.

## 5. License

This project is licensed under the Mozilla Public License 2.0 (MPL-2.0).

## 6. Screenshots

* Picky Main Interface in Korean
![IMG_2652](https://github.com/user-attachments/assets/ca7ccb8b-7124-4ce8-98b4-5fe50e50384b)

* View Page HTML
![IMG_2651](https://github.com/user-attachments/assets/babd851c-47a0-4190-b734-045af7440812)

* Picky Advanced Settings Screen
![IMG_2650](https://github.com/user-attachments/assets/095ab8a7-b6e1-47e5-bea0-a70f19410aaa)

* Using the URL Button
![IMG_2646](https://github.com/user-attachments/assets/a4ae14b2-7c0d-4db3-b07d-78daf5586da2)
