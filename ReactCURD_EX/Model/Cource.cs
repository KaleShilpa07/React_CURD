using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ReactCURD_EX.Model
{
    public class Cource
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CourceId { get; set; }
        [Required(ErrorMessage = "CourceName is required")]

        public string? CourceName { get; set; }
        [Required(ErrorMessage = "CourceCode is required")]

        public string? CourceCode { get; set; }
        [Required(ErrorMessage = "Grade is required")]

        public string? Grade { get; set; }
        [Required(ErrorMessage = "Credits is required")]

        public int Credits { get; set; }

        // Navigation properties
        public virtual ICollection<Enrollment>? Enrollments { get; set; }


    }
}