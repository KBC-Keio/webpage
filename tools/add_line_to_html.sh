#!/bin/sh

###
# add_line_to_html
#     - 指定ディレクトリ以下の全HTMLファイルの指定行に指定した文字列を
#       新たな行として追加します。
#
# arguments
#     $1 - 行を追加するHTMLの親ディレクトリ
#     $2 - 追加する行番号
#     $3 - 追加する文字列
###

IFS=$'\n'

dir=$1
num=$2
str=$3

echo "adding $str"

for file in `find $dir -name "*.html"`; do

    echo "processing ${file}..."

    out="${file}.tmp"
    touch $out 

    i=1
    while read line; do

        echo $line >> $out

        if [ $i -eq $num ]; then
            echo $str >> $out
            echo "appended after $line."
        fi

        i=$(($i+1))
    done < $file

    mv $out $file

done

echo "done!"
