const axios = require('axios');

async function sendSms(newUser) {
    const token = 'C7ivzgmJ4PnNy5UV2IbKrAjft01kXaOhGRs38xqwLWeMZDcEpFHodSQu6TY9Bl';
    const senderId = 'Rail Me';
    const recipients = newUser.phoneNumber;
    const otp = newUser.otp;
    const appnamecode = '9890762934';
    const templatecode = '3457256385';

    const data = JSON.stringify({
        token: token,
        senderId: senderId,
        recipients: recipients,
        otp: otp,
        appnamecode: appnamecode,
        templatecode: templatecode
    });

    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://my.kudisms.net/api/otp?token=${token}&senderID=${senderId}&recipients=${recipients}&otp=${otp}&appnamecode=${appnamecode}&templatecode=${templatecode}`,
        headers: { },
        data: data
    };

    try {
        const response = await axios(config);
        console.log(JSON.stringify(response.data));
    } catch (error) {
        console.error(error);
    }
}

module.exports = { sendSms };
