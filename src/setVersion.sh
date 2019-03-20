#!/usr/bin/env bash
parent_path=$(cd "$(dirname "${BASH_SOURCE[0]}")"; pwd -P)
echo "export const version = '$1';" > ${parent_path}/version.ts
