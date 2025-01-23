
const weatherAPIKey = "03913c19b8384a86afc22937241609"; 
const geoDBApiKey = "d1ed9f5ba2mshaacff379540b21bp11ddb3jsne4e6fc61f651"; 

async function getWeatherDetails(country, city) {
  try {
    const weatherURL = `https://api.weatherapi.com/v1/current.json?key=${weatherAPIKey}&q=${city},${country}`;
    const response = await fetch(weatherURL);

    if (!response.ok) throw new Error("Failed to fetch weather data.");

    const data = await response.json();
    const currentWeather = data.current;

    return [
        `${currentWeather.temp_c} °C`,           
        `${currentWeather.feelslike_c} °C`,      
        currentWeather.condition.text,           
        `${currentWeather.wind_kph} kph`,        
        `${currentWeather.pressure_in} in`,      
        currentWeather.wind_dir,                 
        `${currentWeather.humidity}%`,           
        `${currentWeather.cloud}%`,              
        currentWeather.uv                        
    ];
  } catch (error) {
    console.error("Error fetching weather details:", error.message);
    return null;
  }
}
let main_country_name="India";
let dataof = []; 
let data_names = {};
async function fetchCountryData() {
    let countyapi = "https://countriesnow.space/api/v0.1/countries";
    let response = await fetch(countyapi);
    let countryData = await response.json();
    dataof = countryData.data; 
}
function getCountryCityDict() {
    let countryCityDict = {};
    for (let i = 0; i < dataof.length; i++) {
        let country = dataof[i].country;
        let cities = dataof[i].cities;
        countryCityDict[country] = cities;
    }
    return countryCityDict;
}
async function initialize() {
    await fetchCountryData(); 
    let countryCityDict = getCountryCityDict();
    data_names = countryCityDict;
    console.log("Cities in India:", countryCityDict[main_country_name]);
   // main(main_country_name, "Hyderabad");
    main(main_country_name, "New Delhi");
    search_engine(countryCityDict[main_country_name],main_country_name);
    let i=0;
   /*setInterval(()=>{
      main("India",countryCityDict["India"][i])
      i++;
    },5000)*/
}
initialize();
function main(country, city="") {
  country=main_country_name;
  console.log("main",main_country_name);
  const nation = document.querySelector(".nation");
  nation.innerHTML=`
   <i class="fa-solid fa-location-dot"></i>
      ${country}
  `;
  const search_text = document.querySelector(".search_text");
  search_text.placeholder=`
  ${city}
  `;
  const tools_creation = async () => {
    const tools_name_arr = [
      "Temperature (°C)",
      "Feels Like (°C)",
      "Condition", 
      "Wind Speed (kph)", 
      "Pressure (in)", 
      "Wind Direction",
      "Humidity (%)", 
      "Cloud Cover (%)",
      "UV Index"
    ];
    const tools_icon_arr = [
      "fa-solid fa-temperature-low",
      "fa-solid fa-temperature-high",
      "fa-solid fa-sun", 
      "fa-solid fa-wind",
      "fa-solid fa-gauge-high",
      "fa-solid fa-compass", 
      "fa-solid fa-droplet",
      "fa-solid fa-cloud",
      "fa-solid fa-sun"
    ];

    const tools_block = document.querySelector(".tools_block");
    tools_block.innerHTML="";
    const data = await getWeatherDetails(country, city);
    
    if (data) {
      tools_block.innerHTML = ""; 

      for (let i = 0; i < tools_name_arr.length; i++) {
        const tools = document.createElement("div");
        tools.classList.add("tools");

        const tools_icon = document.createElement("div");
        tools_icon.classList.add("tools_icon");
        tools_icon.innerHTML = `<i class="${tools_icon_arr[i]}"></i>`;
        tools.appendChild(tools_icon);

        const tools_name_value = document.createElement("div");
        tools_name_value.classList.add("tools_name_value");

        const tools_name = document.createElement("div");
        tools_name.classList.add("tools_name");
        tools_name.innerText = tools_name_arr[i];

        const tools_value = document.createElement("div");
        tools_value.classList.add("tools_value");
        tools_value.innerText = data[i] !== undefined ? data[i] : "N/A";

        tools_name_value.appendChild(tools_name);
        tools_name_value.appendChild(tools_value);

        tools.appendChild(tools_name_value);
        tools_block.appendChild(tools);
      }
    } else {
      console.log("Weather data could not be fetched.");
    }
  };
  tools_creation();
}

function search_engine(s_s_r,country){
 country=main_country_name;
  const search_sugg_space = document.querySelector(".search_sugg_space");
  const search_text = document.querySelector(".search_text");
  console.log("search",data_names);
  const countryNames = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua and Barbuda", "Argentina",
  "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados",
  "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana",
  "Brazil", "British Indian Ocean Territory", "Brunei", "Bulgaria", "Burkina Faso", "Myanmar", "Burundi",
  "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad",
  "Christmas Island", "Cocos (Keeling) Islands", "Cook Islands", "Chile", "China", "Colombia", "Comoros",
  "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica",
  "Dominican Republic", "Timor-Leste", "Tokelau", "Turks and Caicos Islands", "Ecuador", "Egypt", "El Salvador",
  "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Faroe Islands", "Falkland Islands", "Fiji", "Finland",
  "France", "French Polynesia", "Gabon", "Gambia", "Georgia", "Gibraltar", "Germany", "Ghana", "Greece",
  "Greenland", "Guadeloupe", "Grenada", "Guernsey", "Guatemala", "Guam", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Heard Island and McDonald Islands", "Jordan", "Honduras", "Hong Kong", "Hungary", "Iceland", "India",
  "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Ivory Coast", "Jamaica", "Jersey",
  "Japan", "Kazakhstan", "Kenya", "Kiribati", "North Korea", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia",
  "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Luxembourg", "Macedonia", "Madagascar", "Marshall Islands",
  "Macau", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Martinique", "Mauritania", "Mauritius", "Mayotte",
  "Mexico", "Moldova", "Mongolia", "Montenegro", "Monaco", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nauru",
  "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Niue",
  "Norfolk Island", "Northern Mariana Islands", "Oman", "Pakistan", "Pitcairn", "Palau", "Panama", "Papua New Guinea",
  "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "South Korea", "Lithuania", "Qatar", "Romania",
  "Russia", "Rwanda", "Réunion", "Samoa", "Saint Lucia", "San Marino", "Saint Kitts and Nevis", "Saint Pierre and Miquelon",
  "Saint Vincent and the Grenadines", "Saudi Arabia", "Senegal", "South Georgia and the South Sandwich Islands", "Sao Tome and Principe",
  "Sierra Leone", "Serbia", "Seychelles", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa",
  "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tanzania", "Thailand",
  "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Uganda", "Ukraine", "United Arab Emirates",
  "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City State (Holy See)", "Wallis and Futuna",
  "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];
 const countryCapitals = {
  Afghanistan: "Kabul",
  Albania: "Tirana",
  Algeria: "Algiers",
  Andorra: "Andorra la Vella",
  Angola: "Luanda",
  Anguilla: "The Valley",
  "Antigua and Barbuda": "Saint John's",
  Argentina: "Buenos Aires",
  Armenia: "Yerevan",
  Aruba: "Oranjestad",
  Australia: "Canberra",
  Austria: "Vienna",
  Azerbaijan: "Baku",
  Bahamas: "Nassau",
  Bahrain: "Manama",
  Bangladesh: "Dhaka",
  Barbados: "Bridgetown",
  Belarus: "Minsk",
  Belgium: "Brussels",
  Belize: "Belmopan",
  Benin: "Porto-Novo",
  Bermuda: "Hamilton",
  Bhutan: "Thimphu",
  Bolivia: "Sucre",
  "Bosnia and Herzegovina": "Sarajevo",
  Botswana: "Gaborone",
  Brazil: "Brasília",
  "British Indian Ocean Territory": "Diego Garcia",
  Brunei: "Bandar Seri Begawan",
  Bulgaria: "Sofia",
  "Burkina Faso": "Ouagadougou",
  Myanmar: "Naypyidaw",
  Burundi: "Gitega",
  Cambodia: "Phnom Penh",
  Cameroon: "Yaoundé",
  Canada: "Ottawa",
  "Cape Verde": "Praia",
  "Cayman Islands": "George Town",
  "Central African Republic": "Bangui",
  Chad: "N'Djamena",
  "Christmas Island": "Flying Fish Cove",
  "Cocos (Keeling) Islands": "West Island",
  "Cook Islands": "Avarua",
  Chile: "Santiago",
  China: "Beijing",
  Colombia: "Bogotá",
  Comoros: "Moroni",
  Congo: "Brazzaville",
  "Costa Rica": "San José",
  Croatia: "Zagreb",
  Cuba: "Havana",
  Cyprus: "Nicosia",
  "Czech Republic": "Prague",
  Denmark: "Copenhagen",
  Djibouti: "Djibouti",
  Dominica: "Roseau",
  "Dominican Republic": "Santo Domingo",
  "Timor-Leste": "Dili",
  Tokelau: "Nukunonu",
  "Turks and Caicos Islands": "Cockburn Town",
  Ecuador: "Quito",
  Egypt: "Cairo",
  "El Salvador": "San Salvador",
  "Equatorial Guinea": "Malabo",
  Eritrea: "Asmara",
  Estonia: "Tallinn",
  Ethiopia: "Addis Ababa",
  "Faroe Islands": "Tórshavn",
  "Falkland Islands": "Stanley",
  Fiji: "Suva",
  Finland: "Helsinki",
  France: "Paris",
  "French Polynesia": "Papeete",
  Gabon: "Libreville",
  Gambia: "Banjul",
  Georgia: "Tbilisi",
  Gibraltar: "Gibraltar",
  Germany: "Berlin",
  Ghana: "Accra",
  Greece: "Athens",
  Greenland: "Nuuk",
  Guadeloupe: "Basse-Terre",
  Grenada: "Saint George's",
  Guernsey: "St. Peter Port",
  Guatemala: "Guatemala City",
  Guam: "Hagåtña",
  Guinea: "Conakry",
  "Guinea-Bissau": "Bissau",
  Guyana: "Georgetown",
  Haiti: "Port-au-Prince",
  "Heard Island and McDonald Islands": "N/A",
  Jordan: "Amman",
  Honduras: "Tegucigalpa",
  "Hong Kong": "Hong Kong",
  Hungary: "Budapest",
  Iceland: "Reykjavík",
  India: "New Delhi",
  Indonesia: "Jakarta",
  Iran: "Tehran",
  Iraq: "Baghdad",
  Ireland: "Dublin",
  "Isle of Man": "Douglas",
  Israel: "Jerusalem",
  Italy: "Rome",
  "Ivory Coast": "Yamoussoukro",
  Jamaica: "Kingston",
  Jersey: "Saint Helier",
  Japan: "Tokyo",
  Kazakhstan: "Astana",
  Kenya: "Nairobi",
  Kiribati: "Tarawa",
  "North Korea": "Pyongyang",
  Kosovo: "Pristina",
  Kuwait: "Kuwait City",
  Kyrgyzstan: "Bishkek",
  Laos: "Vientiane",
  Latvia: "Riga",
  Lebanon: "Beirut",
  Lesotho: "Maseru",
  Liberia: "Monrovia",
  Libya: "Tripoli",
  Liechtenstein: "Vaduz",
  Luxembourg: "Luxembourg",
  Macedonia: "Skopje",
  Madagascar: "Antananarivo",
  "Marshall Islands": "Majuro",
  Macau: "Macau",
  Malawi: "Lilongwe",
  Malaysia: "Kuala Lumpur",
  Maldives: "Malé",
  Mali: "Bamako",
  Malta: "Valletta",
  Martinique: "Fort-de-France",
  Mauritania: "Nouakchott",
  Mauritius: "Port Louis",
  Mayotte: "Mamoudzou",
  Mexico: "Mexico City",
  Moldova: "Chișinău",
  Mongolia: "Ulaanbaatar",
  Montenegro: "Podgorica",
  Monaco: "Monaco",
  Montserrat: "Plymouth",
  Morocco: "Rabat",
  Mozambique: "Maputo",
  Namibia: "Windhoek",
  Nauru: "Yaren",
  Nepal: "Kathmandu",
  Netherlands: "Amsterdam",
  "New Caledonia": "Nouméa",
  "New Zealand": "Wellington",
  Nicaragua: "Managua",
  Niger: "Niamey",
  Nigeria: "Abuja",
  Norway: "Oslo",
  Niue: "Alofi",
  "Norfolk Island": "Kingston",
  "Northern Mariana Islands": "Saipan",
  Oman: "Muscat",
  Pakistan: "Islamabad",
  Pitcairn: "Adamstown",
  Palau: "Ngerulmud",
  Panama: "Panama City",
  "Papua New Guinea": "Port Moresby",
  Paraguay: "Asunción",
  Peru: "Lima",
  Philippines: "Manila",
  Poland: "Warsaw",
  Portugal: "Lisbon",
  "Puerto Rico": "San Juan",
  "South Korea": "Seoul",
  Lithuania: "Vilnius",
  Qatar: "Doha",
  Romania: "Bucharest",
  Russia: "Moscow",
  Rwanda: "Kigali",
  Réunion: "Saint-Denis",
  Samoa: "Apia",
  "Saint Lucia": "Castries",
  "San Marino": "San Marino",
  "Saint Kitts and Nevis": "Basseterre",
  "Saint Pierre and Miquelon": "Saint-Pierre",
  "Saint Vincent and the Grenadines": "Kingstown",
  "Saudi Arabia": "Riyadh",
  Senegal: "Dakar",
  "South Georgia and the South Sandwich Islands": "King Edward Point",
  "Sao Tome and Principe": "São Tomé",
  "Sierra Leone": "Freetown",
  Serbia: "Belgrade",
  Seychelles: "Victoria",
  Singapore: "Singapore",
  Slovakia: "Bratislava",
  Slovenia: "Ljubljana",
  "Solomon Islands": "Honiara",
  Somalia: "Mogadishu",
  "South Africa": "Pretoria",
  Spain: "Madrid",
  "Sri Lanka": "Sri Jayawardenepura Kotte",
  Sudan: "Khartoum",
  Suriname: "Paramaribo",
  Swaziland: "Mbabane",
  Sweden: "Stockholm",
  Switzerland: "Bern",
  Syria: "Damascus",
  Taiwan: "Taipei",
  Tanzania: "Dodoma",
  Thailand: "Bangkok",
  Togo: "Lomé",
  Tonga: "Nukuʻalofa",
  "Trinidad and Tobago": "Port of Spain",
  Tunisia: "Tunis",
  Turkey: "Ankara",
  Turkmenistan: "Ashgabat",
  Uganda: "Kampala",
  Ukraine: "Kyiv",
  "United Arab Emirates": "Abu Dhabi",
  "United Kingdom": "London",
  "United States": "Washington, D.C.",
  Uruguay: "Montevideo",
  Uzbekistan: "Tashkent",
  Vanuatu: "Port Vila",
  "Vatican City State (Holy See)": "Vatican City",
  "Wallis and Futuna": "Mata-Utu",
  Venezuela: "Caracas",
  Vietnam: "Hanoi",
  Yemen: "Sana'a",
  Zambia: "Lusaka",
  Zimbabwe: "Harare"
};
for(let x=0;x<data_names[main_country_name].length;x++){
  s_s_r[x]=data_names[main_country_name][x];
  }
let zx=s_s_r.length;
let real_s_s_r_l=s_s_r.length;
  for(let x=0;x<countryNames.length;x++){
  s_s_r[zx]=countryNames[x];
  zx++;
  }
 console.log("hhhh",s_s_r);
//const s_s_r=data_names["India"];  
const s_s=[];
let city_names=[];
let len=[];
let v="";
const search_text_fun=()=>{
  v=search_text.value.toLowerCase();
  search_sugg_space.innerHTML="";
  let y=0;
  s_s.length=0;
  
  for(let i=0;i<s_s_r.length;i++){
    if(v.length){
    //  let s_s_r_i=s_s_r[i]+` , ${country}`;
    yes=true;
    for(let x=0;x<countryNames.length;x++){
      if(s_s_r[i]==countryNames[x]){
        yes=false;
        break;
      }
    }
    let s_s_r_i="";
    if(yes){
      s_s_r_i=s_s_r[i]+` , ${country}`;
    }
    else{
      s_s_r_i=s_s_r[i];
     // console.log(s_s_r_i)
    }
    
      city_names_i=s_s_r[i];
  for(let j=0;j<=s_s_r_i.length-v.length;j++){
      if(s_s_r_i.slice(j,j+v.length).toLowerCase()==v){
   s_s[y]=s_s_r_i;
   len[y]=j;
   city_names[y]=city_names_i;
   // console.log(y)
    y++;
      }
    }
    }
  }
  if(s_s.length)
  {
    let tep=[];
    let tep_len=[];
    let tep_city_name=[];
    let u=0;
    for(let i=0;i<y;i++)
    {
      if(v[0]==s_s[i][0].toLowerCase()){
      tep[u]=s_s[i];
      tep_len[u]=len[i];
      tep_city_name[u]=city_names[i];
      u++;
      }
    }
    for(let i=0;i<y;i++){
      if(v[0]!=s_s[i][0].toLowerCase()){
      tep[u]=s_s[i];
      tep_len[u]=len[i];
      tep_city_name[u]=city_names[i];
      u++;
      }
    }
    //console.log(tep,tep_len);
    for(let i=0;i<y;i++){
    s_s[i]=tep[i];
    len[i]=tep_len[i];
    city_names[i]=tep_city_name[i];
    }
    
  }
  sugg();
}
const sugg=()=>{
  if(s_s.length<5){
    search_sugg_space.style.height=`${s_s.length*6}vh`;
  }
  else{
    search_sugg_space.style.height=`30vh`;
  }
for(let i=0;i<s_s.length;i++){
  
const search_sugg_blocks=document.createElement("div");
search_sugg_blocks.classList.add("search_sugg_blocks");
const search_sugg_icon=document.createElement("div");
search_sugg_icon.classList.add("search_sugg_icon");

const search_sugg_text=document.createElement("div");
search_sugg_text.classList.add("search_sugg_text");
search_sugg_text.innerHTML=`${s_s[i].slice(0,len[i])}<span>${s_s[i].slice(len[i],len[i]+v.length)}</span>${s_s[i].slice(len[i]+v.length,)}`;
search_sugg_blocks.append(search_sugg_icon);
search_sugg_blocks.append(search_sugg_text);
search_sugg_blocks.addEventListener("click",()=>{
  search_text.value=s_s[i];
  search_text.value="";
  search_text_fun();
  console.log("s_s",s_s[i],city_names[i]);
  
  //
  yes=true;
    for(let x=0;x<countryNames.length;x++){
      if(city_names[i]==countryNames[x]){
        yes=false;
        break;
      }
    }
    if(yes){
      main(country,city_names[i]);
    }
    else{
     const nation = document.querySelector(".nation");
    nation.innerHTML=`
   <i class="fa-solid fa-location-dot"></i>
      ${city_names[i]}`;
     main_country_name=city_names[i];
     console.log(main_country_name);
     search_engine(["1","3"],"country");
     main(country,countryCapitals[main_country_name]);
    }
  
})
search_sugg_space.append(search_sugg_blocks);
}

}

search_text.addEventListener("input",()=>{
  search_text_fun();
});
}

