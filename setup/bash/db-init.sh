# Exit immediately if any command returns a non-zero status
set -e

echo "[INFO]: Initializing databases setup"

sh ./setup/bash/generate-sqlite-local.sh

echo "[INFO]: Databases setup completed!"
