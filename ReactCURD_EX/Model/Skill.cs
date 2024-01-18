using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReactCURD_EX

{
    [Table("SkillTBL")]
    public class Skill
    {
        [Key]
        public int SkillId { get; set; }
        [Required]
        public string? SkillName { get; set; }
          }
}
