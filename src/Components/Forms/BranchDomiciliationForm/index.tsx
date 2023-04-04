//@ts-ignore
//@ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import styles from "./style.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import carlender from "../../../assets/images/calender.svg";
import cameraX from "../../../assets/images/cameraX.svg";
import { WebcamCapture } from "../../../Containers/TakePicture";
import { useForm } from "react-hook-form";
import BranchSuccess from "./BranchSuccess";
import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";
import * as toast from "../../../utils/makeToast";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";
import { getLocalStorageItem } from "../../../utils/localStorage";
import SignaturePad from "react-signature-canvas";
import { getMonth, getYear } from "date-fns";
import range from "lodash/range";

export default function BranchDomiciliationForm({
  webClick,
  image,
  generatedNumber,
  validated,
}) {
  const [imageURL, setImageURL] = useState(null); // create a state that will contain our image url

  const sigCanvas = useRef({});

  const clear = () => sigCanvas.current.clear();

  const { register, handleSubmit, watch, errors } = useForm();
  const [success, setSuccess] = useState(false);
  const onSubmit = (data) => {
    SubmitEmailForm();
  };

  const [userDetails, setUserDetails] = useState(
    getLocalStorageItem("userDetails")
  );
  const [startDate, setStartDate] = useState(new Date());
  const [fullname, setfullname] = useState(userDetails.name);
  const [accountNumber, setAccountNumber] = useState(userDetails.accountNumber);
  const [OldState, setOldState] = useState("");
  const [NewState, setNewState] = useState("");
  const [NewBranch, setNewBranch] = useState("");
  const [OldBranch, setOldBranch] = useState("");
  const [eSignature, setESignature] = useState("");

  const [validating, setValidating] = useState(false);

  const handleOldStateChange = (event) => {
    setOldState(event.target.value);
  };

  const handleNewStateChange = (event) => {
    setNewState(event.target.value);
  };

  const handleOldBranchChange = (event) => {
    setOldBranch(event.target.value);
  };

  const handleNewBranchChange = (event) => {
    setNewBranch(event.target.value);
  };

  console.log(userDetails);

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

  const years = range(1990, getYear(new Date()) + 1, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const SubmitEmailForm = () => {
    setValidating(true);
    let BranchDomiciliationPayload = {
      referenceId: userDetails.referenceId,
      requestedDate: startDate,
      eSignature: eSignature,
      userPicture: "pic",
      requestLetter: "request letter",
      fullName: fullname,
      accountNumber: accountNumber,
      state: NewState,
      oldBranch: OldBranch,
      newBranch: NewBranch,
    };

    axios
      .post(
        `${baseUrl}BranchDomiciliation/submit-branch-domiciliation`,
        BranchDomiciliationPayload
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
        console.log(err);
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

  var abiaResult = branchList.filter((obj) => {
    return obj.state === "Abia";
  });

  var abujaResult = branchList.filter((obj) => {
    return obj.state === "Abuja";
  });

  var adamawaResult = branchList.filter((obj) => {
    return obj.state === "Adamawa";
  });

  var akwaIbomResult = branchList.filter((obj) => {
    return obj.state === "Akwa Ibom";
  });

  var anambraResult = branchList.filter((obj) => {
    return obj.state === "Anambra";
  });

  var bauchiResult = branchList.filter((obj) => {
    return obj.state === "Bauchi";
  });

  var bayelsaResult = branchList.filter((obj) => {
    return obj.state === "Bayelsa";
  });

  var benueResult = branchList.filter((obj) => {
    return obj.state === "Benue";
  });

  var calabarResult = branchList.filter((obj) => {
    return obj.state === "Calabar";
  });

  var deltaResult = branchList.filter((obj) => {
    return obj.state === "Delta";
  });

  var edoResult = branchList.filter((obj) => {
    return obj.state === "Edo";
  });

  var ekitiResult = branchList.filter((obj) => {
    return obj.state === "Ekiti";
  });

  var enuguResult = branchList.filter((obj) => {
    return obj.state === "Enugu";
  });

  var gombeResult = branchList.filter((obj) => {
    return obj.state === "Gombe";
  });

  var imoResult = branchList.filter((obj) => {
    return obj.state === "Imo";
  });

  var jigawaResult = branchList.filter((obj) => {
    return obj.state === "Jigawa";
  });

  var josResult = branchList.filter((obj) => {
    return obj.state === "Jos";
  });

  var kadunaResult = branchList.filter((obj) => {
    return obj.state === "Kaduna";
  });

  var kanoResult = branchList.filter((obj) => {
    return obj.state === "Kano";
  });

  var katsinaResult = branchList.filter((obj) => {
    return obj.state === "Katsina";
  });

  var kebbiResult = branchList.filter((obj) => {
    return obj.state === "Kebbi";
  });

  var kogiResult = branchList.filter((obj) => {
    return obj.state === "Kogi";
  });

  var kwaraResult = branchList.filter((obj) => {
    return obj.state === "Kwara";
  });

  var lagosResult = branchList.filter((obj) => {
    return obj.state === "Lagos";
  });

  var maiduguriResult = branchList.filter((obj) => {
    return obj.state === "Maiduguri";
  });

  var nigerResult = branchList.filter((obj) => {
    return obj.state === "Niger";
  });

  var ogunResult = branchList.filter((obj) => {
    return obj.state === "Ogun";
  });

  var ondoResult = branchList.filter((obj) => {
    return obj.state === "Ondo";
  });

  var osunResult = branchList.filter((obj) => {
    return obj.state === "Osun";
  });

  var oyoResult = branchList.filter((obj) => {
    return obj.state === "Oyo";
  });

  var riversResult = branchList.filter((obj) => {
    return obj.state === "Rivers";
  });

  var sokotoResult = branchList.filter((obj) => {
    return obj.state === "Sokoto";
  });

  var zamfaraResult = branchList.filter((obj) => {
    return obj.state === "Zamfara";
  });

  return (
    <>
      {success ? (
        <BranchSuccess />
      ) : (
        <div className={styles.container}>
          <Toaster position="top-center" reverseOrder={false} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className={styles.header}>Update branch domiciliation</h1>
            <p className={styles.paragraph}>
              Dear Sterling Alternative Finance,{" "}
            </p>
            <p className={styles.paragraph}>
              I,{" "}
              <input
                type="text"
                placeholder="insert full name"
                value={fullname}
                required
              />{" "}
              with account number{" "}
              <input
                type="text"
                placeholder="insert account number"
                value={accountNumber}
                required
              />{" "}
              would like to change my branch from{" "}
              <select value={OldState} onChange={handleOldStateChange}>
                <option value="">Select state</option>
                {states.map((state) => {
                  return (
                    <option key={state.code} value={state.name}>
                      {state.name}
                    </option>
                  );
                })}
              </select>
              <select value={OldBranch} onChange={handleOldBranchChange}>
                <option value="">Select Old Branch</option>
                {branchList.map((state) => {
                  return (
                    <option key={state.Branch} value={state.Branch}>
                      {state.Branch}
                    </option>
                  );
                })}
                {/* {OldState == "Abia" && (
                  <>
                    {abiaResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Abuja" && (
                  <>
                    {abujaResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Adamawa" && (
                  <>
                    {adamawaResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "AkwaIbom" && (
                  <>
                    {akwaIbomResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Anambra" && (
                  <>
                    {anambraResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Bauchi" && (
                  <>
                    {bauchiResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Bayelsa" && (
                  <>
                    {bayelsaResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Benue" && (
                  <>
                    {benueResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Calabar" && (
                  <>
                    {calabarResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Delta" && (
                  <>
                    {deltaResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Edo" && (
                  <>
                    {edoResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Ekiti" && (
                  <>
                    {ekitiResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Enugu" && (
                  <>
                    {enuguResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Gombe" && (
                  <>
                    {gombeResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Imo" && (
                  <>
                    {imoResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Jigawa" && (
                  <>
                    {jigawaResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Jos" && (
                  <>
                    {josResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Kaduna" && (
                  <>
                    {kadunaResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Kano" && (
                  <>
                    {kanoResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Katsina" && (
                  <>
                    {katsinaResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Kebbi" && (
                  <>
                    {kebbiResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Kogi" && (
                  <>
                    {kogiResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Kwara" && (
                  <>
                    {kwaraResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}

                {OldState == "Lagos" && (
                  <>
                    {lagosResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Maiduguri" && (
                  <>
                    {maiduguriResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Niger" && (
                  <>
                    {nigerResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Ogun" && (
                  <>
                    {ogunResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Ondo" && (
                  <>
                    {ondoResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Osun" && (
                  <>
                    {osunResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Oyo" && (
                  <>
                    {oyoResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Rivers" && (
                  <>
                    {riversResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Sokoto" && (
                  <>
                    {sokotoResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Zamfara" && (
                  <>
                    {zamfaraResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )} */}
              </select>
              to{" "}
              <select value={NewState} onChange={handleNewStateChange}>
                <option value="">Select state</option>
                {states.map((state) => {
                  return (
                    <option key={state.code} value={state.name}>
                      {state.name}
                    </option>
                  );
                })}
              </select>
              <select value={NewBranch} onChange={handleNewBranchChange}>
                <option value="">Select New Branch</option>
                {/* {NewState == "Abia" && (
                  <>
                    {abiaResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Abuja" && (
                  <>
                    {abujaResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Adamawa" && (
                  <>
                    {adamawaResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "AkwaIbom" && (
                  <>
                    {akwaIbomResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Anambra" && (
                  <>
                    {anambraResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Bauchi" && (
                  <>
                    {bauchiResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Bayelsa" && (
                  <>
                    {bayelsaResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Benue" && (
                  <>
                    {benueResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Calabar" && (
                  <>
                    {calabarResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Delta" && (
                  <>
                    {deltaResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Edo" && (
                  <>
                    {edoResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Ekiti" && (
                  <>
                    {ekitiResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Enugu" && (
                  <>
                    {enuguResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Gombe" && (
                  <>
                    {gombeResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Imo" && (
                  <>
                    {imoResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Jigawa" && (
                  <>
                    {jigawaResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Jos" && (
                  <>
                    {josResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Kaduna" && (
                  <>
                    {kadunaResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Kano" && (
                  <>
                    {kanoResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Katsina" && (
                  <>
                    {katsinaResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Kebbi" && (
                  <>
                    {kebbiResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Kogi" && (
                  <>
                    {kogiResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Kwara" && (
                  <>
                    {kwaraResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}

                {NewState == "Lagos" && (
                  <>
                    {lagosResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Maiduguri" && (
                  <>
                    {maiduguriResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Niger" && (
                  <>
                    {nigerResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Ogun" && (
                  <>
                    {ogunResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Ondo" && (
                  <>
                    {ondoResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Osun" && (
                  <>
                    {osunResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Oyo" && (
                  <>
                    {oyoResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Rivers" && (
                  <>
                    {riversResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Sokoto" && (
                  <>
                    {sokotoResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Zamfara" && (
                  <>
                    {zamfaraResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )} */}
                {branchList.map((state) => {
                  return (
                    <option key={state.Branch} value={state.Branch}>
                      {state.Branch}
                    </option>
                  );
                })}
                {/* <option key={branchList.Branch} value={branchList.Branch}>
                  {state.branch}
                </option> */}
              </select>
              on this day,{" "}
              <DatePicker
                renderCustomHeader={({
                  date,
                  changeYear,
                  changeMonth,
                  decreaseMonth,
                  increaseMonth,
                  prevMonthButtonDisabled,
                  nextMonthButtonDisabled,
                }) => (
                  <div
                    style={{
                      margin: 10,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      onClick={decreaseMonth}
                      disabled={prevMonthButtonDisabled}
                    >
                      {"<"}
                    </button>
                    <select
                      value={getYear(date)}
                      onChange={({ target: { value } }) => changeYear(value)}
                    >
                      {years.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>

                    <select
                      value={months[getMonth(date)]}
                      onChange={({ target: { value } }) =>
                        changeMonth(months.indexOf(value))
                      }
                    >
                      {months.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={increaseMonth}
                      disabled={nextMonthButtonDisabled}
                    >
                      {">"}
                    </button>
                  </div>
                )}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                customInput={<ExampleCustomInput />}
              />
            </p>
            <div className={styles.holder}>
              <div className={styles.sign}>
                <div className={styles.headerX}>
                  <div className={styles.textHeader}>
                    <p>
                      <b>E-signature</b>
                    </p>
                    <p className={styles.textHeaderPara}>
                      Kindly append your e-signature.
                    </p>
                  </div>
                  <button className={styles.clearButton} onClick={clear}>
                    Clear
                  </button>
                </div>
                <SignaturePad
                  ref={sigCanvas}
                  canvasProps={{
                    className: `${styles.signatureCanvas}`,
                  }}
                />
              </div>
              <div className={styles.picture}>
                <div className={styles.page}></div>
              </div>
            </div>
            <div className={styles.flexButton}>
              <button className={styles.previous}>Previous</button>

              {validating ? (
                <div className="spinner-border text-danger mb-4" role="status">
                  <span className="sr-only"></span>
                </div>
              ) : (
                <button className={styles.submitActive} type="submit">
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </>
  );
}

const ExampleCustomInput = React.forwardRef(({ value, onClick, ref }) => (
  <div>
    <input
      type="text"
      className={styles.customInput}
      onClick={onClick}
      ref={ref}
      value={value}
    />
    <img src={carlender} />
  </div>
));
