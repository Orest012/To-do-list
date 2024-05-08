using Models.MyModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public interface IPersonService
    {
        public Person AddPerson(Person person);
        public void UpdatePerson(Person person, int PersonId);
        public void RemovePerson(int PersonId);  
        public Person GetPersonById(int PersonId);
        public List<Person> GetAllPerson();
    }
}
