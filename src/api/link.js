import axios from "@/libs/ajaxRequest";

export const newLink = (channelId, link) => {
  return axios.request({
    url: "/api/links",
    method: "post",
    data: {
      channelId: channelId.toString(),
      link
    },
  })

}
