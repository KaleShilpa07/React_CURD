using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReactCURD_EX.Model.CalenderModel
{
    [Table("EventTBL")]
    public class Event
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}
