const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendProductNotification = async (recipient, action, product) => {
  const productDashboardLink = "https://247sma-pf4z.vercel.app/farmers/products"
  const subject = `PRODUCT ${action.toUpperCase()}: ${product.name}`;
  const message = `
    Hello,

    A product has been ${action}.

    Name: ${product.name}
    Category: ${product.categories.join(', ')}
    Status: ${product.status}

    Regards,
    Smagritrade
  `;
  const htmlMessage = `
   <div style="max-width: 500px; margin: 0 auto; font-family: 'Segoe UI', Arial, sans-serif; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
  <!-- Header -->
  <div style="background-color: #16a34a; padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 600;">
      🚜 SMAGRITRADE Product Notification
    </h1>
  </div>
  
  <!-- Content -->
  <div style="padding: 24px;">
    <p style="font-size: 16px; color: #1f2937; margin-bottom: 24px;">
      Hello,<br><br>
      A product has been <strong style="color: #16a34a;">${action}</strong> in our system.
    </p>
    
    <div style="background-color: #f0fdf4; border-radius: 8px; padding: 16px; margin-bottom: 24px; border-left: 4px solid #16a34a;">
      <h3 style="color: #166534; margin-top: 0; margin-bottom: 12px; font-size: 18px;">
        ${product.name}
      </h3>
      
      <div style="display: flex; margin-bottom: 8px;">
        <span style="width: 100px; color: #4b5563; font-weight: 500;">Category:</span>
        <span style="color: #1f2937;">${product.categories.join(', ')}</span>
      </div>
      
      <div style="display: flex; margin-bottom: 8px;">
        <span style="width: 100px; color: #4b5563; font-weight: 500;">Status:</span>
        <span style="color: ${product.status === 'active' ? '#166534' : '#b91c1c'}; font-weight: 500;">
          ${product.status === 'active' ? 'Active ✅' : 'Inactive ⚠️'}
        </span>
      </div>
      
      ${product.harvestDate ? `
      <div style="display: flex;">
        <span style="width: 100px; color: #4b5563; font-weight: 500;">Harvest Date:</span>
        <span style="color: #1f2937;">${new Date(product.harvestDate).toLocaleDateString()}</span>
      </div>
      ` : ''}
    </div>
    
    <div style="text-align: center; margin-top: 24px;">
      <a href="${productDashboardLink}" style="display: inline-block; background-color: #16a34a; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 500; font-size: 15px;">
        View Product Dashboard
      </a>
    </div>
  </div>
  
  <!-- Footer -->
  <div style="background-color: #f8fafc; padding: 16px; text-align: center; border-top: 1px solid #e5e7eb;">
    <p style="margin: 0; font-size: 13px; color: #6b7280;">
      © ${new Date().getFullYear()} SMAGRITRADE. All rights reserved.
    </p>
    <p style="margin: 8px 0 0 0; font-size: 13px; color: #6b7280;">
      If you have any questions, contact us at <a href="mailto:support@smagritrade.com" style="color: #16a34a;">support@smagritrade.com</a>
    </p>
  </div>
</div>`;

  await transporter.sendMail({
    from: `"Smagritrade" <${process.env.EMAIL_USER}>`,
    to: recipient,
    subject,
    text: message,
    html: htmlMessage,
  });
};
