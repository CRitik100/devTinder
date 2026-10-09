const escapeHtml = (str = "") =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const APP_URL = process.env.APP_URL;

const welcomeEmail = (toName) => {
  const to = escapeHtml(toName);

  const subject = "Welcome to devTinder";

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
            Welcome, ${to}.
          </td>
        </tr>
        <tr>
          <td style="padding:0 32px;color:#8a80b8;font-size:16px;line-height:1.6;">
            Your account is ready. devTinder is where developers find people to build with.
          </td>
        </tr>
        <tr>
          <td style="padding:20px 32px 0;">
            <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#110f2a" style="background:#110f2a;border:1px solid #2d2660;border-radius:12px;">
              <tr><td style="padding:16px 20px;color:#8a80b8;font-size:15px;line-height:1.8;">
                <span style="color:#f0eeff;font-weight:bold;">1.</span> Complete your profile<br>
                <span style="color:#f0eeff;font-weight:bold;">2.</span> Browse developers in your feed<br>
                <span style="color:#f0eeff;font-weight:bold;">3.</span> Send a connection request
              </td></tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 32px;">
            <table cellpadding="0" cellspacing="0"><tr>
              <td bgcolor="#db6680" style="background:#db6680;border-radius:12px;">
                <a href="${APP_URL}/login" style="display:inline-block;padding:14px 28px;color:#ffffff;font-size:16px;font-weight:bold;text-decoration:none;">Open devTinder</a>
              </td>
            </tr></table>
          </td>
        </tr>
        <tr>
          <td style="padding:0 32px 28px;color:#8a80b8;font-size:12px;line-height:1.5;">
            You are receiving this because you created an account on devTinder.
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const text = `Welcome, ${toName}.

Your account is ready. devTinder is where developers find people to build with.

1. Complete your profile
2. Browse developers in your feed
3. Send a connection request

Open devTinder: ${APP_URL}

You are receiving this because you created an account on devTinder.`;

  return { subject, html, text };
};

module.exports = welcomeEmail;
