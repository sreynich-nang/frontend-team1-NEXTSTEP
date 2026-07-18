# NextStep SEO Checklist & Page Audit

This checklist evaluates the pages across the directories (`writerblogs`, `audiencepages`, `dashboardpages`, `detailpages`, `homepages`, and `menu`) on their compliance with key search engine optimization (SEO) standards.

---

## 📋 General SEO Best Practices

- [ ] **SEO Titles (`<title>`)**: Every page must have a descriptive, unique title `<title>Page Name | NextStep</title>` (between 50–60 characters).
- [ ] **Meta Descriptions**: Every page must have a unique, engaging description tag under 160 characters to improve click-through rates.
- [ ] **Single H1 Tag**: Each page must contain exactly one `<h1>` tag containing the primary topic or page title.
- [ ] **Heading Order**: Headings must follow a logical hierarchy (`<h1>` followed by `<h2>`, then `<h3>`, etc.) without skipping levels (e.g., skipping `<h2>` to go straight to `<h3>`).
- [ ] **Descriptive Image Alt Attributes**: All `<img>` tags must include a descriptive `alt` attribute describing the image content for crawler indexing and screen readers.
- [ ] **Simple & Meaningful URLs**: Links and routing structures should use descriptive slugs (e.g., `/about-us`) instead of direct file paths (e.g., `/pages/menu/aboutus.html`) or complex query parameters where possible.
- [ ] **Descriptive Link Text**: Avoid generic link text like "Click Here", "Read More", or "Link". Use descriptive words (e.g., "Explore our student guides").

---

## 🔍 Audit & Status by Directory

### 1. Homepages (`homepages/`)

| Page | Title Tag | Meta Description | Single `<h1>` | Heading Order | Image `alt` Text | Meaningful Link URLs | Descriptive Link Text |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **[homepage.html](file:///d:/a1_Sister%20of%20Code/teamProject/development/frontend/pages/homepages/homepage.html)** |  Yes |  Yes |  Yes |  Yes |  Yes | ⚠️ Using file paths | ⚠️ Uses "Read more" (mitigated by `aria-label`) |

- **Notes & Recommendations**: 
  - The page has descriptive `alt` attributes for active images.
  - Link texts like "Read more" are improved with `aria-label="..."` but ideally could use descriptive anchor text directly (e.g., "Read the ITC student journey").
  - URLs link to direct file paths (e.g., `/pages/audiencepages/p1_story_inventory.html`) which can be simplified in server routing configuration.

---

### 2. Menu Pages (`menu/`)

| Page | Title Tag | Meta Description | Single `<h1>` | Heading Order | Image `alt` Text | Meaningful Link URLs | Descriptive Link Text |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **[aboutus.html](file:///d:/a1_Sister%20of%20Code/teamProject/development/frontend/pages/menu/aboutus.html)** |  Yes |  Yes |  Yes |  Yes |  Yes | ⚠️ Using file paths |  Yes |
| **[contactus.html](file:///d:/a1_Sister%20of%20Code/teamProject/development/frontend/pages/menu/contactus.html)** |  Yes |  Yes |  Yes |  Yes |  Yes | ⚠️ Using file paths |  Yes |
| **[faq.html](file:///d:/a1_Sister%20of%20Code/teamProject/development/frontend/pages/menu/faq.html)** |  Yes |  Yes |  Yes |  Yes |  Yes | ⚠️ Using file paths |  Yes |
| **[login.html](file:///d:/a1_Sister%20of%20Code/teamProject/development/frontend/pages/menu/login.html)** |  Yes |  Yes |  Yes |  Yes |  Yes | ⚠️ Using file paths |  Yes |
| **[profile.html](file:///d:/a1_Sister%20of%20Code/teamProject/development/frontend/pages/menu/profile.html)** |  Yes |  Yes |  Yes |  Yes |  Yes | ⚠️ Using file paths |  Yes |
| **[signup.html](file:///d:/a1_Sister%20of%20Code/teamProject/development/frontend/pages/menu/signup.html)** |  Yes |  Yes |  Yes |  Yes |  Yes | ⚠️ Using file paths |  Yes |
| **[test_faq.html](file:///d:/a1_Sister%20of%20Code/teamProject/development/frontend/pages/menu/test_faq.html)** |  Yes | ❌ No |  Yes |  Yes |  Yes | ⚠️ Using file paths |  Yes |

- **Notes & Recommendations**:
  - **[test_faq.html](file:///d:/a1_Sister%20of%20Code/teamProject/development/frontend/pages/menu/test_faq.html)** is missing a `<meta name="description">` tag. It should be added to prevent search engines from generating auto-snippets.

---

### 3. Writer Blogs (`writerblogs/`)

| Page | Title Tag | Meta Description | Single `<h1>` | Heading Order | Image `alt` Text | Meaningful Link URLs | Descriptive Link Text |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **[choice2write.html](file:///d:/a1_Sister%20of%20Code/teamProject/development/frontend/pages/writerblogs/choice2write.html)** |  Yes |  Yes |  Yes |  Yes |  Yes | ⚠️ Using file paths |  Yes |
| **[p1_storyinventory.html](file:///d:/a1_Sister%20of%20Code/teamProject/development/frontend/pages/writerblogs/p1_storyinventory.html)** |  Yes |  Yes |  Yes |  Yes |  Yes | ⚠️ Using file paths |  Yes |
| **[p2_narrativetime.html](file:///d:/a1_Sister%20of%20Code/teamProject/development/frontend/pages/writerblogs/p2_narrativetime.html)** |  Yes |  Yes |  Yes |  Yes |  Yes | ⚠️ Using file paths |  Yes |
| **[p3_reflection.html](file:///d:/a1_Sister%20of%20Code/teamProject/development/frontend/pages/writerblogs/p3_reflection.html)** |  Yes |  Yes |  Yes |  Yes |  Yes | ⚠️ Using file paths |  Yes |
| **[template_writeblogs.html](file:///d:/a1_Sister%20of%20Code/teamProject/development/frontend/pages/writerblogs/template_writeblogs.html)** |  Yes | ❌ No |  Yes |  Yes |  Yes | ⚠️ Using file paths |  Yes |

- **Notes & Recommendations**:
  - The template file `template_writeblogs.html` does not have a meta description, which is standard for templates but should be updated if instantiated as a live page.

---

### 4. Audience Pages (`audiencepages/`)

| Page | Title Tag | Meta Description | Single `<h1>` | Heading Order | Image `alt` Text | Meaningful Link URLs | Descriptive Link Text |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **[p1_story_inventory.html](file:///d:/a1_Sister%20of%20Code/teamProject/development/frontend/pages/audiencepages/p1_story_inventory.html)** |  Yes |  Yes |  Yes |  Yes |  Yes | ⚠️ Using file paths |  Yes |
| **[template.html](file:///d:/a1_Sister%20of%20Code/teamProject/development/frontend/pages/audiencepages/template.html)** |  Yes | ❌ No |  Yes |  Yes |  Yes | ⚠️ Using file paths |  Yes |
| **[p2_narrative_timeline.html](file:///d:/a1_Sister%20of%20Code/teamProject/development/frontend/pages/audiencepages/p2_narrative_timeline.html)** | ❌ Empty | ❌ Empty | ❌ Empty | ❌ Empty | ❌ Empty | ❌ Empty | ❌ Empty |
| **[p3_reflective.html](file:///d:/a1_Sister%20of%20Code/teamProject/development/frontend/pages/audiencepages/p3_reflective.html)** | ❌ Empty | ❌ Empty | ❌ Empty | ❌ Empty | ❌ Empty | ❌ Empty | ❌ Empty |

- **Notes & Recommendations**:
  - `p2_narrative_timeline.html` and `p3_reflective.html` are current placeholders (0 bytes). Once content is added, SEO parameters must be initialized from `template.html`.

---

### 5. Dashboard Pages (`dashboardpages/`)

| Page | Title Tag | Meta Description | Single `<h1>` | Heading Order | Image `alt` Text | Meaningful Link URLs | Descriptive Link Text |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **[dashboardpage.html](file:///d:/a1_Sister%20of%20Code/teamProject/development/frontend/pages/dashboardpages/dashboardpage.html)** |  Yes |  Yes |  Yes |  Yes |  Yes | ⚠️ Using file paths |  Yes |
| **[add-podcast-page.html](file:///d:/a1_Sister%20of%20Code/teamProject/development/frontend/pages/dashboardpages/add-podcast-page.html)** |  Yes |  Yes |  Yes |  Yes |  Yes | ⚠️ Using file paths |  Yes |

---

### 6. Detail Pages (`detailpages/`)

| Page | Title Tag | Meta Description | Single `<h1>` | Heading Order | Image `alt` Text | Meaningful Link URLs | Descriptive Link Text |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **[detailpage.html](file:///d:/a1_Sister%20of%20Code/teamProject/development/frontend/pages/detailpages/detailpage.html)** | ❌ Empty | ❌ Empty | ❌ Empty | ❌ Empty | ❌ Empty | ❌ Empty | ❌ Empty |

- **Notes & Recommendations**:
  - `detailpage.html` is currently an empty placeholder (0 bytes) and requires initial content configuration before SEO optimization.
