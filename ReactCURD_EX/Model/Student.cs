using ReactCURD_EX.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReactCURD_EX
{
    [Table("StudTBL")]
    public class Student
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required")]
        public string? Name { get; set; }

        [Required(ErrorMessage = "City is required")]
        public string? City { get; set; }

        [Required(ErrorMessage = "Age is required")]
        public int Age { get; set; }

        [Required(ErrorMessage = "Degree is required")]
        public string? Degree { get; set; }

        public byte[]? Photo { get; set; }

        [NotMapped]
        public string? PhotoBase64 { get; set; }

        [Required(ErrorMessage = "Date of Birth is required")]
        
        public DateTime? DOB { get; set; }

        [Required(ErrorMessage = "Gender is required")]
        public string? Gender { get; set; }

        [Required(ErrorMessage = "Mobile Number is required")]
        [RegularExpression(@"^\d{10}$", ErrorMessage = "Invalid Mobile Number")]
        public string? MobileNo { get; set; }

        [Required(ErrorMessage = "Email should not be empty")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        [RegularExpression(@"[a-zA-Z0-9]+@gmail\.com", ErrorMessage = "Email must be in the format example@gmail.com")]

        public string? EmailId { get; set; }

        [Required(ErrorMessage = "IsActive is required")]
        public bool IsActive { get; set; }

        public virtual ICollection<Enrollment>? Enrollments { get; set; }
    }
}
