using Models;
using Models.Enum;
using Models.MyModels;
using System.Numerics;
using System.Xml.Linq;

namespace Services
{
    public class TaskService : ITaskService
    {

        public List<MyTask> tasks;

        public List<MyTask> today;
        public List<MyTask> myPlane;

        public TaskService()
        {
            tasks = new List<MyTask>()
            {
                new MyTask("Read book", "Read chapter number 5", "normal", false, new DateTime(2024, 3, 12)),
                new MyTask("Clean in house", "Clean all house", "important", true, new DateTime(2024, 3, 1)),
                new MyTask("Do something", "Do something", "important", false, new DateTime(2024, 3, 1)),
                new MyTask("Meet with friends", "Go to the pub", "important", false, new DateTime(2024, 2, 28)),
                };

            today = new List<MyTask>();

            myPlane = new List<MyTask>()
            {
                new MyTask("Planed task 1", "Read chapter number 5", "normal", false, new DateTime(2024, 3, 12)),
                new MyTask("Planed task 2", "Clean all house", "important", true, new DateTime(2024, 3, 1)),
                new MyTask("Planed task 3", "Do something", "important", false, new DateTime(2024, 3, 1)),
            };

        }

        public MyTask AddTask(MyTask myTask)
        {

            tasks.Add(myTask);
            return myTask;
        }

        public List<MyTask> GetAllTasks()
        {
            return tasks;
        }

        public MyTask GetTaskById(int id)
        {
            MyTask? myTask = tasks.First(t => t.Id == id);
            
            return myTask;
        }

        public void RemoveTask(int id)
        {
            MyTask? myTask = tasks.First(t => t.Id == id);
            tasks.Remove(myTask);
        }

        public MyTask SearchTask(string description)
        {
            throw new NotImplementedException();
        }

        public void UpdateTask(MyTask obj, int id)
        {
            foreach (var num in tasks)
            {
                if (num.Id == id)
                {
                    num.Id = obj.Id;
                    num.Name = obj.Name;
                    num.Description = obj.Description;
                    num.Type = obj.Type;
                }
            }
        }

    }
}
