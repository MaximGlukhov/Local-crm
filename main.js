(() => {
  let students = getFromLocalStorage() || [];

  function getFromLocalStorage() {
    let fromLocalStorage = localStorage.getItem('key');
    return fromLocalStorage && JSON.parse(fromLocalStorage);
  }

  let studentsFilter = getFromLocalStorageFilter() || [];

  function getFromLocalStorageFilter() {
    let fromLocalStorageF = localStorage.getItem('filter');
    return fromLocalStorageF && JSON.parse(fromLocalStorageF);
  }

  let body = document.querySelector('body');
  let container = document.createElement('div');
  container.classList.add('container');
  body.append(container);
  let title = document.createElement('h3');
  title.textContent = "Заполните все поля формы"
  container.append(title);

  let form = document.createElement('form');
  form.classList.add('form-group', 'mb-3', 'col-md-6');
  container.append(form);

  let textSurname = document.createElement('div');
  form.append(textSurname);
  textSurname.textContent = "Фамилия";
  let surnameInput = document.createElement('input');
  surnameInput.classList.add('form-control');
  surnameInput.placeholder = "Введите фамилию";
  surnameInput.name = "surname";
  form.append(surnameInput);

  let textName = document.createElement('div');
  form.append(textName);
  textName.textContent = "Имя";
  let nameInput = document.createElement('input');
  nameInput.classList.add('form-control');
  nameInput.placeholder = "Введите имя";
  nameInput.name = "name";
  form.append(nameInput);

  let textMiddlename = document.createElement('div');
  form.append(textMiddlename);
  textMiddlename.textContent = "Отчество";
  let middlenameInput = document.createElement('input');
  middlenameInput.classList.add('form-control');
  middlenameInput.placeholder = "Введите отчество";
  middlenameInput.name = "middlename";
  form.append(middlenameInput);

  let textBirthdate = document.createElement('div');
  form.append(textBirthdate);
  textBirthdate.textContent = "Дата рождения";
  let birthdateInput = document.createElement('input');
  birthdateInput.classList.add('form-control');
  birthdateInput.placeholder = "ДД.ММ.ГГ";
  birthdateInput.type = "date";
  birthdateInput.min = "1900-01-01";
  birthdateInput.max = new Date().toISOString().split("T")[0];
  form.append(birthdateInput);

  let textStartTeaching = document.createElement('div');
  form.append(textStartTeaching);
  textStartTeaching.textContent = "Год начала обучения";
  let startTeachingInput = document.createElement('input');
  startTeachingInput.placeholder = "Введите год начала обучения";
  startTeachingInput.type = "number";
  startTeachingInput.min = "2000";
  startTeachingInput.max = new Date().getFullYear();
  startTeachingInput.classList.add('form-control');
  form.append(startTeachingInput);

  let textFaculty = document.createElement('div');
  form.append(textFaculty);
  textFaculty.textContent = "Факультет";
  let facultyInput = document.createElement('input');
  facultyInput.classList.add('form-control');
  facultyInput.placeholder = "Введите свой факультет";
  form.append(facultyInput);

  let validError = document.createElement('div');
  validError.classList.add('none', 'error-valid')
  form.append(validError);

  let buttonWrapper = document.createElement('div');
  let button = document.createElement('button');
  buttonWrapper.classList.add('input-group-append')
  button.classList.add('btn', 'btn-primary');
  button.textContent = 'Добавить студента';
  buttonWrapper.append(button);
  form.append(buttonWrapper);



  let formFilter = document.createElement('form');
  formFilter.classList.add('row');
  container.append(formFilter);

  let inputNameFilter = document.createElement('input');
  inputNameFilter.placeholder = "Поиск по имени";
  inputNameFilter.classList.add('form-control', 'col');

  inputNameFilter.addEventListener('input', () => {
    studentsFilter = students.filter(function(e) {
      return e.name === inputNameFilter.value
    });
    localStorage.setItem('filter', JSON.stringify(studentsFilter));
    variantsTable();
  })

  let inputSurnameFilter = document.createElement('input');
  inputSurnameFilter.placeholder = "Поиск по фамилии";
  inputSurnameFilter.classList.add('form-control', 'col');

  inputSurnameFilter.addEventListener('input', () => {
    studentsFilter = students.filter(function(e) {
      return e.surname === inputSurnameFilter.value
    });
    localStorage.setItem('filter', JSON.stringify(studentsFilter));
    variantsTable();
  })

  let inputMiddleFilter = document.createElement('input');
  inputMiddleFilter.placeholder = "Поиск по отчеству";
  inputMiddleFilter.classList.add('form-control', 'col');

  inputMiddleFilter.addEventListener('input', () => {
    studentsFilter = students.filter(function(e) {
      return e.middlename === inputMiddleFilter.value
    });
    localStorage.setItem('filter', JSON.stringify(studentsFilter));
    variantsTable();
  })

  let inputFacultyFilter = document.createElement('input');
  inputFacultyFilter.classList.add('form-control', 'col');
  inputFacultyFilter.placeholder = "Поиск по факультету";

  inputFacultyFilter.addEventListener('input', () => {
    studentsFilter = students.filter(function(e) {
      return e.faculty === inputFacultyFilter.value
    });
    localStorage.setItem('filter', JSON.stringify(studentsFilter));
    variantsTable();
  })

  let inputStartTeachingFilter = document.createElement('input');
  inputStartTeachingFilter.classList.add('form-control', 'col');
  inputStartTeachingFilter.placeholder = "Год начала обучения";

  inputStartTeachingFilter.addEventListener('input', ()=> {
    studentsFilter = students.filter(function(e) {
      return e.StartYear === inputStartTeachingFilter.value
    });

    localStorage.setItem('filter', JSON.stringify(studentsFilter));
    variantsTable();
  })


  let inputEndTeachingFilter = document.createElement('input');
  inputEndTeachingFilter.classList.add('form-control', 'col');
  inputEndTeachingFilter.placeholder = "Год конца обучения";

  inputEndTeachingFilter.addEventListener('input', ()=> {
    studentsFilter = students.filter(function(e) {
      return e.endTeaching === inputEndTeachingFilter.value
    });

    localStorage.setItem('filter', JSON.stringify(studentsFilter));
    variantsTable();
  })

  function updateTableStudentsFilter() {
    for (let student of studentsFilter) {
      let stringTable = createDataStudent(student);
      table.append(stringTable);
    }
  }

  function variantsTable() {
    if(inputNameFilter.value === "" && inputMiddleFilter.value === "" && inputSurnameFilter.value === ""
    && inputFacultyFilter.value === "" && inputStartTeachingFilter.value === "" && inputEndTeachingFilter.value == "") {
      return updateTableStudents();
    }
    else {
      updateTableStudentsFilter();
    }
  }

  formFilter.append(inputNameFilter);
  formFilter.append(inputSurnameFilter);
  formFilter.append(inputMiddleFilter);
  formFilter.append(inputFacultyFilter);
  formFilter.append(inputStartTeachingFilter);
  formFilter.append(inputEndTeachingFilter);

  let table = document.createElement('table');
  container.append(table);
  table.classList.add('table');
  let firstString = document.createElement('tr');
  table.append(firstString);

  let titleNameTable = document.createElement('th');
  firstString.append(titleNameTable);
  titleNameTable.textContent = "ФИО";

  let titleFacultyTable = document.createElement('th');
  firstString.append(titleFacultyTable);
  titleFacultyTable.textContent = "Факультет";

  let titleBirthdateTable = document.createElement('th');
  firstString.append(titleBirthdateTable);
  titleBirthdateTable.textContent = "ДР и возраст";

  let titleYearsTeachingTable = document.createElement('th');
  firstString.append(titleYearsTeachingTable);
  titleYearsTeachingTable.textContent = "Годы обучения";




  function generateStudents() {
    let nowYear = new Date().getFullYear();
    let nowMonth = new Date().getMonth();
    let nowDay = new Date().getDate();
    let today = new Date(nowYear, nowMonth, nowDay);
    let birthDate = new Date(birthdateInput.value).toLocaleDateString();
    let birthYear = new Date(birthdateInput.value).getFullYear();
    let birthMonth = new Date(birthdateInput.value).getMonth();
    let birthDay = new Date(birthdateInput.value).getDate();
    let birthNow = new Date(nowYear, birthMonth, birthDay);
    let startYear = new Date(startTeachingInput.value).getFullYear();
    let endYear = startYear + 4;
    let nowMonthYear = new Date(nowYear, nowMonth);
    let septemberToday = new Date(nowYear, 07);
    let birthdate = new Date(birthdateInput.value);

    function getCourse() {
      if (Date.parse(endYear) < Date.parse(septemberToday)) {
        return 'Закончил';
      }

      else {
        if (Date.parse(nowMonthYear) > Date.parse(septemberToday))
          return `${(nowYear - startYear) + 1} курс`;
        else {
          return `${(nowYear - startYear)} курс`
        }
      }
    }

    function getAge() {
      if (Date.parse(today) < Date.parse(birthNow)) {
        return `${(nowYear - birthYear) - 1} лет`
      }
      else {
        return `${nowYear - birthYear} лет`
      }
    }

    function validForm() {
      if (nameInput.value === "") {
        validError.classList.remove('none');
        validError.textContent = "Введите имя";
        return false
      }
      if (surnameInput.value === "") {
        validError.classList.remove('none');
        validError.textContent = "Введите фамилию";
        return false
      }
      if (middlenameInput.value === "") {
        validError.classList.remove('none');
        validError.textContent = "Введите Очество";
        return false
      }
      if (birthdateInput.value === "") {
        validError.classList.remove('none');
        validError.textContent = "Введите дату рождения";
        return false
      }
      if (startTeachingInput.value === "") {
        validError.classList.remove('none');
        validError.textContent = "Введите год поступления";
        return false
      }
      if (facultyInput.value === "") {
        validError.classList.remove('none');
        validError.textContent = "Введите свой факультет";
        return false
      }
      return true
    }

    let name = nameInput.value;
    let surname = surnameInput.value;
    let middlename = middlenameInput.value;
    let faculty = facultyInput.value;

    capitalName = name.substr(0, 1);
    lineName = name.substr(1);
    capitalSurname = surname.substr(0, 1);
    lineSurname = surname.substr(1);
    capitalMiddlename = middlename.substr(0, 1);
    lineMiddlename = middlename.substr(1);
    capitalFaculty = faculty.substr(0, 1);
    lineFaculty = faculty.substr(1);

    normalizeName = capitalName.toUpperCase() + lineName.toLowerCase();
    normalizeSurname = capitalSurname.toUpperCase() + lineSurname.toLowerCase();
    normalizeMiddlename = capitalMiddlename.toUpperCase() + lineMiddlename.toLowerCase();
    normalizeFaculty = capitalFaculty.toUpperCase() + lineFaculty.toLowerCase();

    if(validForm()) {
    validError.classList.add('none');
    students.push({
      surname: normalizeSurname,
      name: normalizeName,
      middlename: normalizeMiddlename,
      birthDate: `${birthDate} (${getAge()})`,
      StartTeaching: `${startYear}-${endYear}(${getCourse()})`,
      faculty: normalizeFaculty,
      StartYear: `${startYear}`,
      endTeaching: `${endYear}`,
      BirthDate: birthdate,
    })
    localStorage.setItem('key', JSON.stringify(students));
    }
  }


  function createDataStudent(
    {
      surname,
      name,
      middlename,
      birthDate,
      StartTeaching,
      endTeaching,
      faculty,
    }
  ) {
    let stringTable = document.createElement('tr');
    let nameTable = document.createElement('td');
    let birthdateTable = document.createElement('td');
    let startTeachingTable = document.createElement('td');
    let facultyTable = document.createElement('td');

    nameTable.textContent = `${surname} ${name} ${middlename}`;
    birthdateTable.textContent = birthDate;
    startTeachingTable.textContent = StartTeaching;
    facultyTable.textContent = faculty;

    stringTable.append(nameTable);
    stringTable.append(facultyTable);
    stringTable.append(birthdateTable);
    stringTable.append(startTeachingTable);

    form.addEventListener('submit', ()=> {
      stringTable.remove();
    })

    titleNameTable.addEventListener('click', () => {
      stringTable.remove();
    })

    titleFacultyTable.addEventListener('click', ()=> {
      stringTable.remove();
    })

    titleYearsTeachingTable.addEventListener('click', ()=> {
      stringTable.remove();
    })

    titleBirthdateTable.addEventListener('click', ()=> {
      stringTable.remove();
    })

    inputNameFilter.addEventListener('input', ()=> {
      stringTable.remove();
    })

    inputMiddleFilter.addEventListener('input', ()=> {
      stringTable.remove();
    })

    inputSurnameFilter.addEventListener('input', ()=> {
      stringTable.remove();
    })

    inputFacultyFilter.addEventListener('input', ()=> {
      stringTable.remove();
    })

    inputStartTeachingFilter.addEventListener('input', ()=> {
      stringTable.remove();
    })

    inputEndTeachingFilter.addEventListener('input', ()=> {
      stringTable.remove();
    })

    return stringTable;
  }

  function updateTableStudents() {
    for (let student of students) {
      let stringTable = createDataStudent(student);
      table.append(stringTable);
    }
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    generateStudents();
    updateTableStudents();
    nameInput.value = "";
    surnameInput.value = "";
    middlenameInput.value = "";
    startTeachingInput.value = "";
    birthdateInput.value = "";
    facultyInput.value = "";
  })

  function sortNameStudents() {
    students.sort(function (a, b) {
      if (a.surname < b.surname) { return -1; }
      if (a.surname > b.surname) { return 1; }
      if (a.name < b.name) { return -1; }
      if (a.name > b.name) { return 1; }
      if (a.middlename < b.middlename) { return -1; }
      if (a.middlename > b.middlename) { return 1; }
      return 0;
    })
    localStorage.setItem('key', JSON.stringify(students));
  }

  function sortFacultyStudents() {
    students.sort(function(a,b) {
      if(a.faculty < b.faculty) {return -1}
      if(a.faculty > b.faculty) {return 1}
      return 0
    })
    localStorage.setItem('key', JSON.stringify(students));
  }

  function sortStartTeaching() {
    students.sort(function(a,b) {
      if(a.StartTeaching < b.StartTeaching) {return -1}
      if(a.StartTeaching > b.StartTeaching) {return 1}
      return 0
    })
    localStorage.setItem('key', JSON.stringify(students));
  }


  function sortBirthDate() {
    students.sort(function(a,b) {
      if(a.BirthDate > b.BirthDate) {return -1}
      if(a.BirthDate < b.BirthDate) {return 1}
      return 0
    })
    localStorage.setItem('key', JSON.stringify(students));
  }

  titleNameTable.addEventListener('click', () => {
    sortNameStudents();
    variantsTable();
  })

  titleFacultyTable.addEventListener('click', ()=> {
    sortFacultyStudents();
    variantsTable();
  })

  titleYearsTeachingTable.addEventListener('click', ()=> {
    sortStartTeaching();
    variantsTable();
  })

  titleBirthdateTable.addEventListener('click', ()=> {
    sortBirthDate();
    variantsTable();
  })

  variantsTable();
})();
