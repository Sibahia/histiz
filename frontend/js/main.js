document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content")
    const themeToggle = document.getElementById("theme-toggle")
    const navLinks = document.querySelectorAll("nav a")
    const pageTitle = document.getElementById("page-title")
  
    // Cambio de tema
    themeToggle.addEventListener("change", () => {
      document.documentElement.classList.toggle("dark")
    })
  
    // Navegación
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()
        navLinks.forEach((l) => l.classList.remove("bg-primary", "text-white"))
        this.classList.add("bg-primary", "text-white")
        loadPage(this.dataset.page)
      })
    })
  
    // Cargar página
    function loadPage(page) {
      pageTitle.textContent = getPageTitle(page)
      switch (page) {
        case "dashboard":
            content.innerHTML = `
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                        <h3 class="text-lg font-semibold mb-2">Total de Pacientes</h3>
                        <p id="total-patients" class="text-2xl font-bold text-primary"></p>
                        <p class="text-sm text-gray-600 dark:text-gray-400">registrados en HIS</p>
                    </div>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6 shadow">
                    <h3 class="text-xl font-semibold mb-4">Buscar Paciente</h3>
                    <input type="text" id="patient-search" placeholder="Ingrese cédula del paciente" class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                    <div id="patient-search-result" class="mt-4"></div>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                    <h3 class="text-xl font-semibold mb-4">Pacientes Recientes</h3>
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead>
                                <tr class="bg-gray-100 dark:bg-gray-700">
                                    <th class="text-left p-2">Nombre</th>
                                    <th class="text-left p-2">Edad</th>
                                    <th class="text-left p-2">Enfermedad</th>
                                </tr>
                            </thead>
                            <tbody id="recent-patients">
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
            loadTotalPatients();
            loadRecentPatients();
            setupPatientSearch();
            break;
        case "patients":
          content.innerHTML = `
                        <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                            <input type="text" id="patient-list-search" placeholder="Buscar pacientes..." class="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                            <div class="overflow-x-auto">
                                <table class="w-full">
                                    <thead>
                                        <tr class="bg-gray-100 dark:bg-gray-700">
                                            <th class="text-left p-2">Cédula</th>
                                            <th class="text-left p-2">Primer Nombre</th>
                                            <th class="text-left p-2">Segundo Nombre</th>
                                            <th class="text-left p-2">Primer Apellido</th>
                                            <th class="text-left p-2">Segundo Apellido</th>
                                            <th class="text-left p-2">Fecha de Nacimiento</th>
                                            <th class="text-left p-2">Edad</th>
                                            <th class="text-left p-2">Dirección</th>
                                            <th class="text-left p-2">Email</th>
                                            <th class="text-left p-2">Enfermedades</th>
                                            <th class="text-left p-2">Fecha de registro</td>
                                        </tr>
                                    </thead>
                                    <tbody id="patients-table-body">
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    `
          loadPatients()
          break
        case "add-patient":
          content.innerHTML = `
                        <form id="add-patient-form" class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label for="cedula" class="block mb-1">Cédula</label>
                                    <input type="number" id="cedula" name="cedula" required class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                                </div>
                                <div>
                                    <label for="primerNombre" class="block mb-1">Primer Nombre</label>
                                    <input type="text" id="primerNombre" name="primerNombre" required class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                                </div>
                                <div>
                                    <label for="segundoNombre" class="block mb-1">Segundo Nombre</label>
                                    <input type="text" id="segundoNombre" name="segundoNombre" class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                                </div>
                                <div>
                                    <label for="primerApellido" class="block mb-1">Primer Apellido</label>
                                    <input type="text" id="primerApellido" name="primerApellido" required class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                                </div>
                                <div>
                                    <label for="segundoApellido" class="block mb-1">Segundo Apellido</label>
                                    <input type="text" id="segundoApellido" name="segundoApellido" class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                                </div>
                                <div>
                                    <label for="fecha_nacimiento" class="block mb-1">Fecha de Nacimiento</label>
                                    <input type="date" id="fecha_nacimiento" name="fecha_nacimiento" required class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                                </div>
                                <div>
                                    <label for="edad" class="block mb-1">Edad</label>
                                    <input type="number" id="edad" name="edad" required class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                                </div>
                                <div>
                                    <label for="direccion" class="block mb-1">Dirección</label>
                                    <input type="text" id="direccion" name="direccion" required class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                                </div>
                                <div class="md:col-span-2">
                                    <label for="email" class="block mb-1">Email</label>
                                    <input type="email" id="email" name="email" required class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                                </div>
                                <div class="md:col-span-2">
                                    <label for="enfermedades" class="block mb-1">Enfermedades</label>
                                    <textarea id="enfermedades" name="enfermedades" class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white"></textarea>
                                </div>
                            </div>
                            <button type="submit" class="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">Agregar Paciente</button>
                        </form>
                    `
          setupAddPatientForm()
          break
      }
    }

    function loadTotalPatients() {
        fetch("http://localhost:5500/api/users/patients/count")
            .then(response => response.json())
            .then(data => {
                const totalPatientsElement = document.getElementById("total-patients");
                totalPatientsElement.textContent = data.count; // Asegúrate de que el servidor devuelve un objeto con la propiedad 'count'
            })
            .catch(error => {
                console.error("Error obteniendo el total de pacientes:", error);
            });
    }
  
    function loadRecentPatients() {
      fetch("http://localhost:5500/api/users/patients?limit=5")
        .then((response) => response.json())
        .then((patients) => {
          const recentPatientsTable = document.getElementById("recent-patients")
          recentPatientsTable.innerHTML = patients
            .map(
              (patient) => `
                        <tr class="border-b dark:border-gray-700">
                            <td class="p-2">${patient.primerNombre} ${patient.primerApellido}</td>
                            <td class="p-2">${patient.edad}</td>
                            <td class="p-2">${patient.enfermedades}</td>
                        </tr>
                    `,
            )
            .join("")
        })
        .catch((error) => console.error("Error:", error))
    }

    function setupPatientSearch() {
        const searchInput = document.getElementById("patient-search");
        const resultDiv = document.getElementById("patient-search-result");
    
        searchInput.addEventListener(
            "input",
            debounce(() => {
                const cedula = searchInput.value.trim();
                if (cedula) {
                    fetch(`http://localhost:5500/api/users/patients/cedula/${cedula}`)
                        .then((response) => response.json())
                        .then((patient) => {
                            if (patient && patient !== "Validation: no es cedula") {
                                resultDiv.innerHTML = `
                                    <div class="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white p-4 rounded mt-2">
                                        <p><strong>Nombre:</strong> ${patient.primerNombre} ${patient.primerApellido}</p>
                                        <p><strong>Edad:</strong> ${patient.edad}</p>
                                        <p><strong>Email:</strong> ${patient.email}</p>
                                        <p><strong>Enfermedad:</strong> ${patient.enfermedades}</p>
                                    </div>
                                `;
                            } else if (patient === "Validation: no es cedula") {
                                resultDiv.innerHTML = `
                                    <div class="bg-red-200 border-2 border-red-100 dark:bg-red-800 dark:border-red-900 dark:text-white p-4 rounded mt-2">
                                        <p>Error: La cédula ingresada no es válida.</p>
                                    </div>
                                `;
                            } else {
                                resultDiv.innerHTML = `
                                    <div class="bg-red-200 border-2 border-red-100 dark:bg-red-800 dark:border-red-900 dark:text-white p-4 rounded mt-2">
                                        <p>No se encontró ningún paciente con esa cédula.</p>
                                    </div>
                                `;
                            }
                        })
                        .catch((error) => {
                            console.error("Error:", error);
                            resultDiv.innerHTML = `
                                <div class="bg-red-200 border-2 border-red-100 dark:bg-red-800 dark:border-red-900 dark:text-white p-4 rounded mt-2">
                                    <p>Error al buscar el paciente.</p>
                                </div>
                            `;
                        });
                } else {
                    resultDiv.innerHTML = "";
                }
            }, 300)
        );
    }
    
  
    // function setupPatientSearch() {
    //   const searchInput = document.getElementById("patient-search")
    //   const resultDiv = document.getElementById("patient-search-result")
  
    //   searchInput.addEventListener(
    //     "input",
    //     debounce(() => {
    //       const cedula = searchInput.value.trim()
    //       if (cedula) {
    //         fetch(`http://localhost:5500/api/users/patients/cedula/${cedula}`)
    //           .then((response) => response.json())
    //           .then((patient) => {
    //             if (patient) {
    //               resultDiv.innerHTML = `
    //                                 <div class="bg-white text-white dark:bg-gray-800 dark:border-gray-700 dark:text-white p-4 rounded mt-2">
    //                                     <p><strong>Nombre:</strong> ${patient.primerNombre} ${patient.primerApellido}</p>
    //                                     <p><strong>Edad:</strong> ${patient.edad}</p>
    //                                     <p><strong>Email:</strong> ${patient.email}</p>
    //                                     <p><strong>Enfermedad:</strong> ${patient.enfermedades}</p>
    //                                 </div>
    //                             `
    //             } else {
    //               resultDiv.innerHTML = `
    //                                 <div class="bg-white-100 border-red-100 rounded-xl dark:bg-red-800 dark:border-red-100 dark:text-white p-4 rounded mt-2">
    //                                     <p>No se encontró ningún paciente con esa cédula.</p>
    //                                 </div>
    //                             `
    //             }
    //           })
    //           .catch((error) => {
    //             console.error("Error:", error)
    //             resultDiv.innerHTML = `
    //                             <div class="bg-white-100 border-red-200 border-1 rounded-xl dark:border-red-800 dark:bg-gray-700 dark:text-white p-4 rounded mt-2">
    //                                 <p>Error al buscar el paciente.</p>
    //                             </div>
    //                         `
    //           })
    //       } else {
    //         resultDiv.innerHTML = ""
    //       }
    //     }, 300),
    //   )
    // }
  
    function loadPatients() {
      fetch("http://localhost:5500/api/users/patients")
        .then((response) => response.json())
        .then((patients) => {
          const tableBody = document.getElementById("patients-table-body")
          tableBody.innerHTML = patients
            .map(
              (patient) => `
                        <tr class="border-b dark:border-gray-700">
                            <td class="p-2">${patient.cedula}</td>
                            <td class="p-2">${patient.primerNombre}</td>
                            <td class="p-2">${patient.segundoNombre || "-"}</td>
                            <td class="p-2">${patient.primerApellido}</td>
                            <td class="p-2">${patient.segundoApellido || "-"}</td>
                            <td class="p-2">${patient.fecha_nacimiento}</td>
                            <td class="p-2">${patient.edad}</td>
                            <td class="p-2">${patient.direccion}</td>
                            <td class="p-2">${patient.email}</td>
                            <td class="p-2">${patient.enfermedades || "-"}</td>
                            <td class="p-2">${patient.fecha_creacion}</td>
                        </tr>
                    `,
            )
            .join("")
        })
        .catch((error) => console.error("Error:", error))
  
      const searchInput = document.getElementById("patient-list-search")
      searchInput.addEventListener(
        "input",
        debounce(() => {
          const searchTerm = searchInput.value.toLowerCase()
          const rows = document.querySelectorAll("#patients-table-body tr")
          rows.forEach((row) => {
            const text = row.textContent.toLowerCase()
            row.style.display = text.includes(searchTerm) ? "" : "none"
          })
        }, 300),
      )
    }
  
    function setupAddPatientForm() {
      const form = document.getElementById("add-patient-form")
      form.addEventListener("submit", (e) => {
        e.preventDefault()
        const formData = new FormData(form)
        const patientData = Object.fromEntries(formData.entries())
  
        patientData.cedula = Number.parseInt(patientData.cedula, 10)
        patientData.edad = Number.parseInt(patientData.edad, 10)
  
        fetch("http://localhost:5500/api/users/patients", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(patientData),
        })
          .then((response) => response.json())
          .then((data) => {
            form.reset()
          })
          .catch((error) => {
            console.error("Error:", error)
            alert("Error al agregar el paciente")
          })
      })
    }
  
    function debounce(func, wait) {
      let timeout
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout)
          func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
      }
    }
  
    function getPageTitle(page) {
      switch (page) {
        case "dashboard":
          return "Dashboard"
        case "patients":
          return "Pacientes"
        case "add-patient":
          return "Agregar Paciente"
        default:
          return "HIS"
      }
    }
  
    // Cargar la página de inicio por defecto
    loadPage("dashboard")
  })
  
  