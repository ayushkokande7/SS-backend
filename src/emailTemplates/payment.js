const payment = (email, cname, instname, amount, transaction_id, date) => {
  const mail = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "studifysuccess",
    text: "Payment Successful",
    html: `<!doctype html>
    <html ⚡4email data-css-strict>
    
    <head>
        <meta name="robots" content="noindex">
        <meta charset="utf-8">
        <meta name="x-apple-disable-message-reformatting">
        <style amp4email-boilerplate>
            body {
                visibility: hidden
            }
        </style>
    
        <script async src="https://cdn.ampproject.org/v0.js"></script>
    
    
        <style amp-custom>
            .u-row {
                display: flex;
                flex-wrap: nowrap;
                margin-left: 0;
                margin-right: 0;
            }
    
            .u-row .u-col {
                position: relative;
                width: 100%;
                padding-right: 0;
                padding-left: 0;
            }
    
            .u-row .u-col.u-col-100 {
                flex: 0 0 100%;
                max-width: 100%;
            }
    
            @media (max-width: 767px) {
                .u-row:not(.no-stack) {
                    flex-wrap: wrap;
                }
    
                .u-row:not(.no-stack) .u-col {
                    flex: 0 0 100%;
                    max-width: 100%;
                }
            }
    
            body {
                margin: 0;
                padding: 0;
            }
    
            table,
            tr,
            td {
                vertical-align: top;
                border-collapse: collapse;
            }
    
            p {
                margin: 0;
            }
    
            .ie-container table,
            .mso-container table {
                table-layout: fixed;
            }
    
            * {
                line-height: inherit;
            }
    
            table,
            td {
                color: #000000;
            }
    
            #u_body a {
                color: #008b8b;
                text-decoration: underline;
            }
            .unsub{
                text-decoration:none!important;
            }
        </style>
    
    
    </head>
    
    <body class="clean-body u_body" style="margin: 0;padding: 0;background-color: #ced4d9;color: #000000">
        <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ced4d9;width:100%" cellpadding="0" cellspacing="0">
            <tbody>
                <tr>
                    <td style="display:none;visibility:hidden;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
                        Application Received
                    </td>
                </tr>
    
                <tr style="vertical-align: top">
                    <td style="word-break: break-word;border-collapse: collapse;vertical-align: top">
    
                        <div style="padding: 0px;">
                            <div style="max-width: 600px;margin: 0 auto;background-color: #ffffff;">
                                <div class="u-row">
    
                                    <div class="u-col u-col-100" style="display:flex;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                        <div style="width: 100%;padding:0px;">
    
                                            <table style="font-family:Ubuntu;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:20px;font-family:Ubuntu;" align="left">
    
                                                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                                <tr>
                                                                    <td style="padding-right: 0px;padding-left: 0px;" align="left">
                                                                        <a href="https://www.studifysuccess.com" target="_blank">
                                                                           <img alt="studifysuccess-img" src="https://www.studifysuccess.com/images/header.png" height="35" layout="intrinsic">
                                                                            </img> 
                                                                        </a>
                                                                    </td>
                                                                </tr>
                                                            </table>
    
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
    
                                        </div>
                                    </div>
    
                                </div>
                            </div>
                        </div>
    
                        <div style="padding: 0px;">
                            <div style="max-width: 600px;margin: 0 auto;background-color: #008b8b;">
                                <div class="u-row">
    
                                    <div class="u-col u-col-100" style="display:flex;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                        <div style="width: 100%;padding:0px;">
    
                                            <table style="font-family:Ubuntu;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:40px 10px 10px;font-family:Ubuntu;" align="left">
    
                                                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                                <tr>
                                                                    <td style="padding-right: 0px;padding-left: 0px;" align="center">
    
                                                                        <img alt="Image" src="https://cdn.templates.unlayer.com/assets/1597218650916-xxxxc.png" height="60" layout="intrinsic">
    
                                                                        </img>
                                                                    </td>
                                                                </tr>
                                                            </table>
    
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
    
                                            <table style="font-family:Ubuntu;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 31px;font-family:Ubuntu;" align="left">
    
                                                            <div style="font-size: 14px; color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                                                <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 28px; line-height: 39.2px;"><strong><span style="line-height: 39.2px; font-size: 28px;">Payment Successfull</span></strong>
                                                                    </span>
                                                                </p>
                                                            </div>
    
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
    
                                        </div>
                                    </div>
    
                                </div>
                            </div>
                        </div>
    
                        <div style="padding: 0px;">
                            <div style="max-width: 600px;margin: 0 auto;background-color: #ffffff;">
                                <div class="u-row">
    
                                    <div class="u-col u-col-100" style="display:flex;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                        <div style="width: 100%;padding:0px;">
    
                                            <table style="font-family:Ubuntu;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px;font-family:Ubuntu;" align="left">
    
                                                            <div style="font-size: 14px; line-height: 160%; text-align: center; word-wrap: break-word;">
                                                                <p style="line-height: 160%;"><span style="font-size: 18px; line-height: 28.8px;">Payment ID: ${transaction_id}</span></p>
                                                                <p style="line-height: 160%;">&nbsp;</p>
                                                <p style="line-height: 160%;"><span style="font-size: 18px; line-height: 28.8px;">Amount: Rs ${amount}</span></p>  
                                                                          <p style="line-height: 160%;">&nbsp;</p>
                                                <p style="line-height: 160%;"><span style="font-size: 18px; line-height: 28.8px;">Course Name: ${cname}</span></p>      
                                                                          <p style="line-height: 160%;">&nbsp;</p>
                                                <p style="line-height: 160%;"><span style="font-size: 18px; line-height: 28.8px;">Instructor Name: ${instname}</span></p>      
                                                                          <p style="line-height: 160%;">&nbsp;</p>
                                                <p style="line-height: 160%;"><span style="font-size: 18px; line-height: 28.8px;">Date: ${date}</span></p>      
                                                        
                                                            </div>
    
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
    
                                            <table style="font-family:Ubuntu;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px 60px;font-family:Ubuntu;" align="left">
    
                                                            <div style="font-size: 14px; line-height: 160%; text-align: center; word-wrap: break-word;">
                                                                <p style="line-height: 160%; font-size: 14px;"><span style="font-size: 18px; line-height: 28.8px;">Regards</span></p>
                                                                <p style="line-height: 160%; font-size: 14px;"><span style="font-size: 18px; line-height: 28.8px;">Team <strong>studifysuccess</strong></span></p>
                                                            </div>
    
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
    
                                        </div>
                                    </div>
    
                                </div>
                            </div>
                        </div>
    
                        <div style="padding: 0px;">
                            <div style="max-width: 600px;margin: 0 auto;background-color: #e5eaf5;">
                                <div class="u-row">
    
                                    <div class="u-col u-col-100" style="display:flex;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                        <div style="width: 100%;padding:0px;">
    
                                            <table style="font-family:Ubuntu;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:41px 55px 18px;font-family:Ubuntu;" align="left">
    
                                                            <div style="font-size: 14px; color: #000000; line-height: 160%; text-align: center; word-wrap: break-word;">
                                                                <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 20px; line-height: 32px;"><strong>Get in touch</strong></span></p>
                                                            </div>
    
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
    
                                            <table style="font-family:Ubuntu;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 33px;font-family:Ubuntu;" align="left">
                                                            <div style="text-align:center;line-height:0px">
                                                                <a href="https://www.facebook.com/studifysuccess.ss" target="_blank" style="display:inline-block;width:32px;height:32px;margin-right:17px">
                                                                    <img src="https://cdn.tools.unlayer.com/social/icons/circle-black/facebook.png" width="32" height="32" />
                                                                </a>
                                                                <a href="https://www.linkedin.com/company/studifysuccess/" target="_blank" style="display:inline-block;width:32px;height:32px;margin-right:17px">
                                                                    <img src="https://cdn.tools.unlayer.com/social/icons/circle-black/linkedin.png" width="32" height="32" />
                                                                </a>
                                                                <a href="https://www.instagram.com/studifysuccess/" target="_blank" style="display:inline-block;width:32px;height:32px;margin-right:17px">
                                                                    <img src="https://cdn.tools.unlayer.com/social/icons/circle-black/instagram.png" width="32" height="32" />
                                                                </a>
                                                                <a href="https://www.youtube.com/@studifysuccess" target="_blank" style="display:inline-block;width:32px;height:32px;margin-right:0px">
                                                                    <img src="https://cdn.tools.unlayer.com/social/icons/circle-black/youtube.png" width="32" height="32" />
                                                                </a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table style="font-family:Ubuntu;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:41px 55px 18px;font-family:Ubuntu;" align="left">
                                                            <div style="font-size: 14px; color: #000000; line-height: 160%; text-align: center; word-wrap: break-word;">
                                                                <p style="font-size: 14px; line-height: 160%;">Click here to <a href="https://www.studifysuccess.com/unsubscribe-email" class="unsub" target="_blank"><span style="font-size: 15px; line-height: 32px;"><strong>Unsubscribe</strong></span></a></p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
    
                                </div>
                            </div>
                        </div>
    
                        <div style="padding: 0px;">
                            <div style="max-width: 600px;margin: 0 auto;background-color: #008b8b;">
                                <div class="u-row">
    
                                    <div class="u-col u-col-100" style="display:flex;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                        <div style="width: 100%;padding:0px;">
    
                                            <table style="font-family:Ubuntu;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:Ubuntu;" align="left">
    
                                                            <div style="font-size: 14px; color: #fafafa; line-height: 180%; text-align: center; word-wrap: break-word;">
                                                                <p style="font-size: 14px; line-height: 180%;"><span style="font-size: 16px; line-height: 28.8px;">Copyright © studifysuccess All Rights Reserved</span></p>
                                                            </div>
    
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
    
                                        </div>
                                    </div>
    
                                </div>
                            </div>
                        </div>
    
                    </td>
                </tr>
            </tbody>
        </table>
    </body>
    </html>
      `,
  };
  return mail;
};

module.exports = payment;
