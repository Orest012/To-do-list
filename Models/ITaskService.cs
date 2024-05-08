using Models.MyModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public interface ITaskService
    {
        public MyTask AddTask(MyTask myTask);
        public void RemoveTask(int id);
        public MyTask GetTaskById(int id);
        public void UpdateTask(MyTask obj, int id);
        public MyTask SearchTask(string description);
        public List<MyTask> GetAllTasks();
    }
}
