const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

admin.initializeApp();

exports.getAWSCredentials = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const credentials = {
      accessKeyId: functions.config().aws.access_key,
      secretAccessKey: functions.config().aws.secret_key,
      region: functions.config().aws.region,
      bucketName: functions.config().aws.bucket,
    };
    res.json(credentials);
  });
});
