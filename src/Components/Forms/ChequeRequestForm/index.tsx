//@ts-ignore
//@ts-nocheck
import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";
import * as toast from "../../../utils/makeToast";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";
import { getLocalStorageItem } from "../../../utils/localStorage";
import ChequeRequestSuccess from "./ChequeRequestSuccess";

export default function ChequeRequestForm() {
  const [validating, setValidating] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userDetails, setUserDetails] = useState(
    getLocalStorageItem("userDetails")
  );
  const [quantityValue, setquantityValue] = useState(1);
  const [leavesValue, setLeavesValue] = useState("50 leaves");
  const [selectBranchPickup, setSelectBranchPickup] = useState(true);
  const [selectHomeDelivery, setSelectHomeDelivery] = useState(false);

  const [houseNumber, setHouseNumber] = useState("");
  const [streetName, setStreetName] = useState("");
  const [busStop, setBusStop] = useState("");
  const [area, setArea] = useState("");
  const [state, setState] = useState("");
  const [branch, setBranch] = useState("");

  const states = [
    {
      code: "FC",
      name: "Abuja",
      lgas: ["Abuja", "Kwali", "Kuje", "Gwagwalada", "Bwari", "Abaji"],
    },
    {
      code: "AB",
      name: "Abia",
      lgas: [
        "Aba North",
        "Aba South",
        "Arochukwu",
        "Bende",
        "Ikawuno",
        "Ikwuano",
        "Isiala-Ngwa North",
        "Isiala-Ngwa South",
        "Isuikwuato",
        "Umu Nneochi",
        "Obi Ngwa",
        "Obioma Ngwa",
        "Ohafia",
        "Ohaozara",
        "Osisioma",
        "Ugwunagbo",
        "Ukwa West",
        "Ukwa East",
        "Umuahia North",
        "Umuahia South",
      ],
    },
    {
      code: "AD",
      name: "Adamawa",
      lgas: [
        "Demsa",
        "Fufore",
        "Ganye",
        "Girei",
        "Gombi",
        "Guyuk",
        "Hong",
        "Jada",
        "Lamurde",
        "Madagali",
        "Maiha",
        "Mayo-Belwa",
        "Michika",
        "Mubi-North",
        "Mubi-South",
        "Numan",
        "Shelleng",
        "Song",
        "Toungo",
        "Yola North",
        "Yola South",
      ],
    },
    {
      code: "AK",
      name: "AkwaIbom",
      lgas: [
        "Abak",
        "Eastern-Obolo",
        "Eket",
        "Esit-Eket",
        "Essien-Udim",
        "Etim-Ekpo",
        "Etinan",
        "Ibeno",
        "Ibesikpo-Asutan",
        "Ibiono-Ibom",
        "Ika",
        "Ikono",
        "Ikot-Abasi",
        "Ikot-Ekpene",
        "Ini",
        "Itu",
        "Mbo",
        "Mkpat-Enin",
        "Nsit-Atai",
        "Nsit-Ibom",
        "Nsit-Ubium",
        "Obot-Akara",
        "Okobo",
        "Onna",
        "Oron",
        "Oruk Anam",
        "Udung-Uko",
        "Ukanafun",
        "Urue-Offong/Oruko",
        "Uruan",
        "Uyo",
      ],
    },
    {
      code: "AN",
      name: "Anambra",
      lgas: [
        "Aguata",
        "Anambra East",
        "Anambra West",
        "Anaocha",
        "Awka North",
        "Awka South",
        "Ayamelum",
        "Dunukofia",
        "Ekwusigo",
        "Idemili-North",
        "Idemili-South",
        "Ihiala",
        "Njikoka",
        "Nnewi-North",
        "Nnewi-South",
        "Ogbaru",
        "Onitsha-North",
        "Onitsha-South",
        "Orumba-North",
        "Orumba-South",
      ],
    },
    {
      code: "BA",
      name: "Bauchi",
      lgas: [
        "Alkaleri",
        "Bauchi",
        "Bogoro",
        "Damban",
        "Darazo",
        "Dass",
        "Gamawa",
        "Ganjuwa",
        "Giade",
        "Itas Gadau",
        "Jama'Are",
        "Katagum",
        "Kirfi",
        "Misau",
        "Ningi",
        "Shira",
        "Tafawa-Balewa",
        "Toro",
        "Warji",
        "Zaki",
      ],
    },
    {
      code: "BY",
      name: "Bayelsa",
      lgas: [
        "Brass",
        "Ekeremor",
        "Kolokuma Opokuma",
        "Nembe",
        "Ogbia",
        "Sagbama",
        "Southern-Ijaw",
        "Yenagoa",
      ],
    },
    {
      code: "BE",
      name: "Benue",
      lgas: [
        "Ado",
        "Agatu",
        "Apa",
        "Buruku",
        "Gboko",
        "Guma",
        "Gwer-East",
        "Gwer-West",
        "Katsina-Ala",
        "Konshisha",
        "Kwande",
        "Logo",
        "Makurdi",
        "Ogbadibo",
        "Ohimini",
        "Oju",
        "Okpokwu",
        "Otukpo",
        "Tarka",
        "Ukum",
        "Ushongo",
        "Vandeikya",
      ],
    },
    {
      code: "BO",
      name: "Borno",
      lgas: [
        "Abadam",
        "Askira-Uba",
        "Bama",
        "Bayo",
        "Biu",
        "Chibok",
        "Damboa",
        "Dikwa",
        "Gubio",
        "Guzamala",
        "Gwoza",
        "Hawul",
        "Jere",
        "Kaga",
        "Kala Balge",
        "Konduga",
        "Kukawa",
        "Kwaya-Kusar",
        "Mafa",
        "Magumeri",
        "Maiduguri",
        "Marte",
        "Mobbar",
        "Monguno",
        "Ngala",
        "Nganzai",
        "Shani",
      ],
    },
    {
      code: "CR",
      name: "CrossRiver",
      lgas: [
        "Abi",
        "Akamkpa",
        "Akpabuyo",
        "Bakassi",
        "Bekwarra",
        "Biase",
        "Boki",
        "Calabar-Municipal",
        "Calabar-South",
        "Etung",
        "Ikom",
        "Obanliku",
        "Obubra",
        "Obudu",
        "Odukpani",
        "Ogoja",
        "Yakurr",
        "Yala",
      ],
    },
    {
      code: "DE",
      name: "Delta",
      lgas: [
        "Aniocha North",
        "Aniocha-North",
        "Aniocha-South",
        "Bomadi",
        "Burutu",
        "Ethiope-East",
        "Ethiope-West",
        "Ika-North-East",
        "Ika-South",
        "Isoko-North",
        "Isoko-South",
        "Ndokwa-East",
        "Ndokwa-West",
        "Okpe",
        "Oshimili-North",
        "Oshimili-South",
        "Patani",
        "Sapele",
        "Udu",
        "Ughelli-North",
        "Ughelli-South",
        "Ukwuani",
        "Uvwie",
        "Warri South-West",
        "Warri North",
        "Warri South",
      ],
    },
    {
      code: "EB",
      name: "Ebonyi",
      lgas: [
        "Abakaliki",
        "Afikpo-North",
        "Afikpo South (Edda)",
        "Ebonyi",
        "Ezza-North",
        "Ezza-South",
        "Ikwo",
        "Ishielu",
        "Ivo",
        "Izzi",
        "Ohaukwu",
        "Onicha",
      ],
    },
    {
      code: "ED",
      name: "Edo",
      lgas: [
        "Akoko Edo",
        "Egor",
        "Esan-Central",
        "Esan-North-East",
        "Esan-South-East",
        "Esan-West",
        "Etsako-Central",
        "Etsako-East",
        "Etsako-West",
        "Igueben",
        "Ikpoba-Okha",
        "Oredo",
        "Orhionmwon",
        "Ovia-North-East",
        "Ovia-South-West",
        "Owan East",
        "Owan-West",
        "Uhunmwonde",
      ],
    },
    {
      code: "EK",
      name: "Ekiti",
      lgas: [
        "Ado-Ekiti",
        "Efon",
        "Ekiti-East",
        "Ekiti-South-West",
        "Ekiti-West",
        "Emure",
        "Gbonyin",
        "Ido-Osi",
        "Ijero",
        "Ikere",
        "Ikole",
        "Ilejemeje",
        "Irepodun Ifelodun",
        "Ise-Orun",
        "Moba",
        "Oye",
      ],
    },
    {
      code: "EN",
      name: "Enugu",
      lgas: [
        "Aninri",
        "Awgu",
        "Enugu-East",
        "Enugu-North",
        "Enugu-South",
        "Ezeagu",
        "Igbo-Etiti",
        "Igbo-Eze-North",
        "Igbo-Eze-South",
        "Isi-Uzo",
        "Nkanu-East",
        "Nkanu-West",
        "Nsukka",
        "Oji-River",
        "Udenu",
        "Udi",
        "Uzo-Uwani",
      ],
    },
    {
      code: "GO",
      name: "Gombe",
      lgas: [
        "Akko",
        "Balanga",
        "Billiri",
        "Dukku",
        "Funakaye",
        "Gombe",
        "Kaltungo",
        "Kwami",
        "Nafada",
        "Shongom",
        "Yamaltu Deba",
      ],
    },
    {
      code: "IM",
      name: "Imo",
      lgas: [
        "Aboh-Mbaise",
        "Ahiazu-Mbaise",
        "Ehime-Mbano",
        "Ezinihitte",
        "Ideato-North",
        "Ideato-South",
        "Ihitte Uboma",
        "Ikeduru",
        "Isiala-Mbano",
        "Isu",
        "Mbaitoli",
        "Ngor-Okpala",
        "Njaba",
        "Nkwerre",
        "Nwangele",
        "Obowo",
        "Oguta",
        "Ohaji-Egbema",
        "Okigwe",
        "Onuimo",
        "Orlu",
        "Orsu",
        "Oru-East",
        "Oru-West",
        "Owerri-Municipal",
        "Owerri-North",
        "Owerri-West",
      ],
    },
    {
      code: "JI",
      name: "Jigawa",
      lgas: [
        "Auyo",
        "Babura",
        "Biriniwa",
        "Birnin-Kudu",
        "Buji",
        "Dutse",
        "Gagarawa",
        "Garki",
        "Gumel",
        "Guri",
        "Gwaram",
        "Gwiwa",
        "Hadejia",
        "Jahun",
        "Kafin-Hausa",
        "Kaugama",
        "Kazaure",
        "Kiri kasama",
        "Maigatari",
        "Malam Madori",
        "Miga",
        "Ringim",
        "Roni",
        "Sule-Tankarkar",
        "Taura",
        "Yankwashi",
      ],
    },
    {
      code: "KD",
      name: "Kaduna",
      lgas: [
        "Birnin-Gwari",
        "Chikun",
        "Giwa",
        "Igabi",
        "Ikara",
        "Jaba",
        "Jema'A",
        "Kachia",
        "Kaduna-North",
        "Kaduna-South",
        "Kagarko",
        "Kajuru",
        "Kaura",
        "Kauru",
        "Kubau",
        "Kudan",
        "Lere",
        "Makarfi",
        "Sabon-Gari",
        "Sanga",
        "Soba",
        "Zangon-Kataf",
        "Zaria",
      ],
    },
    {
      code: "KN",
      name: "Kano",
      lgas: [
        "Ajingi",
        "Albasu",
        "Bagwai",
        "Bebeji",
        "Bichi",
        "Bunkure",
        "Dala",
        "Dambatta",
        "Dawakin-Kudu",
        "Dawakin-Tofa",
        "Doguwa",
        "Fagge",
        "Gabasawa",
        "Garko",
        "Garun-Mallam",
        "Gaya",
        "Gezawa",
        "Gwale",
        "Gwarzo",
        "Kabo",
        "Kano-Municipal",
        "Karaye",
        "Kibiya",
        "Kiru",
        "Kumbotso",
        "Kunchi",
        "Kura",
        "Madobi",
        "Makoda",
        "Minjibir",
        "Nasarawa",
        "Rano",
        "Rimin-Gado",
        "Rogo",
        "Shanono",
        "Sumaila",
        "Takai",
        "Tarauni",
        "Tofa",
        "Tsanyawa",
        "Tudun-Wada",
        "Ungogo",
        "Warawa",
        "Wudil",
      ],
    },
    {
      code: "KT",
      name: "Katsina",
      lgas: [
        "Bakori",
        "Batagarawa",
        "Batsari",
        "Baure",
        "Bindawa",
        "Charanchi",
        "Dan-Musa",
        "Dandume",
        "Danja",
        "Daura",
        "Dutsi",
        "Dutsin-Ma",
        "Faskari",
        "Funtua",
        "Ingawa",
        "Jibia",
        "Kafur",
        "Kaita",
        "Kankara",
        "Kankia",
        "Katsina",
        "Kurfi",
        "Kusada",
        "Mai-Adua",
        "Malumfashi",
        "Mani",
        "Mashi",
        "Matazu",
        "Musawa",
        "Rimi",
        "Sabuwa",
        "Safana",
        "Sandamu",
        "Zango",
      ],
    },
    {
      code: "KE",
      name: "Kebbi",
      lgas: [
        "Aleiro",
        "Arewa-Dandi",
        "Argungu",
        "Augie",
        "Bagudo",
        "Birnin-Kebbi",
        "Bunza",
        "Dandi",
        "Fakai",
        "Gwandu",
        "Jega",
        "Kalgo",
        "Koko-Besse",
        "Maiyama",
        "Ngaski",
        "Sakaba",
        "Shanga",
        "Suru",
        "Wasagu/Danko",
        "Yauri",
        "Zuru",
      ],
    },
    {
      code: "KO",
      name: "Kogi",
      lgas: [
        "Adavi",
        "Ajaokuta",
        "Ankpa",
        "Dekina",
        "Ibaji",
        "Idah",
        "Igalamela-Odolu",
        "Ijumu",
        "Kabba Bunu",
        "Kogi",
        "Lokoja",
        "Mopa-Muro",
        "Ofu",
        "Ogori Magongo",
        "Okehi",
        "Okene",
        "Olamaboro",
        "Omala",
        "Oyi",
        "Yagba-East",
        "Yagba-West",
      ],
    },
    {
      code: "KW",
      name: "Kwara",
      lgas: [
        "Asa",
        "Baruten",
        "Edu",
        "Ekiti (Araromi/Opin)",
        "Ilorin-East",
        "Ilorin-South",
        "Ilorin-West",
        "Isin",
        "Kaiama",
        "Moro",
        "Offa",
        "Oke-Ero",
        "Oyun",
        "Pategi",
      ],
    },
    {
      code: "LA",
      name: "Lagos",
      lgas: [
        "Agege",
        "Ajeromi-Ifelodun",
        "Alimosho",
        "Amuwo-Odofin",
        "Apapa",
        "Badagry",
        "Epe",
        "Eti-Osa",
        "Ibeju-Lekki",
        "Ifako-Ijaiye",
        "Ikeja",
        "Ikorodu",
        "Kosofe",
        "Lagos-Island",
        "Lagos-Mainland",
        "Mushin",
        "Ojo",
        "Oshodi-Isolo",
        "Shomolu",
        "Surulere",
        "Yewa-South",
      ],
    },
    {
      code: "NA",
      name: "Nassarawa",
      lgas: [
        "Akwanga",
        "Awe",
        "Doma",
        "Karu",
        "Keana",
        "Keffi",
        "Kokona",
        "Lafia",
        "Nasarawa",
        "Nasarawa-Eggon",
        "Obi",
        "Wamba",
        "Toto",
      ],
    },
    {
      code: "NI",
      name: "Niger",
      lgas: [
        "Agaie",
        "Agwara",
        "Bida",
        "Borgu",
        "Bosso",
        "Chanchaga",
        "Edati",
        "Gbako",
        "Gurara",
        "Katcha",
        "Kontagora",
        "Lapai",
        "Lavun",
        "Magama",
        "Mariga",
        "Mashegu",
        "Mokwa",
        "Moya",
        "Paikoro",
        "Rafi",
        "Rijau",
        "Shiroro",
        "Suleja",
        "Tafa",
        "Wushishi",
      ],
    },
    {
      code: "OG",
      name: "Ogun",
      lgas: [
        "Abeokuta-North",
        "Abeokuta-South",
        "Ado-Odo Ota",
        "Ewekoro",
        "Ifo",
        "Ijebu-East",
        "Ijebu-North",
        "Ijebu-North-East",
        "Ijebu-Ode",
        "Ikenne",
        "Imeko-Afon",
        "Ipokia",
        "Obafemi-Owode",
        "Odeda",
        "Odogbolu",
        "Ogun-Waterside",
        "Remo-North",
        "Shagamu",
        "Yewa North",
      ],
    },
    {
      code: "ON",
      name: "Ondo",
      lgas: [
        "Akoko North-East",
        "Akoko North-West",
        "Akoko South-West",
        "Akoko South-East",
        "Akure-North",
        "Akure-South",
        "Ese-Odo",
        "Idanre",
        "Ifedore",
        "Ilaje",
        "Ile-Oluji-Okeigbo",
        "Irele",
        "Odigbo",
        "Okitipupa",
        "Ondo West",
        "Ondo-East",
        "Ose",
        "Owo",
      ],
    },
    {
      code: "OS",
      name: "Osun",
      lgas: [
        "Atakumosa West",
        "Atakumosa East",
        "Ayedaade",
        "Ayedire",
        "Boluwaduro",
        "Boripe",
        "Ede South",
        "Ede North",
        "Egbedore",
        "Ejigbo",
        "Ife North",
        "Ife South",
        "Ife-Central",
        "Ife-East",
        "Ifelodun",
        "Ila",
        "Ilesa-East",
        "Ilesa-West",
        "Irepodun",
        "Irewole",
        "Isokan",
        "Iwo",
        "Obokun",
        "Odo-Otin",
        "Ola Oluwa",
        "Olorunda",
        "Oriade",
        "Orolu",
        "Osogbo",
      ],
    },
    {
      code: "OY",
      name: "Oyo",
      lgas: [
        "Afijio",
        "Akinyele",
        "Atiba",
        "Atisbo",
        "Egbeda",
        "Ibadan North",
        "Ibadan North-East",
        "Ibadan North-West",
        "Ibadan South-East",
        "Ibadan South-West",
        "Ibarapa-Central",
        "Ibarapa-East",
        "Ibarapa-North",
        "Ido",
        "Ifedayo",
        "Irepo",
        "Iseyin",
        "Itesiwaju",
        "Iwajowa",
        "Kajola",
        "Lagelu",
        "Ogo-Oluwa",
        "Ogbomosho-North",
        "Ogbomosho-South",
        "Olorunsogo",
        "Oluyole",
        "Ona-Ara",
        "Orelope",
        "Ori-Ire",
        "Oyo-West",
        "Oyo-East",
        "Saki-East",
        "Saki-West",
        "Surulere",
      ],
    },
    {
      code: "PL",
      name: "Plateau",
      lgas: [
        "Barkin-Ladi",
        "Bassa",
        "Bokkos",
        "Jos-East",
        "Jos-North",
        "Jos-South",
        "Kanam",
        "Kanke",
        "Langtang-North",
        "Langtang-South",
        "Mangu",
        "Mikang",
        "Pankshin",
        "Qua'an Pan",
        "Riyom",
        "Shendam",
        "Wase",
      ],
    },
    {
      code: "RI",
      name: "Rivers",
      lgas: [
        "Abua Odual",
        "Ahoada-East",
        "Ahoada-West",
        "Akuku Toru",
        "Andoni",
        "Asari-Toru",
        "Bonny",
        "Degema",
        "Eleme",
        "Emuoha",
        "Etche",
        "Gokana",
        "Ikwerre",
        "Khana",
        "Obio Akpor",
        "Ogba-Egbema-Ndoni",
        "Ogba Egbema Ndoni",
        "Ogu Bolo",
        "Okrika",
        "Omuma",
        "Opobo Nkoro",
        "Oyigbo",
        "Port-Harcourt",
        "Tai",
      ],
    },
    {
      code: "SO",
      name: "Sokoto",
      lgas: [
        "Binji",
        "Bodinga",
        "Dange-Shuni",
        "Gada",
        "Goronyo",
        "Gudu",
        "Gwadabawa",
        "Illela",
        "Kebbe",
        "Kware",
        "Rabah",
        "Sabon Birni",
        "Shagari",
        "Silame",
        "Sokoto-North",
        "Sokoto-South",
        "Tambuwal",
        "Tangaza",
        "Tureta",
        "Wamako",
        "Wurno",
        "Yabo",
      ],
    },
    {
      code: "TA",
      name: "Taraba",
      lgas: [
        "Ardo-Kola",
        "Bali",
        "Donga",
        "Gashaka",
        "Gassol",
        "Ibi",
        "Jalingo",
        "Karim-Lamido",
        "Kurmi",
        "Lau",
        "Sardauna",
        "Takum",
        "Ussa",
        "Wukari",
        "Yorro",
        "Zing",
      ],
    },
    {
      code: "YO",
      name: "Yobe",
      lgas: [
        "Bade",
        "Bursari",
        "Damaturu",
        "Fika",
        "Fune",
        "Geidam",
        "Gujba",
        "Gulani",
        "Jakusko",
        "Karasuwa",
        "Machina",
        "Nangere",
        "Nguru",
        "Potiskum",
        "Tarmuwa",
        "Yunusari",
        "Yusufari",
      ],
    },
    {
      code: "ZA",
      name: "Zamfara",
      lgas: [
        "Anka",
        "Bakura",
        "Birnin Magaji/Kiyaw",
        "Bukkuyum",
        "Bungudu",
        "Gummi",
        "Gusau",
        "Isa",
        "Kaura-Namoda",
        "Kiyawa",
        "Maradun",
        "Maru",
        "Shinkafi",
        "Talata-Mafara",
        "Tsafe",
        "Zurmi",
      ],
    },
  ];

  const handleBranchPickup = () => {
    setSelectBranchPickup(true);
    setSelectHomeDelivery(false);
  };

  const handleHomeDelivery = () => {
    setSelectBranchPickup(false);
    setSelectHomeDelivery(true);
  };

  const leaveValueAnswer = () => {};
  const handleChange = (event: any) => {
    setquantityValue(event.target.value);
  };

  useEffect(() => {
    if (quantityValue == 2) {
      setLeavesValue("100 leaves");
    } else if (quantityValue == 3) {
      setLeavesValue("150 leaves");
    } else setLeavesValue("50 leaves");
  }, [quantityValue]);

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleBranchChange = (event) => {
    setBranch(event.target.value);
  };

  console.log(quantityValue);
  const formik = useFormik({
    initialValues: {
      quantity: "",
    },
    onSubmit: () => {
      setValidating(true);
      SubmitChequeRequestForm();
    },
  });
  const quantities = [
    {
      id: 1,
      name: 1,
    },
    {
      id: 2,
      name: 2,
    },
    {
      id: 3,
      name: 3,
    },
  ];

  const SubmitChequeRequestForm = () => {
    setValidating(true);
    let ChequeRequestPayload = {
      referenceId: userDetails.referenceId,
      requestedDate: "2022-09-11T22:35:30.109Z",
      eSignature: "string",
      userPicture: "string",
      requestLetter: "string",
      quantity: quantityValue,
      state: state,
      branch: branch,
      houseNumber: "string",
      streetName: "string",
      nearestBusStop: "string",
    };

    axios
      .post(
        `${baseUrl}ChequeRequest/submit-cheque-request`,
        ChequeRequestPayload
      )
      .then((response) => {
        console.log(response);
        if (response.data.responseCode === 5) {
          setSuccess(true);
        }

        setValidating(false);
      })
      .catch((err) => {
        //toast.errorToast("something went wrong");
        // console.log(err);
        setValidating(false);
        setSuccess(true);
      });
  };

  const [branchList, setBranchList] = useState([
    {
      BRANCH_CODE: 555,
      Branch: "VIRTUAL : VIRTUAL",
    },
    {
      BRANCH_CODE: 90,
      Branch: "ABIA : PLOT 3, EZIUKWU RD, ABA",
    },
    {
      BRANCH_CODE: 91,
      Branch: "ABIA : 127 NNAMDI AZIKWE ROAD, ABA, ABIA STATE",
    },
    {
      BRANCH_CODE: 178,
      Branch: "ABIA : Ekeoha Shopping Complex - Aba",
    },
    {
      BRANCH_CODE: 130,
      Branch: "ABUJA : 450, MAMMAN KONTAGORA CLOSE AREA 3 GARKI",
    },
    {
      BRANCH_CODE: 5,
      Branch: "ABUJA : PLOT 990 STERLING BOULEVARD,CBD ABUJA",
    },
    {
      BRANCH_CODE: 133,
      Branch: "ABUJA : 17, SHEDA CLOSE AREA 8 GARKI",
    },
    {
      BRANCH_CODE: 134,
      Branch: "ABUJA : SB 67 NATIONAL ASSEMBLY COMPLEX",
    },
    {
      BRANCH_CODE: 140,
      Branch: "ABUJA : CONOIL STATION, UTAKO, ABUJA.",
    },
    {
      BRANCH_CODE: 163,
      Branch:
        "ADAMAWA : 28,ATIKU ABUBAKAR WAY, BESIDE SABRU HOUSE, JIMETA YOLA",
    },
    {
      BRANCH_CODE: 93,
      Branch: "AKWA IBOM : 52,ORON ROAD, UYO",
    },
    {
      BRANCH_CODE: 95,
      Branch:
        "AKWA IBOM : PLOT 16, BLOCK 1, ABAK ROAD EST. UYO, AKWA-IBOM STATE",
    },
    {
      BRANCH_CODE: 101,
      Branch: "ANAMBRA : 45 UGA STREET, FEGGE BRIDGEHEAD ONITSHA",
    },
    {
      BRANCH_CODE: 98,
      Branch: "ANAMBRA : 34,PORT-HARCOURT RD,FEGGE, ONITSHA",
    },
    {
      BRANCH_CODE: 99,
      Branch: "ANAMBRA : 140, ZIK AVENUE, AWKA",
    },
    {
      BRANCH_CODE: 102,
      Branch: "ANAMBRA : 23 NOTTIDGE STREET, ONITSHA",
    },
    {
      BRANCH_CODE: 7,
      Branch: "BAUCHI : YAKUBUN BAUCHI RD BESIDE CBN BAUCHI",
    },
    {
      BRANCH_CODE: 117,
      Branch: "BAYELSA : 268,MBIAMA/YENAGOA RD,YENAGOA",
    },
    {
      BRANCH_CODE: 126,
      Branch:
        "BAYELSA : 252 MELFORD OKILO ROAD, AMARATA, YENAGOA, BAYELSA STATE",
    },
    {
      BRANCH_CODE: 181,
      Branch: "BAYELSA:529 MELFORD OKILO RD, YENAGOA",
    },
    {
      BRANCH_CODE: 146,
      Branch: "BENUE : 7, NEW BRIDGE STREET, MAKURDI, BENUE STATE",
    },
    {
      BRANCH_CODE: 94,
      Branch: "CALABAR : 1,CLEMENT EBRI DRIVE,STATE HOUSING ESTATE,CALABAR",
    },
    {
      BRANCH_CODE: 104,
      Branch: "DELTA : 180, NNEBISI RD,ASABA, DELTA STATE",
    },
    {
      BRANCH_CODE: 105,
      Branch:
        "DELTA : EFFURUN SAPELE RD OPP URHOBO COLLEGE, ODIBO HOUSING ESTATE, DELTA STATE",
    },
    {
      BRANCH_CODE: 112,
      Branch: "DELTA : 75, WARRI/SAPELE ROAD, WARRI DELTA STATE",
    },
    {
      BRANCH_CODE: 103,
      Branch: "EDO : 38, AKPAKPAVA STREET, BENIN CITY",
    },
    {
      BRANCH_CODE: 107,
      Branch: "EDO : 5, ADESUWA STREET, BENIN CITY, EDO STATE",
    },
    {
      BRANCH_CODE: 109,
      Branch: "EDO : 56/58 SAPELE ROAD, BENIN, EDO STATE",
    },
    {
      BRANCH_CODE: 111,
      Branch: "EDO : IGBINEDION UNIVERSITY, OKADA, EDO STATE",
    },
    {
      BRANCH_CODE: 87,
      Branch: "EKITI : BANK ROAD, BY NEW IYIN ROAD, ADO EKITI",
    },
    {
      BRANCH_CODE: 97,
      Branch: "ENUGU : 2A, MARKET RD, ENUGU",
    },
    {
      BRANCH_CODE: 100,
      Branch: "ENUGU : PLOT 23 (48), OKPARA AVENUE, ENUGU",
    },
    {
      BRANCH_CODE: 164,
      Branch: "GOMBE : NEW MARKET ROAD, GOMBE, GOMBE STATE",
    },
    {
      BRANCH_CODE: 89,
      Branch: "IMO : 71, DOUGLAS RD,OWERRI, IMO STATE",
    },
    {
      BRANCH_CODE: 150,
      Branch: "JIGAWA : KIYAWA RD OPP OANDO FILLING STATION DUTSE, JIGAWA",
    },
    {
      BRANCH_CODE: 161,
      Branch: "JOS : TERMINUS HOUSE, 1, AHMADU BELLO WAY, JOS, PLATEAU STATE",
    },
    {
      BRANCH_CODE: 162,
      Branch: "JOS : 13, JINGIRI ROAD, OPP. LEVENTIS MOTORS JOS.",
    },
    {
      BRANCH_CODE: 6,
      Branch: "KADUNA : 9, ALI AKILU RD KADUNA",
    },
    {
      BRANCH_CODE: 142,
      Branch: "KADUNA : 236, KACHIA RD KADUNA",
    },
    {
      BRANCH_CODE: 144,
      Branch:
        "KADUNA : KM 16, KACHIA ROAD, KRPC STAFF CO-OPERATIVE COMMERCIAL PLAZA, KADUNA REFINERY, KADUNA.",
    },
    {
      BRANCH_CODE: 170,
      Branch: "KADUNA : ALONG KAGORO ROAD,KAGORO,KAD.",
    },
    {
      BRANCH_CODE: 171,
      Branch: "KADUNA : 1 RIVER ROAD, SABON-GARI",
    },
    {
      BRANCH_CODE: 148,
      Branch: "KANO : 12 SANI ABACHA WAY, KANO",
    },
    {
      BRANCH_CODE: 8,
      Branch: "KANO : 110, MURTALA MOHAMMED WAY KANO",
    },
    {
      BRANCH_CODE: 151,
      Branch: "KANO : 20, UNITY ROAD (KWARI MARKET) KANO",
    },
    {
      BRANCH_CODE: 152,
      Branch: "KANO : 2B,NIGER STREET, (GIDAN GOLDIE) KANO",
    },
    {
      BRANCH_CODE: 153,
      Branch: "KANO : AMINU DANTATA ESTATE, KOFAR RUWA, KANO",
    },
    {
      BRANCH_CODE: 154,
      Branch: "KANO : BUK NEW CAMPUS KANO",
    },
    {
      BRANCH_CODE: 156,
      Branch: "KATSINA : 3, IBB WAY KATSINA",
    },
    {
      BRANCH_CODE: 157,
      Branch: "KEBBI : 31 Sultan Abubakar Road road. GRA, Kebbi State",
    },
    {
      BRANCH_CODE: 147,
      Branch: "KOGI : 64 IBRAHIM BABANGIDA WAY, LOKOJA",
    },
    {
      BRANCH_CODE: 9,
      Branch: "KWARA : 11, MURITALA MOHAMMED WAY, ILORIN",
    },
    {
      BRANCH_CODE: 83,
      Branch: "KWARA : PLOT 240, IBRAHIM TAIWO ROAD, ILORIN",
    },
    {
      BRANCH_CODE: 21,
      Branch: "LAGOS : 30, ADETOKUNBO ADEMOLA STREET V/ISLAND",
    },
    {
      BRANCH_CODE: 41,
      Branch: "LAGOS : 99, ENU -OWA STREET ,IDUMOTA LAGOS",
    },
    {
      BRANCH_CODE: 176,
      Branch: "LAGOS : 9, DADA IYALODE ST.,OJUWOYE MARKET, MUSHIN",
    },
    {
      BRANCH_CODE: 65,
      Branch: "LAGOS : PLOT 8,BLK E DALEKO MARKET ISOLO EXPRESS WAY, LAGOS",
    },
    {
      BRANCH_CODE: 4,
      Branch: "LAGOS : 74, ADENIRAN OGUNSANYA SURULERE LAGOS",
    },
    {
      BRANCH_CODE: 38,
      Branch: "LAGOS : 9, AROMIRE AVENUE IKEJA LAGOS",
    },
    {
      BRANCH_CODE: 25,
      Branch: "LAGOS : 29,BADAGRY EXPRESS WAY COKER ORILE LAGOS",
    },
    {
      BRANCH_CODE: 59,
      Branch: "LAGOS : 28, WILLOUGHBY STREET EBUTE METTA, LAGOS",
    },
    {
      BRANCH_CODE: 131,
      Branch: "LAGOS : 198,IGBOSERE ROAD, OBALENDE, LAGOS ISLAND",
    },
    {
      BRANCH_CODE: 39,
      Branch: "LAGOS : 286 IKORODU RD LAGOS",
    },
    {
      BRANCH_CODE: 60,
      Branch: "LAGOS : RAILWAY TERMINUS EBUTE METTA, LAGOS",
    },
    {
      BRANCH_CODE: 51,
      Branch: "LAGOS : 102, IJU RD, IFAKO LAGOS",
    },
    {
      BRANCH_CODE: 52,
      Branch: "LAGOS : 294, IDIMU RD ISHERI LAGOS.",
    },
    {
      BRANCH_CODE: 27,
      Branch: "LAGOS : 10,TINCAN ISLAND PORT RD, APAPA LAGOS",
    },
    {
      BRANCH_CODE: 53,
      Branch: "LAGOS : 109, LAGOS ABEOKUTA EXP WAY IYANA IPAJA LAGOS",
    },
    {
      BRANCH_CODE: 3,
      Branch: "LAGOS : 38, OPEBI ROAD LAGOS",
    },
    {
      BRANCH_CODE: 29,
      Branch: "LAGOS : LASU OJO LAGOS",
    },
    {
      BRANCH_CODE: 1,
      Branch: "LAGOS : 20, MARINA LAGOS",
    },
    {
      BRANCH_CODE: 16,
      Branch: "LAGOS : 228,AWOLOWO RD IKOYI LAGOS",
    },
    {
      BRANCH_CODE: 42,
      Branch: "LAGOS : 104, AWOLOWO WAY IKEJA LAGOS",
    },
    {
      BRANCH_CODE: 30,
      Branch: "LAGOS : 250, KIRIKIRI RD APAPA LAGOS",
    },
    {
      BRANCH_CODE: 160,
      Branch: "LAGOS : 41/43 MARTINS STR LAGOS",
    },
    {
      BRANCH_CODE: 31,
      Branch: "LAGOS : 26B CREEK RD APAPA LAGOS",
    },
    {
      BRANCH_CODE: 149,
      Branch: "LAGOS : 37B, JOHN STREET, OKE ARIN",
    },
    {
      BRANCH_CODE: 54,
      Branch: "LAGOS : 32, SHASHA RD, AKOWONJO LAGOS",
    },
    {
      BRANCH_CODE: 66,
      Branch: "LAGOS : 26, FATAI ATERE WAY, MATORI IND. EST.LAGOS",
    },
    {
      BRANCH_CODE: 86,
      Branch: "LAGOS : 106, IGA-IDUGANRAN STREET",
    },
    {
      BRANCH_CODE: 17,
      Branch: "LAGOS : AGUNGI BUS STOP BAKKY PLAZA LEKKI",
    },
    {
      BRANCH_CODE: 3,
      Branch: "LAGOS : 68, OPEBI STR IKEJA LAGOS",
    },
    {
      BRANCH_CODE: 44,
      Branch: "LAGOS : 43, LAGOS-IKORODU ROAD LAGOS",
    },
    {
      BRANCH_CODE: 61,
      Branch: "LAGOS : 141, OGUNLANA DRIVE SURULERE LAGOS",
    },
    {
      BRANCH_CODE: 33,
      Branch: "LAGOS : 31, IKUDAISI STR APAPA OSHODI EXP WAY LAGOS",
    },
    {
      BRANCH_CODE: 62,
      Branch: "LAGOS : 260/262 HERBERT MARCAULAY WAY YABA, LAGOS",
    },
    {
      BRANCH_CODE: 210,
      Branch: "LAGOS : BLK 11 SUIT3 SURA SHOPPING COMPLEX",
    },
    {
      BRANCH_CODE: 19,
      Branch: "LAGOS : SHOP 14/15 BLK F IKOTA SHOPPING COMPLEX AJAH",
    },
    {
      BRANCH_CODE: 70,
      Branch: "LAGOS : OYETAYO STREET ,OSHODI LOCAL GOVT, OSHODI, LAGOS",
    },
    {
      BRANCH_CODE: 12,
      Branch: "LAGOS : 4, ISSA WILLIAMS STREET, OKE ARIN, LAGOS STATE",
    },
    {
      BRANCH_CODE: 20,
      Branch: "LAGOS : 114, AWOLOWO ROAD, IKOYI, LAGOS",
    },
    {
      BRANCH_CODE: 22,
      Branch: "LAGOS : PLOT 300 ADEOLA ODEKU STREET, V/ISLAND LAGOS",
    },
    {
      BRANCH_CODE: 35,
      Branch: "LAGOS : 8C, EXECUTIVE PLAZA, BBA, TRADE FAIR. LAGOS",
    },
    {
      BRANCH_CODE: 64,
      Branch: "LAGOS : AIRPORT ROAD, IKEJA, LAGOS.",
    },
    {
      BRANCH_CODE: 47,
      Branch: "LAGOS : 548, IKORODU ROAD, KETU, LAGOS",
    },
    {
      BRANCH_CODE: 56,
      Branch: "LAGOS : 38 IJAIYE RD,OGBA LAGOS",
    },
    {
      BRANCH_CODE: 68,
      Branch: "LAGOS : 101 OKOTA ROAD ISOLO, LAGOS",
    },
    {
      BRANCH_CODE: 37,
      Branch: "LAGOS : 66, MOBIL ROAD, AJEGUNLE, LAGOS",
    },
    {
      BRANCH_CODE: 49,
      Branch: "LAGOS : 28,OGUDU ROAD, OJOTA, LAGOS.",
    },
    {
      BRANCH_CODE: 67,
      Branch: "LAGOS : 68, IRE-AKARI ESTATE, ISOLO, LAGOS",
    },
    {
      BRANCH_CODE: 69,
      Branch:
        "LAGOS : ITIRE RD BY IYANA-ITIRE BUS STOP OFF APAPA-OSHODI, LAGOS",
    },
    {
      BRANCH_CODE: 34,
      Branch: "LAGOS : 21 Road, Festac, Lagos.",
    },
    {
      BRANCH_CODE: 172,
      Branch: "LAGOS : 585 LAGOS/ABK EXPRESSWAY",
    },
    {
      BRANCH_CODE: 167,
      Branch: "LAGOS : 22 OGUNLOWO STR,AJUWON,AKUTE",
    },
    {
      BRANCH_CODE: 173,
      Branch: "LAGOS : 18 IDIMU-IKOTUN RD,COLLEGE B/S",
    },
    {
      BRANCH_CODE: 2,
      Branch:
        "LAGOS : 62 ADETOKUNBO ADEMOLA STR (BY AJOSE ADEOGUN ROUNDABOUT), V/I, LAGOS",
    },
    {
      BRANCH_CODE: 36,
      Branch: "LAGOS : 5, ALABA INTERNATIONAL MARKET ROAD, ALABA LAGOS",
    },
    {
      BRANCH_CODE: 177,
      Branch: "LAGOS : 97 Baale Str, Orile, Iganmu",
    },
    {
      BRANCH_CODE: 159,
      Branch: "MAIDUGURI : 39 KASHIM IBRAHIM WAY MAIDUGURI",
    },
    {
      BRANCH_CODE: 143,
      Branch: "NIGER : FEDERAL MORTGAGE BANK BUILDING, BOSSO ROAD, MINNA",
    },
    {
      BRANCH_CODE: 50,
      Branch: "OGUN : 1 BISHOP CLOSE, OGIJO, LAGOS-SHAGAMU, OGUN STATE",
    },
    {
      BRANCH_CODE: 165,
      Branch: "OGUN : IBASHA/AJEGUNLE RD. MAGBORO.",
    },
    {
      BRANCH_CODE: 81,
      Branch: "OGUN : 64, IDIROKO RD OTA, OGUN STATE",
    },
    {
      BRANCH_CODE: 73,
      Branch:
        "OGUN : ABEOKUTA SPORT CLUB ROAD, OPIC ROUNDABOUT, OKE-ILEWO, ABEOKUTA(B/W BIG TREAT & SWEET SENSATION)",
    },
    {
      BRANCH_CODE: 74,
      Branch: "OGUN : 39 IBADAN ROAD, IJEBU-ODE, OGUN STATE",
    },
    {
      BRANCH_CODE: 174,
      Branch: "OGUN : ALONG AKARIGBO ROAD,SAGAMU,OG.",
    },
    {
      BRANCH_CODE: 82,
      Branch: "ONDO : 82,ONDO RD, ORE",
    },
    {
      BRANCH_CODE: 88,
      Branch: "ONDO : 142, OBA OYEMEKUN RD AKURE, ONDO STATE",
    },
    {
      BRANCH_CODE: 84,
      Branch: "OSUN : KM3 IBADAN GBONGAN ROAD, OSHOGBO.",
    },
    {
      BRANCH_CODE: 85,
      Branch: "OSUN : BOWEN UNIVERSITY, IWO, OSUN STATE.",
    },
    {
      BRANCH_CODE: 71,
      Branch: "OYO : 49A, IWO ROAD IBADAN, OYO STATE",
    },
    {
      BRANCH_CODE: 72,
      Branch: "OYO : 3, OBAFEMI AWOLOWO WAY DUGBE, OYO STATE",
    },
    {
      BRANCH_CODE: 75,
      Branch: "OYO : 529, OLD ABEOKUTA RD, APATA GANGAN-IBADAN",
    },
    {
      BRANCH_CODE: 76,
      Branch: "OYO : 97 LAGOS ROAD CHALLENGE IBADAN",
    },
    {
      BRANCH_CODE: 77,
      Branch: "OYO : OYO STATE GOVT. SECRETARIAT COMPLEX, IBADAN",
    },
    {
      BRANCH_CODE: 80,
      Branch: "OYO : 2, OSOSAMI RD, OKE-ADO, IBADAN.",
    },
    {
      BRANCH_CODE: 115,
      Branch: "RIVERS : PLOT 13,TRANSAMADI, IND LAYOUT P/HARCOURT",
    },
    {
      BRANCH_CODE: 118,
      Branch: "RIVERS : 4,OLU OBASANJO RD, P/HARCOURT",
    },
    {
      BRANCH_CODE: 119,
      Branch: "RIVERS : 142,WOJI RD, GRA 2, P/HARCOURT",
    },
    {
      BRANCH_CODE: 120,
      Branch: "RIVERS : UPTH PERMANENT SITE,P/H ",
    },
    {
      BRANCH_CODE: 129,
      Branch:
        "RIVERS : PLOT 6 AND 7, (420, ABA ROAD, RUMUIBEKWE PORT HARCOURT)",
    },
    {
      BRANCH_CODE: 122,
      Branch: "RIVERS : 204 KALAGBOR STREET, RUMUOLA, PORT-HARCOURT",
    },
    {
      BRANCH_CODE: 124,
      Branch: "RIVERS : 2A, AGUMA STREET, PORT-HARCOURT, RIVERS STATE",
    },
    {
      BRANCH_CODE: 125,
      Branch: "RIVERS : 14, AGGREY ROAD, PORT HARCOURT",
    },
    {
      BRANCH_CODE: 123,
      Branch: "RIVERS : 87, RUMUOLA ROAD, RUMUOKARA PORT-HARCOURT",
    },
    {
      BRANCH_CODE: 155,
      Branch: "SOKOTO : 14 KANO ROAD SOKOTO",
    },
    {
      BRANCH_CODE: 158,
      Branch: "ZAMFARA : ZARIA ROAD, GUSAU, ZAMFARA",
    },
  ]);

  return (
    <div>
      {success ? (
        <ChequeRequestSuccess />
      ) : (
        <form>
          <h1 className={styles.header}>Cheque request details</h1>
          <div className={styles.contentFlex}>
            <div className={styles.firstContent}>
              <div className={styles.holder}>
                <label>Select quantity</label>
                <input value={leavesValue} />
              </div>
              <select value={quantityValue} onChange={handleChange}>
                {quantities.map((quantity) => {
                  return (
                    <option key={quantity.id} value={quantity.id}>
                      {quantity.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={styles.secondFlex}>
              <div className={styles.priceContainer}>1500</div>
            </div>
          </div>
          <div className={styles.docsphase}>
            <label>Select mode of delivery</label>
            <div className={styles.deliveryHolder}>
              <div
                className={
                  selectBranchPickup ? `${styles.active}` : styles.firstcon
                }
                onClick={handleBranchPickup}
              >
                <p>Branch Pickup</p>
                <div className={styles.box}>Free</div>
              </div>
              <div
                className={
                  selectHomeDelivery ? `${styles.active}` : styles.secondCon
                }
                onClick={handleHomeDelivery}
              >
                <p>Home Delivery</p>
                <div className={styles.box}>1500</div>
              </div>
            </div>
          </div>
          {selectBranchPickup && (
            <>
              <label className="label_text">
                Would you be kind enough to choose a branch of your choice for
                the cheque collection?
              </label>
              <div className={styles.selectFlex}>
                <div className={styles.singleSelect}>
                  <label className="label_text">State</label>
                  <select value={state} onChange={handleStateChange}>
                    <option value="">Select state</option>
                    {states.map((state) => {
                      return (
                        <option key={state.code} value={state.name}>
                          {state.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className={styles.singleSelect}>
                  <label className="label_text">Branch</label>
                  <select value={branch} onChange={handleBranchChange}>
                    <option value="">Select Branch</option>

                    {branchList.map((state) => {
                      return (
                        <option key={state.Branch} value={state.Branch}>
                          {state.Branch}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </>
          )}
          {selectHomeDelivery && (
            <>
              <div className={styles.formRow}>
                <div className="col-lg-6 mr-2">
                  <label className="label_text">House number</label>
                  <input
                    onChange={(e) => setHouseNumber(e.target.value)}
                    value={houseNumber}
                    type="text"
                    className="form-control bg-white border-dark"
                    placeholder="Enter house Number"
                  />
                </div>
                <div className="col-lg-6">
                  <label className="label_text">Street name</label>
                  <input
                    onChange={(e) => setStreetName(e.target.value)}
                    value={streetName}
                    type="text"
                    className="form-control bg-white border-dark"
                    placeholder="Enter street name"
                  />
                  {/* </div>
          </div> */}
                </div>
              </div>
              <div className="form-group" style={{ margin: " 10px 13px" }}>
                <label className="label_text">Nearest bus-stop/landmark</label>
                <input
                  type="text"
                  className="form-control bg-white border-dark"
                  placeholder="Enter Nearest bus-stop/landmark"
                  onChange={(e) => setBusStop(e.target.value)}
                  value={busStop}
                />
              </div>
              <div className="form-group" style={{ margin: " 10px 13px" }}>
                <label className="label_text">Area/State</label>
                <input
                  type="text"
                  className="form-control bg-white border-dark"
                  placeholder="Enter Area/state"
                  onChange={(e) => setArea(e.target.value)}
                  value={area}
                />
              </div>
              <div className="form-group" style={{ margin: " 10px 13px" }}>
                <input
                  type="text"
                  className="form-control bg-white border-dark"
                  value={`${houseNumber}${" "}${streetName}${" "}${busStop}`}
                />
              </div>
            </>
          )}
          <div className={styles.totalCost}>
            <label className="label_text">Total cost</label>
            <div className={styles.totalCostBox}>
              <div className={styles.ice}>
                <p>Chequebook * 1</p>
                <p>₦1,500</p>
              </div>
              <div className={styles.ice}>
                <p>VAT charge 7.5%</p>
                <p>₦112.5</p>
              </div>
              {selectBranchPickup ? (
                <div className={styles.ice}>
                  <p>Branch pickup</p>
                  <p>Free</p>
                </div>
              ) : (
                <div className={styles.ice}>
                  <p>Home delivery</p>
                  <p> ₦1,500</p>
                </div>
              )}

              {selectBranchPickup ? (
                <div className={styles.ice}>
                  <p>Total</p>
                  <p>₦3,225</p>
                </div>
              ) : (
                <div className={styles.ice}>
                  <p>Total</p>
                  <p>₦4,725</p>
                </div>
              )}
            </div>
          </div>
          <div className={styles.flexButton}>
            <button className={styles.previous}>Previous</button>

            {validating ? (
              <div className="spinner-border text-danger mb-4" role="status">
                <span className="sr-only"></span>
              </div>
            ) : (
              <button
                className={styles.submit}
                type="submit"
                onClick={formik.handleSubmit}
              >
                Submit
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
