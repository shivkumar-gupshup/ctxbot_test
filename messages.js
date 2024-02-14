const messages = {
    getact: (name) => {
        return `{ "type":"list", "title":"Valentine's Day", "body":"Hi ${name}, what would you like to do?", "msgid":"list1", "globalButtons":[ { "type":"text", "title":"Options" } ], "items":[ { "title":"Romantic options", "subtitle":"", "options":[ { "type":"text", "title":"Book a staycation for 2", "description":"", "postbackText":"01" }, { "type":"text", "title":"Photo shoot and dinner", "description":"", "postbackText":"02" }, { "type":"text", "title":"Parisian date night", "description":"", "postbackText":"03" } ] }, { "title":"Fun options", "subtitle":"", "options":[ { "type":"text", "title":"Karaoke night", "description":"", "postbackText":"04" },{ "type":"text", "title":"Bike ride and sunset", "description":"", "postbackText":"05" } ] } ] }`

    },
    getphone: (act) => {
        return `Ohh, you guys would love this activity(*${act}*)🥰.
        
To keep in touch, could you please enter your phone number?⬇️`

    },
    askname: `Ok just one more thing our team needs for the reservation🤗 
    
Please enter your full name⬇️`,

    end: `{"type":"text","text":"Thanks for that, one of our team will send you the next steps to have the best Valentine's day📅💗."}`,

    wrongend: `Ok thanks`,

}

module.exports = { messages };