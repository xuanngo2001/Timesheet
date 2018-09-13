date_string=$(date +"%Y-%m-%d.%0k.%M.%S")
base_dir="release"
	mkdir -p "${base_dir}"
output_file="${base_dir}/timesheet_${date_string}.tar.gz"

tar -czvf "${output_file}" timesheet > /dev/null
echo "${output_file} is created."