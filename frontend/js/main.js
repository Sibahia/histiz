document.addEventListener("DOMContentLoaded", async () => {
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
        link.addEventListener("click", async function (e) {
            e.preventDefault()
            navLinks.forEach((l) => l.classList.remove("bg-primary", "text-white"))
            this.classList.add("bg-primary", "text-white")
            await loadPage(this.dataset.page)
        })
    });

    async function handleFetchResponse(response) {
        if (!response.ok) {
            const errorData = await response.json()
            if (errorData.ValidationError) {
                throw new Error(`ValidationError: ${errorData.ValidationError}`)
            }
            throw new Error(`HTTPError: ${response.status} - ${response.statusText}`)
        }
        return await response.json()
    }

    function displayError(message, type = 'error') {
        const colors = {
            error: 'red',
            warning: 'yellow',
            info: 'blue'
        }
        return `<div class="bg-${colors[type]}-100 border border-${colors[type]}-400 text-${colors[type]}-700 px-4 py-3 rounded relative" role="alert">
                  <span class="block sm:inline">${message}</span>
                </div>`
    };

    // Cargar página
    async function loadPage(page) {
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
                await loadTotalPatients()
                await loadRecentPatients()
                setupPatientSearch()
                break
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
            `;
                await loadPatients()
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

    async function loadTotalPatients() {
        try {
            const response = await fetch("http://localhost:5500/api/users/patients/count")
            const data = await handleFetchResponse(response)
            document.getElementById("total-patients").textContent = data.count
        } catch (error) {
            if (error.message.startsWith('ValidationError:')) {
                console.error("Error de validación:", error.message)
            } else if (error.message.includes('Failed to fetch')) {
                console.error(displayError('ConnectionError: No se pudo conectar al servidor'))
            } else {
                console.error("Error:", error)
            }
        }
    }

    async function loadRecentPatients() {
        try {
            const response = await fetch("http://localhost:5500/api/users/patients?limit=5")
            const patients = await response.json()
            const recentPatientsTable = document.getElementById("recent-patients")
            
            recentPatientsTable.innerHTML = patients.map(patient => `
                <tr class="border-b dark:border-gray-700">
                    <td class="p-2">${patient.primerNombre} ${patient.primerApellido}</td>
                    <td class="p-2">${patient.edad}</td>
                    <td class="p-2">${patient.enfermedades}</td>
                </tr>
            `).join("")
        } catch (error) {
            console.error("Error:", error)
        }
    }

    async function setupPatientSearch() {
        const searchInput = document.getElementById("patient-search")
        const resultDiv = document.getElementById("patient-search-result")

        searchInput.addEventListener("input", debounce(async () => {
            const cedula = searchInput.value.trim()
            if (!cedula) {
                resultDiv.innerHTML = ""
                return
            }

            try {
                const response = await fetch(`http://localhost:5500/api/users/patients/cedula/${cedula}`)
                const patient = await handleFetchResponse(response)

                if (patient === "Validation: no es cedula") {
                    resultDiv.innerHTML = displayError('La cédula ingresada no es válida', 'error')
                } else if (patient) {
                    resultDiv.innerHTML = `
                        <div class="bg-white dark:bg-gray-800 p-4 rounded mt-2 shadow">
                            <p><strong>Cédula:</strong> ${patient.cedula}</p>
                            <p><strong>Nombre:</strong> ${patient.primerNombre} ${patient.primerApellido}</p>
                            <p><strong>Edad:</strong> ${patient.edad}</p>
                            <p><strong>Email:</strong> ${patient.email}</p>
                            <p><strong>Enfermedad:</strong> ${patient.enfermedades}</p>
                        </div>`
                }
            } catch (error) {
                if (error.message.startsWith('ValidationError:')) {
                    resultDiv.innerHTML = displayError(error.message.split(': ')[1], 'error')
                } else if (error.message.includes('Failed to fetch')) {
                    resultDiv.innerHTML = displayError('Error de conexión con el servidor', 'error')
                } else {
                    resultDiv.innerHTML = displayError('Error desconocido al buscar paciente', 'error')
                }
            }
        }, 300))
    }

    async function loadPatients() {
        try {
            const response = await fetch("http://localhost:5500/api/users/patients")
            const patients = await handleFetchResponse(response)
            const tableBody = document.getElementById("patients-table-body")
            
            tableBody.innerHTML = patients.map(patient =>  `
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
            `).join("")

            // Configurar búsqueda local
            const searchInput = document.getElementById("patient-list-search")
            searchInput.addEventListener("input", debounce(() => {
                const searchTerm = searchInput.value.toLowerCase()
                document.querySelectorAll("#patients-table-body tr").forEach(row => {
                    row.style.display = row.textContent.toLowerCase().includes(searchTerm) ? "" : "none"
                })
            }, 300))
        } catch (error) {
            if (error.message.includes('Failed to fetch')) {
                content.innerHTML = displayError('ConnectionError: Error de conexión con el servidor', 'error')
            } else {
                console.error("Error:", error)
            }
        }
    }

    function setupAddPatientForm() {
        const form = document.getElementById("add-patient-form")
        
        form.addEventListener("submit", async (e) => {
            e.preventDefault()
            const formData = new FormData(form)
            const patientData = Object.fromEntries(formData.entries())

            try {
                const response = await fetch("http://localhost:5500/api/users/patients", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        ...patientData,
                        cedula: parseInt(patientData.cedula, 10),
                        edad: parseInt(patientData.edad, 10)
                    })
                })
                
                await handleFetchResponse(response)
                form.reset()
                alert('Paciente agregado exitosamente')
            } catch (error) {
                if (error.message.startsWith('ValidationError:')) {
                    alert(`Error de validación: ${error.message.split(': ')[1]}`)
                } else if (error.message.includes('Failed to fetch')) {
                    alert('ConnectionError: No se pudo conectar al servidor')
                } else {
                    alert('Error desconocido al agregar paciente')
                }
            }
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

    // Carga inicial
    await loadPage("dashboard")
})
  
