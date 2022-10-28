const express = require('express');
const SendbirdPlatformSdk = require('sendbird-platform-sdk');
const cors = require('cors');

const APP_ID = process.env.APP_ID;
const API_TOKEN = process.env.APP_ID;

const app = express();
app.use(express.json());
app.use(cors());

app.get('/users', async (req, res) => {
    const { userId, sessionToken } = req.body;
    // this user data would come from a DB in a prod app
    // userID and sessionToken can be used ensure we return the correct user list for each request
    const users = [{ name: 'a', id: '1' }, { name: 'b', id: '2' }, { name: 'c', id: '3' }]
    res.status(200).send({ users });

});

app.post('/channel', async (req, res) => {
    const { userIds } = req.body;

    const gcCreateChannelData = new SendbirdPlatformSdk.GcCreateChannelData()
    gcCreateChannelData.user_ids = userIds;
    gcCreateChannelData.name = "blah";

    const opts = {
        'gcCreateChannelData': gcCreateChannelData
    };
    console.log(gcCreateChannelData);
    const channelApiInstance = new SendbirdPlatformSdk.GroupChannelApi();
    channelApiInstance.apiClient.basePath = `https://api-${APP_ID}.sendbird.com`;

    try {
        const data = await channelApiInstance.gcCreateChannel(API_TOKEN, opts);
        res.status(200).send({ data });

    } catch (e) {
        res.status(400).send({ error: e });

    }


});

app.listen(7001);