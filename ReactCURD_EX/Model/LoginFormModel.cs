using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReactCURD_EX
{
    [Table("LoginFormModelTBL")]
    public class LoginFormModel
    {
        [Key]
        [Required]
        public int LoginId { get; set; }
        [Required(ErrorMessage = "Email should not be empty")]
        [RegularExpression(@"^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$", ErrorMessage = "Invalid email format")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password should not be empty")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$", ErrorMessage = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character")]
        public string Password { get; set; }
    }
}