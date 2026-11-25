
package com.medicare.backend.service.Authentication;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String senderEmail;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }
    // =======================================================
    // Send Temporary Password Email    
    // =======================================================
    public void sendTemporaryPassword(
            String recipientEmail,
            String temporaryPassword) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(senderEmail);
        message.setTo(recipientEmail);
        message.setSubject(
                "MediCare - Your Staff Account Details");

        message.setText(
                "Hello,\n\n"
                + "Your MediCare staff account has been created.\n\n"
                + "Email: " + recipientEmail + "\n"
                + "Temporary password: " + temporaryPassword + "\n\n"
                + "Please log in using these credentials. "
                + "You will be required to change your temporary "
                + "password before accessing the dashboard.\n\n"
                + "Please do not share your password.\n\n"
                + "Regards,\nMediCare Team");

        mailSender.send(message);
    }
    
    // =======================================================
    // Send Reset Password Link Email       
    // =======================================================
    
    
public void sendResetPasswordLink(
        String recipientEmail,
        String resetLink) {

    try {
        MimeMessage message = mailSender.createMimeMessage();

        MimeMessageHelper helper =
                new MimeMessageHelper(message, true, "UTF-8");

        helper.setFrom(senderEmail);
        helper.setTo(recipientEmail);

        helper.setSubject("MediCare - Reset Your Password");

        String emailContent =
                "<html>"
                + "<body style='font-family: Arial, sans-serif;'>"
                + "<h2>MediCare Password Reset</h2>"
                + "<p>Hello,</p>"
                + "<p>We received a request to reset your MediCare account password.</p>"
                + "<p>Click the button below to reset your password:</p>"

                + "<a href='" + resetLink + "' "
                + "style='background-color: #2563eb;"
                + "color: white;"
                + "padding: 12px 24px;"
                + "text-decoration: none;"
                + "border-radius: 6px;"
                + "display: inline-block;'>"
                + "Reset Password"
                + "</a>"

                + "<p>If you did not request this, please ignore this email.</p>"
                + "<p>Regards,<br>MediCare Team</p>"
                + "</body>"
                + "</html>";

        helper.setText(emailContent, true);

        mailSender.send(message);

    } catch (MessagingException e) {
        throw new RuntimeException("Failed to send reset password email", e);
    }
}

}
