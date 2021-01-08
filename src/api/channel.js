import axios from "@/libs/ajaxRequest";

export const getChannels = () => {
  return axios.request({
    url: "/api/channels",
    method: "get"
  });
};
export const deleteChannle = (cid) => {
  return axios.request({
    url: "/api/channels/" + cid,
    method: "delete"
  })
}
export const addChannels = (channelName) => {
  return axios.request({
    url: "api/channels",
    data: {
      channelName: channelName
    },
    method: "post"
  })
}
