import axios from "../libs/ajaxRequest";

// 用户相关的接口

// 调获取用户信息的接口  向外暴露一个getUser方法  这个方法中调了接口
// 在组件中，就可以使用getUser，就相当于调用接口
export const getUser = () => {
  return axios.request({
    url: "/auth/user",
    method: "get",
  });
};

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

// 再向外暴露一个登录的方法，方法内部也是调接口
// 在登录组件中就可以调用Login方法，需要给方法传递一个用户名
export const login = (username, password) => {
  return axios.request({
    url: "/auth/login",
    method: "post",
    data: {
      username: username,
      password: password
    },
  });
};

//验证token方法
export const validate = () => {
  return axios.request({
    url: "/auth/validate",
    method: "get",
  });
};

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


export const getRssToken = () => {
  return axios.request({
    url: "/auth/token",
    method: "get",
    data: {},
  })
}

export const resetRssToken = () => {
  return axios.request({
    url: "/auth/updateToken",
    method: "get",
    data: {},
  })
}
