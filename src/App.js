import "./App.css";
import React, { useState } from "react";
import SBConversation from "@sendbird/uikit-react/Channel";
import SBChannelList from "@sendbird/uikit-react/ChannelList";
import { ChannelListProvider } from "@sendbird/uikit-react/ChannelList/context";
import SBChannelSettings from "@sendbird/uikit-react/ChannelSettings";
import "@sendbird/uikit-react/dist/index.css";
import CreateChannelModal from "./CreateChannelModal";
import withSendbird from '@sendbird/uikit-react/withSendbird';

function App(props) {
  const USER_ID = "Bob_1";
  console.log(props.stores.sdkStore)


  const [showSettings, setShowSettings] = useState(false);
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
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

  const openCreateChannelModal = () => {
    console.log('Open modal view')
    setShowCreateChannelModal(true)
  }

  const onChannelCreation = (channelUrl) => {
    setCurrentChannelUrl(channelUrl);
    setShowCreateChannelModal(false);
  }

  if (!props.stores.sdkStore.initialized) {
    return null;
  }

  const param = {};
  param.includeEmpty = true;
  param.limit = 1;

  param.order = 'latest_last_message';

  const channelListQuery = props.stores.sdkStore.sdk.groupChannel.createMyGroupChannelListQuery(param);
  console.log(channelListQuery);

  return (
    <div className="App">

      <div className="sendbird-app__wrap">
        {showCreateChannelModal && (
          <CreateChannelModal userId={USER_ID} onChannelCreation={onChannelCreation} setShowCreateChannelModal={setShowCreateChannelModal} />
        )}
        <div className="sendbird-app__channellist-wrap">
          <button className="create-channel-button" onClick={openCreateChannelModal}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
              <path
                className="icon-create_svg__fill"
                d="M32 2.667C48.2 2.667 61.333 15.8 61.333 32S48.2 61.333 32 61.333c-4.455 0-8.679-.993-12.461-2.77l-1.753.58c-5.965 1.912-10.133 2.572-12.504 1.981-2.799-.698-3.351-1.919-1.657-3.663 1.171-1.396 2.147-3.14 2.928-5.234.622-1.668.377-4.001-.737-7A29.15 29.15 0 012.666 32C2.667 15.8 15.8 2.667 32 2.667zM32 8C18.745 8 8 18.745 8 32c0 3.5.747 6.88 2.168 9.978l.405.837.137.271.106.285c1.517 4.085 1.89 7.622.734 10.72l-.382.972-.192.433.235-.05a62.067 62.067 0 004.886-1.363l1.721-.568 2.04-.696 1.95.917A23.882 23.882 0 0032 56c13.255 0 24-10.745 24-24S45.255 8 32 8zm2.667 16v5.333H40c3.556 0 3.556 5.334 0 5.334h-5.333V40c0 3.556-5.334 3.556-5.334 0v-5.333H24c-3.556 0-3.556-5.334 0-5.334h5.333V24c0-3.556 5.334-3.556 5.334 0z"
                fill="#000"
                fillRule="evenodd"
              ></path>
            </svg>
          </button>
          <ChannelListProvider queries={{ channelListQuery }}>
            <SBChannelList
              onChannelSelect={(channel) => {
                if (channel && channel.url) {
                  setCurrentChannelUrl(channel.url);
                }
              }}
            />
          </ChannelListProvider>
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
    </div>
  );
}

export default withSendbird(App);
