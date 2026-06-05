// Sample dataset containing technical events
const eventsData = [
    {
        id: 1,
        name: "AI & Generative Models Hands-On Bootcamp",
        date: "June 18, 2026",
        category: "ai-ml",
        description: "Dive deep into building dashboards and applications using Python, Streamlit, and modern GenAI SDK architectures.",
        tag: "Workshop",
        tagColor: "bg-purple-100 text-purple-700"
    },
    {
        id: 2,
        name: "ByteCraft National Hackathon 2026",
        date: "July 02, 2026",
        category: "development",
        description: "A grueling 24-hour development challenge to solve real-world problems. Great prizes and mentorship pipelines await.",
        tag: "Hackathon",
        tagColor: "bg-amber-100 text-amber-700"
    },
    {
        id: 3,
        name: "DefCon Campus: Network Security Basics",
        date: "July 15, 2026",
        category: "cybersecurity",
        description: "Master the basics of computer networks, system administration, defensive firewalls, and exploring tracking vulnerabilities.",
        tag: "Seminar",
        tagColor: "bg-rose-100 text-rose-700"
    }
];

// DOM Element Selectors
const eventsGrid = document.getElementById('eventsGrid');
const searchInput = document.getElementById('searchInput');
const filterCategory = document.getElementById('filterCategory');
const noEvents = document.getElementById('noEvents');
const regModal = document.getElementById('regModal');
const modalCard = document.getElementById('modalCard');
const modalEventName = document.getElementById('modalEventName');

// Render Function
function displayEvents(events) {
    eventsGrid.innerHTML = '';
    
    if (events.length === 0) {
        eventsGrid.classList.add('hidden');
        noEvents.classList.remove('hidden');
        return;
    }
    
    eventsGrid.classList.remove('hidden');
    noEvents.classList.add('hidden');

    events.forEach(event => {
        const cardHTML = `
            <div class="bg-white rounded-xl shadow-xs border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col">
                <div class="p-6 flex-grow">
                    <div class="flex justify-between items-start gap-2 mb-3">
                        <span class="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${event.tagColor}">
                            ${event.tag}
                        </span>
                        <div class="text-gray-400 hover:text-indigo-600 transition-colors cursor-pointer">
                            <i class="fa-regular fa-bookmark"></i>
                        </div>
                    </div>
                    <h3 class="text-lg font-bold text-gray-900 mb-2 leading-snug hover:text-blue-600 transition-colors cursor-pointer">
                        ${event.name}
                    </h3>
                    <div class="flex items-center gap-2 text-xs font-medium text-gray-500 mb-4">
                        <i class="fa-regular fa-calendar text-blue-500"></i>
                        <span>${event.date}</span>
                    </div>
                    <p class="text-gray-600 text-sm leading-relaxed">
                        ${event.description}
                    </p>
                </div>
                <div class="px-6 pb-6 pt-2">
                    <button onclick="handleRegister('${event.name}')" 
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors duration-200 flex items-center justify-center gap-2 shadow-xs cursor-pointer">
                        <span>Register Now</span>
                        <i class="fa-solid fa-arrow-right text-xs"></i>
                    </button>
                </div>
            </div>
        `;
        eventsGrid.insertAdjacentHTML('beforeend', cardHTML);
    });
}

// Search and Filter Logic
function filterEvents() {
    const searchTerm = searchInput.value.toLowerCase();
    const activeCategory = filterCategory.value;

    const filtered = eventsData.filter(event => {
        const matchesSearch = event.name.toLowerCase().includes(searchTerm) || 
                              event.description.toLowerCase().includes(searchTerm);
        const matchesCategory = activeCategory === 'all' || event.category === activeCategory;
        
        return matchesSearch && matchesCategory;
    });

    displayEvents(filtered);
}

// Event Listeners for Filters
searchInput.addEventListener('input', filterEvents);
filterCategory.addEventListener('change', filterEvents);

// Modal Operations
function handleRegister(eventName) {
    modalEventName.innerText = `Registered for ${eventName}!`;
    regModal.classList.remove('opacity-0', 'pointer-events-none');
    modalCard.classList.remove('scale-95');
    modalCard.classList.add('scale-100');
}

function closeModal() {
    regModal.classList.add('opacity-0', 'pointer-events-none');
    modalCard.classList.remove('scale-100');
    modalCard.classList.add('scale-95');
}

// Initial Render
window.addEventListener('DOMContentLoaded', () => displayEvents(eventsData));