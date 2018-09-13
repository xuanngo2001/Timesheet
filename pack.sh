date_string=$(date +"%Y-%m-%d.%0k.%M.%S")
output_file="release/timesheet_${date_string}.tar.gz"
tar -czvf "${output_file}" timesheet > /dev/null

echo "${output_file} is created."