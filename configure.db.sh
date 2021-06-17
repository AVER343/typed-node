#! /bin/bash
echo "Configuring database"
export PGPASSWORD="postgres"
# dropdb -U postgres far_away_app
createdb -U postgres application_database

psql -U postgres  < ./src/db/sql/drop_tables.sql
# psql -U postgres  < ./src/db/sql/user_role_type.sql
psql -U postgres  < ./src/db/sql/users.sql
psql -U postgres  < ./src/db/sql/queue_types.sql
psql -U postgres  < ./src/db/sql/queue_active.sql
psql -U postgres  < ./src/db/sql/job_table.sql
# psql -U postgres  < ./src/db/sql/user_details.sql
# psql -U postgres  < ./src/db/sql/user_role.sql
psql -U postgres  < ./src/db/sql/user_otp.sql
# psql -U postgres  < ./src/db/sql/send_email_type.sql
# psql -U postgres  < ./src/db/sql/send_email.sql
echo "Configured database"