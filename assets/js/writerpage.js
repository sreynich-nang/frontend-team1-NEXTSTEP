document.addEventListener("DOMContentLoaded", function() {
    
    const addYearButton = document.getElementById("add-year");
    const yearContainer = document.getElementById("year-container");
    const yearTemplate = document.getElementById("year-template");

    if (addYearButton && yearContainer && yearTemplate) {
        
        let yearCount = 0;

        // function to create and add a new year card
        function createYear() {
            yearCount = yearCount + 1;

            // clone year card template
            const templateContent = yearTemplate.content;
            const yearClone = templateContent.cloneNode(true);

            const yearDiv = yearClone.querySelector(".year");

            const titleText = yearDiv.querySelector(".year-title");
            titleText.textContent = "Year " + yearCount;

            yearDiv.style.position = "relative";

            // add delete button inside the card
            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.className = "btn btn-outline-danger btn-sm";
            deleteButton.style.position = "absolute";
            deleteButton.style.top = "15px";
            deleteButton.style.right = "15px";
            deleteButton.innerHTML = '<i class="bi bi-trash"></i> Delete';

            deleteButton.addEventListener("click", function() {
                yearDiv.remove();
                reindexYears();
            });

            yearDiv.appendChild(deleteButton);
            yearContainer.appendChild(yearDiv);
        }

        // re-number remaining years sequentially
        function reindexYears() {
            const allTitles = yearContainer.querySelectorAll(".year-title");
            yearCount = allTitles.length;
            
            for (let i = 0; i < allTitles.length; i++) {
                allTitles[i].textContent = "Year " + (i + 1);
            }
        }

        createYear();

        // add new year card when button is clicked
        addYearButton.addEventListener("click", function() {
            createYear();
        });
    }

    // Handle the editable navbar brand title
    const editableTitle = document.getElementById("editable-title");
    if (editableTitle) {
        // Load saved title from localStorage
        const savedTitle = localStorage.getItem("workbench-title");
        if (savedTitle) {
            editableTitle.textContent = savedTitle;
        }

        // Save title when editing finishes (on blur)
        editableTitle.addEventListener("blur", () => {
            const currentText = editableTitle.textContent.trim();
            if (currentText) {
                localStorage.setItem("workbench-title", currentText);
            } else {
                // Restore previous title if empty
                editableTitle.textContent = localStorage.getItem("workbench-title") || "My University Life at ITC";
            }
        });

        // Save on pressing "Enter" key
        editableTitle.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                editableTitle.blur();
            }
        });
    }

    // Handle the editable page header title
    const editableHeader = document.getElementById("editable-page-header");
    if (editableHeader) {
        // Determine the localStorage key based on pathname
        const pathname = window.location.pathname;
        let storageKey = "workbench-phase-title";
        let defaultTitle = "";

        if (pathname.includes("p1_storyinventory.html")) {
            storageKey = "workbench-phase-1-title";
            defaultTitle = "Phase 1 : Story Inventory";
        } else if (pathname.includes("p2_narrativetime.html")) {
            storageKey = "workbench-phase-2-title";
            defaultTitle = "Phase 2 : Timeline Configuration";
        } else if (pathname.includes("p3_reflection.html")) {
            storageKey = "workbench-phase-3-title";
            defaultTitle = "Phase 3 : Identity Transformation";
        } else if (pathname.includes("template_writeblogs.html")) {
            storageKey = "workbench-template-title";
            defaultTitle = "Phase 1 : Story Inventory";
        }

        // Load saved header
        const savedHeader = localStorage.getItem(storageKey);
        if (savedHeader) {
            editableHeader.textContent = savedHeader;
        }

        // Save header when editing finishes (on blur)
        editableHeader.addEventListener("blur", () => {
            const currentText = editableHeader.textContent.trim();
            if (currentText) {
                localStorage.setItem(storageKey, currentText);
            } else {
                editableHeader.textContent = localStorage.getItem(storageKey) || defaultTitle;
            }
        });

        // Save on pressing "Enter" key
        editableHeader.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                editableHeader.blur();
            }
        });
    }

    if (window.location.pathname.includes("p1_storyinventory.html")) {
        loadWorkbenchState();
        attachChangeListeners();
    }
});

// State Persistence for Phase 1 Workbench
window.saveWorkbenchState = function() {
    if (!window.location.pathname.includes("p1_storyinventory.html")) return;
    const sections = [];
    document.querySelectorAll('main section.mb-5').forEach(section => {
        // Skip page header section
        if (section.querySelector('#editable-page-header')) return;
        
        const h2El = section.querySelector('h2');
        if (!h2El) return;
        const sectionTitle = h2El.textContent.trim();
        
        const cards = [];
        section.querySelectorAll('.card').forEach(card => {
            const h3El = card.querySelector('h3');
            const textarea = card.querySelector('textarea');
            const descEl = card.querySelector('.card-desc');
            if (h3El && textarea) {
                cards.push({
                    title: h3El.textContent.trim(),
                    text: textarea.value,
                    desc: descEl ? descEl.textContent.trim() : ''
                });
            }
        });
        sections.push({ title: sectionTitle, cards: cards });
    });
    localStorage.setItem('workbench-p1-sections', JSON.stringify(sections));
};

window.loadWorkbenchState = function() {
    const saved = localStorage.getItem('workbench-p1-sections');
    if (!saved) return;
    
    try {
        const sections = JSON.parse(saved);
        if (!sections || sections.length === 0) return;
        
        const mainContainer = document.querySelector('main .container');
        if (!mainContainer) return;
        
        // Remove existing dynamic sections
        mainContainer.querySelectorAll('section.mb-5').forEach(sec => {
            if (!sec.querySelector('#editable-page-header')) {
                sec.remove();
            }
        });
        
        sections.forEach(secData => {
            let sectionTitle = secData.title;
            if (sectionTitle === "Section 1") {
                sectionTitle = "Section 1: Starting Point";
            }
            const sectionHtml = `
            <section class="mb-5 border rounded p-4 bg-white shadow-sm">
              <div class="d-flex justify-content-between align-items-start mb-4">
                <div>
                  <div class="d-inline-flex align-items-center mb-1">
                    <h2 class="me-0 mb-0" contenteditable="true" style="outline: none; border-bottom: 1px dashed #ced4da; cursor: text;" title="Click to edit">${sectionTitle}</h2>
                    <i class="bi bi-pencil-fill ms-2" style="font-size: 0.9rem; cursor: pointer; color: var(--primary-hover);" title="Click to edit"></i>
                  </div>
                  <p class="text-muted small mb-0">Goal: Understand your personal transformation through key miltestones</p>
                </div>
                <div class="btn-group">
                  <button class="btn btn-sm btn-outline-primary me-2" onclick="addCardToSection(this)" title="Add Card">
                    <i class="bi bi-plus-circle"></i> Add Card
                  </button>
                  <button class="btn btn-sm btn-outline-secondary me-2" onclick="duplicateSection(this)" title="Duplicate Section">
                    <i class="bi bi-copy"></i> Duplicate
                  </button>
                  <button class="btn btn-sm btn-outline-danger" onclick="deleteSection(this)" title="Delete Section">
                    <i class="bi bi-trash"></i> Delete
                  </button>
                </div>
              </div>

              <div class="row g-4">
                ${secData.cards.map(cardData => {
                    const isOneScene = cardData.title.toLowerCase() === 'one scene';
                    const colClass = isOneScene ? 'col-12' : 'col-md-6';
                    const rows = isOneScene ? '8' : '6';
                    
                    const cardDesc = cardData.desc || (
                        cardData.title.toLowerCase().includes('entering') ? 'First impressions and feelings when starting university.' :
                        cardData.title.toLowerCase().includes('decision') ? 'Key choices you made during your academic path.' :
                        cardData.title.toLowerCase().includes('expectation') ? 'What you anticipated versus your actual experiences.' :
                        cardData.title.toLowerCase().includes('who were you') ? 'Reflect on your character and mindset at the beginning.' :
                        cardData.title.toLowerCase().includes('one scene') ? 'A specific, memorable moment that defines your journey.' : ''
                    );
                    const descHtml = cardDesc ? `<p class="text-muted small mb-2 card-desc fst-italic">${cardDesc}</p>` : '';
                    
                    return `
                    <div class="${colClass}">
                      <div class="card h-100">
                        <div class="card-body">
                          <div class="d-flex justify-content-between align-items-center mb-2">
                            <div class="d-inline-flex align-items-center">
                              <h3 class="me-0 mb-0" contenteditable="true" style="outline: none; border-bottom: 1px dashed #ced4da; cursor: text;" title="Click to edit">${cardData.title}</h3>
                              <i class="bi bi-pencil-fill ms-2" style="font-size: 0.8rem; cursor: pointer; color: var(--primary-hover);" title="Click to edit"></i>
                            </div>
                            <div class="d-flex gap-2">
                              <button class="btn btn-link text-secondary p-0" onclick="duplicateCard(this)" title="Duplicate Card">
                                <i class="bi bi-copy"></i>
                              </button>
                              <button class="btn btn-link text-danger p-0" onclick="deleteCard(this)" title="Delete Card">
                                <i class="bi bi-trash"></i>
                              </button>
                            </div>
                          </div>
                          ${descHtml}
                          <textarea class="form-control" rows="${rows}" placeholder="Write your things here ...">${cardData.text}</textarea>
                        </div>
                      </div>
                    </div>
                    `;
                }).join('')}
              </div>
            </section>
            `;
            mainContainer.insertAdjacentHTML('beforeend', sectionHtml);
        });
    } catch (e) {
        console.error("Error restoring workbench state:", e);
    }
};

window.attachChangeListeners = function() {
    document.querySelectorAll('main textarea').forEach(textarea => {
        textarea.removeEventListener('input', saveWorkbenchState);
        textarea.addEventListener('input', saveWorkbenchState);
    });
    
    document.querySelectorAll('main h2, main h3').forEach(header => {
        header.removeEventListener('blur', saveWorkbenchState);
        header.addEventListener('blur', saveWorkbenchState);
        
        header.removeEventListener('keydown', headerEnterSave);
        header.addEventListener('keydown', headerEnterSave);
    });
};

function headerEnterSave(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        e.target.blur();
    }
}

// Card and Section Actions (Duplicate/Delete/Add)
window.duplicateCard = function(button) {
    const cardCol = button.closest('.col-md-6, .col-12');
    if (!cardCol) return;
    const clone = cardCol.cloneNode(true);
    
    // Clear textarea value in duplicate
    const textarea = clone.querySelector('textarea');
    if (textarea) textarea.value = '';
    
    // Insert after the original card
    cardCol.parentNode.insertBefore(clone, cardCol.nextSibling);
    
    attachChangeListeners();
    saveWorkbenchState();
};

window.deleteCard = function(button) {
    const cardCol = button.closest('.col-md-6, .col-12');
    if (cardCol) {
        if (confirm("Are you sure you want to delete this card?")) {
            cardCol.remove();
            saveWorkbenchState();
        }
    }
};

window.duplicateSection = function(button) {
    const section = button.closest('section');
    if (!section) return;
    const clone = section.cloneNode(true);
    
    // Reset textarea values in duplicated section
    const textareas = clone.querySelectorAll('textarea');
    textareas.forEach(t => t.value = '');
    
    // Insert after original section
    section.parentNode.insertBefore(clone, section.nextSibling);
    
    attachChangeListeners();
    saveWorkbenchState();
};

window.deleteSection = function(button) {
    const section = button.closest('section');
    if (section) {
        if (confirm("Are you sure you want to delete this entire section?")) {
            section.remove();
            saveWorkbenchState();
        }
    }
};

window.addCardToSection = function(button) {
    const section = button.closest('section');
    if (!section) return;
    const row = section.querySelector('.row.g-4');
    if (!row) return;
    
    // Create new card column (defaults to 50% width)
    const newCol = document.createElement('div');
    newCol.className = 'col-md-6';
    newCol.innerHTML = `
      <div class="card h-100">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <div class="d-inline-flex align-items-center">
              <h3 class="me-0 mb-0" contenteditable="true" style="outline: none; border-bottom: 1px dashed #ced4da; cursor: text;" title="Click to edit">New Card</h3>
              <i class="bi bi-pencil-fill ms-2" style="font-size: 0.8rem; cursor: pointer; color: var(--primary-hover);" title="Click to edit"></i>
            </div>
            <div class="d-flex gap-2">
              <button class="btn btn-link text-secondary p-0" onclick="duplicateCard(this)" title="Duplicate Card">
                <i class="bi bi-copy"></i>
              </button>
              <button class="btn btn-link text-danger p-0" onclick="deleteCard(this)" title="Delete Card">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
          <p class="text-muted small mb-2 card-desc fst-italic">Anything you wanna add more ...</p>
          <textarea class="form-control" rows="6" placeholder="Write your things here ..."></textarea>
        </div>
      </div>
    `;
    row.appendChild(newCol);
    
    attachChangeListeners();
    saveWorkbenchState();
};
