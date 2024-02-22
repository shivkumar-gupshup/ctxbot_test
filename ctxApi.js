const { default: axios } = require('axios');
let apikey = 'QaGstLHddJAl1nonq6kuk9QimkM0Qia3';
let goalId = "31567155";
let goals = ["Lead", "DeepConversation", "QualifiedLead"];
let pageId = 213330505204743;
//let datasetId = "DATA_SET_ID";

const sendEvent = (type, phone, source, callbackFunc) => {
    let body = {
        "customerId": phone,
        "goalEvent": {
            "goalId": goalId,
            "milestoneId": `${goals[type]}`,
            "sourceType":source,
            "timestamp": Date.now(),
            "trackers": [
                {
                    "id": `ctx${goals[type]}`,
                    "value": 1
                }
            ]
        },
        "capiEvent": {
            "pageId": pageId,
            "datasetId": datasetId,
            "accessToken": "ACCESS_TOKEN",
            "eventName": "LeadSubmitted",
            "actionSource": "business_messaging",
            "messaging_channel": "whatsapp"
        }
    };

    const config = {
        headers: {
            'apikey': apikey,
            'Content-Type': 'application/json',
        }
    }


    axios.post('https://ctx-be.gupshup.io/partner/v1/customer/goal-event?sendToCapi=false&sendToGA=true', body, config)
        .then((result) => {
            console.log('Event sent', result.data);
            callbackFunc(result.data);
        })
        .catch((err) => {
            console.log(err);
            callbackFunc(err);
        })
}


module.exports = { sendEvent }
