using ReactCURD_EX.Model;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReactCURD_EX
{
    [Table("StudTBL")]
    public class Student
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        //Scaler Property
        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public string? City { get; set; }
        [Required]
        public string? Age { get; set; }
        [Required]
        public string? Standard { get; set; }
        // New property for storing photo as byte array
        public byte[]? Photo { get; set; }

        // New property for storing base64 representation of the photo
        [NotMapped] // This property is not mapped to the database
        public string? PhotoBase64 { get; set; }
        public DateTime? DOB { get; set; }
        [Required]
        public string? Gender { get; set; }
        [Required]
        public string? MobileNo { get; set; }
        [Required]
        public string? EmailId { get; set; }
        public bool IsActive { get; set; }
        // Navigation properties
        public virtual ICollection<Enrollment>? Enrollments { get; set; }
    }

}
