using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ReactCURD_EX.Model
{
    [Table("EmailTBL")]
    public class Email
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Sender is required.")]
        [EmailAddress(ErrorMessage = "Sender must be a valid email address.")]
        public string Sender { get; set; }

        [Required(ErrorMessage = "Recipient is required.")]
        [EmailAddress(ErrorMessage = "Recipient must be a valid email address.")]
        public string Recipient { get; set; }

        [Required(ErrorMessage = "Subject is required.")]
        public string Subject { get; set; }

        [Required(ErrorMessage = "Body is required.")]
        [StringLength(1000, MinimumLength = 10, ErrorMessage = "Body must be between 10 and 1000 characters.")]
        public string Body { get; set; }
        public DateTime SentDate { get; set; }


    }
}