db.createCollection("unclassified", {
   validator: {
      $jsonSchema: {
		  bsonType: "object",
		  properties: {
		    cid: {
		      bsonType: "string"
		    },
		    source: {
		      bsonType: "string"
		    },
		    turns: {
		      bsonType: "array",
		      items: {
		        title: "itemOf_turns",
		        bsonType: "object",
		        properties: {
		          text: {
		            bsonType: "string"
		          },
		          user: {
		            bsonType: "string"
		          }
		        }
		      }
		    }
		  }
	 	}
   }
});

db.getCollection("unclassified").insert([
	{"cid":"U21E41CQP-60ae1619-c76c-42db-9aff-171528aed18a","source":"maluuba-frames","turns":[{"user":"user","text":"Good day, please book me a trip from Vancouver, Jamaica to Recife. I would like to leave for 17 days on August 24."},{"user":"wizard","text":"Would you like to travel to Vancouver, Canada from Dublin, USA?"},{"user":"user","text":"No, I would like to depart from Vancouver, Jamaica for the aforementioned destination."},{"user":"wizard","text":"I can book you an 8 day trip from Calgary to Vancouver, Canada for 810.50USD."},{"user":"user","text":"I would not like to travel to Vancouver, Canada.  Do you have any trips to Recife, Brazil?"},{"user":"wizard","text":"I can book you a trip from Porto Alegre to Recife for 682.19USD."},{"user":"user","text":"I will take any package you give me to any destination as long as it leaves from Vancouver, Jamaica."},{"user":"wizard","text":"I can book you a trip from Vancouver, Canada to Toronto, Canada for 837.99USD."},{"user":"user","text":"If you cannot book me a flight that leaves from Vancouver, Jamaica then I cannot book a trip."},{"user":"wizard","text":"I cannot book you a trip leaving from Vancouver, Jamaica."},{"user":"user","text":"Actually I will be departing from Vancouver, British Columbia, do you have packages to Recife?"},{"user":"wizard","text":"I can book 11 days in Recife leaving from Vancouver for 2171.6USD."},{"user":"user","text":"Do you have any similar packages to Goiania?"},{"user":"wizard","text":"I can book 5 days in Goiania for 2190.68USD."},{"user":"user","text":"What kind of hotel would I be staying at in Recife?"},{"user":"wizard","text":"3.5 star hotel for free wi-fi, free parking, and free breakfast."},{"user":"user","text":"Would my room have a view of the city? How much would it cost to upgrade to a room with a view?"},{"user":"wizard","text":"I cannot provide this information"},{"user":"user","text":"Ok, I'm ready to buy this package"},{"user":"wizard","text":"Ok. I will book this package for you. You will be leaving Vancouver, Canada at 1:00 pm - Monday, August 15th 2016 and arriving in Recife, Brazil at 10:16 pm - Monday, August 15th 2016. You will be staying at La Casa Del Amor. Enjoy your trip."},{"user":"user","text":"I was supposed to leave on August 24th. Do you have any packages that leave on that date?"},{"user":"wizard","text":"I can book you 11 days in Recife leaving Vancouver on August 27th for 3119.42USD."},{"user":"user","text":"Actually I would like to purchase the first package to Recife."},{"user":"wizard","text":"Ok, I will book you the package to Recife that leaves Vancouver, Canada on August 15."},{"user":"user","text":"Thanks"}],"cluster_id":"1","tags":["trip","hotel"]},
	{"cid":"U21E41CQP-53690088-eadc-4e3f-bb71-a9c778615c1b","source":"maluuba-frames","turns":[{"user":"user","text":"I would like a vacation for one in Mannheim from August 17 to September 7. My city of departure is Porto Alegre. It should cost less than $3000."},{"user":"wizard","text":"I do not have a travel package to Mannheim from Porto Alegre for these travel dates.  I do however, have packages available from August 17th to the 29th.     Would these dates work for you?"},{"user":"user","text":"How much would this package cost?"},{"user":"wizard","text":"I have two options.  The first option is a travel package which costs 2314.59 USD.  The second package costs 2981.83 USD.  Which one would you prefer?"},{"user":"user","text":"If I increase my budget to $6000, does that open up any options from August 17 to September 7?"},{"user":"wizard","text":"I still have only two packages available from August 17th to September 7th.  Would you like to try a different travel destination?"},{"user":"user","text":"What other destinations can you offer me with these dates?"},{"user":"wizard","text":"I have no other destinations available for these dates.  Would you like to change the start date or the end date?"},{"user":"user","text":"Are there packages for two-week trips within these dates?"},{"user":"wizard","text":"I have two possible packages for you.  Atlanta, United States, to Indianapolis, United States or Brasilia, Brazil to Vancouver, Canada.  Which would you prefer?"},{"user":"user","text":"Are both of the packages to Porto still available if I bring my wife with me?"},{"user":"wizard","text":"The only package which would be available would be Atlanta, United States to Vancouver, Canada.  I have two packages available for you: one for  $2182.70, and another for $2326.54.  Would you like me to describe these two packages for you?"},{"user":"user","text":"Yes, please."},{"user":"wizard","text":"The first travel package is an Economy flight from Atlanta, United States to Vancouver, Canada at 6:00 p.m. on August 11th,  and an Economy flight from Vancouver, Canada to Atlanta, United States at 10:00 a.m on August 14th.  The cost of $2182.70 includes a 4 star hotel with a 8.8/10 rating."},{"user":"user","text":"What is the second package"},{"user":"wizard","text":"The second travel package is an Economy flight from Atlanta, United States to Vancouver, Canada at 6:00 p.m. on Friday, August 19th, and an Economy flight from Vancouver, Canada to Atlanta, United States at 10:00 a.m. on Monday, August 22nd.  The cost of $2326.54 includes a 4 star hotel with guest rating of 8.8/10.  Would you like to book this travel package?"},{"user":"user","text":"I would like to book the first package to Vancouver"}],"cluster_id":"1","tags":["trip","budget","hotel"]}
]);

db.createCollection("classified", {
   validator: {
      $jsonSchema: {
		  bsonType: "object",
		  properties: {
		    cid: {
		      bsonType: "string"
		    },
		    source: {
		      bsonType: "string"
		    },
		    turns: {
		      bsonType: "array",
		      items: {
		        title: "itemOf_turns",
		        bsonType: "object",
		        properties: {
		          text: {
		            bsonType: "string"
		          },
		          user: {
		            bsonType: "string"
		          },
		          intent: {
		            bsonType: "string"
		          },
		          isAction: {
		            bsonType: "boolean"
		          },
		          entities: {
		            bsonType: "array",
		            items: {
		              title: "itemOf_entities",
		              bsonType: "object",
		              properties: {
		                start: {
		                  bsonType: "number"
		                },
		                end: {
		                  bsonType: "number"
		                },
		                value: {
		                  bsonType: "string"
		                },
		                entity: {
		                  bsonType: "string"
		                }
		              }
		            }
		          }
		        }
		      }
		    }
		  }
		}
   }
});

db.getCollection("unclassified").createIndex( { 
	cid: "text", 
	source: "text",  
	"turns.text": "text"
});

db.getCollection("classified").createIndex( {
   cid: "text",
   "source": "text",  
   "turns.text": "text",
   "turns.intent": "text",
   "turns.entities.value": "text",
   "turns.entities.entity": "text"
});