import nodemailer from 'nodemailer';

// Email configuration
const EMAIL_CONFIG = {
  recipient: 'malitmohamud@gmail.com',
  service: 'gmail', // You can change this to your preferred email service
  // These would come from environment variables in production
  user: process.env.EMAIL_USER || '',
  pass: process.env.EMAIL_PASS || '', // App-specific password for Gmail
};

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: EMAIL_CONFIG.service,
    auth: {
      user: EMAIL_CONFIG.user,
      pass: EMAIL_CONFIG.pass,
    },
  });
};

// Send order notification email
export async function sendOrderNotification(orderData: {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  shippingAddress: string;
  items: Array<{
    name: string;
    category: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  shipping: number;
  total: number;
  orderId: string;
}) {
  try {
    const transporter = createTransporter();

    // Generate items list HTML
    const itemsHtml = orderData.items.map((item, index) => `
      <tr style="background: ${index % 2 === 0 ? '#ffffff' : '#f8f9fa'}; border-bottom: 1px solid #dee2e6;">
        <td style="padding: 15px 12px; border-bottom: 1px solid #eee;">
          <div style="font-weight: bold; color: #495057;">${item.name}</div>
        </td>
        <td style="padding: 15px 12px; border-bottom: 1px solid #eee;">
          <span style="background: #e9ecef; padding: 4px 8px; border-radius: 12px; font-size: 12px; color: #495057;">${item.category}</span>
        </td>
        <td style="padding: 15px 12px; border-bottom: 1px solid #eee; text-align: center;">
          <span style="background: #667eea; color: white; padding: 4px 8px; border-radius: 50%; font-weight: bold; min-width: 24px; display: inline-block;">${item.quantity}</span>
        </td>
        <td style="padding: 15px 12px; border-bottom: 1px solid #eee; text-align: right; font-weight: 500;">$${item.price.toFixed(2)}</td>
        <td style="padding: 15px 12px; border-bottom: 1px solid #eee; text-align: right; font-weight: bold; color: #28a745;">$${(item.quantity * item.price).toFixed(2)}</td>
      </tr>
    `).join('');

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Order Received - Nujuum Arts</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🎨 New Order Received!</h1>
            <p style="color: #f0f0f0; margin: 10px 0 0 0;">Nujuum Arts - Order Notification</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            
            <!-- Order Header Info -->
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
              <h2 style="margin: 0 0 10px 0; color: #667eea;">📋 Order Summary</h2>
              <p style="margin: 5px 0;"><strong>Order ID:</strong> ${orderData.orderId}</p>
              <p style="margin: 5px 0;"><strong>Order Time:</strong> ${new Date().toLocaleString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit' 
              })}</p>
              <p style="margin: 5px 0;"><strong>Total Items:</strong> ${orderData.items.reduce((sum, item) => sum + item.quantity, 0)} pieces</p>
              <p style="margin: 5px 0;"><strong>Order Value:</strong> <span style="color: #28a745; font-size: 18px; font-weight: bold;">$${orderData.total.toFixed(2)}</span></p>
            </div>

            <!-- Customer Information -->
            <div style="background: #e8f4f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #495057;">👤 Customer Information</h3>
              <div style="display: grid; gap: 8px;">
                <p style="margin: 0;"><strong>Name:</strong> ${orderData.customerName}</p>
                <p style="margin: 0;"><strong>Email:</strong> ${orderData.customerEmail}</p>
                ${orderData.customerPhone ? `<p style="margin: 0;"><strong>Phone:</strong> ${orderData.customerPhone}</p>` : ''}
                <p style="margin: 0;"><strong>Delivery Address:</strong><br><span style="background: #fff; padding: 8px; border-radius: 4px; display: inline-block; margin-top: 5px;">${orderData.shippingAddress}</span></p>
              </div>
            </div>

            <!-- Ordered Items -->
            <div style="margin: 20px 0;">
              <h3 style="color: #495057;">🎯 Ordered Artworks (${orderData.items.length} type${orderData.items.length !== 1 ? 's' : ''})</h3>
              <table style="width: 100%; border-collapse: collapse; margin: 15px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <thead>
                  <tr style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
                    <th style="padding: 15px 12px; text-align: left; font-size: 14px;">🖼️ Product Name</th>
                    <th style="padding: 15px 12px; text-align: left; font-size: 14px;">🎨 Type</th>
                    <th style="padding: 15px 12px; text-align: center; font-size: 14px;">📦 Qty</th>
                    <th style="padding: 15px 12px; text-align: right; font-size: 14px;">💰 Price</th>
                    <th style="padding: 15px 12px; text-align: right; font-size: 14px;">📊 Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                  <tr style="background: #f8f9fa; border-top: 2px solid #667eea;">
                    <td colspan="4" style="padding: 15px 12px; text-align: right; font-weight: bold; color: #495057;">Subtotal:</td>
                    <td style="padding: 15px 12px; text-align: right; font-weight: bold; color: #495057;">$${orderData.subtotal.toFixed(2)}</td>
                  </tr>
                  <tr style="background: #f8f9fa;">
                    <td colspan="4" style="padding: 12px; text-align: right; color: #6c757d;">Shipping:</td>
                    <td style="padding: 12px; text-align: right; color: #6c757d;">$${orderData.shipping.toFixed(2)}</td>
                  </tr>
                  <tr style="background: #e8f4f8; border-top: 2px solid #28a745;">
                    <td colspan="4" style="padding: 15px 12px; text-align: right; font-size: 16px; font-weight: bold; color: #28a745;">TOTAL AMOUNT:</td>
                    <td style="padding: 15px 12px; text-align: right; font-size: 18px; font-weight: bold; color: #28a745;">$${orderData.total.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Order Status -->
            <div style="background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%); border: 1px solid #ffeaa7; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 24px;">⏳</span>
                <div>
                  <p style="margin: 0; font-weight: bold; color: #856404; font-size: 16px;">Order Status: PENDING REVIEW</p>
                  <p style="margin: 5px 0 0 0; color: #856404; font-size: 14px;">Please review this order and contact the customer for payment instructions.</p>
                </div>
              </div>
            </div>

            <!-- Action Items -->
            <div style="background: #d1ecf1; border: 1px solid #bee5eb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h4 style="margin: 0 0 10px 0; color: #0c5460;">📋 Next Steps:</h4>
              <ul style="margin: 0; padding-left: 20px; color: #0c5460;">
                <li>Contact customer at ${orderData.customerEmail} or ${orderData.customerPhone || 'via email'}</li>
                <li>Provide payment instructions and processing timeline</li>
                <li>Arrange artwork shipping to the delivery address</li>
                <li>Update order status once payment is received</li>
              </ul>
            </div>

            <!-- Footer -->
            <div style="border-top: 2px solid #e9ecef; padding-top: 20px; margin-top: 30px; text-align: center; color: #6c757d;">
              <p style="margin: 0; font-size: 14px;">
                <strong>Order Received:</strong> ${new Date().toLocaleString()}<br>
                <strong>Notification sent to:</strong> malitmohamud@gmail.com
              </p>
              <p style="margin: 10px 0 0 0; font-size: 12px; color: #adb5bd;">
                This is an automated notification from Nujuum Arts order management system.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    await transporter.sendMail({
      from: EMAIL_CONFIG.user,
      to: EMAIL_CONFIG.recipient,
      subject: 'New Order Received – Nujuum Arts',
      html: emailHtml,
    });

    console.log('Order notification email sent successfully');
    return { success: true };
  } catch (error) {
    console.error('Failed to send order notification email:', error);
    return { success: false, error: error };
  }
}

// Send contact form notification email
export async function sendContactNotification(contactData: {
  name: string;
  email: string;
  phone?: string;
  message: string;
  subject?: string;
}) {
  try {
    const transporter = createTransporter();

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Contact Form Message - Nujuum Arts</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">New Contact Message</h1>
            <p style="color: #f0f0f0; margin: 10px 0 0 0;">Nujuum Arts</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #667eea; margin-top: 0;">Contact Details</h2>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${contactData.name}</p>
              <p><strong>Email:</strong> ${contactData.email}</p>
              ${contactData.phone ? `<p><strong>Phone Number:</strong> ${contactData.phone}</p>` : ''}
              ${contactData.subject ? `<p><strong>Subject:</strong> ${contactData.subject}</p>` : ''}
            </div>

            <div style="margin: 20px 0;">
              <h3 style="color: #495057;">Message</h3>
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea;">
                <p style="margin: 0; white-space: pre-wrap;">${contactData.message}</p>
              </div>
            </div>

            <div style="background: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #155724;"><strong>Action Required:</strong> Please respond to this customer inquiry.</p>
            </div>

            <p style="color: #6c757d; font-size: 14px; margin-top: 30px;">
              Received: ${new Date().toLocaleString()}<br>
              Response expected within 24 hours
            </p>
          </div>
        </body>
      </html>
    `;

    await transporter.sendMail({
      from: EMAIL_CONFIG.user,
      to: EMAIL_CONFIG.recipient,
      subject: 'New Contact Form Message – Nujuum Arts',
      html: emailHtml,
    });

    console.log('Contact form notification email sent successfully');
    return { success: true };
  } catch (error) {
    console.error('Failed to send contact form notification email:', error);
    return { success: false, error: error };
  }
}