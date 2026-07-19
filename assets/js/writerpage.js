document.addEventListener("DOMContentLoaded", function() {
    
    // Global variable to store attachment component HTML template
    window.uploadComponentHtml = '';

    // Helper function to add attachment items visually below the badges
    window.addAttachmentItem = function(cardOrYearDiv, attachment, deleteCallback) {
        const itemsContainer = cardOrYearDiv.querySelector('.uploaded-items-container');
        if (!itemsContainer) return;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'attachment-item position-relative border rounded p-2 d-flex align-items-center bg-light';
        itemDiv.style.width = 'fit-content';
        itemDiv.style.maxWidth = '250px';
        itemDiv.dataset.type = attachment.type;
        itemDiv.dataset.name = attachment.name;
        itemDiv.dataset.data = attachment.data;

        if (attachment.type === 'image') {
            itemDiv.innerHTML = `
                <img src="${attachment.data}" class="rounded me-2" style="width: 32px; height: 32px; object-fit: cover;" />
                <span class="text-truncate me-2" style="max-width: 150px; font-size: 0.8rem;" title="${attachment.name}">${attachment.name}</span>
                <button type="button" class="btn-close ms-auto delete-attachment" style="font-size: 0.6rem; padding: 0.25rem;"></button>
            `;
        } else if (attachment.type === 'file') {
            itemDiv.innerHTML = `
                <span class="material-symbols-outlined text-danger me-2" style="font-size: 20px;">upload_file</span>
                <span class="text-truncate me-2" style="max-width: 150px; font-size: 0.8rem;" title="${attachment.name}">
                    <a href="${attachment.data}" download="${attachment.name}" class="text-decoration-none text-dark fw-medium">${attachment.name}</a>
                </span>
                <button type="button" class="btn-close ms-auto delete-attachment" style="font-size: 0.6rem; padding: 0.25rem;"></button>
            `;
        } else if (attachment.type === 'link') {
            itemDiv.innerHTML = `
                <span class="material-symbols-outlined text-primary me-2" style="font-size: 20px;">add_link</span>
                <span class="text-truncate me-2" style="max-width: 150px; font-size: 0.8rem;" title="${attachment.name}">
                    <a href="${attachment.data}" target="_blank" rel="noopener noreferrer" class="text-decoration-none text-primary fw-medium">${attachment.name}</a>
                </span>
                <button type="button" class="btn-close ms-auto delete-attachment" style="font-size: 0.6rem; padding: 0.25rem;"></button>
            `;
        }

        // Click listener for delete
        itemDiv.querySelector('.delete-attachment').addEventListener('click', function() {
            itemDiv.remove();
            if (deleteCallback) deleteCallback();
        });

        itemsContainer.appendChild(itemDiv);
    };

    // Fetch the upload component dynamically on load
    fetch('upload_3button.html')
        .then(response => response.text())
        .then(html => {
            window.uploadComponentHtml = html;
            
            // Inject into all static placeholders already in the DOM
            document.querySelectorAll('.attachments-placeholder').forEach(placeholder => {
                placeholder.outerHTML = window.uploadComponentHtml;
            });
            
            // Trigger load states once HTML component is fetched
            if (window.location.pathname.includes("p1_storyinventory.html")) {
                loadWorkbenchState();
                attachChangeListeners();
            } else if (window.location.pathname.includes("p2_narrativetime.html")) {
                loadTimelineState();
            } else if (window.location.pathname.includes("p3_reflection.html")) {
                loadReflectionState();
                document.querySelectorAll('main textarea').forEach(textarea => {
                    textarea.addEventListener('input', saveReflectionState);
                });
                const saveProgressButton = document.getElementById("save-progress");
                if (saveProgressButton) {
                    saveProgressButton.addEventListener("click", function() {
                        saveReflectionState();
                        alert("Progress saved successfully!");
                    });
                }
            }
        })
        .catch(err => {
            console.error("Failed to load upload_3button.html component:", err);
            // Fallback load
            if (window.location.pathname.includes("p1_storyinventory.html")) {
                loadWorkbenchState();
                attachChangeListeners();
            } else if (window.location.pathname.includes("p2_narrativetime.html")) {
                loadTimelineState();
            } else if (window.location.pathname.includes("p3_reflection.html")) {
                loadReflectionState();
                document.querySelectorAll('main textarea').forEach(textarea => {
                    textarea.addEventListener('input', saveReflectionState);
                });
                const saveProgressButton = document.getElementById("save-progress");
                if (saveProgressButton) {
                    saveProgressButton.addEventListener("click", function() {
                        saveReflectionState();
                        alert("Progress saved successfully!");
                    });
                }
            }
        });

    const addYearButton = document.getElementById("add-year");
    const yearContainer = document.getElementById("year-container");
    const yearTemplate = document.getElementById("year-template");

    if (addYearButton && yearContainer && yearTemplate) {
        
        let yearCount = 0;

        // function to save timeline state
        function saveTimelineState() {
            const years = [];
            yearContainer.querySelectorAll('.year').forEach(yearDiv => {
                const titleEl = yearDiv.querySelector('.year-title');
                const titleInput = yearDiv.querySelector('input[type="text"]');
                const dateInputs = yearDiv.querySelectorAll('input[type="date"]');
                const descTextarea = yearDiv.querySelector('textarea');
                
                // Get attachments
                const attachments = [];
                yearDiv.querySelectorAll('.attachment-item').forEach(itemDiv => {
                    attachments.push({
                        type: itemDiv.dataset.type,
                        name: itemDiv.dataset.name,
                        data: itemDiv.dataset.data
                    });
                });
                
                if (titleEl) {
                    years.push({
                        heading: titleEl.textContent.trim(),
                        title: titleInput ? titleInput.value : '',
                        startDate: dateInputs.length > 0 ? dateInputs[0].value : '',
                        endDate: dateInputs.length > 1 ? dateInputs[1].value : '',
                        description: descTextarea ? descTextarea.value : '',
                        attachments: attachments
                    });
                }
            });
            localStorage.setItem('workbench-p2-years', JSON.stringify(years));
        }

        // function to create a year with data
        function createYearWithData(data, index) {
            const templateContent = yearTemplate.content;
            const yearClone = templateContent.cloneNode(true);
            const yearDiv = yearClone.querySelector(".year");

            const titleText = yearDiv.querySelector(".year-title");
            titleText.textContent = data.heading || ("Year " + index);

            const titleInput = yearDiv.querySelector('input[type="text"]');
            if (titleInput && data.title !== undefined) titleInput.value = data.title;

            const dateInputs = yearDiv.querySelectorAll('input[type="date"]');
            if (dateInputs.length > 0 && data.startDate !== undefined) dateInputs[0].value = data.startDate;
            if (dateInputs.length > 1 && data.endDate !== undefined) dateInputs[1].value = data.endDate;

            const descTextarea = yearDiv.querySelector('textarea');
            if (descTextarea && data.description !== undefined) descTextarea.value = data.description;

            // Replace attachments placeholder with loaded component HTML
            const placeholder = yearDiv.querySelector('.attachments-placeholder');
            if (placeholder && window.uploadComponentHtml) {
                placeholder.outerHTML = window.uploadComponentHtml;
            }

            // Populate attachments
            if (data.attachments && Array.isArray(data.attachments)) {
                data.attachments.forEach(attachment => {
                    window.addAttachmentItem(yearDiv, attachment, saveTimelineState);
                });
            }

            // wire up delete button inside the card
            const deleteButton = yearDiv.querySelector(".delete-year-btn");
            if (deleteButton) {
                deleteButton.addEventListener("click", function() {
                    yearDiv.remove();
                    reindexYears();
                    saveTimelineState();
                });
            }

            yearContainer.appendChild(yearDiv);
        }

        // function to create and add a new year card
        function createYear() {
            yearCount = yearCount + 1;

            // clone year card template
            const templateContent = yearTemplate.content;
            const yearClone = templateContent.cloneNode(true);

            const yearDiv = yearClone.querySelector(".year");

            const titleText = yearDiv.querySelector(".year-title");
            titleText.textContent = "Year " + yearCount;

            // Replace attachments placeholder with loaded component HTML
            const placeholder = yearDiv.querySelector('.attachments-placeholder');
            if (placeholder && window.uploadComponentHtml) {
                placeholder.outerHTML = window.uploadComponentHtml;
            }

            // wire up delete button inside the card
            const deleteButton = yearDiv.querySelector(".delete-year-btn");
            if (deleteButton) {
                deleteButton.addEventListener("click", function() {
                    yearDiv.remove();
                    reindexYears();
                    saveTimelineState();
                });
            }

            yearContainer.appendChild(yearDiv);
            
            saveTimelineState();
        }

        // re-number remaining years sequentially
        function reindexYears() {
            const allTitles = yearContainer.querySelectorAll(".year-title");
            yearCount = allTitles.length;
            
            for (let i = 0; i < allTitles.length; i++) {
                const currentText = allTitles[i].textContent.trim();
                // Rename only if empty or matches sequential format "Year X"
                if (!currentText || /^Year \d+$/.test(currentText)) {
                    allTitles[i].textContent = "Year " + (i + 1);
                }
            }
        }

        // load saved timeline state
        function loadTimelineState() {
            const saved = localStorage.getItem('workbench-p2-years');
            if (!saved) {
                createYear();
                return;
            }
            
            try {
                const yearsData = JSON.parse(saved);
                if (!yearsData || yearsData.length === 0) {
                    createYear();
                    return;
                }
                
                yearContainer.innerHTML = '';
                yearCount = yearsData.length;
                yearsData.forEach((yearData, index) => {
                    createYearWithData(yearData, index + 1);
                });
            } catch (e) {
                console.error("Error restoring timeline state:", e);
                createYear();
            }
        }

        // add new year card when button is clicked
        addYearButton.addEventListener("click", function() {
            createYear();
        });

        // Event delegation inside yearContainer for button clicks
        yearContainer.addEventListener('click', function(e) {
            const addPhotoBtn = e.target.closest('.add-photo-btn');
            const uploadFileBtn = e.target.closest('.upload-file-btn');
            const addLinkBtn = e.target.closest('.add-link-btn');

            if (addPhotoBtn) {
                const yearDiv = addPhotoBtn.closest('.year');
                const fileInput = yearDiv.querySelector('.add-photo-input');
                if (fileInput) fileInput.click();
            } else if (uploadFileBtn) {
                const yearDiv = uploadFileBtn.closest('.year');
                const fileInput = yearDiv.querySelector('.upload-file-input');
                if (fileInput) fileInput.click();
            } else if (addLinkBtn) {
                const yearDiv = addLinkBtn.closest('.year');
                const url = prompt("Enter link URL (e.g. https://example.com):");
                if (url) {
                    let formattedUrl = url.trim();
                    if (!/^https?:\/\//i.test(formattedUrl)) {
                        formattedUrl = 'https://' + formattedUrl;
                    }
                    addAttachmentItem(yearDiv, { type: 'link', name: formattedUrl, data: formattedUrl });
                    saveTimelineState();
                }
            }
        });

        // Event delegation inside yearContainer for file input changes
        yearContainer.addEventListener('change', function(e) {
            const fileInput = e.target;
            if (fileInput.classList.contains('add-photo-input') || fileInput.classList.contains('upload-file-input')) {
                const file = fileInput.files[0];
                if (!file) return;

                const yearDiv = fileInput.closest('.year');
                const type = fileInput.classList.contains('add-photo-input') ? 'image' : 'file';

                // Check file size (limit to 1.5MB to avoid localStorage quota issues)
                if (file.size > 1500000) {
                    alert("File is too large! Please choose a file smaller than 1.5MB to ensure it can be saved locally.");
                    fileInput.value = ''; // clear input
                    return;
                }

                const reader = new FileReader();
                reader.onload = function(event) {
                    const dataUrl = event.target.result;
                    addAttachmentItem(yearDiv, { type: type, name: file.name, data: dataUrl });
                    saveTimelineState();
                    fileInput.value = ''; // clear input
                };
                reader.readAsDataURL(file);
            }
        });

        // Setup autosave on user inputs inside yearContainer
        yearContainer.addEventListener('input', function() {
            saveTimelineState();
        });
        
        yearContainer.addEventListener('blur', function(e) {
            if (e.target.classList.contains('year-title')) {
                saveTimelineState();
            }
        }, true);

        yearContainer.addEventListener('keydown', function(e) {
            if (e.target.classList.contains('year-title') && e.key === 'Enter') {
                e.preventDefault();
                e.target.blur();
            }
        });

        // Hook up the Save Progress button
        const saveProgressButton = document.getElementById("save-progress");
        if (saveProgressButton) {
            saveProgressButton.addEventListener("click", function() {
                saveTimelineState();
                alert("Progress saved successfully!");
            });
        }
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

        // Event delegation for Phase 1 attachments clicks
        const mainContainer = document.querySelector('main');
        if (mainContainer) {
            mainContainer.addEventListener('click', function(e) {
                const addPhotoBtn = e.target.closest('.add-photo-btn');
                const uploadFileBtn = e.target.closest('.upload-file-btn');
                const addLinkBtn = e.target.closest('.add-link-btn');

                if (addPhotoBtn) {
                    const cardDiv = addPhotoBtn.closest('.card');
                    const fileInput = cardDiv.querySelector('.add-photo-input');
                    if (fileInput) fileInput.click();
                } else if (uploadFileBtn) {
                    const cardDiv = uploadFileBtn.closest('.card');
                    const fileInput = cardDiv.querySelector('.upload-file-input');
                    if (fileInput) fileInput.click();
                } else if (addLinkBtn) {
                    const cardDiv = addLinkBtn.closest('.card');
                    const url = prompt("Enter link URL (e.g. https://example.com):");
                    if (url) {
                        let formattedUrl = url.trim();
                        if (!/^https?:\/\//i.test(formattedUrl)) {
                            formattedUrl = 'https://' + formattedUrl;
                        }
                        window.addAttachmentItem(cardDiv, { type: 'link', name: formattedUrl, data: formattedUrl }, window.saveWorkbenchState);
                        saveWorkbenchState();
                    }
                }
            });

            mainContainer.addEventListener('change', function(e) {
                const fileInput = e.target;
                if (fileInput.classList.contains('add-photo-input') || fileInput.classList.contains('upload-file-input')) {
                    const file = fileInput.files[0];
                    if (!file) return;

                    const cardDiv = fileInput.closest('.card');
                    const type = fileInput.classList.contains('add-photo-input') ? 'image' : 'file';

                    if (file.size > 1500000) {
                        alert("File is too large! Please choose a file smaller than 1.5MB to ensure it can be saved locally.");
                        fileInput.value = '';
                        return;
                    }

                    const reader = new FileReader();
                    reader.onload = function(event) {
                        const dataUrl = event.target.result;
                        window.addAttachmentItem(cardDiv, { type: type, name: file.name, data: dataUrl }, window.saveWorkbenchState);
                        saveWorkbenchState();
                        fileInput.value = '';
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
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
            
            // Get attachments
            const attachments = [];
            card.querySelectorAll('.attachment-item').forEach(itemDiv => {
                attachments.push({
                    type: itemDiv.dataset.type,
                    name: itemDiv.dataset.name,
                    data: itemDiv.dataset.data
                });
            });

            if (h3El && textarea) {
                cards.push({
                    title: h3El.textContent.trim(),
                    text: textarea.value,
                    desc: descEl ? descEl.textContent.trim() : '',
                    attachments: attachments
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
              <div class="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-4">
                <div>
                  <div class="d-inline-flex align-items-center mb-1">
                    <h2 class="fs-4 me-0 mb-0" contenteditable="true" style="outline: none; border-bottom: 1px dashed #ced4da; cursor: text;" title="Click to edit">${sectionTitle}</h2>
                    <i class="bi bi-pencil-fill ms-2" style="font-size: 0.9rem; cursor: pointer; color: var(--primary-hover);" title="Click to edit"></i>
                  </div>
                  <p class="text-muted small mb-0">Goal: Understand your personal transformation through key miltestones</p>
                </div>
                <div class="d-flex flex-wrap gap-2">
                  <button class="btn btn-sm btn-outline-primary" onclick="addCardToSection(this)" title="Add Card">
                    <i class="bi bi-plus-circle"></i> Add Card
                  </button>
                  <button class="btn btn-sm btn-outline-secondary" onclick="duplicateSection(this)" title="Duplicate Section">
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
                    <div class="${colClass}" data-card-title="${cardData.title}">
                      <div class="card h-100">
                        <div class="card-body">
                          <div class="d-flex justify-content-between align-items-center mb-2">
                            <div class="d-inline-flex align-items-center">
                              <h3 class="fs-5 me-0 mb-0" contenteditable="true" style="outline: none; border-bottom: 1px dashed #ced4da; cursor: text;" title="Click to edit">${cardData.title}</h3>
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

                          <!-- Attachments Component Placeholder -->
                          <div class="attachments-placeholder"></div>

                        </div>
                      </div>
                    </div>
                    `;
                }).join('')}
              </div>
            </section>
            `;
            mainContainer.insertAdjacentHTML('beforeend', sectionHtml);
            
            // Replace placeholders in the added section
            const addedSection = mainContainer.lastElementChild;
            addedSection.querySelectorAll('.attachments-placeholder').forEach(placeholder => {
                if (window.uploadComponentHtml) {
                    placeholder.outerHTML = window.uploadComponentHtml;
                }
            });

            // Populate attachments
            secData.cards.forEach(cardData => {
                const cardDiv = addedSection.querySelector(`[data-card-title="${cardData.title}"]`);
                if (cardDiv && cardData.attachments && Array.isArray(cardData.attachments)) {
                    cardData.attachments.forEach(att => {
                        window.addAttachmentItem(cardDiv, att, window.saveWorkbenchState);
                    });
                }
            });
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
    
    // Clear attachments in duplicate card
    const itemsContainer = clone.querySelector('.uploaded-items-container');
    if (itemsContainer) itemsContainer.innerHTML = '';
    
    // Reset file input values
    const fileInputs = clone.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => input.value = '');
    
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
    
    // Reset attachments in duplicated section cards
    clone.querySelectorAll('.uploaded-items-container').forEach(cont => cont.innerHTML = '');
    clone.querySelectorAll('input[type="file"]').forEach(input => input.value = '');
    
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
              <h3 class="fs-5 me-0 mb-0" contenteditable="true" style="outline: none; border-bottom: 1px dashed #ced4da; cursor: text;" title="Click to edit">New Card</h3>
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

          <!-- Attachments Component Placeholder -->
          <div class="attachments-placeholder"></div>

        </div>
      </div>
    `;
    row.appendChild(newCol);
    
    // Replace placeholder with dynamically loaded component HTML
    const placeholder = newCol.querySelector('.attachments-placeholder');
    if (placeholder && window.uploadComponentHtml) {
        placeholder.outerHTML = window.uploadComponentHtml;
    }

    attachChangeListeners();
    saveWorkbenchState();
};

// State Persistence for Phase 3 Reflection
window.saveReflectionState = function() {
    if (!window.location.pathname.includes("p3_reflection.html")) return;
    const data = {};
    document.querySelectorAll('main textarea').forEach(textarea => {
        if (textarea.id) {
            data[textarea.id] = textarea.value;
        }
    });

    // Get attachments for Closing Reflection
    const attachments = [];
    const closingCard = document.getElementById('closing-reflection')?.closest('.card');
    if (closingCard) {
        closingCard.querySelectorAll('.attachment-item').forEach(itemDiv => {
            attachments.push({
                type: itemDiv.dataset.type,
                name: itemDiv.dataset.name,
                data: itemDiv.dataset.data
            });
        });
    }
    data.attachments = attachments;

    localStorage.setItem('workbench-p3-reflection', JSON.stringify(data));
};

window.loadReflectionState = function() {
    if (!window.location.pathname.includes("p3_reflection.html")) return;
    const saved = localStorage.getItem('workbench-p3-reflection');
    if (!saved) return;
    try {
        const data = JSON.parse(saved);
        if (!data) return;
        
        // Load textareas
        for (const [id, value] of Object.entries(data)) {
            if (id === 'attachments') continue;
            const textarea = document.getElementById(id);
            if (textarea) {
                textarea.value = value;
            }
        }

        // Load attachments inside closing reflection card
        const closingCard = document.getElementById('closing-reflection')?.closest('.card');
        if (closingCard && data.attachments && Array.isArray(data.attachments)) {
            // Clear existing ones if any
            const container = closingCard.querySelector('.uploaded-items-container');
            if (container) container.innerHTML = '';
            
            data.attachments.forEach(att => {
                window.addAttachmentItem(closingCard, att, window.saveReflectionState);
            });
        }
    } catch (e) {
        console.error("Error restoring reflection state:", e);
    }
};
