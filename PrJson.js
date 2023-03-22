// Paso 1: Extraer información del archivo index.html
const table = document.querySelector('table');
const rows = table.querySelectorAll('tr');
const users = [];

for (let i = 1; i < rows.length; i++) {
  const row = rows[i];
  const cells = row.querySelectorAll('td');
  const user = {
    name: cells[0].textContent.trim(),
    email: cells[1].textContent.trim(),
    phone: cells[2].textContent.trim(),
    company: cells[3].textContent.trim(),
  };
  users.push(user);
}

// Paso 2: Extraer información del archivo script.js
function loadUsers() {
  return fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => data.map(user => ({
      name: user.name,
      email: user.email,
      phone: user.phone,
      company: user.company.name,
    })));
}

// Paso 3: Combinar información en un solo objeto
loadUsers().then(remoteUsers => {
  const mergedUsers = remoteUsers.map(remoteUser => {
    const localUser = users.find(localUser => localUser.email === remoteUser.email);
    return {
      ...remoteUser,
      ...localUser,
    };
  });
  
  // Paso 4: Convertir objeto a JSON y guardarlo en un archivo
  const json = JSON.stringify(mergedUsers, null, 2);
  
  // Crear archivo en memoria y descargarlo
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'merged-users.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}); 