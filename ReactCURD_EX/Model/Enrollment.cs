using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ReactCURD_EX.Model
{
    //[Table("EnrollmentTBL")]
    public class Enrollment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int EnrollmentId { get; set; }
        public int Id { get; set; }
        public int CourceId { get; set; }
        public DateTime EnrollmentDate { get; set; }

        // Navigation properties
        public virtual Student? Student { get; set; }
        public virtual Cource? Cource { get; set; }

    }
}