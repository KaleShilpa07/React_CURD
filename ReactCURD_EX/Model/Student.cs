using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReactCURD_EX
{
    [Table("StudTBL")]
    public class Student
    {
        [Key]
        //Scaler Property
        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public string? Adress { get; set; }
        [Required]
        public string? Age { get; set; }
        [Required]
        public string? Class { get; set; }
        // New property for storing photo as byte array
        public byte[]? Photo { get; set; }

        // New property for storing base64 representation of the photo
        [NotMapped] // This property is not mapped to the database
        public string? PhotoBase64 { get; set; }
    }
}
