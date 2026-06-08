// Baseline structural default dataset parameters to populate application state storage space fallback
const defaultEvents = [
    { id: 1717600000001, name: "Generative AI Systems Bootcamp", date: "2026-06-18T10:00", category: "ai-ml", description: "Build real-time dashboards mapping dynamic vector embedding structures via Python pipelines, Streamlit elements, and Gemini model contexts." },
    { id: 1717600000002, name: "ByteCraft Hackathon Pipeline", date: "2026-07-02T09:00", category: "development", description: "A high-intensity 24-hour programming gauntlet mapping functional prototyping architectures to enterprise automation scenarios." },
    { id: 1717600000003, name: "DefCon: Offensive Security Matrix", date: "2026-07-15T14:30", category: "cybersecurity", description: "Evaluate perimeter mitigation frameworks, trace packet routing variables, parse system vulnerabilities, and implement advanced firewalls." }
];

// Initialize State Vector Storage Environment
let applicationState = JSON.parse(localStorage.getItem('foces_events_stream')) || [...defaultEvents];

// DOM Selectors
const dynamicGrid = document.getElementById('dynamicGrid');
const emptyFallback = document.getElementById('emptyFallback');
const extendedSearch = document.getElementById('extendedSearch');
const categorySelector = document.getElementById('categorySelector');

// Initial Window Bootstrap Trigger
window.addEventListener('DOMContentLoaded', () => {
    orchestrateUIRender(applicationState);
    initiateCountdownTracker();
    
    // Wire Input Event Listeners
    extendedSearch.addEventListener('input', runPipelineFiltering);
    categorySelector.addEventListener('change', runPipelineFiltering);
});

// Render Component Algorithm
function orchestrateUIRender(dataset) {
    dynamicGrid.innerHTML = '';
    
    if (!dataset || dataset.length === 0) {
        dynamicGrid.classList.add('hidden');
        emptyFallback.classList.remove('hidden');
        return;
    }
    
    dynamicGrid.classList.remove('hidden');
    emptyFallback.classList.add('hidden');

    dataset.forEach(item => {
        const readableDate = new Date(item.date).toLocaleString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });

        const badgeConfigs = getCategoryBadgeMeta(item.category);

        const eventCardHTML = `
            <div class="bg-white rounded-2xl border border-slate-200/70 p-6 flex flex-col justify-between card-glow transition-all duration-300 relative group">
                <button onclick="purgeEventEntry(${item.id})" class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 text-slate-300 hover:text-rose-500 transition-all text-sm p-1" title="Purge Record">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
                <div>
                    <div class="flex items-center gap-2 mb-3.5">
                        <span class="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md ${badgeConfigs.color}">
                            ${badgeConfigs.label}
                        </span>
                    </div>
                    <h3 class="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug tracking-tight mb-2">
                        ${item.name}
                    </h3>
                    <div class="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-4 font-mono">
                        <i class="fa-regular fa-calendar-check text-blue-500"></i>
                        <span>${readableDate}</span>
                    </div>
                    <p class="text-slate-500 text-sm leading-relaxed text-justify">
                        ${item.description}
                    </p>
                </div>
                <div class="pt-6">
                    <button onclick="triggerRegistrationAction('${item.name}')" class="w-full bg-slate-50 group-hover:bg-blue-600 text-slate-700 group-hover:text-white font-semibold py-2.5 rounded-xl text-xs transition-all duration-300 flex items-center justify-center gap-2 border border-slate-200/60 group-hover:border-transparent cursor-pointer shadow-xs">
                        <span>Register Framework</span>
                        <i class="fa-solid fa-arrow-right text-[10px] transform group-hover:translate-x-1 transition-transform"></i>
                    </button>
                </div>
            </div>
        `;
        dynamicGrid.insertAdjacentHTML('beforeend', eventCardHTML);
    });
}

// Meta Helper Object Utility
function getCategoryBadgeMeta(category) {
    switch(category) {
        case 'ai-ml': return { label: '🤖 AI & ML Space', color: 'bg-purple-50 text-purple-600 border border-purple-100' };
        case 'development': return { label: '💻 Web-App Dev', color: 'bg-amber-50 text-amber-600 border border-amber-100' };
        case 'cybersecurity': return { label: '🛡️ Cyber Sec', color: 'bg-rose-50 text-rose-600 border border-rose-100' };
        default: return { label: '⚙️ Technical Space', color: 'bg-slate-50 text-slate-600 border border-slate-100' };
    }
}

// State Filtering Engine
function runPipelineFiltering() {
    const query = extendedSearch.value.toLowerCase();
    const targetScope = categorySelector.value;

    const streamMatches = applicationState.filter(event => {
        const textMatch = event.name.toLowerCase().includes(query) || event.description.toLowerCase().includes(query);
        const typeMatch = targetScope === 'all' || event.category === targetScope;
        return textMatch && typeMatch;
    });

    orchestrateUIRender(streamMatches);
}

// Append New Data Struct Event Action
function createNewEvent(e) {
    e.preventDefault();
    
    const newRecord = {
        id: Date.now(),
        name: document.getElementById('formName').value,
        date: document.getElementById('formDate').value,
        category: document.getElementById('formCategory').value,
        description: document.getElementById('formDesc').value
    };

    applicationState.unshift(newRecord);
    commitStateToMemory();
    
    // Reset and Close Views
    document.getElementById('newEventForm').reset();
    toggleModal('eventModal', false);
    
    // Notify Interaction Complete
    triggerUINotification(`<i class="fa-solid fa-square-plus text-emerald-400"></i> Added "${newRecord.name}" successfully!`);
    orchestrateUIRender(applicationState);
    initiateCountdownTracker();
}

// Purge Structural Elements
function purgeEventEntry(targetId) {
    applicationState = applicationState.filter(record => record.id !== targetId);
    commitStateToMemory();
    triggerUINotification(`<i class="fa-solid fa-trash-can text-rose-400"></i> Event record has been deleted.`);
    orchestrateUIRender(applicationState);
    initiateCountdownTracker();
}

// Reset System Filters
function resetFilters() {
    extendedSearch.value = '';
    categorySelector.value = 'all';
    orchestrateUIRender(applicationState);
}

// Commit State to Storage
function commitStateToMemory() {
    localStorage.setItem('foces_events_stream', JSON.stringify(applicationState));
}

// Modal View Mutator Toggles
function toggleModal(modalId, makeVisible) {
    const targetElement = document.getElementById(modalId);
    const innerCard = targetElement.firstElementChild;
    if (makeVisible) {
        targetElement.classList.remove('opacity-0', 'pointer-events-none');
        innerCard.classList.remove('scale-95');
    } else {
        targetElement.classList.add('opacity-0', 'pointer-events-none');
        innerCard.classList.add('scale-95');
    }
}

// Dynamic System Countdown Mechanism Logic Engine
function initiateCountdownTracker() {
    const cName = document.getElementById('countdownName');
    const cDisplay = document.getElementById('countdownDisplay');
    
    // Compute sorted arrays for chronologically closest upcoming deadlines
    const upcoming = applicationState
        .filter(e => new Date(e.date).getTime() > Date.now())
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    if(upcoming.length === 0) {
        cName.innerText = "No upcoming tracks found.";
        cDisplay.innerText = "00d 00h 00m";
        return;
    }

    const urgentTarget = upcoming[0];
    cName.innerText = urgentTarget.name;

    // Refresh display matrix logic every minute dynamically via context loop
    if (window.activeCountdownInterval) clearInterval(window.activeCountdownInterval);

    function updateMetrics() {
        const temporalDelta = new Date(urgentTarget.date).getTime() - Date.now();
        if(temporalDelta <= 0) {
            initiateCountdownTracker();
            return;
        }
        const d = Math.floor(temporalDelta / (1000 * 60 * 60 * 24));
        const h = Math.floor((temporalDelta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((temporalDelta % (1000 * 60 * 60)) / (1000 * 60));
        cDisplay.innerText = `${d}d ${h.toString().padStart(2, '0')}h ${m.toString().padStart(2, '0')}m`;
    }
    
    updateMetrics();
    window.activeCountdownInterval = setInterval(updateMetrics, 60000);
}

// Interface Action Response Trigger System
function triggerRegistrationAction(name) {
    triggerUINotification(`<i class="fa-solid fa-circle-check text-blue-400"></i> Seat request captured for ${name}!`);
}

function triggerUINotification(htmlMessage) {
    const notificationContainer = document.getElementById('toastNotification');
    document.getElementById('toastMessage').innerHTML = htmlMessage;
    
    notificationContainer.classList.remove('translate-y-20', 'opacity-0');
    
    setTimeout(() => {
        notificationContainer.classList.add('translate-y-20', 'opacity-0');
    }, 4000);
}
