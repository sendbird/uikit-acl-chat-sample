import "./App.css";
import React, { useState } from "react";
import SBProvider from "@sendbird/uikit-react/SendbirdProvider";
import SBConversation from "@sendbird/uikit-react/Channel";
import SBChannelList from "@sendbird/uikit-react/ChannelList";
import SBChannelSettings from "@sendbird/uikit-react/ChannelSettings";
import "@sendbird/uikit-react/dist/index.css";

function App() {
  const APP_ID = process.env.REACT_APP_APP_ID;
  const USER_ID = process.env.REACT_APP_USER_ID;
  const NICKNAME = process.env.REACT_APP_NICKNAME;
  const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
  const [showSettings, setShowSettings] = useState(false);
  const [currentChannelUrl, setCurrentChannelUrl] = useState("");
  const conversationWrap = document.getElementsByClassName(
    "sendbird-app__conversation-wrap"
  )[0];

  const renderSettingsBar = () => {
    conversationWrap.style.marginRight = "318px";
  };
  const hideSettingsBar = () => {
    conversationWrap.style.marginRight = "0px";
  };

  return (
    <div className="App">
      <SBProvider
        appId={APP_ID}
        userId={USER_ID}
        nickname={NICKNAME}
        accessToken={ACCESS_TOKEN}
      >
        <div className="sendbird-app__wrap">
          <div className="sendbird-app__channellist-wrap">
            <SBChannelList
              onChannelSelect={(channel) => {
                if (channel && channel.url) {
                  setCurrentChannelUrl(channel.url);
                }
              }}
            />
          </div>
          <div className="sendbird-app__conversation-wrap">
            <SBConversation
              channelUrl={currentChannelUrl}
              onChatHeaderActionClick={() => {
                setShowSettings(true);
                renderSettingsBar();
              }}
            />
            {showSettings && (
              <div className="sendbird-app__settingspanel-wrap">
                <SBChannelSettings
                  channelUrl={currentChannelUrl}
                  onCloseClick={() => {
                    setShowSettings(false);
                    hideSettingsBar();
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </SBProvider>
    </div>
  );
}

export default App;
