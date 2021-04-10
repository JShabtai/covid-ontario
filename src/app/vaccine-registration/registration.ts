// TODO https://twitter.com/frankscarpitti/status/1379491503303757825
export interface AdditionalEligibility {
    source?: string;
    name: string;
    description: string;
    url: string;
}

export interface Phu {
    name: string;
    url: string;
    minAge: number;
    preRegistration: string[];
    additionalEligibility?: AdditionalEligibility[];
    notes?: string;
    lastUpdated: string;
}

export interface PhuMap {
    [k: string]: Phu
}

export const registrationData: PhuMap = {
    "2251": {
        lastUpdated: 'April 7, 2021',
        name: "Ottawa",
        url: 'https://covid-19.ontario.ca/book-vaccine/',
        minAge: 60,
        preRegistration: [
        ],
        additionalEligibility: [
            {
                name: 'Pop up clinic',
                description: 'Ages 16+ who are either Indigenous, or family members living in the same household',
                url: 'https://forms.office.com/r/tRMfYDzsNU',
            },
        ],
    },
    "2226": {
        lastUpdated: 'April 2, 2021',
        name: "Algoma",
        url: 'https://www.algomapublichealth.com/disease-and-illness/infectious-diseases/novel-coronavirus/covid-19-vaccine/vaccine-clinics-in-algoma/#clinics',
        minAge: 70,
        preRegistration: [
        ],
        additionalEligibility: [
            {
                name: '60+',
                description: 'Ages 65-69 can book clinic dates from April 24 onward. Ages 60-64 can book dates May 8th and onward.',
                url: 'https://www.algomapublichealth.com/disease-and-illness/infectious-diseases/novel-coronavirus/covid-19-vaccine/vaccine-clinics-in-algoma/#clinics',
            },
        ]
    },
    "2227": {
        lastUpdated: 'April 8, 2021',
        name: "Brant County",
        url: 'https://www.bchu.org/ServicesWeProvide/InfectiousDiseases/Pages/COVID-19-Vaccine-Clinic-Appointments.aspx',
        minAge: 64,
        preRegistration: [
        ],
    },
    "2233": {
        lastUpdated: 'April 7, 2021',
        name: "Grey Bruce",
        url: 'https://covid-19.ontario.ca/book-vaccine/',
        minAge: 60,
        preRegistration: [
        ],
    },
    "2234": {
        lastUpdated: 'April 7, 2021',
        name: "Haldimand-Norfolk",
        url: 'https://hnhu.org/health-topic/coronavirus-covid-19/vaccination-rollout-in-haldimand-and-norfolk/',
        minAge: 60,
        preRegistration: [
        ],
    },
    "2235": {
        lastUpdated: 'April 7, 2021',
        name: "Haliburton, Kawartha, Pine Ridge",
        url: 'https://covid-19.ontario.ca/book-vaccine/',
        minAge: 60,
        preRegistration: [
        ],
    },
    "2236": {
        lastUpdated: 'April 8, 2021',
        name: "Halton Region",
        url: 'https://halton.ca/COVIDvaccines',
        minAge: 60,
        preRegistration: [
        ],
        additionalEligibility: [
            {
                name: 'Indigenous adults',
                description: 'Indigenous Adults living in Halton who are 18 years of age and older. Also one immediate family member living in the same household.',
                url: 'https://halton.ca/COVIDvaccines',
            },
        ],
    },
    "2237": {
        lastUpdated: 'April 6, 2021',
        name: "Hamilton",
        url: 'https://covid-19.ontario.ca/book-vaccine/',
        minAge: 60,
        preRegistration: [
        ],
    },
    "2238": {
        lastUpdated: 'April 7, 2021',
        name: "Hastings and Prince Edward Counties",
        url: 'https://covid-19.ontario.ca/book-vaccine/',
        minAge: 60,
        preRegistration: [
        ],
    },
    "2240": {
        lastUpdated: 'April 8, 2021',
        name: "Chatham-Kent",
        url: 'https://ckphu.com/Covid-19-vaccination-eligibility/',
        minAge: 60,
        preRegistration: [
        ],
    },
    "2241": {
        lastUpdated: 'April 7, 2021',
        name: "Kingston, Frontenac and Lennox & Addington",
        url: 'https://covid-19.ontario.ca/book-vaccine/',
        minAge: 60,
        preRegistration: [
        ],
    },
    "2242": {
        lastUpdated: 'April 7, 2021',
        name: "Lambton",
        url: 'https://covid-19.ontario.ca/book-vaccine/',
        minAge: 60,
        preRegistration: [
        ],
    },
    "2243": {
        lastUpdated: 'April 7, 2021',
        name: "Leeds, Grenville and Lanark District",
        url: 'https://covid-19.ontario.ca/book-vaccine/',
        minAge: 60,
        preRegistration: [
        ],
        additionalEligibility: [
        ],
    },
    "2244": {
        lastUpdated: 'April 6, 2021',
        name: "Middlesex-London",
        url: 'https://covidvaccinelm.ca/',
        minAge: 65,
        preRegistration: [
        ],
    },
    "2246": {
        lastUpdated: 'April 7, 2021',
        name: "Niagara Region",
        url: 'https://covid-19.ontario.ca/book-vaccine/',
        minAge: 60,
        preRegistration: [
        ],
        additionalEligibility: [
        ],
        // TODO Add catholic schoolboard after confirmation
        // https://twitter.com/Beachlo48453466/status/1379261094892605440
    },
    "2247": {
        lastUpdated: 'April 7, 2021',
        name: "North Bay Parry Sound District",
        url: 'https://covid-19.ontario.ca/book-vaccine/',
        minAge: 60,
        preRegistration: [
        ],
    },
    "2249": {
        lastUpdated: 'April 7, 2021',
        name: "Northwestern",
        url: 'https://covid-19.ontario.ca/book-vaccine/',
        minAge: 60,
        preRegistration: [
        ],
        additionalEligibility: [
            {
                name: 'Highest risk',
                description: 'People with the "highest risk" conditions are eligible. Your healthcare provider should be contacting you directly.',
                url: 'https://covid-19.ontario.ca/book-vaccine/',
            }
        ],
    },
    "2255": {
        lastUpdated: 'April 7, 2021',
        name: "Peterborough",
        url: 'https://covid-19.ontario.ca/book-vaccine/',
        minAge: 60,
        preRegistration: [
        ],
        additionalEligibility: [
            {
                name: 'Urban Indigenous Clinic',
                description: '(Registration opens April 8th) All indigenous adults 18 and older',
                url: 'https://www.peterboroughpublichealth.ca/novel-coronavirus-covid-19/covid-19-vaccine-clinic/#indigenous',
            }
        ],
    },
    "2256": {
        lastUpdated: 'April 7, 2021',
        name: "Porcupine",
        url: 'https://www.canadaehs.com/Default.aspx?PageID=11510',
        minAge: 65,
        preRegistration: [
        ],
        additionalEligibility: [
            {
                name: 'Indigenous adults',
                description: 'Adults who identify as First Nation, Métis and Inuit who are 18 years and older, as well as adults who live in the same household as them.',
                url: 'https://www.canadaehs.com/Default.aspx?PageID=11510',
            },
        ],
    },
    "2257": {
        lastUpdated: 'April 7, 2021',
        name: "Renfrew County and District",
        url: 'https://customervoice.microsoft.com/Pages/ResponsePage.aspx?id=PU8wZsNnpEqkBL8VbiG9ro0q3JBekeVHrEpzgxWKav9UNlRERVNBWTNXOE9MVTdWNTQ3WTFQVldVOC4u&nocdn=3',
        minAge: 70,
        preRegistration: [
        ],
        additionalEligibility: [
            {
                name: 'Risk factors',
                description: 'Factors which are in the "highest risk" or "high risk" category are now eligible. See link for full details.',
                url: 'https://www.rcdhu.com/novel-coronavirus-covid-19-2/',
            },
            {
                name: 'Age (changing soon)',
                description: 'Beginning April 10th, residents 65+ will be eligible.',
                url: 'https://www.rcdhu.com/novel-coronavirus-covid-19-2/',
            }
        ],
    },
    "2258": {
        lastUpdated: 'April 7, 2021',
        name: "Eastern Ontario",
        url: 'https://covid-19.ontario.ca/book-vaccine/',
        minAge: 60,
        preRegistration: [
        ],
        additionalEligibility: [
        ],
    },
    "2260": {
        lastUpdated: 'April 7, 2021',
        name: "Simcoe Muskoka District",
        url: 'https://covid-19.ontario.ca/book-vaccine/',
        minAge: 60,
        preRegistration: [
        ],
    },
    "2261": {
        lastUpdated: 'April 7, 2021',
        name: "Sudbury & District",
        // They've switched to the provincial booking system
        // url: 'https://www.phsd.ca/health-topics-programs/vaccines-immunizations/coronavirus-covid-19-vaccine/upcoming-vaccination-clinics-for-specific-priority-groups/',
        url: 'https://covid-19.ontario.ca/book-vaccine/',
        minAge: 60,
        preRegistration: [
        ],
    },
    "2262": {
        lastUpdated: 'April 7, 2021',
        name: "Thunder Bay District",
        url: 'https://covid-19.ontario.ca/book-vaccine/',
        minAge: 60,
        preRegistration: [
        ],
        additionalEligibility: [
        ],
    },
    "2263": {
        lastUpdated: 'April 7, 2021',
        name: "Timiskaming",
        url: 'https://covid-19.ontario.ca/book-vaccine/',
        minAge: 60,
        preRegistration: [
        ],
    },
    "2265": {
        lastUpdated: 'April 2, 2021',
        name: "Waterloo Region",
        url: 'https://www.regionofwaterloo.ca/en/health-and-wellness/covid-19-vaccine.aspx',
        minAge: 60,
        preRegistration: [
            'Certain high risk conditions. See link for detailed list.'
        ],
        additionalEligibility: [
            {
                name: 'High risk neighbourhoods',
                description: '(Starting April 8) Adults 50+ living in these neighbourhoods: Vanier/Rockway, Country Hills, Alpine/Laurentian, Victoria Hills/Cherry Hill and Shades Mills',
                url: 'https://www.regionofwaterloo.ca/en/health-and-wellness/covid-19-vaccine.aspx',
            },

            {
                source: 'https://twitter.com/RegionWaterloo/status/1379864081105031172A',
                name: 'Special education staff',
                description: 'Staff at WRDSB and WCDSB who provide direct personal support to students with special education. Eligible staff will be contacted directly with registration instructions.',
                url: '',
            },

        ],
    },
    "2266": {
        lastUpdated: 'April 2, 2021',
        name: "Wellington-Dufferin-Guelph",
        url: 'https://register.wdgpublichealth.ca/',
        minAge: 60,
        preRegistration: [
            'Essential workers who cannot work from home',
        ],
    },
    "2268": {
        lastUpdated: 'April 5, 2021',
        name: "Windsor-Essex County",
        url: 'https://wait.crowdhandler.com/wechuvaccination',
        minAge: 60,
        preRegistration: [
        ],
        additionalEligibility: [
            {
                name: 'Hotspots',
                description: 'Ages 50+ in postal codes starting with N8X, N8Y, N9A, N9B, N9C, N8H, N9Y',
                url: 'https://wait.crowdhandler.com/wechuvaccination',
            },
        ],
    },
    "2270": {
        lastUpdated: 'April 7, 2021',
        name: "York Region",
        url: 'https://www.york.ca/wps/portal/yorkhome/health/yr/covid-19/covid19vaccinationclinics/04covid19vaccinationclinics/!ut/p/z1/vVXbcpswEP0aHokWhI3om0pdA4kvdeobLx6QuagG5GCZ1n9f2XU7kya220kpM0IXzq60Z8VZFKIFCquo4VkkuaiiQs2XYXfl077vefcQjCziAoURDUybQM8x0PwEgAsPBRT-if0vQP-RWODPApvOjBFYPr5lP0MhCreMr9ESpzg2UmbqDgFHt9K4q5N1x9ZjKwUWOSQ1zM4RzSq5lTlaHuoVE5VMKqnBQdQbNdlJLvenhVyUiXonUSFzDZho-Fo3nPPIcJqIMV6dWGIFrzjbaQDWxY-_h_kyjvA6i_PjwRXENK2uZ7gQgDci4H-0x50PxDPg3jwDrmXiOZcvqQ5QmBUi_pF2WsWYZCiskzSpk_puX6vlXMrt7p0GGqz3bHNsmbhjotTgNZNc7CRaPEeipWLCvsjExETzhidf0bQSdalO8viX-fXgvINNXOrRPozh89SGTz3bIt2HwfhhYrxxhxsBtOwet-rehnbdm-26_zfkBD64Bj3-IbiHgZq-S97jgAyH7XI_bJf7YbvcD9u997O3khPcKiRKv8x64A6Ufm0jmeu8SgVa_BT-8-hVbV9cE37lln95egqpqjvHYvNNKeL_LDzbcjotCT7omwk54KIp3ZgMeriTlatbXZGRHf0OAtRRRw!!/dz/d5/L2dBISEvZ0FBIS9nQSEh/',
        minAge: 60,
        preRegistration: [
        ],
        additionalEligibility: [
            {
                name: 'Cornell Community Center',
                description: 'Ages 60+ can book at the Cornell Community Center using the provincial booking site.',
                url: 'https://covid19.ontariohealth.ca/',
            },
            {
                name: 'Multiple community centers',
                description: 'Residents aged 45-59 living in postal codes starting with L4L, L6A, L4K, L4J, L3S can book at Aaniin or Maple community centers',
                url: 'https://york.ca/COVID19Vaccine',
            },
        ],
    },
    "3895": {
        lastUpdated: 'April 9, 2021',
        name: "Toronto",
        url: 'https://covid-19.ontario.ca/book-vaccine/',
        minAge: 60,
        preRegistration: [
        ],
        additionalEligibility: [
            {
                name: 'Hotspots',
                description: 'Ages 50+ in postal codes starting with M1B, M1C, M1E, M1G, M1H, M1J, M1K, M1L, M1M, M1P, M1R, M1S, M1T, M1V, M1W, M1X, M2J, M2M, M2R, M3A, M3C, M3H, M3J, M3K, M3L, M3M, M3N, M4A, M4H, M4X, M5A, M5B, M5N, M5V, M6A, M6B, M6E, M6H, M6K, M6L, M6M, M6N, M8V, M9A, M9B, M9C, M9L, M9M, M9N, M9P, M9R, M9V, M9W',
                url: 'https://covid-19.ontario.ca/book-vaccine/',
            },
            {
                name: 'Scarborough',
                description: '"Highest risk", "high risk" and "at risk". Must live in Scarborough, work in healthcare in Scarborough, or have your primary doctor in Scarborough',
                url: 'https://www.scarboroughcovidvaccineclinic.ca/',
            },
            {
                name: 'Toronto East Health Network',
                description: '50+ for people whose postal codes start with M4H, M1L, M3C, M4A, M1K, M1M, M1J',
                url: 'https://tehn.ca/covid19/covid-19-vaccine',
            },
            {
                name: 'Sunnybrook',
                description: 'People at "high risk" and "highest" risk as well as essential caregivers to a person in the "highest risk" category. Must live in catchment area. Also ages 50+ living in postal codes starting with M2J, M2M, M2R, M3A, M3C, M4A, M5N, M6A, M6B',
                url: 'https://sunnybrook.ca/content/?page=novel-coronavirus-covid-19-vaccine-information',
            },
            {
                name: 'Humber River',
                description: 'Ages 50+ who live in North Western Toronto catchment area (South of Steeles, North of Eglinton, East of Humber River/Islington and West of Bathurst)',
                url: 'https://www.hrh.ca/covax-clinic-booking/',
            },
            {
                name: 'North York General',
                description: 'People at "high risk" and "highest" risk. Must live in catchment area.',
                url: 'https://nygh.on.ca/covid19vaccination',
            },
            {
                name: 'Unity Health',
                description: 'People at "high risk" and "highest" risk. These postal codes only. St. Mikes: M4X, M5A, M5B. St. Joes: M6K, M6N, M8V, M9A, M9B, M9C, M9R, M9V, M9W',
                url: 'https://unityhealth.to/how-to-book-covid-appointment/',
            },
            {
                name: 'UHN',
                description: 'Ages 50+ postal codes starting with M5V, M6E, M6H. Also "at risk", "high risk" and "highest risk" for those living in the <a href="https://bit.ly/3kLrk46">catchment area</a>',
                url: 'https://covidvaccine.uhn.ca/vaccination-registration-form',
            },
            {
                name: 'Englemount-Lawrence',
                description: 'Ages 50+ in these postal codes: M2J, M2M, M2R, M3A, M3C, M3H, M3J, M3K, M3L, M3M, M3N, M4A, M4X, M5A, M5B, M5N, M6A, M6B, M6L, M6M, M9L, M9M, M9N, or M9P',
                url: 'https://elvaccineclinic.ca/ntoht/covid-vaccine/gp/self-schedule',
            },
            {
                name: 'CAMH',
                description: 'Ages 50+ in postal code starting with M5V, M6E, M6H, M6K, M6N, M8V',
                url: 'https://www.camh.ca/en/camh-news-and-stories/covid-19-vaccine-booking',
            },
            {
                name: 'Michael Garron Hospital',
                description: 'Ages 50+ in postal code starting with M4H, M1L, M3C, M4A, M1K, M1M, M1J',
                url: 'https://tehn.ca/covid19/covid-19-vaccine',
            },
            {
                name: 'North York General Hospital',
                description: 'Ages 50+ in postal code starting with M2J, M2M, M2R, M3A, M3C, M3H, M4A',
                url: 'https://nygh.vertoengage.com/engage/generic-open-clinic?key=fba9f065-ebb8-4412-baaf-73534eb37854&__cf_chl_jschl_tk__=e7c94100aaeac982134dae91077c3c51349c7954-1617762728-0-AVP_HUHDTuStYbOiyuY_TXkaPrHaDzWPEKaw0Hor3z5lMPB7D-hXOQkK1ZkCQ44u_1iQi4ZFPErWwVdA1vQGcVSR376JGF-4vkWNLEThyCZQqAgKina4-L01uT7VHK49hzivK_atVZNc-e2LZCM_GeUoA9rtDJoSoiXj4UQtbEn2W5Yno6tdvYKgBGtppQV0MNbrTJF8wCYzzQ4ns2WWP6HisciLaYj6Z5NpC7B5tQ2kgjN0Gorx0q7kDMUWM0-oAcZHuTibxmNZ-SPRR8udWivZqHSfBT9i0KkLSjkV3g74zGz6n8hvyTapcR2AK7rS8jq7fksn3oHW67Yxr-LygF-4_zLCI10k637HhSX_Pa65u5n8TkTqhd2OxZ4-osCJQ5hezrQ2ykjlDjhY_1a8L5TiVFRttH2GgIhY5O3gI6Nr1fB1q2dNjnG6-n2aWsexevamNd43aD6ZWz9bt_-O6Hk0VYWDYHGSDBVOzmBUXQqExt6hm1r6TRIRuPdCuN3ZtW2gBP98K2UuNyV4Tj6-nTI',
            },
        ],
    },
    "4913": {
        // Note: This is actually done through the London PHU
        lastUpdated: 'April 6, 2021',
        name: "Southwestern",
        url: 'https://www.swpublichealth.ca/en/my-health/covid-19-vaccine-eligibility.aspx#PHASE-1-December-2020-to-March-2021-Remain-Eligible-',
        minAge: 65,
        preRegistration: [
        ],
        notes: 'After clicking "Book an appointment" you will be taken to the London PHU website. That is not a mistake.',
        additionalEligibility: [
            {
                name: '',
                description: '',
                url: 'https://www.swpublichealth.ca/en/my-health/covid-19-vaccine-eligibility.aspx#PHASE-1-December-2020-to-March-2021-Remain-Eligible-',
            }
        ],
    },
    "5183": {
        lastUpdated: 'April 7, 2021',
        name: "Huron Perth District",
        url: 'https://www.hpph.ca/en/health-matters/covid-19-vaccine-information.aspx',
        minAge: 65,
        preRegistration: [
        ],
    },
    "2230": {
        lastUpdated: 'April 8, 2021',
        name: "Durham Region",
        url: 'https://www.durhamvaccinebooking.ca/',
        minAge: 60,
        preRegistration: [
        ],
        additionalEligibility: [
            {
                name: 'Oshawa',
                description: 'Oshawa uses a separate booking system. Currently taking ages 65+.',
                url: 'http://covidvaccine.lh.ca/',
            },
            {
                name: 'Risk',
                description: 'Residents who are "highest risk" or "high risk" are eligible. See the link for list of qualifying conditions.',
                url: 'https://www.durhamvaccinebooking.ca/',
            },
            {
                name: 'Hotspots',
                description: 'Residents 50+ living in postal codes starting with L1S, L1T, L1V, L1X and L1Z',
                url: 'https://www.durhamvaccinebooking.ca/',
            },
        ],
    },
    "2253": {
        // https://twitter.com/regionofpeel/status/1379550452056985604
        lastUpdated: 'April 2, 2021',
        name: "Peel Region",
        url: 'https://covid-19.ontario.ca/book-vaccine/',
        minAge: 60,
        preRegistration: [
        ],
        additionalEligibility: [
            {
                name: 'Highest risk and high risk',
                description: 'People with the "highest risk" and "high risk" conditions are eligible. See link for list of eligible conditions.',
                url: 'https://covid-19.ontario.ca/book-vaccine/',
            },
            {
                name: 'Hotspots',
                description: 'Residents 50+ living in postal codes starting with L4T, L4W, L4X, L4Z, L5A, L5B, L5C, L5K, L5L, L5M, L5N, L5R, L5V, L5W, L6P, L6R, L6S, L6T, L6V, L6W, L6X, L6Y, L6Z, L7A, L7C',
                url: 'https://covid-19.ontario.ca/book-vaccine/',
            },
            {
                source: 'https://trilliumhealthpartners.ca/covid-19/A/vaccine.html',
                name: 'Trillium Health Partners',
                description: 'Ages 50+ living in postal codes beginning with L4T, L4W, L4X, L4Z, L5A, L5B, L5R, L5C, L5K, L5L, L5M, L5N, L5V, L5W, L6P, L6R, L6S, L6T, L6V, L6W, L6X, L6Y, L6Z, L7A, L7C, M9A, M9B, M9C',
                url: 'https://trilliumhealthpartners.ca/covid-19/A/vaccine.html',
            },
            {
                source: 'https://www.williamoslerhs.ca/en/visiting-us/covid-19-vaccine-clinic.aspx#Eligibility',
                name: 'William Osler Health System',
                description: 'Ages 50+ living in postal codes beginning with L4T, L4W, L4X, L4Z, L5A, L5B, L5R, L5C, L5K, L5L, L5M, L5N, L5V, L5W, L6P, L6R, L6S, L6T, L6V, L6W, L6X, L6Y, L6Z, L7A, L7C, M9R, M9V, M9W',
                url: 'https://www.williamoslerhs.ca/en/visiting-us/covid-19-vaccine-clinic.aspx#Eligibility',
            },
        ],
    },
};
