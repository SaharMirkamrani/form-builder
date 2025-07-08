# Form Builder

A minimal, modern form builder MVP with:
- **Next.js (React) frontend**
- **Vue 3 (Vite) frontend**
- **Express (Node.js) backend**

Build, preview, save, and load custom forms with a beautiful drag-and-drop UI.

---

## Features

- **Add/Remove Fields:** Text, Checkbox, and Radio input types.
- **Drag-and-Drop Reordering:** Easily reorder fields in builder mode.
- **Edit Mode & Preview Mode:** Toggle between editing the form and previewing it live.
- **Save/Load Schema:** Persist your form schema to the backend and load it back anytime.
- **Modern UI:**  
  - React: [shadcn/ui](https://ui.shadcn.com/) + [react-toastify](https://fkhadra.github.io/react-toastify/introduction)  
  - Vue: [Vuetify](https://vuetifyjs.com/) + [vue-toastification](https://vue-toastification.maronato.dev/)
- **Responsive & Accessible:** Works on desktop and mobile, with accessible controls.

---

## Tech Stack

- **Frontend:**
  - **React:**  
    - [Next.js 14+ (App Router, TypeScript)](https://nextjs.org/)
    - [shadcn/ui](https://ui.shadcn.com/) (Button, Input, Select, Checkbox, RadioGroup)
    - [dnd-kit](https://dndkit.com/) (drag-and-drop)
    - [react-toastify](https://fkhadra.github.io/react-toastify/introduction) (toasts)
    - [lucide-react](https://lucide.dev/) (icons)
    - [Tailwind CSS](https://tailwindcss.com/)
  - **Vue:**  
    - [Vue 3 + Vite + TypeScript](https://vuejs.org/)
    - [Vuetify 3](https://vuetifyjs.com/) (UI components)
    - [vuedraggable](https://github.com/SortableJS/vue.draggable.next) (drag-and-drop)
    - [vue-toastification](https://vue-toastification.maronato.dev/) (toasts)
    - [@mdi/font](https://pictogrammers.github.io/@mdi/font/) (icons)

- **Backend:**
  - [Express.js (TypeScript)](https://expressjs.com/)
  - CORS enabled
  - In-memory schema storage (simple, stateless)

---

## Getting Started

### 1. Install Dependencies

#### Backend
```sh
cd server
npm install
```

#### React Frontend
```sh
cd ../client
npm install
```

#### Vue Frontend
```sh
cd ../client-vue
npm install
```

#### In the root of the project
```sh
npm install
```

### 2. Run the App

#### Start Backend and One Frontend
You can run the backend and either frontend (React or Vue) at the same time. By default, the backend runs on port 3001, React on 3000, and Vue on 5173.

##### To run React frontend:
```sh
npm run dev
```
- React frontend: [http://localhost:3000](http://localhost:3000)

##### To run Vue frontend:
```sh
npm run dev:vue
```
- Vue frontend: [http://localhost:5173](http://localhost:5173)

---

## Usage

1. **Open the frontend in your browser** (React: [http://localhost:3000](http://localhost:3000), Vue: [http://localhost:5173](http://localhost:5173))
2. **Builder Mode:**
   - Add new fields (Text, Checkbox, Radio) with custom labels.
   - Drag and drop fields to reorder them.
   - Remove fields with the "X" button.
   - Click "Save" to persist your schema to the backend.
3. **Preview Mode:**
   - Click "Switch to Preview Mode" to see your form live.
   - All fields are interactive and styled with the respective UI library.
4. **Persistence:**
   - The form schema is auto-loaded from the backend on page load.
   - Click "Save" to update the backend with your changes.
   - Toast notifications show success/error for all actions.

---

## Project Structure

```
form-builder/
├── client/           # Next.js frontend (App Router)
│   ├── src/
│   │   ├── app/
│   │   │   └── page.tsx           # Main builder page (root)
│   │   ├── components/
│   │   │   ├── FormBuilderClient.tsx
│   │   │   ├── FormRenderer.tsx
│   │   │   ├── InputField.tsx
│   │   │   └── ui/                # shadcn/ui components
│   │   └── lib/
│   ├── public/
│   └── ...
├── client-vue/      # Vue 3 + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── FormBuilderClient.vue
│   │   │   ├── FormRenderer.vue
│   │   │   ├── InputField.vue
│   │   │   └── ...
│   │   └── ...
│   ├── public/
│   └── ...
├── server/           # Express backend
│   ├── index.ts      # Main server file
│   └── ...
├── Readme.md
└── ...
```

---

## Customization & Extending

- **Add More Field Types:**
  - Extend the input field components and update the builder UI in both frontends.
- **Field Validation:**
  - Add validation logic in `FormRenderer` and/or backend.
- **Database Storage:**
  - Replace in-memory storage in `server/index.ts` with a real database (e.g., SQLite, Postgres).
- **Multiple Forms:**
  - Add endpoints and UI for saving/loading multiple named forms.
- **Styling:**
  - Customize shadcn/ui, Tailwind config, or Vuetify theme for your brand.

---

## Development Notes

- **Drag-and-drop** is powered by dnd-kit (React) and vuedraggable (Vue). Each field is draggable in builder mode.
- **UI libraries:** shadcn/ui (React) and Vuetify (Vue) are used for all major UI elements.
- **Toast notifications:** react-toastify (React) and vue-toastification (Vue) for all user actions.
- **Form schema** is an array of objects: `{ type: 'text' | 'checkbox' | 'radio', label: string }`.
- **No authentication** or user management is included in this MVP.

---

## Troubleshooting

- **CORS errors:** Make sure the backend is running on port 3001 and CORS is enabled.
- **Schema not loading:** Ensure the backend is running before starting the frontend.
- **Port conflicts:** Change the ports in `server/index.ts`, Next.js, or Vite config if needed.
- **UI issues:** Make sure all UI libraries are installed for each frontend.

---

