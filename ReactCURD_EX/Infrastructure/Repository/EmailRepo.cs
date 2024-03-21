using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ReactCURD_EX.Infrastructure.Interface;

namespace ReactCURD_EX.Model
{
    //public class EmailRepo : IEmail
    //{
    //    private readonly ComponyContext _context;

    //    public EmailRepo(ComponyContext context)
    //    {
    //        _context = context;
    //    }

    //    //public async Task SendEmailAsync(Email email)
    //    //{
    //    //    email.SentDate = DateTime.UtcNow; // Set the sent date
    //    //    _context.Emails.Add(email);
    //    //    await _context.SaveChangesAsync();

    //    //    // Send the email using SMTP
    //    //    try
    //    //    {
    //    //        var smtpClient = new SmtpClient("smtp.example.com")
    //    //        {
    //    //            Port = 587,
    //    //            Credentials = new NetworkCredential("your_username", "your_password"),
    //    //            EnableSsl = true,
    //    //        };

    //    //        var mailMessage = new MailMessage
    //    //        {
    //    //            From = new MailAddress("your_email@example.com"),
    //    //            Subject = email.Subject,
    //    //            Body = email.Body,
    //    //            IsBodyHtml = true,
    //    //        };

    //    //        foreach (var recipient in email.Recipient)
    //    //        {
    //    //            mailMessage.To.Add(recipient);
    //    //        }

    //    //        await smtpClient.SendMailAsync(mailMessage);
    //    //    }
    //    //    catch (Exception ex)
    //    //    {
    //    //        // Handle exceptions (log, notify, etc.)
    //    //        Console.WriteLine($"Error sending email: {ex.Message}");
    //    //        throw;
    //    //    }
    //    //}

    //    public async Task<IEnumerable<Email>> GetAllEmailsAsync()
    //    {
    //        return await _context.Emails.ToListAsync();
    //    }

    //    // Implement other repository methods as needed
    //}
}
