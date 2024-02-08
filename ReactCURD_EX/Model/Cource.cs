using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ReactCURD_EX.Model
{
    public class Cource
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CourceId { get; set; }
        public string? CourceName { get; set; }
        public string? CourceCode { get; set; }
        public string? Grade { get; set; }
        public int Credits { get; set; }

        // Navigation properties
        public virtual ICollection<Enrollment>? Enrollments { get; set; }


    }
}