const axios = require('axios');
const https = require('https');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Get Control-M API Token

// axios
//   .post('https://olndctmapp02:8443/automation-api/session/login', {
//     username: 'ericlie',
//     password: 'eric01ad',
//   })
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.log(error.message);
//   });

axios
  .post(
    'https://conjur-follower2.intra.bca.co.id/api/authn/BCA/host%2Fprod%2Fapplication%2FCTM-01%2FCTM-01/authenticate',
    '12b25e4f7tst4890wzgzcz6jm1947gr82dqmrft3ff881jyw3ekk',
    {
      headers: {
        'Accept-Encoding': 'base64',
      },
    }
  )
  .then(function (response) {
    //console.log(typeof response.data);
    const token = response.data;
    console.log('Token token="' + response.data + '"');
    axios
      .get(
        'https://conjur-follower2.intra.bca.co.id/api/secrets/BCA/variable/KP2CARKPAM01/LOB_Conjur01/BCA_WINDOWS/bcadomain-automationapi/password',
        {
          headers: {
            Authorization: 'Token token="' + token + '"',
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(token);
        console.log(error.message);
      });
  })
  .catch(function (error) {
    console.log(error.message);
  });
