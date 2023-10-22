source .env

# Exit immediately if any command returns a non-zero status
set -e

db_dir="./databases/sqlite"
db_path="$db_dir/${DB_NAME}.db"

# Create the directory if it doesn't exist
if [ ! -d "$db_dir" ]; then
  echo "[INFO]: Directory $db_dir does not exist. Creating..."
  mkdir -p $db_dir
fi

# Check if the database file already exists
if [ -f "$db_path" ]; then
  echo "[INFO]: SQLite database ${DB_NAME}.db already exists. Doing nothing."
else
  echo "[INFO]: Creating SQLite database ${DB_NAME} in ${db_path}"
  touch $db_path
fi
