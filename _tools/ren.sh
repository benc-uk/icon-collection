for file in t/* ; do
  newname=$(echo $file | cut -d'_' -f 2)
  mv $file $newname
done