const { subDays, startOfDay, endOfDay } = require("date-fns");

const cronjob = require("node-cron");
const Connection = require("../../../models/connection");
const sendEmail = require("./sendEmail");
const pendingRequestsEmail = require("./templates/pendingRequestsEmail");

const USER_SAFE_DATA = "firstName lastName emailId";

cronjob.schedule("0 8 * * *", async () => {
  try {
    const yesterday = subDays(new Date(), 0);
    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);

    const pendingYesterdayConnection = await Connection.find(
      {
        createdAt: {
          $gte: yesterdayStart,
          $lt: yesterdayEnd,
        },
      },
      "toUserId",
    ).populate("toUserId", USER_SAFE_DATA);

    const filterUniqueUser = new Set(
      pendingYesterdayConnection.map((data) => data.toUserId),
    );
    for (const user of filterUniqueUser) {
      const emailData = pendingRequestsEmail(user.firstName);
      const data = await sendEmail.run({
        from: "devTinder <notifications@devtinder11.com>",
        to: user.emailId,
        ...emailData,
      });
    }
  } catch (error) {
    console.log("Error => " + error.message);
  }
});
