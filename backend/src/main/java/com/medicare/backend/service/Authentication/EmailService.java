
package com.medicare.backend.service.Authentication;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String senderEmail;

    @Value("${app.frontend.url}")
    private String frontendUrl;

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
    
    // =====================================================
    // CREATE PASSWORD RESET LINK
    // =====================================================

    public String createResetLink(String token) {

        return frontendUrl
                + "/change-password?token="
                + token;
    }


    // =====================================================
    // SEND PASSWORD RESET EMAIL
    // =====================================================

    public void sendResetPasswordLink(
            String recipientEmail,
            String resetLink) {

        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setFrom(senderEmail);

        message.setTo(recipientEmail);

        message.setSubject(
                "MediCare - Password Reset Request"
        );

        message.setText(
                "Hello,\n\n"
                + "We received a request to reset your MediCare account password.\n\n"
                + "Click the link below to reset your password:\n\n"
                + resetLink
                + "\n\n"
                + "This link will expire in 15 minutes.\n\n"
                + "If you did not request a password reset, "
                + "please ignore this email.\n\n"
                + "Regards,\n"
                + "MediCare Support Team"
        );

        mailSender.send(message);
    }

}
