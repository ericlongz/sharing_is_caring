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
    'https://10.43.5.146/api/authn/BCADEV/host%2fdev%2fdevelopment%2fserver%2fcontrol-m%2fcontrol_m01/authenticate',
    'ytmt7635cf0zrxgkfh5m24mjp1qamh5j3z4th401pwg649364wdyk',
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
        'https://10.43.5.146/secrets/BCADEV/variable/DEVVLTCPAS01/LOB_BCADEVConjur01/BCA_CTM/Operating%20System-BCA_Wintel_Domain_Expired-dti.co.id-ctmapi/password',
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
