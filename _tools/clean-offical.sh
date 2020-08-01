find . -name "*.svg" | xargs -I file mv file .
find . -type d -empty -delete
rm *.pdf
#for f in *.svg; do mv "$f" "$(echo "$f" | sed s/-icon-service//)"; done