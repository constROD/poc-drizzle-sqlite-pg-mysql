# Exit immediately if any command returns a non-zero status
set -e

echo "[INFO]: Initializing database setup"

sh ./setup/bash/generate-sqlite-local.sh

echo "[INFO]: Database setup completed!"
