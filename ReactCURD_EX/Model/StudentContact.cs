using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ReactCURD_EX.Model
{
   
    [Table("Stud_Contact_Table")]
    public class StudentContact
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required(ErrorMessage = "First Name is required")]
        public string? FirstName { get; set; }

        [Required(ErrorMessage = "Last Name is required")]
        public string? LastName { get; set; }

        [Required(ErrorMessage = "Mobile Number is required")]
        [RegularExpression(@"^\d{10}$", ErrorMessage = "Invalid Mobile Number")]
        public string? PhoneNo { get; set; }

        [Required(ErrorMessage = "Email should not be empty")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        [RegularExpression(@"[a-zA-Z0-9]+@gmail\.com", ErrorMessage = "Email must be in the format example@gmail.com")]

        public string? Email { get; set; }

        [Required(ErrorMessage = "Message is required")]
        public string? Message { get; set; }

    }
}
