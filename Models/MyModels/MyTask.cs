using System.ComponentModel.DataAnnotations;

namespace Models.MyModels
{
    public class MyTask
    {
        public static int id_counter { get; set; }
        public int Id { get; set; }

        [Required(ErrorMessage = "* Enter name")]
        public string Name { get; set; }
        
        [Required(ErrorMessage = "* Enter description")]
        public string Description { get; set; }

        [Required(ErrorMessage = "* Enter type")]
        public string Type { get; set; }

        //[Required(ErrorMessage = "* Enter priority")]
        //public int Priority { get; set; }
        public bool IsCompleted { get; set; } = false;
        public DateTime dateTime { get; set; }

        public MyTask() { }
        public MyTask(string Name, string Description, string Type, bool IsCompleted, DateTime dateTime = default)
        {
            id_counter++;
            Id = id_counter;
            this.Name = Name;
            this.Description = Description;
            this.Type = Type;
            this.IsCompleted = IsCompleted;
            if (dateTime == default)
            {
                this.dateTime = DateTime.Now;
            }
            else
            {
                this.dateTime = dateTime;
            }
        }
    }
}
