using Microsoft.AspNetCore.Mvc;
using Models.MyModels;
using Services;
using Models.Enum;
using System.Threading.Tasks;

namespace To_do_list.Controllers
{
    [Route("controller")]
    public class TaskController : Controller
    {
        public static TaskService taskService = new TaskService();
        public static TaskService remain = new TaskService();
        public static TaskService myDay = new TaskService();
        public static TaskService planTasks = new TaskService();
        public TaskController() { }

        [Route("/")]
        public IActionResult Index()
        {
            ViewBag.TypePage = "Index";
            ViewBag.TypeCheck = 1;

            return View(taskService.tasks);
        }


        [Route("/MyDay")]
        public IActionResult MyDay()
        {
            ViewBag.TypePage = "MyDay";
            ViewBag.TypeCheck = 2;
            ViewBag.Schedule = taskService.tasks.OrderBy(u => u.dateTime);
           


            return View("~/Views/Task/Index.cshtml", myDay.today);
        }

        [HttpPost]
        [Route("/Delete")]
        public IActionResult Delete([FromBody] MyTask obj)
        {
            MyTask delete = taskService.tasks.FirstOrDefault(u => u.Id == obj.Id);
            taskService.tasks.First(u => u.Id == obj.Id).IsCompleted = true;
            if (delete != null)
            {
                remain.tasks.Remove(delete);
            }
            return RedirectToAction("Index");
        }

        [HttpPost]
        [Route("/Restore")]
        public IActionResult Restore([FromBody] MyTask obj)
        {
            taskService.tasks.First(u => u.Id == obj.Id).IsCompleted = false;
            if (obj.Type == "AddToDay")
            {
                myDay.today.Add(taskService.tasks.First(u => u.Id == obj.Id));
            }
            return RedirectToAction("Index");
        }


        [HttpPost]
        [Route("action")]
        public IActionResult AddTask(MyTask myTask)
        {
            if (myTask.dateTime.Year == 1)
            {
                myTask.dateTime = DateTime.Now;
            }

            taskService.tasks.Add(myTask);
            return RedirectToAction("Index");
        }

        [HttpPost]
        [Route("/MyDay")]
        public IActionResult MyDay(DateTime date_time)
        {
            myDay.today = taskService.tasks.Where(u => u.dateTime == date_time).ToList();
            return RedirectToAction("MyDay");

        }

        [HttpPost]
        [Route("/DeleteMyDay")]
        public IActionResult DeleteMyDay([FromBody] MyTask obj)
        {
            MyTask delete = taskService.tasks.FirstOrDefault(u => u.Id == obj.Id);
            taskService.tasks.First(u => u.Id == obj.Id).IsCompleted = true;
            return RedirectToAction("MyDay");
        }

        [HttpPost]
        [Route("AddTaskToMyDay")]
        public IActionResult AddTaskToMyDay(MyTask myTask)
        {
            if (myTask.dateTime.Year == 1)
            {
                myTask.dateTime = DateTime.Now;
            }
            taskService.tasks.Add(myTask);
            myDay.today.Add(myTask);
            return RedirectToAction("MyDay");
        }


        [HttpPost]
        [Route("/MarkIndex")]
        public IActionResult MarkIndex([FromBody] MyTask myTask)
        {
            if (myTask.Type == "MarkIndex") {

                taskService.tasks.First(u => u.Id == myTask.Id).Type = "important";
                return RedirectToAction("Index");

            } if (myTask.Type == "MarkMyDay") {

                taskService.tasks.First(u => u.Id == myTask.Id).Type = "important";
                myDay.today.First(u => u.Id == myTask.Id).Type = "important";
                return RedirectToAction("MyDay");

            } if (myTask.Type == "Exclude") {

                taskService.tasks.First(u => u.Id == myTask.Id).Type = "normal";
                return RedirectToAction("Index");

            } if (myTask.Type == "ExcludeFromDay") {

                myDay.today.First(u => u.Id == myTask.Id).Type = "normal";
                taskService.tasks.First(u => u.Id == myTask.Id).Type = "normal";
                return RedirectToAction("MyDay");

            }

            if (myTask.Type == "ExcludeImportant")
            {

                taskService.tasks.First(u => u.Id == myTask.Id).Type = "normal";
                return RedirectToAction("Important");
            }
            else {
                taskService.tasks.First(u => u.Id == myTask.Id).Type = "important";
                return RedirectToAction("Important");
            }



        }


        [Route("/Important")]
        public IActionResult Important()
        {
            List<MyTask> ImportantTasks = new List<MyTask>();
            foreach (var num in taskService.tasks)
            {
                if (num.Type == "important")
                {
                    ImportantTasks.Add(num);
                }
            }
            ImportantTasks.OrderBy(u => u.dateTime);

            ViewBag.TypePage = "Important";
            ViewBag.TypeCheck = 3;
            return View("~/Views/Task/Index.cshtml", ImportantTasks);
        }

        [Route("/PlanTasks")]
        public IActionResult PlanTasks()
        {
            ViewBag.TypePage = "PlanTasks";
            ViewBag.TypeCheck = 3;
            return View("~/Views/Task/Index.cshtml", planTasks.myPlane);
        }

        [HttpPost]
        [Route("/ProcessDataToEdit")]
        public IActionResult ProcessDataToEdit([FromBody] MyTask dataToSend)
        {
            var obj = taskService.tasks.FirstOrDefault(u => u.Id == dataToSend.Id);
            if (obj == null)
            {
                obj = planTasks.myPlane.FirstOrDefault(u => u.Id == dataToSend.Id);
            }

            return Json(obj);
        }

        [HttpPost]
        [Route("/UpdateData")]
        public IActionResult UpdateData([FromBody] MyTask dataToSend)
        {
            foreach (var num in taskService.tasks)
            {
                if (num.Id == dataToSend.Id)
                {
                    taskService.UpdateTask(dataToSend, dataToSend.Id);

                }
            }
            return Json(dataToSend);
        }

    }
}
