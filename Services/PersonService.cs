using Models;
using Models.MyModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class PersonService : IPersonService
    {
        public List<Person> persons;
        public Person AddPerson(Person person)
        {
            persons.Add(person);
            return person;
        }

        public List<Person> GetAllPerson()
        {
            return persons;
        }

        public Person GetPersonById(int PersonId)
        {
            Person person = persons.First(u => u.PersonId == PersonId);
            return person;
        }

        public void RemovePerson(int PersonId)
        {
            Person person = persons.First(u => u.PersonId == PersonId);
            persons.Remove(person);
        }

        public void UpdatePerson(Person person, int PersonId)
        {
            foreach (var num in persons)
            {
                if (num.PersonId == PersonId)
                {
                    num.PersonId = PersonId;
                    num.Name = person.Name;
                    num.Position = person.Position;
                    num.email = person.email;
                }
            }
        }

        public void UpdatePerson(int PersonId)
        {
            throw new NotImplementedException();
        }
    }
}
