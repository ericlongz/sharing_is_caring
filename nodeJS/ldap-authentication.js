//PROD

const { authenticate } = require('ldap-authentication');
const axios = require('axios');
const https = require('https');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

let authenticateUser = async (username, password) => {
  try {
    let getToken = await axios.post(
      'https://conjur-follower2.intra.bca.co.id/api/authn/BCA/host%2Fprod%2Fapplication%2FCTM-01%2FCTM-01/authenticate',
      '12b25e4f7tst4890wzgzcz6jm1947gr82dqmrft3ff881jyw3ekk',
      {
        headers: {
          'Accept-Encoding': 'base64',
        },
      }
    );

    let getPasswd = await axios.get(
      'https://conjur-follower2.intra.bca.co.id/api/secrets/BCA/variable/KP2CARKPAM01/LOB_Conjur01/BCA_WINDOWS/bcadomain-automationapi/password',
      {
        headers: {
          Authorization: 'Token token="' + getToken.data + '"',
        },
      }
    );

    let getLoginDn = await authenticate({
      ldapOpts: { url: 'ldap://intra.bca.co.id' },
      //userDn: 'CN=ERIC WU,OU=KantorPusat,DC=intra,DC=bca,DC=co,DC=id',
      userDn: 'CN=automationapi,OU=UserApp,DC=intra,DC=bca,DC=co,DC=id',
      userPassword: getPasswd.data,
      userSearchBase: 'DC=intra,DC=bca,DC=co,DC=id',
      usernameAttribute: 'samAccountName',
      username: username,
    });

    let authenticated = await authenticate({
      ldapOpts: { url: 'ldap://intra.bca.co.id' },
      userDn: getLoginDn.distinguishedName,
      userPassword: password,
    });

    return authenticated;
  } catch (err) {
    console.log(err);
    return false;
  }
};

authenticateUser('U070048', 'eric01ad').then(function (response) {
  console.log(response);
});

// DEV

// const { authenticate } = require('ldap-authentication');
// const axios = require('axios');
// const https = require('https');

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// module.exports = {
//   authenticateUser: async function (username, password) {
//     try {
//       let getToken = await axios.post(
//         'https://10.43.5.146/api/authn/BCADEV/host%2fdev%2fdevelopment%2fserver%2fcontrol-m%2fcontrol_m01/authenticate',
//         'ytmt7635cf0zrxgkfh5m24mjp1qamh5j3z4th401pwg649364wdyk',
//         {
//           headers: {
//             'Accept-Encoding': 'base64',
//           },
//         }
//       );

//       let getPasswd = await axios.get(
//         'https://10.43.5.146/secrets/BCADEV/variable/DEVVLTCPAS01/LOB_BCADEVConjur01/BCA_CTM/Operating%20System-BCA_Wintel_Domain_Expired-dti.co.id-ctmapi/password',
//         {
//           headers: {
//             Authorization: 'Token token="' + getToken.data + '"',
//           },
//         }
//       );

//       let getLoginDn = await authenticate({
//         ldapOpts: { url: ldapURI },
//         userDn: 'CN=suppauto,OU=DEVUSER2,OU=DEVUSER,DC=dti,DC=co,DC=id',
//         userPassword: getPasswd.data,
//         userSearchBase: 'DC=dti,DC=co,DC=id',
//         usernameAttribute: 'CN',
//         username: username,
//       });

//       let authenticated = await authenticate({
//         ldapOpts: { url: 'ldap://dti.co.id' },
//         userDn: getLoginDn.distinguishedName,
//         userPassword: password,
//       });

//       return authenticated;
//     } catch (err) {
//       console.log(err);
//       return false;
//     }
//   },
// };
