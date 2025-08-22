
/* global eventData */
const eventData = eventInfo;

// Inicializa o site quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", function () {
  initSite();
});

const dates = {
  registrationStart: new Date(eventData.dates.registrationStart),
  registrationEnd: new Date(eventData.dates.registrationEnd),
  eventDate: new Date(eventData.dates.eventDate)
};

function initSite() {
  // Atualiza componentes dinâmicos
  renderParallaxVideoHome();
  renderLogoHome();
  updateDynamicButtons();
  updateDateOrCountdown();
  updateRegistrationSection();
  updateRegistrationPhrase();
  updateRegulationPhrase();
  loadPhotos();
  renderKits();
  renderKitPickup();
  renderChecklist();
  updateLocationMap();
  updateInstagramPost();
  renderFAQs();
  renderOrganizers();
  renderMainSponsors();
  renderSponsorsCarousel();
  renderCourse();
  renderWarnings();


  // Inicializa plugins e utilitários
  // initPlugins();
  // initScrollBehavior();
  // initNavigation();
  // initBackToTop();
}

function renderParallaxVideoHome() {
  // const container = document.getElementById("parallaxVideo");
  // if (!container) return;

  // jarallax(container, {
  //   speed: 0.2,
  //   videoSrc: 'https://www.youtube.com/watch?v=WvyKlCXGteM'
  // });
}

function renderWarnings() {
  const container = document.getElementById("warnings-container");
  if (!container) return;
  var dataWarning = ``;

  if (eventData.warnings.show) {
    dataWarning = `<div class="mx-auto text-center">
        <p
            class="m-0 mt-5 mb-3 text-light-emphasis text-4xl tracking-tight fw-bold title-section border-title-section">
            AVISOS
        </p>
        <p id="warnings-container" class="m-0 my-4 text-lg leading-8 text-danger-emphasis">
            ${eventData.warnings.warnings.map(warning => `<i class="fa fa-info-circle"></i>&nbsp; ${warning}`).join('<br>')}
        </p>
    </div>`;

  }
  container.innerHTML = dataWarning;
}

function renderLogoHome() {
  const logo = document.getElementById("logo-home");
  if (!logo) return;
  logo.src = eventData.event.logoImage;
}

function renderCourse() {
  const container = document.getElementById("percurso");
  if (!container || !eventData.courses?.length) return;

  const hasMultipleCourses = eventData.courses.length > 1;

  container.innerHTML = `
    <div class="overflow-hidden py-7 py-sm-8 py-xl-9 bg-body-tertiary">
      <div class="container">
        <div class="mb-5 mb-sm-6 mb-xl-7" data-aos-delay="100" data-aos="fade" data-aos-duration="1000">
          <div class="max-w-xl">
            <h2 class="m-0 mt-2 fw-bold tracking-tight text-body-emphasis text-4xl">
              ${hasMultipleCourses ? 'Percursos' : 'Percurso'}
            </h2>
          </div>
        </div>

        ${hasMultipleCourses ? renderMultipleCourses() : renderSingleCourse()}
      </div>
    </div>
  `;

  // Inicializa a interação após renderizar
  if (hasMultipleCourses) {
    initCourseTabs();
  }
}

function renderSingleCourse() {
  const course = eventData.courses[0];
  return `
    <div class="row g-4">
      <!-- Mapa do Percurso -->
      <div class="col-lg-8">
        <div class="ratio ratio-16x9 rounded-3 overflow-hidden shadow">
          <img src="${course.image}" class="object-object-fit-fill" alt="${course.name}" loading="lazy">
        </div>
        <div class="d-flex flex-wrap gap-2 mt-3">
          <span class="badge bg-primary">${course.distance}</span>
          <span class="badge bg-secondary">Elevação: ${course.elevation}</span>
          <span class="badge bg-success">${course.timeLimit}</span>
          ${course.waterStations ? `<span class="badge bg-info">${course.waterStations} postos de água</span>` : `<span class="badge bg-info">postos de água</span>`}
        </div>
        <p class="mt-3">${course.description}</p>
      </div>
      
      <!-- Lista Rolável do Roteiro -->
      <div class="col-lg-4">
        <div class="rounded-3 p-3 h-100">
          <h5 class="mb-3">Roteiro Detalhado</h5>
          <div class="route-scrollable" style="max-height: 400px; overflow-y: auto;">
            <ul class="list-group">
              ${course.route.map(point => `
                <li class="list-group-item d-flex justify-content-start align-items-start">                  
                        <span class="badge bg-primary me-3">${point.split(':')[0]}</span>
                        ${point.split(':')[1]}
                </li>
              `).join('')}
            </ol>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderMultipleCourses() {
  return `
    <div class="course-tabs">
      <ul class="nav nav-tabs" id="courseTabs" role="tablist">
        ${eventData.courses.map((course, index) => `
          <li class="nav-item" role="presentation">
            <button class="nav-link ${index === 0 ? 'active' : ''}" 
              id="${course.id}-tab" data-bs-toggle="tab" 
              data-bs-target="#${course.id}" type="button" role="tab">
              ${course.name}
            </button>
          </li>
        `).join('')}
      </ul>

      <div class="tab-content py-4" id="courseTabsContent">
        ${eventData.courses.map((course, index) => `
          <div class="tab-pane fade ${index === 0 ? 'show active' : ''}" 
            id="${course.id}" role="tabpanel">
            <div class="row g-4">
              <!-- Mapa do Percurso -->
              <div class="col-lg-8">
                <div class="ratio ratio-16x9 rounded-3 overflow-hidden shadow">
                  <img src="${course.image}" class="object-object-fit-fill" alt="${course.name}" loading="lazy">
                </div>
                <div class="d-flex flex-wrap gap-2 mt-3">
                  <span class="badge bg-primary">${course.distance}</span>
                  <span class="badge bg-secondary">Elevação: ${course.elevation}</span>
                  <span class="badge bg-success">${course.timeLimit}</span>
                  ${course.waterStations ? `<span class="badge bg-info">${course.waterStations} postos de água</span>` : ''}
                </div>
                <p class="mt-3">${course.description}</p>
              </div>
              
              <!-- Lista Rolável do Roteiro -->
              <div class="col-lg-4">
                <div class="rounded-3 p-3 h-100">
                  <h5 class="mb-3">Roteiro Detalhado</h5>
                  <div class="route-scrollable" style="max-height: 400px; overflow-y: auto;">
                    <ul class="list-group">
                      ${course.route.map(point => `
                        <li class="list-group-item d-flex justify-content-start align-items-start">
                        <span class="badge bg-primary me-3">${point.split(':')[0]}</span>
                  ${point.split(':')[1]}
                          
                        </li>
                      `).join('')}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function initCourseTabs() {
  // Inicializa os tooltips (opcional)
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
}

// Atualiza botões dinâmicos conforme o período do evento
function updateDynamicButtons() {
  const agora = new Date();
  const menuContainer = document.getElementById("header-button");
  const homeContainer = document.getElementById("home-button");

  let buttonConfig = null;

  if (agora >= dates.registrationStart && agora <= dates.registrationEnd) {
    buttonConfig = eventData.buttons.register;
  } else if (agora > dates.registrationEnd && agora <= dates.eventDate) {
    buttonConfig = eventData.buttons.kit;
  } else if (agora > dates.eventDate) {
    buttonConfig = eventData.buttons.photos;
  } else if (eventData.regulation.show) {
    buttonConfig = eventData.buttons.regulation;
  }

  const buttonHtml = buttonConfig ? `
    <a href="javascript:;" onclick="scrollToSection('${buttonConfig.target}')"
      class="btn btn-primary text-white btn-lg rounded-3 px-3 text-base fw-semibold leading-6"
      style="min-width: 150px;">
      ${buttonConfig.text}
    </a>
  ` : '';

  if (menuContainer) menuContainer.innerHTML = buttonHtml;
  if (homeContainer) homeContainer.innerHTML = buttonHtml;
}

// Exibe a data do evento ou contagem regressiva
function updateDateOrCountdown() {
  const dataEventoEl = document.getElementById("data-evento");
  if (!dataEventoEl) return;

  const agora = new Date();

  function formatarDataExtensa(data) {
    const meses = ["JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO",
      "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"];
    return `${data.getDate()} DE ${meses[data.getMonth()]} DE ${data.getFullYear()}`;
  }

  function atualizarCountdown() {
    const diff = dates.eventDate - new Date();
    if (diff <= 0) {
      clearInterval(interval);
      dataEventoEl.textContent = "Evento finalizado!";
      return;
    }

    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diff / (1000 * 60)) % 60);
    const segundos = Math.floor((diff / 1000) % 60);

    if (dias == 0) {
      dataEventoEl.innerHTML = `<span class="text-success"> ${horas} Horas ${minutos} m ${segundos} s</span>`;
    }
    else if (dias == 0 && horas == 0 && minutos == 0) {
      dataEventoEl.innerHTML = `<span class="text-success"> ${segundos} segundos</span>`;
    }
    else if (dias == 0 && horas == 0) {
      dataEventoEl.innerHTML = `${minutos} minutos ${segundos} segundos`;
    } else {
      dataEventoEl.innerHTML = `${dias}Dias <span class="text-success"> ${horas} Horas ${minutos} m ${segundos} s</span>`;
    }
  }

  if (agora <= dates.registrationEnd) {
    dataEventoEl.textContent = formatarDataExtensa(dates.eventDate);
  } else {
    atualizarCountdown();
    const interval = setInterval(atualizarCountdown, 1000);
  }
}


// Atualiza a seção de inscrição
function updateRegistrationSection() {
  const agora = new Date();
  const wrapper = document.querySelector("#inscricao .row.g-4");
  const statusBox = document.querySelector("#inscricao .text-center .badge");

  if (!wrapper) return;

  if (agora > dates.registrationEnd) {
    statusBox.classList.add("text-danger");
    statusBox.innerHTML = eventData.phrases.status.closed;
    wrapper.classList.add("disabled");
    return;
  }

  if (agora < dates.registrationStart) {
    statusBox.classList.add("text-info");
    statusBox.innerHTML = eventData.phrases.status.soon;
    wrapper.classList.add("disabled");
    return;
  }

  // Renderiza os locais de inscrição
  wrapper.classList.remove("disabled");
  wrapper.innerHTML = `
    <div class="col-lg-4">
      <div class="nav nav-pills d-flex justify-content-between w-100 h-100 me-4">
        ${eventData.registrationLocations.map((local, i) => `
          <button class="nav-link w-100 d-flex align-items-center text-white border p-4 mb-4 ${i === 0 ? 'active' : ''}"
            data-bs-toggle="pill" data-bs-target="#tab-pane-${i}" type="button">
            <span class="h5 m-0"><i class="fa fa-check text-white me-3"></i>${local.name}</span>
          </button>
        `).join("")}
      </div>
    </div>
    <div class="col-lg-8">
      <div class="tab-content w-100">
        ${eventData.registrationLocations.map((local, i) => `
          <div class="tab-pane fade ${i === 0 ? 'show active' : ''}" id="tab-pane-${i}">
            <div class="row g-4">
              ${local.logo ? `
                <div class="col-md-6" style="min-height: 350px;">
                  <div class="position-relative h-100 align-content-center rounded bg-dark">
                    <img src="${local.logo}" class="object-fit-contain rounded w-100 h-100" alt="${local.name}">
                  </div>
                </div>
              ` : `
                <div class="col-md-6" style="min-height: 350px;">
                  <div class="position-relative h-100">${local.map || ''}</div>
                </div>
              `}
              <div class="col-md-6">
                <p class="mb-1 h3">${local.name}</p>
                <p class="mb-3">${local.description || ''}</p>
                ${local.prices ? `<p class="mb-1 h3">Valores</p>
                  ${local.prices.map(val => `<p><i class="fa fa-check text-primary me-3"></i>${val}</p>`).join("")}` : ""}
                ${local.hours ? `<p class="mb-1 h3">Horários</p>
                  ${local.hours.map(h => `<p><i class="fa fa-clock text-primary me-3"></i>${h}</p>`).join("")}` : ""}
                ${local.link ? `<a class="btn btn-primary btn-lg mt-3" href="${local.link}" target="_blank">Inscrição</a>` : ""}
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;

  statusBox.classList.remove("text-danger", "text-info");
  statusBox.classList.add("text-success");
  statusBox.innerHTML = eventData.phrases.status.open;
}

// Funções auxiliares (implementações similares para outras seções)
function updateRegistrationPhrase() {
  const fraseEl = document.getElementById("inscricao-frase");
  if (!fraseEl) return;

  const agora = new Date();
  let texto = "";

  if (agora < dates.registrationStart) {
    texto = eventData.phrases.registration.before;
  } else if (agora >= dates.registrationStart && agora <= dates.registrationEnd) {
    texto = eventData.phrases.registration.during;
  } else if (agora > dates.registrationEnd && agora <= dates.eventDate) {
    texto = eventData.phrases.registration.after;
  } else if (agora > dates.eventDate) {
    texto = eventData.phrases.registration.finished;
  }

  fraseEl.textContent = texto;
}

function updateRegulationPhrase() {
  const agora = new Date();
  const fraseEl = document.getElementById("inscricao-regulamento");
  if (eventData.regulation.show === false) {
    if (fraseEl) fraseEl.innerHTML = "Segura o coração que logo teremos novidades!";
  } else if (eventData.regulation.url && eventData.regulation.name) {
    if (fraseEl) fraseEl.innerHTML = `Regulamento disponível no site <a href=\"${eventData.regulation.url}" target=\"_blank\" class=\"text-decoration-none\">${eventData.regulation.name}</a>`;
  } else {
    if (fraseEl) fraseEl.innerHTML = "Segura o coração que logo teremos novidades!";

  }


}

function loadPhotos() {
  const container = document.getElementById("fotografias-container");
  if (!container) return;

  container.innerHTML = eventData.photos.map(evento => `
    <div class="col-12">
      <div class="card bg-transparent text-center border-0">
        <div class="card-body">
          <h4 class="card-title mb-3">${evento.name}</h4>
          <div class="row g-3 justify-content-center">
            ${evento.photographers.map(foto => `
              <div class="col-10 col-md-6 col-lg-4 py-3" data-aos-delay="400" data-aos="zoom-in" data-aos-duration="500">
                <div class="rounded-3 bg-white">
                  <div class="ratio ratio-21x9">
                    <img src="${foto.imageUrl}" class="object-fit-contain rounded-3 p-2" alt="${foto.name}" loading="lazy">
                  </div>
                </div>
                <a href="${foto.url}" target="_blank" class="btn btn-primary btn-lg text-base w-100 my-3">${foto.name}</a>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    </div>
  `).join("");
}

function renderKits() {
  const container = document.getElementById("kits-container");
  if (!container) return;

  // Encontra itens comuns entre os kits
  function getCommonItems(kits) {
    if (kits.length === 0) return [];
    return kits.reduce((comuns, kit) =>
      comuns.filter(item => kit.items.includes(item)),
      kits[0].items);
  }

  const itensComuns = getCommonItems(eventData.kits);

  container.innerHTML = `
    <div class="row row-cols-1 row-cols-xl-3 gy-5 gx-xl-4 mt-1 justify-content-center">
      ${eventData.kits.map((kit, index) => `
        <div class="col">
          <div class="max-w-xl mx-auto mx-xl-0 bg-body-tertiary rounded-3" 
               data-aos-delay="${(index + 1) * 100}" data-aos="fade-up" data-aos-duration="1000">
            <div class="ratio" style="--bs-aspect-ratio: 66.66%;">
              <img src="${kit.image}" class="object-fit-cover rounded-top-3" alt="${kit.name}" loading="lazy">
            </div>
            <div class="p-3 text-center">
              <p class="m-0 mt-4 mb-2 text-body-emphasis text-lg leading-6 fw-semibold h3">${kit.name.toUpperCase()}</p>
              <p class="card-title pricing-card-title text-center h1">
                <span class="text-muted h5">R$</span>${kit.price.replace('R$', '').trim()}
              </p>
              <ul class="list-unstyled mt-3 mb-4">
                ${kit.items.map(item => `
                  <li class="${!itensComuns.includes(item) ? 'fw-bold' : ''}">${item}</li>
                `).join("")}
              </ul>
              ${kit.note ? `
                <p class="text-info text-center">
                  <small><i class="fa fa-info-circle"></i> ${kit.note}</small>
                </p>` : `<p class="text-info text-center">&nbsp;</p>`}
            </div>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function renderKitPickup() {
  const container = document.getElementById("entrega-kits-container");
  if (!container) return;

  if (!eventData.kitPickup.show) {
    container.innerHTML = `
      <div class="align-content-center bg-dark flex-column flex-md-row mt-5 mb-3 text-center p-5 rounded-3">
        <div class="">
          <h3 class="fw-semibold">Informações em breve</h3>
          <p class="text-muted">Aguarde detalhes sobre a retirada dos kits.</p>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="mt-5">
      ${eventData.kitPickup.notice ? `<div class="title-section"><p>${eventData.kitPickup.notice}</p></div>` : ""}
      <div class="row mt-2 justify-content-center">
        <div class="col-md-12 col-lg-8">
          ${eventData.kitPickup.events.map(evento => `
            <div class="event d-flex align-items-center bg-dark flex-column flex-md-row mb-3">
              <div class="event-date circle mb-3 m-md-1">
                <div class="day">${evento.day}</div>
                <div class="month">${evento.month}</div>
              </div>
              <div class="event-info text-center text-md-start">
                <div class="event-title">${evento.weekday} | <span class="event-time">${evento.time}</span></div>
                <div class="event-location h5 mt-1 mb-0">${evento.locationTitle}</div>
                <div>${evento.address}</div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `;
}

function renderChecklist() {
  const container = document.getElementById("checklist-entrega-container");
  if (!container || !eventData.checklist.show) return;

  container.innerHTML = `
    <div class="row mt-5" data-aos-delay="200" data-aos="fade-up" data-aos-duration="1000">
      <div class="mx-auto text-center">
        <p class="m-0 mt-5 mb-3 text-light-emphasis text-4xl tracking-tight fw-bold title-section border-title-section">
          ${eventData.checklist.title}
        </p>
        ${chunkArray(eventData.checklist.items, 3).map(group => `
          <div class="row mt-5 justify-content-center">
            ${group.map(item => `
              <div class="col-md-4 item mt-sm-4">
                <div class="circle mb-3"><ion-icon name="${item.icon}"></ion-icon></div>
                <h6>${item.title}</h6>
                <p>${item.description || ""}</p>
                ${item.actions ? `
                  <div class="d-flex flex-wrap justify-content-center align-items-center gap-2 mt-2">
                    ${item.actions.map(acao => `
                      <a href="${acao.url}" target="_blank" class="btn btn-primary">
                        <i class="${acao.icon}"></i>&nbsp;${acao.text}
                      </a>
                    `).join("")}
                  </div>` : ""}
              </div>
            `).join("")}
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

// Função auxiliar para dividir array em chunks
function chunkArray(arr, size) {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
}

function updateLocationMap() {
  const iframeLargada = document.getElementById("mapa-largada");
  if (iframeLargada) iframeLargada.src = eventData.location.mapUrl;
  const mapaBgImage = document.getElementById("mapa-bg");
  if (mapaBgImage) mapaBgImage.src = eventData.location.bgImageUrl;
}

function updateInstagramPost() {
  const instagramPost = document.getElementById("instagram-post-link");
  const instagramLink = document.getElementById("instagram-link");

  if (instagramLink) {
    instagramLink.href = eventData.social.instagram.profileUrl;
    instagramLink.textContent = eventData.social.instagram.name;
  }

  if (instagramPost && eventData.social.instagram.postUrl) {
    instagramPost.href = eventData.social.instagram.postUrl;
    if (window.instgrm) window.instgrm.Embeds.process();
  }
}

function renderFAQs() {
  const container = document.getElementById("perguntas-frequentes");
  if (!container) return;

  // Processa as FAQs antes de renderizar
  const processedFAQs = processFAQs();

  container.innerHTML = processedFAQs.map((item, index) => {
    const collapseId = `faq-collapse-${index}`;
    const delay = 300 + index * 50;

    return `
      <div class="accordion-item pb-4" data-aos-delay="${delay}" data-aos="fade-up" data-aos-duration="1000"
           style="border-top: var(--bs-accordion-border-width) solid var(--bs-accordion-border-color);">
        <h3 class="accordion-header">
          <button
            class="accordion-button align-items-start p-0 pt-4 text-body-emphasis leading-7 text-base shadow-none collapsed fw-semibold"
            type="button" data-bs-toggle="collapse" data-bs-target="#${collapseId}"
            aria-expanded="false" aria-controls="${collapseId}">
            ${item.question}
          </button>
        </h3>
        <div id="${collapseId}" class="accordion-collapse collapse"
             data-bs-parent="#perguntas-frequentes">
          <div class="accordion-body p-0 pe-5 mx-0 mb-0 mt-2 text-body-secondary leading-7 text-base">
            ${item.answer}
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// Nova função para processar as FAQs
function processFAQs() {
  // Formata a data de fim de inscrição
  const registrationEnd = new Date(eventData.dates.registrationEnd);
  const formattedRegistrationEnd = `${registrationEnd.getDate()} de ${getMonthName(registrationEnd.getMonth())} de ${registrationEnd.getFullYear()}`;

  // Formata o horário do evento
  const eventDate = new Date(eventData.dates.eventDate);
  const formattedEventTime = eventDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  // Lógica condicional para retirada do kit
  let kitPickupInfo;
  if (eventData.kitPickup.show) {
    kitPickupInfo = "";
    eventData.kitPickup.events.forEach(event => {
      kitPickupInfo += `<strong>${event.weekday}</strong> (${event.day} de ${event.month}): ${event.time}<br>
                           <strong>Local:</strong> ${event.locationTitle}<br>
                           <strong>Endereço:</strong> ${event.address}<br><br>`;
    });
    if (eventData.kitPickup.notice) {
      kitPickupInfo += `<div class="alert alert-warning">${eventData.kitPickup.notice}</div>`;
    }
  } else {
    kitPickupInfo = "Divulgaremos mais próximo do evento.";
  }

  // Processa cada FAQ
  return eventData.faqs.map(faq => {
    let answer = faq.answer;

    // Substitui os placeholders
    answer = answer.replace("{{registrationEnd}}", formattedRegistrationEnd);
    answer = answer.replace("{{eventTime}}", formattedEventTime);
    answer = answer.replace("{{eventLocation}}", eventData.location.address);
    answer = answer.replace("{{kitPickupInfo}}", kitPickupInfo);
    answer = answer.replace("{{timeLimit}}", eventData.location.timeLimit);

    return {
      question: faq.question,
      answer: answer
    };
  });
}

// Função auxiliar para obter o nome do mês
function getMonthName(monthIndex) {
  const months = [
    "janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
  ];
  return months[monthIndex];
}

function renderOrganizers() {
  const container = document.querySelector(".organizers-container");
  if (!container || !eventData.organizers) return;

  container.innerHTML = `
    <h2 class="text-center text-lg fw-semibold leading-8 text-body-emphasis mt-5 mb-5 relapse-text" 
        data-aos-delay="100" data-aos="fade-up" data-aos-duration="1000">
      ${eventData.organizers.title}
    </h2>
    <div class="row row-cols-2 row-cols-sm-3 row-cols-lg-4 row-cols-xl-5 justify-content-center align-items-center">
      ${eventData.organizers.logos.map(logo => `
        <div class="mx-0 mx-xl-5 mx-sm-1 realizadores" 
             data-aos-delay="200" data-aos="${logo.animation}" data-aos-duration="1000">
          <img src="${logo.src}" class="img-fluid object-fit-contain align-middle" alt="${logo.alt}" loading="lazy">
        </div>
      `).join('')}
    </div>
  `;
}

function renderMainSponsors() {
  const container = document.querySelector(".main-sponsors-container");
  if (!container || !eventData.mainSponsors) return;

  container.innerHTML = `
    <h2 class="text-center text-lg fw-semibold leading-8 text-body-emphasis mt-5 mb-5 relapse-text" 
        data-aos-delay="100" data-aos="fade-up" data-aos-duration="1000">
      ${eventData.mainSponsors.title}
    </h2>
    <div class="row row-cols-2 row-cols-sm-3 row-cols-lg-4 row-cols-xl-5 justify-content-center">
      ${eventData.mainSponsors.logos.map(logo => `
        <div class="mx-0 mx-xl-5 mx-sm-1 realizadores" 
             data-aos-delay="200" data-aos="${logo.animation}" data-aos-duration="1000">
          <img src="${logo.src}" class="img-fluid object-fit-contain" alt="${logo.alt}" loading="lazy">
        </div>
      `).join('')}
    </div>
  `;
}

function renderSponsorsCarousel() {
  const container = document.querySelector(".sponsors-carousel");
  if (!container || !eventData.sponsors) return;

  container.innerHTML = `
    <h2 class="text-center text-lg fw-semibold leading-8 mt-5 mb-5 relapse-text text-white" 
        data-aos-delay="100" data-aos="fade-up" data-aos-duration="1000">
      ${eventData.sponsors.title}
    </h2>
    <div class="row" data-aos-delay="500" data-aos="fade-in" data-aos-duration="1000">
      <div class="logos">
        <div class="logos-slide">
          ${eventData.sponsors.logos.map(logo => `
            <img src="${logo.src}" alt="${logo.alt}" loading="lazy">
          `).join('')}
        </div>
      </div>
    </div>
  `;

  // Clona os logos para criar o efeito de carrossel infinito
  const copy = document.querySelector(".logos-slide").cloneNode(true);
  document.querySelector(".logos").appendChild(copy);
}