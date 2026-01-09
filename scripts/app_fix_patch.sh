#!/usr/bin/env bash
set -euo pipefail

ROOT="/home/osilp/Desktop/campusguard_testing"
FILE="$ROOT/src/App.jsx"

# remove unused imports
sed -i -e "/import reactLogo/d" -e "/import viteLogo/d" "$FILE"

# make .replace('_', ' ') global
sed -i -e "s|\\.replace('_', ' ')|.replace(/_/g, ' ')|g" "$FILE"

# fix typo admin-dassboard -> admin-dashboard
sed -i -e "s|admin-dassboard|admin-dashboard|g" "$FILE"

echo "Patched $FILE"