const escapeHtml = (str = "") =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const APP_URL = process.env.APP_URL;

const connectionRequestEmail = ({ toName, fromName, fromAbout }) => {
  const to = escapeHtml(toName);
  const from = escapeHtml(fromName);
  const about = escapeHtml(fromAbout || "");

  const subject = `${fromName} wants to build with you on devTinder`;

  const html = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#100e2b;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#100e2b" style="background:#100e2b;padding:32px 12px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" bgcolor="#1b1642" style="max-width:560px;width:100%;background:#1b1642;border:1px solid #2d2660;border-radius:20px;">
        <tr>
          <td style="padding:28px 32px 0;font-size:22px;font-weight:bold;color:#f0eeff;">
            dev<span style="color:#f0675c;">Tinder</span>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 32px 8px;color:#f0eeff;font-size:26px;font-weight:bold;line-height:1.3;">
            Someone wants to build with you.
          </td>
        </tr>
        <tr>
          <td style="padding:0 32px;color:#8a80b8;font-size:16px;line-height:1.6;">
            Hi ${to}, <strong style="color:#f0eeff;">${from}</strong> just sent you a connection request.
          </td>
        </tr>
        ${
          about
            ? `<tr><td style="padding:20px 32px 0;">
                 <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#110f2a" style="background:#110f2a;border:1px solid #2d2660;border-radius:12px;">
                   <tr><td style="padding:14px 18px;color:#8a80b8;font-size:15px;line-height:1.5;">${about}</td></tr>
                 </table>
               </td></tr>`
            : ""
        }
        <tr>
          <td style="padding:28px 32px;">
            <table cellpadding="0" cellspacing="0"><tr>
              <td bgcolor="#db6680" style="background:#db6680;border-radius:12px;">
                <a href="${APP_URL}/home/request" style="display:inline-block;padding:14px 28px;color:#ffffff;font-size:16px;font-weight:bold;text-decoration:none;">View request</a>
              </td>
            </tr></table>
          </td>
        </tr>
        <tr>
          <td style="padding:0 32px 28px;color:#8a80b8;font-size:12px;line-height:1.5;">
            You are receiving this because you have an account on devTinder. You can manage your notifications in your account settings.
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const text = `Hi ${toName},

${fromName} just sent you a connection request on devTinder.

View the request: ${APP_URL}/requests

You are receiving this because you have an account on devTinder.`;

  return { subject, html, text };
};

module.exports = connectionRequestEmail;
