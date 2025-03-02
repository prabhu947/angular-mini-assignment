@echo off
echo Creating Angular mini-assignment directory structure...

mkdir mini-assignment
cd mini-assignment

mkdir src
cd src
mkdir app assets styles

cd app
mkdir components models services shared

cd shared
mkdir directives pipes
cd ..

cd components
mkdir books calendar home layout settings students

cd layout
mkdir main-layout
cd main-layout
echo. > main-layout.component.ts
echo. > main-layout.component.html
echo. > main-layout.component.css
cd ..
mkdir header
cd header
echo. > header.component.ts
echo. > header.component.html
echo. > header.component.css
cd ..
mkdir sidebar
cd sidebar
echo. > sidebar.component.ts
echo. > sidebar.component.html
echo. > sidebar.component.css
cd ..
cd ..

cd books
echo. > books.component.ts
echo. > books.component.html
echo. > books.component.css
mkdir book-detail
cd book-detail
echo. > book-detail.component.ts
echo. > book-detail.component.html
echo. > book-detail.component.css
cd ..
mkdir book-form
cd book-form
echo. > book-form.component.ts
echo. > book-form.component.html
echo. > book-form.component.css
cd ..
cd ..

cd calendar
echo. > calendar.component.ts
echo. > calendar.component.html
echo. > calendar.component.css
cd ..

cd home
echo. > home.component.ts
echo. > home.component.html
echo. > home.component.css
cd ..

cd settings
echo. > settings.component.ts
echo. > settings.component.html
echo. > settings.component.css
cd ..

cd students
echo. > students.component.ts
echo. > students.component.html
echo. > students.component.css
cd ..

cd ..

cd models
echo. > book.ts
echo. > student.ts
echo. > event.ts
echo. > user.ts
cd ..

cd services
echo. > book.service.ts
echo. > student.service.ts
echo. > event.service.ts
echo. > auth.service.ts
cd ..

cd shared
cd directives
echo. > highlight.directive.ts
cd ..
cd pipes
echo. > time-ago.pipe.ts
echo. > search-filter.pipe.ts
cd ..
cd ..

echo. > app.component.ts
echo. > app.component.html
echo. > app.component.css
echo. > app.routes.ts
echo. > app.config.ts

cd ..\..\

echo. > angular.json
echo. > package.json
echo. > tsconfig.json
echo. > db.json
echo. > .gitignore

echo Directory structure created successfully!
pause