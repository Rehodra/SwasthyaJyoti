// mobile nav toggle + footer year
document.addEventListener('DOMContentLoaded', function(){
  const hamb = document.getElementById('hamburger');
  const nav = document.getElementById('navLinks');
  if(hamb){
    hamb.addEventListener('click', function(){
      if(nav.style.display === 'flex') {
        nav.style.display = 'none';
      } else {
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
        nav.style.gap = '0.6rem';
        nav.style.padding = '0.6rem';
        nav.style.marginTop = '0.6rem';
      }
    });
  }

  const yr = document.getElementById('year');
  if(yr) yr.textContent = new Date().getFullYear();
});

fetch('/api/persons')
  .then(res => res.json())
  .then(data => {
    const list = document.querySelector(".persons-list");
    list.innerHTML = "";
    data.forEach(person => {
      const div = document.createElement("div");
      div.className = "person-card";
      div.innerHTML = `
        <span>${person.name}</span>
        <a href="person-details.html?id=${person._id}">
          <i class="fa fa-eye"></i> View
        </a>
      `;
      list.appendChild(div);
    });
  });

