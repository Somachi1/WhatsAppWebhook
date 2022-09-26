const express = require("express");
const body_parser = require("body-parser")
const axios = require("axios")


const app = express().use(body_parser.json())

const token = "Identiko"

app.listen(8000, ()=>{
    console.log("webhook is listening");
});


app.get("/webhook", (req, res)=>
{
    let mode= req.query["hub.mode"];
    let challenge =req.query["hub.challenge"]
    let toekn = req.query["hub.verify_token"]

    const mytoken ="Identiko";

    if (mode && token)
    {
        if (node =="subscribe" && token ==mytoken)
        {
            res.status(200).send(challenge)
        }
        else
        {
            res.status(403)
        }
    
    }
})

app.post("/webhook", (req, res)=>{
    let body = req.body;

    console.log(JSON.stringify(body, null, 2))

    if(body.object)
    {
        if(body.entry && 
            body.entry[0].changes &&
            body.entry.changes[0].value.message &&
            body.entry.changes[0].value.message[0])
            {
                let phone_id = body.entry[0].changes[0].value.metadata.phone_numnber_id;
                let from = body.entry[0].changes[0].value.messages[0].from;
                let msg_body = body.entry[0].changes[0].value.messages[0].text.body;

                axios({
                    method: "POST",
                    url: "https://graph.facebook.com/v14.0/"+phone_id+"/messages?access_token="+token,
                    data: {
                        messaging_product:"whatsapp",
                        to:from,
                        text: {
                            body:"Hi ... I'm Prasath"
                        },
                        headers: {
                            "COntent-Type": "application/json"

                        }

                    }
                });
                res.sendStatus(200);

            }
            else
            {
                res.sendStatus(404);
            }
        
    }
})
