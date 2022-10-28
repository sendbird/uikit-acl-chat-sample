const express = require('express');
const SendbirdPlatformSdk = require('sendbird-platform-sdk');
const cors = require('cors');

const APP_ID = process.env.APP_ID;
const API_TOKEN = process.env.API_TOKEN;

const app = express();
app.use(express.json());
app.use(cors());

app.get('/users', async (req, res) => {
    const { userId, sessionToken } = req.body;
    // this user data would come from a DB in a prod app
    // userID and sessionToken can be used ensure we return the correct user list for each request
    // add these users via the Sendbird dashboard
    const users = [{ "name": "Alex Chin", "id": "1", "image": "https://t4.ftcdn.net/jpg/03/02/94/53/360_F_302945354_dqIiUiITKpard7fBVKDLtffIqnkDbyo4.jpg" }, { "name": "Patricia Garcia", "id": "2", "image": "https://www.wallisphoto.com/IMAGES/2019/Women-Headshots/real-estate-agent-headshot.jpg" }, { "name": "Carlos Davis", "id": "3", "image": "https://thumbs.dreamstime.com/b/headshot-portrait-black-man-posing-studio-smiling-african-american-millennial-tshirt-isolated-grey-background-happy-male-153882352.jpg" }, { "name": "Claire Smith", "id": "4", "image": "https://www.davidbroadway.com.au/images/porftolio/corporate-portraits/210408-2802e.JPG" }, {
        "name": "Robert Jones", "id": "5", "image": "https://thumbs.dreamstime.com/b/headshot-handsome-bearded-man-smiling-standing-against-white-background-headshot-handsome-bearded-man-smiling-standing-202880713.jpg"
    }, {
        "name": "Margo Williams", "id": "6", "image": "https://kpstudios.com/wp-content/uploads/2022/02/professional-headshots_kpstudios01.jpg"
    }]
    res.status(200).send({ users });

});

app.post('/channel', async (req, res) => {
    const { userIds } = req.body;

    const gcCreateChannelData = new SendbirdPlatformSdk.GcCreateChannelData()
    gcCreateChannelData.user_ids = userIds;
    gcCreateChannelData.is_distinct = false;


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
        console.log(e);
        res.status(400).send({ error: e });

    }


});

app.listen(7001);