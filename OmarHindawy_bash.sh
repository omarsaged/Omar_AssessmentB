#!/bin/bash

output_file="OmarHindawy_bash_report.txt"

{
echo "New learning comments in HTML files:"
grep -roh "new:" *.html | wc -l

echo "New learning comments in CSS files:"
grep -roh "new:" *.css | wc -l

echo "New learning comments in JavaScript files:"
grep -roh "new:" *.js | wc -l

echo "Total new learning comments:"
grep -roh "new:" *.html *.css *.js | wc -l
} | tee "$output_file"