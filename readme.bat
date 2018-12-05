REM node chimp/dist/bin/chimp.js _f5/runtime/run.feature
if %4%=="firefox" (
node chimp/dist/bin/chimp.js %1 --browser="firefox" --port=4444 --host="localhost"
) else if %4%=="ie" (
node chimp/dist/bin/chimp.js %1 --browser="internet explorer" --port=4444 --host="localhost"
)else (
node chimp/dist/bin/chimp.js %1
)

cd chimp/node_modules/cucumber-html-reporter
node test1
cd..
cd sendmail
node simple.js %2 %3
