const express = require('express');
const { messages } = require('./messages');
const { sendEvent } = require('./ctxApi');
const fs = require('fs');


const file = 'users.json';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('', (req, res) => {
    console.log(req.body);
    res.send({ "status": "success" });
})

app.post('/ctwa', async (req, res) => {
    console.log(req.body);
    let response = "hey";

    if (req.body.type == 'user-event') {

        res.send(response);

    } else if (req.body.type == 'message') {

        fs.readFile(file, 'utf8', async (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            users = JSON.parse(data);
            console.log('users', users);
            let phone = req.body.payload.sender.phone;
            let campaign = req.body.payload.referral?.source_id || "";
            let name = req.body.payload.sender?.name;
            if (req.body.payload.type == 'text') {
                let msg = req.body.payload.payload.text;
                if (campaign == '8ab2d616-99dc-44ff-a282-040dab039093') {
                    if (!users[phone]?.type) {
                        newItem = { [phone]: { type: 'CTX' } };
                        users = {
                            ...users, ...newItem
                        }
                    }
                    response = messages.getact(name);

                } else if (Number(msg)) {
                    response = messages.askname;
                    users[phone].phone = msg;
                    sendEvent(1, phone, users[phone].type, res => { });
                } else {
                    response = messages.end;
                    users[phone].name = msg;
                    sendEvent(2, phone, users[phone].type, res => { });
                }

            } else if (req.body.payload.type == "quick_reply") {
                if (req.body.payload.payload.text == 'Still interested') {
                    users[phone].type = 'MKT';
                    if (users[phone]?.service) {
                        if (users[phone]?.phone) {
                            response = messages.askname;
                        } else {
                            let act = users[phone].service;
                            response = messages.getphone(act)
                        }

                    }
                } else{
                    response = messages.wrongend;
                }

            } else if (req.body.payload.type == "list_reply") {
                let act = req.body.payload.payload.title;
                response = messages.getphone(act);
                users[phone].service = act;
                let type = users[phone].type;
                sendEvent(0, phone, type, res => { });
            }


            fs.writeFile(file, JSON.stringify(users), 'utf8', async (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                res.send(response);
            })
        })
    }
})

app.listen(port, async () => {
    console.log(`Server running`);

})
