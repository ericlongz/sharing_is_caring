const axios = require("axios");
const https = require("https");

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

async function getDataAgent(url) {
  const getTokenResponse = await axios.post(
    url + "/session/login",
    {
      username: "ericlie",
      password: "eric07ad",
    },
    { httpsAgent, headers: { "content-type": "application/json" } }
  );

  const token = getTokenResponse.data["token"];
  const serverCTM = "DEVCTMUNIX";

  const getData = await axios.get(url + `/config/server/${serverCTM}/agents`, {
    httpsAgent,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = getData.data.agents;

  const logoutSession = await axios.post(
    url + "/session/logout",
    {},
    {
      httpsAgent,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
}

getDataAgent("https://olndctmapp01:8443/automation-api").then((data) => {
  console.log(data);
});
