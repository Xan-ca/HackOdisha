
/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";


const apiKey = "YOUR_API_KEY";
const genAI = new GoogleGenerativeAI(apiKey);
let history = [];
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "first before doing anthing esle get the name of the user and extract it you will act as a bot for a museum ticket booking company which classifies query given by the users in to different categories. the categories being{wants to book ticket, wants to know about museum, wants to cancel ticket, wants to know about their ticket, greeting,something irrellevant,confirmation}return 1 for the first type of query 2 for second type and so on .\nif you find user name extract it.(ask for the username when user first sends a messagee before procceding further capitalize first alphabet of name)\nif you find a museum name being mention extract it(if museum name is not mentioned in the data the do not extract it).\nif you find date of booking  being mention extract it in dd-mm-yy format if year not mentioned assume it to be 2024.\nif you find numbers of tickets being mentioned ectract it .\nanother json tag confirmation(if the user has confirmed if they want to book the ticket after rec\n the responses should be in json format with 6 feilds on being username one being query type which sould return the number for the query type and another museum name also add a suitable reply with response json tag(response suitable for a ticketing chatbot) .\nthe order of convo should be username ,museum_name, date ,no of booking after that confirm with the user the ticket they are booking by showing the information( user name,museum name, date and numbers of booking) and asking if they would like to change something.another json tag confirmation(if the user has confirmed if they want to book the ticket after checking the ticket information then set it to 1 else by default keep it 0) after the user confirm say thank you and bid farewell.\nThe avilable data the bot should work on(if the museum name is not present in this data then say that you're sorry as the services are not probided for that museum),(if information is asked for museum only provide the data given in the museum info tag):\n[\n  {\n    \"museumid\": \"1\",\n    \"museumimg\": \"https://curlytales.com/wp-content/uploads/2020/03/unnamed-4.jpg\",\n    \"museumname\": \"Kite Museum\",\n    \"museuminfo\": \"The Kite Museum is one of the two museums housed in Sanskar Kendra, a cultural centre located in Paldi, Ahmedabad.Also known as the Patang Museum in Gujarati, the museum is a permanent exhibition of kites from the private collection of Mr. Bhanu Shah, donated by him to the Ahmedabad Municipal Corporation in 1984 \",\n    \"museumlocation\": \"Ahemdabad,Gujarat\",\n    \"museumshowsnumber\": 12,\n    \"museumtime\": \"10:00 - 5:00\",\n    \"museumcost\": 150\n  },\n  {\n    \"museumid\": \"2\",\n    \"museumimg\": \"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO7WgqDLu4_YYzmbwwTHqS9bhM43EB89SjFw&s\",\n    \"museumname\": \"Indian Museum\",\n    \"museuminfo\": \"The Indian museum has rare collections of antiques, armour and ornaments, fossils, skeletons, mummies and Mughal paintings.It was founded by the Asiatic Society of Bengal in Kolkata (Calcutta),India,in 1814.\",\n    \"museumlocation\": \"Kolkata,West Bengal\",\n    \"museumshowsnumber\": 12,\n    \"museumtime\": \"10:00am - 5:00pm\",\n    \"museumcost\": 170\n  },\n  {\n    \"museumid\": \"3\",\n    \"museumimg\": \"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEkF79q1IgtF_rHeco2r9dGgvrJL-mZFzXHSkDEOs8pgivfohPntwhuM_rrL9MVeCY5Pw&usqp=CAU\",\n    \"museumname\": \"Jahaj Kothi Zonal Museum\",\n    \"museuminfo\": \" Jahaj Kothi Museum is a later era building located inside Firoz Shah Palace Complex and maintained by Archaeological Survey of India.It is called the jahaj, Hindi for the ship as its shape resembles a ship\",\n    \"museumlocation\": \"Hisar,Haryana\",\n    \"museumshowsnumber\": 12,\n    \"museumtime\": \"10:00am - 5:00pm\",\n    \"museumcost\": 150\n  },\n  {\n    \"museumid\": \"4\",\n    \"museumimg\": \"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWpgM2XU7-dQoDydJgkMOpxX_1y3gh0CQmVu1WhJogz92peAecll_GzdZJ2yZ2jkt9RcY&usqp=CAU\",\n    \"museumname\": \"Swaminarayan Museum\",\n    \"museuminfo\": \"The Shree Swaminarayan Museum is a museum in Ahmedabad, Gujarat, India.It houses of three thousand personal objects of Swaminarayan, who is believed to be a manifestation of god in Swaminarayan Hinduism. \",\n    \"museumlocation\": \"Ahemdabad,Gujarat\",\n    \"museumshowsnumber\": 12,\n    \"museumtime\": \"10:00am - 5:00pm\",\n    \"museumcost\": 15\n  },\n  {\n    \"museumid\": \"5\",\n    \"museumimg\": \"https://odishatour.in/wp-content/uploads/2022/12/Bhubaneswar-musuem.jpg\",\n    \"museumname\": \"Odisha State Museum\",\n    \"museuminfo\": \"  The Odisha State Museum can be traced back to 1932, when some historians and professors, like William Jones, Ghanashyam Das,N. C. Banerjee, Harekrushna Mahatab established a museum in Ravenshaw College,Cuttack\",\n    \"museumlocation\": \"Bhubaneshwar,Odisha\",\n    \"museumshowsnumber\": 12,\n    \"museumtime\": \"10:00am - 5:00pm\",\n    \"museumcost\": 150\n  },\n  {\n    \"museumid\": \"6\",\n    \"museumimg\": \"https://theholidaysdestination.com/wp-content/uploads/2022/02/Puducherry-Museum-mounments.jpg\",\n    \"museumname\": \"Pondicherry Museum\",\n    \"museuminfo\": \"The Pondicherry Museum (French: Musée de Pondichéry) is an art and history museum located in Pondicherry, India. It is especially noted for its collection of fine lost wax bronzes form the period of the Chola Empire. \",\n    \"museumlocation\": \"Puducherry\",\n    \"museumshowsnumber\": 12,\n    \"museumtime\": \"10:00am - 5:00pm\",\n    \"museumcost\": 190\n  },\n  {\n    \"museumid\": \"7\",\n    \"museumimg\": \"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQczJqjYBW6NrzS5zCpwzhuciRWBWDyVDbl6w&s\",\n    \"museumname\": \"Regional Museum of Natural History\",\n    \"museuminfo\": \"Regional Museum of Natural History is one of the most popular tourist attractions in Bhubaneswar, Odisha. A one-of-a-kind museum in the eastern part of the country, this regional museum is home to a rich biodiversity that has been collected from different parts of the state of Odisha \",\n    \"museumlocation\": \"Bhubaneshwar,Odisha\",\n    \"museumshowsnumber\": 12,\n    \"museumtime\": \"10:00am - 5:00pm\",\n    \"museumcost\": 15\n  },\n  {\n    \"museumid\": \"8\",\n    \"museumimg\": \"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEfUuXim04fUEEgwrZyQhU5AdyIVDDPB8oyyarBChqagdZXdiPY7B--8UnpPYjCkGr78A&usqp=CAU\",\n    \"museumname\": \"Virasat-e-Khalsa\",\n    \"museuminfo\": \"Virasat-e-Khalsa is a museum of Sikhism, located in the holy town, Anandpur Sahib of the state of Punjab, India.The museum celebrates 500 years of the Sikh history and the 300th anniversary of the birth of Khalsa, \",\n    \"museumlocation\": \"Anandpur Sahib,Punjab\",\n    \"museumshowsnumber\": 12,\n    \"museumtime\": \"10:00am - 5:00pm\",\n    \"museumcost\": 45\n  },\n  {\n    \"museumid\": \"9\",\n    \"museumimg\": \"https://jaipurtourism.co.in/images/places-to-visit/header/albert-hall-museum-jaipur-entry-fee-timings-holidays-reviews-header.jpg\",\n    \"museumname\": \"Albert Hall Museum\",\n    \"museuminfo\": \"The Albert Hall Museum has a rich collection of artifacts including paintings, jewelry, carpets, ivory, stone, metal sculptures, and works in crystal.The collection includes coins from the Gupta, Kushan, Delhi Sultanate, Mughal and British periods. \",\n    \"museumlocation\": \"Jaipur,Rajasthan\",\n    \"museumshowsnumber\": 12,\n    \"museumtime\": \"10:00am - 5:00pm\",\n    \"museumcost\": 85\n  },\n  {\n    \"museumid\": \"10\",\n    \"museumimg\": \"https://dynamic.tourtravelworld.com/hotspot-images/goa-state-museum-250x250-3528.jpg\",\n    \"museumname\": \"Goa State Museum\",\n    \"museuminfo\": \"The State Museum of Goa is set up, with the aim at centralizing and preserving antiquities, art objects and objects of cultural importance, throwing light on the ancient historical and cultural traditions of Goa \",\n    \"museumlocation\": \"Panaji,Goa\",\n    \"museumshowsnumber\": 12,\n    \"museumtime\": \"10:00am - 5:00pm\",\n    \"museumcost\": 95\n  },\n  {\n    \"museumid\": \"11\",\n    \"museumimg\": \"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEijN1eOBUbTQOFLlhARw-gVycYu3YHzivx0nsO7IZq6SkI1asZ574DRSatXBHuG-NBPDhJdRvaacZA2hSEB3Y75ExKuLrhBn_RXb0uiN1LuuZXI971kI2Y6KaFH0s9zVZ5pm_nN-c78jyc/s695/national-museum-of-india-newdelhi.jpg\",\n    \"museumname\": \"National Museum\",\n    \"museuminfo\": \"The National Museum in New Delhi, also known as the National Museum of India, is one of the largest museums in India.Established in 1949, it holds a variety of articles ranging from the pre-historic era to modern works of art. \",\n    \"museumlocation\": \"Delhi,National Capital Territory of Delhi\",\n    \"museumshowsnumber\": 12,\n    \"museumtime\": \"10:00am - 5:00pm\",\n    \"museumcost\": 15\n  },\n  {\n    \"museumid\": \"12\",\n    \"museumimg\": \"https://images.adsttc.com/media/images/5294/d05b/e8e4/4eb9/3100/00c6/large_jpg/Screen_Shot_2013-11-26_at_9.41.52_AM.jpg?1385484373\",\n    \"museumname\": \"Kolkata Museum of Modern Art\",\n    \"museuminfo\": \"Located in the expansion area of Kolkata, the KMOMA Museum of Modern Art is envisioned as a new fragment of the city.The history of Kolkata, one of the largest cities in India, is closely connected to the evolution of popular Hindu art since the country’s first school of art opened in the 19th century. \",\n    \"museumlocation\": \"Kolkata,West Bengal\",\n    \"museumshowsnumber\": 12,\n    \"museumtime\": \"10:00am - 5:00pm\",\n    \"museumcost\": 15\n  },\n  {\n    \"museumid\": \"13\",\n    \"museumimg\": \"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo_6vhd5ZGftcpLGRt5KKXq00bMTnBKUpL4-vl1qnkM8Jj4XcplZfd6yPgvg6TejEFlzQ&usqp=CAU\",\n    \"museumname\": \"Allahabad Museum\",\n    \"museuminfo\": \"The Allahbad Museum is known for its rich collection and unique objects of art, and is funded by Ministry of Culture.Moreover, it is a premier research centre for archaeologists, historians and academicians\",\n    \"museumlocation\": \"Allahabad,Uttar Pradesh\",\n    \"museumshowsnumber\": 12,\n    \"museumtime\": \"10:00am - 5:00pm\",\n    \"museumcost\": 65\n  },\n  {\n    \"museumid\": \"14\",\n    \"museumimg\": \"https://ak.jogurucdn.com/media/image/p14/place-2017-06-4-5-518da0bedab6d706d7d6c48cbd7e3618.jpg\",\n    \"museumname\": \"Chennai Railway Museum\",\n    \"museuminfo\": \"In the rail museum,from the antique steam engines that once traversed the countryside to the regal coaches that carried emperors and peasants alike,each piece weaves a tale of the Indian Railways and its role in shaping the nation \",\n    \"museumlocation\": \"Chennai,Tamil Nadu\",\n    \"museumshowsnumber\": 12,\n    \"museumtime\": \"10:00am - 5:00pm\",\n    \"museumcost\": 90\n  },\n  {\n    \"museumid\": \"15\",\n    \"museumimg\": \"https://www.tripnight.com/public/thumbs/monuments/6287/wPGdtZL0y1uD_468_738.jpg\",\n    \"museumname\": \"Kutch Museum\",\n    \"museuminfo\": \"The oldest museum in Gujarat, founded in 1877 by Maharao Khengarji, it has the largest existing collection of Kshatrapa inscriptions,dating to the 1st century AD, as well as examples of the extinct Kachchhi script (now the language is mostly written in the Gujarati alphabets) and an interesting collection of coins \",\n    \"museumlocation\": \"Bhuj,Gujarat\",\n    \"museumshowsnumber\": 12,\n    \"museumtime\": \"10:00am - 5:00pm\",\n    \"museumcost\": 125\n  },\n  {\n    \"museumid\": \"16\",\n    \"museumimg\": \"https://assets.architecturaldigest.in/photos/600825151a54ece2b3ecf4e3/16:9/w_2560%2Cc_limit/Goa-Chitra-Museum-1366x768.jpg\",\n    \"museumname\": \"Goa Chitra Museum\",\n    \"museuminfo\": \" Goa Chitra  is a tribute by its founder to his ancestors and to their way of life using age-old wisdom passed down through generations.It is an unique collection and display of traditional farming implements and other ancient tools of trade set up against the backdrop of a traditional organic farm.\",\n    \"museumlocation\": \"Benaulium,Goa\",\n    \"museumshowsnumber\": 12,\n    \"museumtime\": \"10:00am - 5:00pm\",\n    \"museumcost\": 175\n  }\n]",
});

const generationConfig = {
  temperature: 1.3,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 900,
  responseMimeType: "application/json",
  responseSchema: {
    type: "object",
    properties: {
      response: {
        type: "string"
      },
      query_type: {
        type: "string"
      },
      username: {
        type: "string"
      },
      confirmation: {
        type: "number"
      },
      museum_name: {
        type: "string"
      },
      number_of_tickets: {
        type: "number"
      },
      date_of_booking: {
        type: "string"
      }
    },
    required: [
      "response",
      "query_type",
      "username",
      "confirmation",
      "museum_name",
      "number_of_tickets",
      "date_of_booking"
    ]
  },
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
 // safetySettings: Adjust safety settings
 // See https://ai.google.dev/gemini-api/docs/safety-settings
 history: history,
});



  const result = await chatSession.sendMessage(prompt);
  let newUserRole = {
    role: "user",
    parts: [{text:prompt}],
  };
  let newAIRole = {
    role: "model",
    parts: [{text:result.response.text()}],
  };
  
  history.push(newUserRole);
  history.push(newAIRole);
  console.log(result.response.text());
  const obj = JSON.parse(result.response.text());
  if(obj.confirmation==1){
    const bookinginp={};
    bookinginp.username=obj.username;
    bookinginp.museumname=obj.museum_name;
    bookinginp.ticketsbooked=obj.number_of_tickets.toString();
    bookinginp.validat=obj.date_of_booking;
    

    fetch('http://localhost:9000/Tickets',{
      method:'POST',
      headers:{"Content-Type": "application/json"},
      credentials:'include',
      body:JSON.stringify(bookinginp)
     })
     .then(Response=>Response.json())
     .then((response)=>{console.log("");
       console.log(response);
     })
     .catch(error=>console.error(error));
          
  }

  return (obj.response);
}

 
 export default run

