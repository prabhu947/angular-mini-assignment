@echo off
echo Creating Angular project directory structure...

:: Create main directories
mkdir src\app
mkdir src\app\components
mkdir src\app\directives
mkdir src\app\pipes
mkdir src\app\services

:: Create component directories
mkdir src\app\components\book-card
mkdir src\app\components\books
mkdir src\app\components\calendar
mkdir src\app\components\home
mkdir src\app\components\task-dialog

mkdir src\app\components\layout
mkdir src\app\components\layout\header
mkdir src\app\components\layout\main-layout
mkdir src\app\components\layout\sidebar

mkdir src\app\components\settings
mkdir src\app\components\students

:: Create root files
echo. > src\app\app.component.html
echo. > src\app\app.component.spec.ts
echo. > src\app\app.component.ts
echo. > src\app\app.config.server.ts
echo. > src\app\app.config.ts
echo. > src\app\app.routes.server.ts
echo. > src\app\app.routes.ts

:: Create component files
echo. > src\app\components\book-card\book-card.component.css
echo. > src\app\components\book-card\book-card.component.html
echo. > src\app\components\book-card\book-card.component.ts

echo. > src\app\components\books\books.component.css
echo. > src\app\components\books\books.component.html
echo. > src\app\components\books\books.component.ts

echo. > src\app\components\calendar\calendar.component.css
echo. > src\app\components\calendar\calendar.component.html
echo. > src\app\components\calendar\calendar.component.spec.ts
echo. > src\app\components\calendar\calendar.component.ts

echo. > src\app\components\home\home.component.css
echo. > src\app\components\home\home.component.html
echo. > src\app\components\home\home.component.ts

echo. > src\app\components\layout\header\header.component.css
echo. > src\app\components\layout\header\header.component.html
echo. > src\app\components\layout\header\header.component.ts

echo. > src\app\components\layout\main-layout\main-layout.component.css
echo. > src\app\components\layout\main-layout\main-layout.component.html
echo. > src\app\components\layout\main-layout\main-layout.component.ts

echo. > src\app\components\layout\sidebar\sidebar.component.css
echo. > src\app\components\layout\sidebar\sidebar.component.html
echo. > src\app\components\layout\sidebar\sidebar.component.ts

echo. > src\app\components\settings\settings.components.css
echo. > src\app\components\settings\settings.components.html
echo. > src\app\components\settings\settings.components.ts

echo. > src\app\components\students\students.components.css
echo. > src\app\components\students\students.components.html
echo. > src\app\components\students\students.components.ts

echo. > src\app\components\task-dialog\task-dialog.component.css
echo. > src\app\components\task-dialog\task-dialog.component.html
echo. > src\app\components\task-dialog\task-dialog.component.spec.ts
echo. > src\app\components\task-dialog\task-dialog.component.ts

:: Create directives
echo. > src\app\directives\highlight.directive.ts

:: Create pipes
echo. > src\app\pipes\search-filter.pipe.ts
echo. > src\app\pipes\sort-tasks.pipe.ts
echo. > src\app\pipes\status-badge.pipe.ts
echo. > src\app\pipes\time-ago.pipe.ts

:: Create services
echo. > src\app\services\book.service.ts

:: Create other necessary files
echo. > src\index.html
echo. > src\main.server.ts
echo. > src\main.ts
echo. > src\server.ts
echo. > src\styles.css

:: Create root project files
echo. > .editorconfig
echo. > .gitignore
echo. > angular.json
echo. > package.json
echo. > README.md
echo. > tsconfig.app.json
echo. > tsconfig.json
echo. > tsconfig.spec.json

echo Directory structure created successfully!
