# Form Builder

A minimal, modern form builder MVP with a Next.js (App Router) frontend and an Express (Node.js) backend. Build, preview, save, and load custom forms with a beautiful drag-and-drop UI.

---

## Features

- **Add/Remove Fields:** Text, Checkbox, and Radio input types.
- **Drag-and-Drop Reordering:** Easily reorder fields in builder mode.
- **Edit Mode & Preview Mode:** Toggle between editing the form and previewing it live.
- **Save/Load Schema:** Persist your form schema to the backend and load it back anytime.
- **Modern UI:** Styled with [shadcn/ui](https://ui.shadcn.com/) and [react-toastify](https://fkhadra.github.io/react-toastify/introduction).
- **Responsive & Accessible:** Works on desktop and mobile, with accessible controls.

---

## Tech Stack

- **Frontend:**
  - [Next.js 14+ (App Router, TypeScript)](https://nextjs.org/)
  - [shadcn/ui](https://ui.shadcn.com/) (Button, Input, Select, Checkbox, RadioGroup)
  - [dnd-kit](https://dndkit.com/) (drag-and-drop)
  - [react-toastify](https://fkhadra.github.io/react-toastify/introduction) (toasts)
  - [lucide-react](https://lucide.dev/) (icons)
  - [Tailwind CSS](https://tailwindcss.com/)

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

#### Frontend
```sh
cd ../client
npm install
```

#### In the root of the project
```sh
npm install
```

### 2. Run the App

#### Start both Frontend and Backend
```sh
npm run dev
```
- The backend runs on [http://localhost:3001](http://localhost:3001)
- The frontend runs on [http://localhost:3000](http://localhost:3000)

---

## Usage

1. **Open [http://localhost:3000](http://localhost:3000)**
2. **Builder Mode:**
   - Add new fields (Text, Checkbox, Radio) with custom labels.
   - Drag and drop fields to reorder them.
   - Remove fields with the "X" button.
   - Click "Save" to persist your schema to the backend.
3. **Preview Mode:**
   - Click "Switch to Preview Mode" to see your form live.
   - All fields are interactive and styled with shadcn/ui.
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
├── server/           # Express backend
│   ├── index.ts      # Main server file
│   └── ...
├── Readme.md
└── ...
```

---

## Customization & Extending

- **Add More Field Types:**
  - Extend `InputFieldProps` and update `InputField.tsx` and the builder UI.
- **Field Validation:**
  - Add validation logic in `FormRenderer` and/or backend.
- **Database Storage:**
  - Replace in-memory storage in `server/index.ts` with a real database (e.g., SQLite, Postgres).
- **Multiple Forms:**
  - Add endpoints and UI for saving/loading multiple named forms.
- **Styling:**
  - Customize shadcn/ui and Tailwind config for your brand.

---

## Development Notes

- **Drag-and-drop** is powered by dnd-kit. Each field is draggable in builder mode.
- **shadcn/ui** components are used for all inputs, buttons, selects, checkboxes, and radio groups.
- **Toast notifications** are handled by react-toastify for all user actions.
- **Form schema** is an array of objects: `{ type: 'text' | 'checkbox' | 'radio', label: string }`.
- **No authentication** or user management is included in this MVP.

---

## Troubleshooting

- **CORS errors:** Make sure the backend is running on port 3001 and CORS is enabled.
- **Schema not loading:** Ensure the backend is running before starting the frontend.
- **Port conflicts:** Change the ports in `server/index.ts` or Next.js config if needed.
- **UI issues:** Make sure all shadcn/ui components are installed (`button`, `input`, `select`, `checkbox`, `radio-group`).

---

