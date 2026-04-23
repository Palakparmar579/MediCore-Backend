// utils/emailTemplates.js

export const accountCreatedTemplate = (name, email, generatePass) => {
  return `
  <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
    
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
      
      <!-- Header -->
      <div style="background: #00304e; padding: 16px; text-align: center;">
        
        <img 
          src="https://res.cloudinary.com/dxww5eqxe/image/upload/v1776347014/whiteLogo1_jycnm4.png" 
          style="height: 40px; margin-bottom: 8px;"
        />

        <h2 style="color: #ffffff; margin: 0;">MediCore</h2>
      </div>

      <!-- Body -->
      <div style="padding: 20px; color: #333;">
        <h3 style="margin-top: 0;">Hello ${name},</h3>
        
        <p style="font-size: 14px; line-height: 1.6;">
          Your account has been successfully created. Below are your login details:
        </p>

        <!-- Credentials Box -->
        <div style="background: #f1f5f9; padding: 14px 16px; border-radius: 6px; margin: 15px 0;">
          <p style="margin: 5px 0; font-size: 14px;">
            <strong>Email:</strong> ${email}
          </p>
          <p style="margin: 5px 0; font-size: 14px;">
            <strong>Password:</strong> 
            <span style="color: #00304e; font-weight: bold;">
              ${generatePass}
            </span>
          </p>
        </div>

        <p style="font-size: 13px; color: #555;">
          Please keep your login details secure and do not share them with anyone.
        </p>

        <!-- Button -->
        <div style="text-align: center; margin-top: 20px;">
          <a 
            href="http://localhost:5173/" 
            style="background: #00304e; color: #ffffff; padding: 10px 18px; text-decoration: none; border-radius: 6px; font-size: 14px; display: inline-block;"
          >
            Login to MediCore
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div style="background: #f9fafb; padding: 12px; text-align: center; border-top: 1px solid #eee;">
        
        <p style="font-size: 12px; color: #888; margin: 0;">
          © ${new Date().getFullYear()} MediCore. All rights reserved.
        </p>

        <p style="font-size: 12px; margin-top: 5px;">
          <a href="http://localhost:5173/" style="color: #00304e; text-decoration: none;">
            http://localhost:5173/
          </a>
        </p>

      </div>

    </div>
  </div>
  `;
};


// utils/emailTemplates.js

export const resetPasswordTemplate = (name, newPassGenerate) => {
  return `
  <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
    
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
      
      <!-- Header -->
      <div style="background: #00304e; padding: 16px; text-align: center;">
        
        <img 
          src="https://res.cloudinary.com/dxww5eqxe/image/upload/v1776347014/whiteLogo1_jycnm4.png" 
          style="height: 40px; margin-bottom: 8px;"
        />
       
        <h2 style="color: #ffffff; margin: 0;">MediCore</h2>
      </div>

      <!-- Body -->
      <div style="padding: 20px; color: #333;">
        <h3 style="margin-top: 0;">Hello ${name},</h3>
        
        <p style="font-size: 14px; line-height: 1.6;">
          Your account password has been reset by the admin.
        </p>

        <div style="background: #f1f5f9; padding: 12px 16px; border-radius: 6px; margin: 15px 0;">
          <p style="margin: 0; font-size: 14px;">
            <strong>New Password:</strong> 
            <span style="color: #00304e; font-weight: bold;">
              ${newPassGenerate}
            </span>
          </p>
        </div>

        <p style="font-size: 13px; color: #555;">
          Your password has been reset. You can now log in using the new password.
        </p>

        <!-- Button -->
        <div style="text-align: center; margin-top: 20px;">
          <a 
            href="http://localhost:5173/" 
            style="background: #00304e; color: #ffffff; padding: 10px 18px; text-decoration: none; border-radius: 6px; font-size: 14px; display: inline-block;"
          >
            Visit MediCore
          </a>
        </div>

      </div>

      <!-- Footer -->
      <div style="background: #f9fafb; padding: 12px; text-align: center; border-top: 1px solid #eee;">
        
        <p style="font-size: 12px; color: #888; margin: 0;">
          © ${new Date().getFullYear()} MediCore. All rights reserved.
        </p>

        <p style="font-size: 12px; margin-top: 5px;">
          <a href="http://localhost:5173/" style="color: #00304e; text-decoration: none;">
            http://localhost:5173/
          </a>
        </p>

      </div>

    </div>
  </div>
  `;
};





export const assignEmailTemplate = (name, departmentName) => {
  return `
  <div style="font-family: Arial; max-width:600px; margin:auto; border:1px solid #eee; border-radius:10px; overflow:hidden">
    
    <!-- HEADER -->
    <div style="background:#00304e; color:white; padding:15px; text-align:center;">
      <h2>Medicore</h2>
    </div>

    <!-- BODY -->
    <div style="padding:20px; color:#333;">
      <h3>Hello ${name},</h3>

      <p>
        You have been successfully assigned to the 
        <b>${departmentName}</b> department.
      </p>

      <p>
        We are excited to have you onboard. Your contribution plays a vital role in delivering excellent patient care.
      </p>

      <div style="text-align:center; margin:20px 0;">
        <a href="http://localhost:5173" 
           style="background:#005f73; color:white; padding:10px 20px; border-radius:5px; text-decoration:none;">
          Visit Medicore
        </a>
      </div>

      <p>Wishing you great success in your role!</p>

      <p>— Team Medicore</p>
    </div>

    <!-- FOOTER -->
    <div style="background:#f5f5f5; padding:10px; text-align:center; font-size:12px; color:#777;">
      © 2026 Medicore. All rights reserved.
    </div>

  </div>
  `;
};