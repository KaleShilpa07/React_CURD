using ReactCURD_EX.Model;

namespace ReactCURD_EX.Infrastructure.Interface
{
    public interface IEmail
    {
        Task SendEmailAsync(Email email);
        Task<IEnumerable<Email>> GetAllEmailsAsync();

    }
}
