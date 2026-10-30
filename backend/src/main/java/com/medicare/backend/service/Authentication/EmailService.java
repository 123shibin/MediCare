
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

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

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
}
