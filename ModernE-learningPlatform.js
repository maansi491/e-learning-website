// js/script.js

// Sample courses data
const courses = [
  {
    id: 'c-html',
    title: 'HTML & CSS Basics',
    short: 'Learn structure & styling for modern web pages.',
    desc: 'Covers semantic HTML, CSS basics, Flexbox and Grid, and responsive layouts.',
    img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=84b3e061c1a1f6b2d1f4a8d3a9bcbdb7'
  },
  {
    id: 'c-js',
    title: 'JavaScript Essentials',
    short: 'DOM, events, async code, ES6+ features.',
    desc: 'From basics to modern JS: let/const, functions, promises, fetch API and DOM manipulation.',
    img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=1f1a6bd493f7f5f1c1f6b0f0c9fd3b3e'
  },
  {
    id: 'c-react',
    title: 'React for Beginners',
    short: 'Components, state, hooks and routing.',
    desc: 'Build scalable interfaces using component-based architecture with React and React Router.',
    img: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=8629f7a8d7c95ad9f6a2c1f2c3a4a2dd'
  }
];

// Render course cards
function renderCourses(list){
  const row = document.getElementById('coursesRow');
  row.innerHTML = '';
  list.forEach(c => {
    const col = document.createElement('div');
    col.className = 'col-md-4';
    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${c.img}" class="card-img-top" alt="${c.title}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${c.title}</h5>
          <p class="card-text text-muted">${c.short}</p>
          <div class="mt-auto d-flex gap-2">
            <button class="btn btn-sm btn-outline-primary view-course" data-id="${c.id}">View</button>
            <button class="btn btn-sm btn-primary enroll-course" data-id="${c.id}">Enroll</button>
          </div>
        </div>
      </div>
    `;
    row.appendChild(col);
  });
}

// initial render
renderCourses(courses);

// Search filter
document.getElementById('searchInput').addEventListener('input', (e) => {
  const q = e.target.value.toLowerCase();
  const filtered = courses.filter(c => c.title.toLowerCase().includes(q) || c.short.toLowerCase().includes(q));
  renderCourses(filtered);
});

// Course modal handling (delegation)
document.getElementById('coursesRow').addEventListener('click', (e) => {
  const viewBtn = e.target.closest('.view-course');
  const enrollBtn = e.target.closest('.enroll-course');
  if(viewBtn){
    const id = viewBtn.dataset.id;
    openCourseModal(id);
  } else if(enrollBtn){
    const id = enrollBtn.dataset.id;
    enrollCourse(id);
  }
});

function openCourseModal(id){
  const c = courses.find(x => x.id === id);
  if(!c) return;
  document.getElementById('courseModalTitle').textContent = c.title;
  document.getElementById('courseModalDesc').textContent = c.desc;
  document.getElementById('courseModalContent').innerHTML = `
    <img src="${c.img}" class="img-fluid mb-3" alt="${c.title}">
    <p><strong>What you'll learn:</strong></p>
    <ul>
      <li>Key concepts and hands-on exercises</li>
      <li>Best practices and real project examples</li>
      <li>Quizzes and assignments</li>
    </ul>
  `;
  document.getElementById('enrollBtn').dataset.id = id;
  const modal = new bootstrap.Modal(document.getElementById('courseModal'));
  modal.show();
}

function enrollCourse(id){
  // simple client-side "enroll" demo using localStorage
  const enrolled = JSON.parse(localStorage.getItem('aenexz_enrolled') || '[]');
  if(enrolled.includes(id)){
    alert('You are already enrolled in this course.');
    return;
  }
  enrolled.push(id);
  localStorage.setItem('aenexz_enrolled', JSON.stringify(enrolled));
  alert(' Enrolled! Course added to your dashboard (local demo).');
}

// enroll button in modal
document.getElementById('enrollBtn').addEventListener('click', (e) => {
  const id = e.target.dataset.id;
  if(id) enrollCourse(id);
  // hide modal after enrolling
  bootstrap.Modal.getInstance(document.getElementById('courseModal')).hide();
});

// Form validation (Bootstrap)
(function () {
  'use strict'
  const forms = document.querySelectorAll('.needs-validation')
  Array.from(forms).forEach(function (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      } else {
        // handle specific forms
        if(form.id === 'instructorForm'){
          event.preventDefault();
          alert('Application received (demo). We will contact you via email.');
          form.reset();
        } else if(form.id === 'contactForm'){
          event.preventDefault();
          alert(' Message sent (demo). Thank you!');
          form.reset();
        } else if(form.id === 'loginForm'){
          event.preventDefault();
          // demo login: accept any valid email/password
          const email = document.getElementById('loginEmail').value;
          alert('Logged in as ' + email + ' (demo).');
          var loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
          loginModal.hide();
          form.reset();
        }
      }
      form.classList.add('was-validated')
    }, false)
  })
})();
