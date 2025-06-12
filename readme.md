# Modular Cheatsheets

## Description

Modular Cheatsheets is a single-page web application designed to display various command reference guides or "cheatsheets" in a clean and organized manner. The interface allows users to easily switch between different topics such as Linux, Git, Docker, etc., by dynamically loading content from JSON files. The project also includes a light/dark theme switcher that remembers the user's preference.

## Features

- **Dynamic Content Loading**: Cheatsheets are loaded asynchronously from `.json` files when a navigation button is clicked, without needing to reload the page.
- **Multiple Categories**: Supports various cheatsheet categories, easily extendable by simply adding a new JSON file and a navigation button.
- **Theme Switcher (Light/Dark)**: Allows switching between a light and a dark theme. The preference is saved in the browser's `localStorage`.
- **Responsive Design**: The interface adapts to different screen sizes, changing from a two-column layout on desktops to a single column on mobile devices.
- **Color-Coded Command Groups**: Each group of commands is presented on a card with a unique colored border and legend, making the interface more visual and easier to scan.
- **Zero JavaScript Dependencies**: Written in "vanilla" JavaScript, with no need for external frameworks or libraries.

## Technologies Used

- **HTML5**
- **CSS3** (using Flexbox for layout)
- **JavaScript (ES6+)** (for application logic and DOM manipulation)
- **Font Awesome** (for icons)

## Project Structure

```
.
├── css/
│   └── style.css         # Main stylesheet
├── data/
│   ├── linux.json        # Data for Linux commands
│   ├── git.json          # (and other .json files for more cheatsheets)
│   └── ...
├── js/
│   └── app.js            # Main application logic
└── index.html            # Main HTML file
```

## Getting Started

Simply clone the repository and open the `index.html` file in your preferred web browser.

```bash
git clone <REPOSITORY_URL>
cd <DIRECTORY_NAME>
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.