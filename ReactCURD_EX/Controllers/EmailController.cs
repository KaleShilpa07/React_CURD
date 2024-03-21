using Microsoft.AspNetCore.Mvc;
using ReactCURD_EX.Infrastructure.Interface;
using ReactCURD_EX.Model;

namespace ReactCURD_EX.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly IEmail _emailRepo;

        public EmailController(IEmail emailRepo)
        {
            _emailRepo = emailRepo;
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendEmailAsync([FromBody] Email email)
        {
            try
            {
                // Call the SendEmailAsync method of EmailRepo to send the email
                await _emailRepo.SendEmailAsync(email);
                return Ok("Email sent successfully!");
            }
            catch (Exception ex)
            {
                // Handle exceptions (log, notify, etc.)
                Console.WriteLine($"Error sending email: {ex.Message}");
                return StatusCode(500, "An error occurred while sending the email.");
            }
        }
    }
}
