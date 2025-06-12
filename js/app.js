document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Element Selection ---
    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body;
    const cheatsheetContainer = document.getElementById('cheatsheet-container');
    const cheatsheetTitle = document.getElementById('cheatsheet-title');
    const navButtons = document.querySelectorAll('.nav-button');

    // --- Theme Switcher Logic ---
    const applyTheme = (theme) => {
        body.classList.toggle('dark-theme', theme === 'dark');
    };

    themeSwitcher.addEventListener('click', () => {
        const isDark = body.classList.toggle('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Define our available color classes in one place.
    const colorClasses = [
        'group-blue',
        'group-green',
        'group-purple',
        'group-orange',
        'group-red',
        'group-teal',
        'group-grey'
    ];
    
    /**
     * Renders the cheatsheet data into the DOM.
     * @param {Array} cheatsheetData - The array of command groups.
     */
    const renderCheatsheet = (cheatsheetData) => {
        // Clear previous content
        cheatsheetContainer.innerHTML = '';
        
        cheatsheetData.forEach((group, index) => { // Added 'index' to the loop
            const fieldset = document.createElement('fieldset');
            
            // Automatically assign a color class from the array, cycling through it.
            const colorClass = colorClasses[index % colorClasses.length];
            fieldset.className = `command-group ${colorClass}`;
            
            const legend = document.createElement('legend');
            legend.textContent = group.title;
            
            const tableContainer = document.createElement('div');
            tableContainer.className = 'table-container';
            
            const table = document.createElement('table');
            table.innerHTML = `<thead><tr><th>Command</th><th>Description</th></tr></thead>`;
            
            const tbody = document.createElement('tbody');
            group.commands.forEach(cmd => {
                const row = document.createElement('tr');
                row.innerHTML = `<td><code>${cmd.command}</code></td><td>${cmd.description}</td>`;
                tbody.appendChild(row);
            });
            
            table.appendChild(tbody);
            tableContainer.appendChild(table);
            fieldset.appendChild(legend);
            fieldset.appendChild(tableContainer);
            cheatsheetContainer.appendChild(fieldset);
        });
    };

    const loadCheatsheet = async (jsonPath, title) => {
        cheatsheetTitle.textContent = title;
        // cheatsheetContainer.innerHTML = '<p>Loading...</p>'; // Show a loading message
        cheatsheetContainer.innerHTML = ''; // Dont show loading message
        
        try {
            const response = await fetch(jsonPath);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            renderCheatsheet(data); // This will now use the new automatic color logic
        } catch (error) {
            console.error("Failed to load cheatsheet:", error);
            cheatsheetContainer.innerHTML = `<p style="color: red;">Error: Could not load the cheatsheet data.</p>`;
        }
    };
    
    // --- Initialization  ---
    const init = () => {
        // 1. Set up theme
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

        // 2. Set up navigation button event listeners
        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                const dataSource = button.dataset.source;
                const title = button.textContent;
                navButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                loadCheatsheet(dataSource, title);
            });
        });
        
        // 3. Load the first cheatsheet by default
        if (navButtons.length > 0) {
            navButtons[0].click();
        }
    };

    // Run the app
    init();
});