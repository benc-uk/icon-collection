for file in * ; do
  newname=$(echo $file | cut -d'-' -f 2)
  mv $file $newname
done