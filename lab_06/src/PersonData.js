// Class: SE2840 - Person Tracker
// Name: Paige Rosynek
// Class Section: 031

const personData =
[
    {
        firstname: 'Louise',
        lastname: 'Crawford',
        age: 69,
        hometown: 'Albuquerque',
        location: { lat: 37.89981315, lon: -109.25922002 }
    },
    {
        firstname: 'Jamie',
        lastname: 'Franklin',
        age: 71,
        hometown: 'Las Vegas',
        location: { lat: 35.19448987, lon: -91.94759849 }
    },
    {
        firstname: 'Lucas',
        lastname: 'Cooper',
        age: 63,
        hometown: 'Las Cruces',
        location: { lat: 38.46313691, lon: -79.11583311 }
    },
    {
        firstname: 'Joan',
        lastname: 'King',
        age: 55,
        hometown: 'Seagoville',
        location: { lat: 40.89938144, lon: -82.94638411 }
    },
    {
        firstname: 'Mary',
        lastname: 'Kelly',
        age: 61,
        hometown: 'Memphis',
        location: { lat: 35.92369178, lon: -92.85441732 }
    },
    {
        firstname: 'Connie',
        lastname: 'Tucker',
        age: 34,
        hometown: 'Belen',
        location: { lat: 46.7863522, lon: -108.12476487 }
    },
    {
        firstname: 'Deann',
        lastname: 'Coleman',
        age: 50,
        hometown: 'Lexington',
        location: { lat: 37.1128383, lon: -78.61169193 }
    },
    {
        firstname: 'David',
        lastname: 'Elliott',
        age: 39,
        hometown: 'Celina',
        location: { lat: 43.83193263, lon: -118.37387106 }
    },
    {
        firstname: 'Daryl',
        lastname: 'Mendoza',
        age: 74,
        hometown: 'Independence',
        location: { lat: 42.75111707, lon: -87.74417823 }
    },
    {
        firstname: 'Felecia',
        lastname: 'Castro',
        age: 66,
        hometown: 'Fountain Valley',
        location: { lat: 36.4049165, lon: -119.15472365 }
    },
    {
        firstname: 'Stephen',
        lastname: 'Stevens',
        age: 60,
        hometown: 'Cincinnati',
        location: { lat: 38.07324449, lon: -110.48866019 }
    },
    {
        firstname: 'Danielle',
        lastname: 'Dixon',
        age: 74,
        hometown: 'Lafayette',
        location: { lat: 43.25260889, lon: -83.6660432 }
    },
    {
        firstname: 'Danny',
        lastname: 'Chambers',
        age: 34,
        hometown: 'Pearland',
        location: { lat: 43.05140041, lon: -78.96123233 }
    },
    {
        firstname: 'Marvin',
        lastname: 'Dixon',
        age: 48,
        hometown: 'South Bend',
        location: { lat: 42.5987063, lon: -84.1169393 }
    },
    {
        firstname: 'Flenn',
        lastname: 'Robinson',
        age: 43,
        hometown: 'Topeka',
        location: { lat: 40.65945769, lon: -87.4311982 }
    },
    {
        firstname: 'Allison',
        lastname: 'Kim',
        age: 63,
        hometown: 'Coppell',
        location: { lat: 46.74805617, lon: -80.79150096 }
    },
    {
        firstname: 'Kevin',
        lastname: 'Holt',
        age: 64,
        hometown: 'Gainesville',
        location: { lat: 46.35068977, lon: -109.4479428 }
    },
    {
        firstname: 'Alexander',
        lastname: 'Jackson',
        age: 68,
        hometown: 'Charleston',
        location: { lat: 38.45644616, lon: -119.96505588 }
    },
    {
        firstname: 'Luis',
        lastname: 'Nelson',
        age: 42,
        hometown: 'Cary',
        location: { lat: 38.46752122, lon: -113.2540104 }
    },
    {
        firstname: 'Arron',
        lastname: 'Diaz',
        age: 57,
        hometown: 'Moreno Valley',
        location: { lat: 40.0535172, lon: -94.59450001 }
    },
    {
        firstname: 'Melanie',
        lastname: 'Roberts',
        age: 74,
        hometown: 'Atlanta',
        location: { lat: 38.60661668, lon: -90.45186955 }
    },
    {
        firstname: 'Johnni',
        lastname: 'Bailey',
        age: 55,
        hometown: 'Cedar Rapids',
        location: { lat: 40.11841772, lon: -95.85283063 }
    },
    {
        firstname: 'Stacey',
        lastname: 'Coleman',
        age: 46,
        hometown: 'Elgin',
        location: { lat: 35.93959529, lon: -82.03115988 }
    },
    {
        firstname: 'Sebastian',
        lastname: 'Richards',
        age: 34,
        hometown: 'Madison',
        location: { lat: 44.38164847, lon: -107.10802489 }
    },
    {
        firstname: 'Lily',
        lastname: 'Soto',
        age: 39,
        hometown: 'Waterbury',
        location: { lat: 43.34530183, lon: -113.39853033 }
    },
    {
        firstname: 'Marion',
        lastname: 'Gordon',
        age: 67,
        hometown: 'Mobile',
        location: { lat: 37.28787485, lon: -119.88481544 }
    },
    {
        firstname: 'Megan',
        lastname: 'Holt',
        age: 32,
        hometown: 'Fort Lauderdale',
        location: { lat: 40.16370531, lon: -102.51780849 }
    },
    {
        firstname: 'Greg',
        lastname: 'Burns',
        age: 66,
        hometown: 'Knoxville',
        location: { lat: 38.38141017, lon: -79.33459701 }
    },
    {
        firstname: 'Debra',
        lastname: 'Mendoza',
        age: 31,
        hometown: 'Scurry',
        location: { lat: 44.23096627, lon: -83.02808062 }
    },
    {
        firstname: 'Jeanette',
        lastname: 'Larson',
        age: 57,
        hometown: 'Tacoma',
        location: { lat: 41.27996558, lon: -99.63810516 }
    },
    {
        firstname: 'Katie',
        lastname: 'Steeves ',
        age: 35,
        hometown: 'Chicago',
        location: { lat: 41.93901798, lon: -110.76581788 }
    },
    {
        firstname: 'Paula',
        lastname: 'Hunter',
        age: 64,
        hometown: 'Ann Arbor',
        location: { lat: 39.8151449, lon: -101.38613739 }
    },
    {
        firstname: 'Mathew',
        lastname: 'Frazier',
        age: 68,
        hometown: 'Greeley',
        location: { lat: 37.42743021, lon: -112.97936958 }
    },
    {
        firstname: 'Olivia',
        lastname: 'Campbell',
        age: 36,
        hometown: 'Jackson',
        location: { lat: 46.13324761, lon: -96.34677975 }
    },
    {
        firstname: 'Logan',
        lastname: 'Stevens',
        age: 50,
        hometown: 'Saginaw',
        location: { lat: 36.24677533, lon: -114.59395253 }
    },
    {
        firstname: 'Jessie',
        lastname: 'Morris',
        age: 47,
        hometown: 'Joliet',
        location: { lat: 38.61413978, lon: -90.01255125 }
    },
    {
        firstname: 'Gwendolyn',
        lastname: 'Medina',
        age: 37,
        hometown: 'Los Lunas',
        location: { lat: 43.66248161, lon: -108.53768826 }
    },
    {
        firstname: 'Zoe',
        lastname: 'Gomez',
        age: 47,
        hometown: 'Irving',
        location: { lat: 35.50932546, lon: -81.56299595 }
    },
    {
        firstname: 'Priscilla',
        lastname: 'Hunter',
        age: 27,
        hometown: 'Mcallen',
        location: { lat: 45.53838841, lon: -119.52373683 }
    },
    {
        firstname: 'Eleanor',
        lastname: 'Hale',
        age: 61,
        hometown: 'Grand Rapids',
        location: { lat: 37.71482106, lon: -94.16467935 }
    },
    {
        firstname: 'Duane',
        lastname: 'George',
        age: 25,
        hometown: 'Coral Springs',
        location: { lat: 42.58233651, lon: -78.92402208 }
    },
    {
        firstname: 'Kathryn',
        lastname: 'Howard',
        age: 45,
        hometown: 'Yakima',
        location: { lat: 42.26533289, lon: -101.10381539 }
    },
    {
        firstname: 'Anna',
        lastname: 'Chambers',
        age: 59,
        hometown: 'Palm Bay',
        location: { lat: 36.8340208, lon: -115.35669211 }
    },
    {
        firstname: 'Lance',
        lastname: 'Tucker',
        age: 66,
        hometown: 'Athens',
        location: { lat: 43.15300461, lon: -120.05159492 }
    },
    {
        firstname: 'Noah',
        lastname: 'Griffin',
        age: 74,
        hometown: 'Surprise',
        location: { lat: 36.42948347, lon: -103.73486974 }
    },
    {
        firstname: 'Don',
        lastname: 'Burke',
        age: 64,
        hometown: 'Ventura',
        location: { lat: 44.94891024, lon: -88.54779392 }
    },
    {
        firstname: 'Henry',
        lastname: 'Hamilton',
        age: 40,
        hometown: 'Lincoln',
        location: { lat: 40.23637035, lon: -102.66945782 }
    },
    {
        firstname: 'Travis',
        lastname: 'Hanson',
        age: 51,
        hometown: 'Gilbert',
        location: { lat: 41.47198771, lon: -85.21436318 }
    },
    {
        firstname: 'Byron',
        lastname: 'Mendoza',
        age: 67,
        hometown: 'Santa Rosa',
        location: { lat: 34.3970049, lon: -108.47112226 }
    },
    {
        firstname: 'Paula',
        lastname: 'Brown',
        age: 24,
        hometown: 'Flint',
        location: { lat: 45.10880177, lon: -103.55904132 }
    },
    {
        firstname: 'Pamela',
        lastname: 'Brewer',
        age: 34,
        hometown: 'Lancaster',
        location: { lat: 44.22357927, lon: -90.07280225 }
    },
    {
        firstname: 'Mabel',
        lastname: 'Miller',
        age: 64,
        hometown: 'Edgewood',
        location: { lat: 37.44479046, lon: -118.61191215 }
    },
    {
        firstname: 'Aiden',
        lastname: 'Bell',
        age: 46,
        hometown: 'Pomona',
        location: { lat: 42.21490834, lon: -106.89359108 }
    },
    {
        firstname: 'Mattie',
        lastname: 'Garrett',
        age: 41,
        hometown: 'Santa Maria',
        location: { lat: 42.05000328, lon: -106.44777587 }
    },
    {
        firstname: 'Floyd',
        lastname: 'Hunt',
        age: 67,
        hometown: 'Elizabeth',
        location: { lat: 46.6446959, lon: -117.71067593 }
    },
    {
        firstname: 'Timmothy',
        lastname: 'Romero',
        age: 77,
        hometown: 'Roseville',
        location: { lat: 42.56653112, lon: -97.11542406 }
    },
    {
        firstname: 'Mary',
        lastname: 'Perez',
        age: 29,
        hometown: 'Saginaw',
        location: { lat: 42.70886816, lon: -86.43621379 }
    },
    {
        firstname: 'Terrance',
        lastname: 'Green',
        age: 32,
        hometown: 'Raleigh',
        location: { lat: 35.2648482, lon: -103.79430775 }
    },
    {
        firstname: 'Cherly',
        lastname: 'Rodriquez',
        age: 48,
        hometown: 'Warren',
        location: { lat: 34.75407085, lon: -99.74310644 }
    },
    {
        firstname: 'Wayne',
        lastname: 'Kelley',
        age: 72,
        hometown: 'Red Bluff',
        location: { lat: 34.49244874, lon: -88.16277975 }
    },
    {
        firstname: 'Eric',
        lastname: 'Steeves ',
        age: 68,
        hometown: 'Modesto',
        location: { lat: 38.32815884, lon: -101.42400988 }
    },
    {
        firstname: 'Justin',
        lastname: 'Campbell',
        age: 26,
        hometown: 'Duncanville',
        location: { lat: 37.08421519, lon: -115.80546845 }
    },
    {
        firstname: 'Phillip',
        lastname: 'Henderson',
        age: 64,
        hometown: 'Nampa',
        location: { lat: 46.66403769, lon: -84.37413963 }
    },
    {
        firstname: 'Julia',
        lastname: 'Owens',
        age: 40,
        hometown: 'Scurry',
        location: { lat: 44.7713262, lon: -94.35508462 }
    },
    {
        firstname: 'Zoey',
        lastname: 'Williamson',
        age: 77,
        hometown: 'Yonkers',
        location: { lat: 45.69497259, lon: -85.41725187 }
    },
    {
        firstname: 'Amelia',
        lastname: 'Stephens',
        age: 70,
        hometown: 'Cambridge',
        location: { lat: 37.67566079, lon: -104.72863259 }
    },
    {
        firstname: 'Billy',
        lastname: 'Russell',
        age: 27,
        hometown: 'Fort Wayne',
        location: { lat: 36.328176, lon: -102.27095454 }
    },
    {
        firstname: 'Kylie',
        lastname: 'May',
        age: 29,
        hometown: 'Memphis',
        location: { lat: 45.4384685, lon: -109.95411997 }
    },
    {
        firstname: 'Ricardo',
        lastname: 'Kelley',
        age: 23,
        hometown: 'Arlington',
        location: { lat: 44.05517713, lon: -99.0337936 }
    },
    {
        firstname: 'Sue',
        lastname: 'Rhodes',
        age: 55,
        hometown: 'Duncanville',
        location: { lat: 34.6751983, lon: -115.52326403 }
    },
    {
        firstname: 'Everett',
        lastname: 'Murray',
        age: 41,
        hometown: 'Daly City',
        location: { lat: 41.49731832, lon: -87.86553674 }
    },
    {
        firstname: 'Leslie',
        lastname: 'Ross',
        age: 55,
        hometown: 'York',
        location: { lat: 45.7875935, lon: -121.04991238 }
    },
    {
        firstname: 'Julian',
        lastname: 'Watkins',
        age: 68,
        hometown: 'Round Rock',
        location: { lat: 44.42071071, lon: -91.4137739 }
    },
    {
        firstname: 'Maureen',
        lastname: 'Bradley',
        age: 51,
        hometown: 'Elizabeth',
        location: { lat: 45.89162218, lon: -99.96190951 }
    },
    {
        firstname: 'Billy',
        lastname: 'Oliver',
        age: 26,
        hometown: 'Scurry',
        location: { lat: 42.63310477, lon: -121.37202195 }
    },
    {
        firstname: 'Janice',
        lastname: 'Phillips',
        age: 73,
        hometown: 'Oceanside',
        location: { lat: 41.73391957, lon: -99.40453052 }
    },
    {
        firstname: 'Ethel',
        lastname: 'Jimenez',
        age: 30,
        hometown: 'Woodbridge',
        location: { lat: 41.77002613, lon: -115.68558523 }
    },
    {
        firstname: 'Clarence',
        lastname: 'Ford',
        age: 42,
        hometown: 'Vernon',
        location: { lat: 45.61001315, lon: -99.98436086 }
    },
    {
        firstname: 'Susan',
        lastname: 'Stone',
        age: 72,
        hometown: 'Waco',
        location: { lat: 34.82661136, lon: -79.71428375 }
    },
    {
        firstname: 'Mark',
        lastname: 'Jordan',
        age: 41,
        hometown: 'Lewisville',
        location: { lat: 36.23150376, lon: -97.81214438 }
    },
    {
        firstname: 'Derrick',
        lastname: 'Gonzalez',
        age: 53,
        hometown: 'Norwalk',
        location: { lat: 34.82418502, lon: -95.39986928 }
    },
    {
        firstname: 'Michele',
        lastname: 'Coleman',
        age: 35,
        hometown: 'Ironville',
        location: { lat: 44.86920613, lon: -121.40651626 }
    },
    {
        firstname: 'Bobby',
        lastname: 'Howell',
        age: 41,
        hometown: 'Hollywood',
        location: { lat: 42.67185787, lon: -119.05167458 }
    },
    {
        firstname: 'Adrian',
        lastname: 'Pena',
        age: 29,
        hometown: 'Paterson',
        location: { lat: 43.38130413, lon: -109.17072705 }
    },
    {
        firstname: 'Zoey',
        lastname: 'Olson',
        age: 73,
        hometown: 'Jackson',
        location: { lat: 36.37651149, lon: -113.64421133 }
    },
    {
        firstname: 'Dana',
        lastname: 'Bishop',
        age: 31,
        hometown: 'Jacksonville',
        location: { lat: 43.00367239, lon: -98.88962277 }
    },
    {
        firstname: 'Terri',
        lastname: 'Sanchez',
        age: 76,
        hometown: 'Salem',
        location: { lat: 34.8771595, lon: -88.67848946 }
    },
    {
        firstname: 'Cameron',
        lastname: 'Henderson',
        age: 29,
        hometown: 'Fort Lauderdale',
        location: { lat: 34.46291077, lon: -85.70231461 }
    },
    {
        firstname: 'Brent',
        lastname: 'Wright',
        age: 57,
        hometown: 'Newport News',
        location: { lat: 34.47635618, lon: -97.07334559 }
    },
    {
        firstname: 'Norman',
        lastname: 'Frazier',
        age: 72,
        hometown: 'Greensboro',
        location: { lat: 40.2682596, lon: -101.52957114 }
    },
    {
        firstname: 'Elizabeth',
        lastname: 'Young',
        age: 26,
        hometown: 'Omaha',
        location: { lat: 37.52026664, lon: -95.89407913 }
    },
    {
        firstname: 'Ramona',
        lastname: 'Burns',
        age: 25,
        hometown: 'St. Petersburg',
        location: { lat: 44.3720588, lon: -99.12041946 }
    },
    {
        firstname: 'Debbie',
        lastname: 'Castro',
        age: 58,
        hometown: 'Allentown',
        location: { lat: 36.69544676, lon: -91.54220898 }
    },
    {
        firstname: 'Felecia',
        lastname: 'Myers',
        age: 66,
        hometown: 'Louisville',
        location: { lat: 41.00618023, lon: -99.9638443 }
    },
    {
        firstname: 'Linda',
        lastname: 'Daniels',
        age: 34,
        hometown: 'Visalia',
        location: { lat: 41.25770764, lon: -92.43153217 }
    },
    {
        firstname: 'Henry',
        lastname: 'Morgan',
        age: 66,
        hometown: 'Pittsburgh',
        location: { lat: 38.85001583, lon: -96.14744356 }
    },
    {
        firstname: 'Caroline',
        lastname: 'Henry',
        age: 62,
        hometown: 'Los Angeles',
        location: { lat: 43.11120852, lon: -112.81427609 }
    },
    {
        firstname: 'Mason',
        lastname: 'Lambert',
        age: 70,
        hometown: 'North Valley',
        location: { lat: 44.58812993, lon: -86.82476742 }
    },
    {
        firstname: 'Stephen',
        lastname: 'Cruz',
        age: 49,
        hometown: 'Moreno Valley',
        location: { lat: 39.77941175, lon: -90.24029701 }
    },
    {
        firstname: 'Luis',
        lastname: 'Lawrence',
        age: 26,
        hometown: 'Lowell',
        location: { lat: 37.29978676, lon: -109.54877785 }
    }
];

module.exports = personData;