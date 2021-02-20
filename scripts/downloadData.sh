#!/usr/bin/env sh

set -e

project_dir="$(dirname $(readlink -f $(dirname ${0})))"
data_dir="${project_dir}/data/raw"

mkdir -p "${data_dir}"

# LTC
curl -o "${data_dir}/ltc_summary.csv" "https://data.ontario.ca/dataset/42df36df-04a0-43a9-8ad4-fac5e0e22244/resource/0f8b343e-fc28-4ca5-9aab-c3a1d2c919f1/download/ltccovidsummary.csv"
curl -o "${data_dir}/ltc_phu_summary.csv" "https://data.ontario.ca/dataset/42df36df-04a0-43a9-8ad4-fac5e0e22244/resource/31ad93fc-9afd-46b7-a9e7-0508a24ee330/download/ltccovidsummarybyphu.csv"

# Schools
curl -o "${data_dir}/schools_partners_summary.csv" "https://data.ontario.ca/dataset/b1fef838-8784-4338-8ef9-ae7cfd405b41/resource/245479eb-db0a-4ec4-97af-459d61da0801/download/schoolpartnersactivecovid.csv"
# TODO Look at this one later (note: It's a few MB)
# curl -o "${data_dir}/schools_active.csv" "https://data.ontario.ca/dataset/b1fef838-8784-4338-8ef9-ae7cfd405b41/resource/8b6d22e2-7065-4b0f-966f-02640be366f2/download/schoolsactivecovid.csv"

# Regions
# Which PHUs transition to what status and when
curl -o "${data_dir}/phu_status.csv" "https://data.ontario.ca/dataset/cbb4d08c-4e56-4b07-9db6-48335241b88a/resource/ce9f043d-f0d4-40f0-9b96-4c8a83ded3f6/download/response_framework.csv"

# Outbreaks
curl -o "${data_dir}/outbreaks_ongoing.csv" "https://data.ontario.ca/dataset/5472ffc1-88e2-48ca-bc9f-4aa249c1298d/resource/66d15cce-bfee-4f91-9e6e-0ea79ec52b3d/download/ongoing_outbreaks.csv"
curl -o "${data_dir}/outbreaks_phu.csv" "https://data.ontario.ca/dataset/5472ffc1-88e2-48ca-bc9f-4aa249c1298d/resource/36048cc1-3c47-48ff-a49f-8c7840e32cc2/download/ongoing_outbreaks_phu.csv"
curl -o "${data_dir}/outbreaks_case_summary.csv" "https://data.ontario.ca/dataset/5472ffc1-88e2-48ca-bc9f-4aa249c1298d/resource/d5d8f478-765c-4246-b8a7-c3b13a4a1a41/download/outbreak_cases.csv"

# Vaccines
# TODO Delivered and company breakdown?
curl -o "${data_dir}/vaccines_administered.csv" "https://data.ontario.ca/dataset/752ce2b7-c15a-4965-a3dc-397bf405e7cc/resource/8a89caa9-511c-4568-af89-7f2174b4378c/download/vaccine_doses.csv"

# Testing
curl -o "${data_dir}/testing_phu.csv" "https://data.ontario.ca/dataset/a2dfa674-a173-45b3-9964-1e3d2130b40f/resource/07bc0e21-26b5-4152-b609-c1958cb7b227/download/testing_metrics_by_phu.csv"
curl -o "${data_dir}/testing_age_positivity.csv" "https://data.ontario.ca/dataset/ab5f4a2b-7219-4dc7-9e4d-aa4036c5bf36/resource/05214a0d-d8d9-4ea4-8d2a-f6e3833ba471/download/percent_positive_by_agegrp.csv"

# Hospital and ICU
curl -o "${data_dir}/hospital_regions.csv" "https://data.ontario.ca/dataset/8f3a449b-bde5-4631-ada6-8bd94dbc7d15/resource/e760480e-1f95-4634-a923-98161cfb02fa/download/region_hospital_icu_covid_data.csv"

# Cases
curl -o "${data_dir}/cases_phu.csv" "https://data.ontario.ca/dataset/1115d5fe-dd84-4c69-b5ed-05bf0c0a0ff9/resource/d1bfe1ad-6575-4352-8302-09ca81f7ddfc/download/cases_by_status_and_phu.csv"
curl -o "${data_dir}/cases_daily.csv" "https://data.ontario.ca/dataset/f4f86e54-872d-43f8-8a86-3892fd3cb5e6/resource/ed270bb8-340b-41f9-a7c6-e8ef587e6d11/download/covidtesting.csv"
# This is the big one! A row for every case.
curl -o "${data_dir}/cases_detailed.csv" "https://data.ontario.ca/dataset/f4112442-bdc8-45d2-be3c-12efae72fb27/resource/455fd63b-603d-4608-8216-7d8647f43350/download/conposcovidloc.csv"
