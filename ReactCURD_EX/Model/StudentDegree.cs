using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace ReactCURD_EX.Model
{
    public class StudentDegree
    {

        [Key]
        public int DegreeId { get; set; }

        [Required(ErrorMessage = "Please enter the name of the degree.")]
        [Display(Name = "Degree Name")]
        public string Name { get; set; }

        public ICollection<StudentCources> studentCources { get; set; }
    }
}