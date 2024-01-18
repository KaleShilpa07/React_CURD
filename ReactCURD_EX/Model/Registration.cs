using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReactCURD_EX
{
    [Table("RegistrationTBL")]
    public class Registration
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public string? Adress { get; set; }
    }
}
