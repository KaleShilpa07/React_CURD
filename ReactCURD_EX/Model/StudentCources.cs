using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ReactCURD_EX.Model
{
    public class StudentCources
    {
        [Key]
        public int CourseId { get; set; }

        [Required(ErrorMessage = "Please enter the Course name")]
        [Display(Name = "Course Name")]
        public string CourceName { get; set; }

        [Required(ErrorMessage = "Please enter the Course code")]
        [Display(Name = "Course Code")]
        public string CourceCode { get; set; }

       

        [ForeignKey("DegreeId")]
        public int DegreeId { get; set; }
        public StudentDegree studentDegree { get; set; }
    }
}
