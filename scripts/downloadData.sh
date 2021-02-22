#!/usr/bin/env sh

set -e

project_dir="$(dirname $(readlink -f $(dirname ${0})))"
data_dir="${project_dir}/data/raw"
uri_prefix="https://data.ontario.ca/dataset"

mkdir -p "${data_dir}"

function download {
    dataset_id="${1}"
    shift

    html_uri="${uri_prefix}/${dataset_id}"
    html_file="${data_dir}/${dataset_id}"

    curl -s -o "${html_file}" "${html_uri}"

    while [ $# -gt 0 ]
    do
        echo -n "* $1... "
        datafile_uri=$(cat "${html_file}" | grep "${html_uri}/resource/[-a-z0-9]\+/download/$1.csv" | sed -e "s/^.*\\(http.*$1.csv\\).*$/\\1/")
        curl -s -o "${data_dir}/$1.csv" "${datafile_uri}"
        echo "Done."
        shift
    done

    rm "${html_file}"
}

echo LTC
download "42df36df-04a0-43a9-8ad4-fac5e0e22244" "ltccovidsummary" "ltccovidsummarybyphu"

echo Schools
download "b1fef838-8784-4338-8ef9-ae7cfd405b41" "schoolpartnersactivecovid"
# TODO Look at this one later (note: It's a few MB)
# curl -o "${data_dir}/schools_active.csv" "https://data.ontario.ca/dataset/b1fef838-8784-4338-8ef9-ae7cfd405b41/resource/8b6d22e2-7065-4b0f-966f-02640be366f2/download/schoolsactivecovid.csv"

echo Regions
# Which PHUs transition to what status and when
download "cbb4d08c-4e56-4b07-9db6-48335241b88a" "response_framework"

echo Outbreaks
download "5472ffc1-88e2-48ca-bc9f-4aa249c1298d" "ongoing_outbreaks" "ongoing_outbreaks_phu" "outbreak_cases"

echo Vaccines
# TODO Delivered and company breakdown?
download "752ce2b7-c15a-4965-a3dc-397bf405e7cc" "vaccine_doses"

echo Testing
download "a2dfa674-a173-45b3-9964-1e3d2130b40f" "testing_metrics_by_phu"
download "ab5f4a2b-7219-4dc7-9e4d-aa4036c5bf36" "percent_positive_by_agegrp"

echo Hospital and ICU
download "8f3a449b-bde5-4631-ada6-8bd94dbc7d15" "region_hospital_icu_covid_data"

echo Cases
download "1115d5fe-dd84-4c69-b5ed-05bf0c0a0ff9" "cases_by_status_and_phu"
download "f4f86e54-872d-43f8-8a86-3892fd3cb5e6" "covidtesting"
# Last one is the big one! A row for every case.
download "f4112442-bdc8-45d2-be3c-12efae72fb27" "conposcovidloc"
