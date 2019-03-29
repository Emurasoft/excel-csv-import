#!/usr/bin/env bash
script_path=$(cd "$(dirname "${BASH_SOURCE[0]}")"; pwd -P)

# 1=svg file name 2=export file name 3=icon width
function exportPNG {
    inkscape --file=${script_path}'/'${1} --export-png=${script_path}'/../public/'${2} --export-area-page --export-width=${3} --export-height=${3}
    pngcrush -ow ${script_path}'/../public/'${2}
}

exportPNG import.svg icon0-16.png 16
exportPNG import.svg icon0-32.png 32
exportPNG import.svg icon0-64.png 64
exportPNG import.svg icon0-80.png 80
exportPNG export.svg icon1-16.png 16
exportPNG export.svg icon1-32.png 32
exportPNG export.svg icon1-64.png 80