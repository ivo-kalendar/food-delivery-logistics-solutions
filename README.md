# 🚚 Food Delivery Logistics Solutions (Enterprise Logistics Management)

![Project Status](https://img.shields.io/badge/status-active-success)
![Node.js](https://img.shields.io/badge/Node.js-v22+-green)
![React](https://img.shields.io/badge/React-v19.2.4-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-v7.x-green)
![Logistics](https://img.shields.io/badge/Industry-Food_Delivery-orange)

A high-performance **Enterprise Resource Planning (ERP)** lightweight solution specifically designed for food delivery logistics. The platform automates the synchronization between warehouse dispatchers, commercial agents, and drivers.

Developed for **Food Delivery Operations** to resolve the complexity of daily route planning and driver-to-vehicle assignment.

🔗 **Author:** [Ivo Kalendarov](https://github.com/ivo-kalendar) | ivokalendar@icloud.com

---

## 🧩 Core Capabilities & Access Control

The platform is engineered with a multi-layered security architecture that dictates data interaction based on user verification status.

### 🛡️ Authentication & Authorization Logic
The system implements advanced authentication on both the Frontend and Backend:
* **Guest Access**: Unauthenticated users are restricted to Login and Registration screens only.
* **Pending Approval State**: New registrants enter a "restricted" mode. Although they can enter the dashboard, all functional routes (Tables, Drivers, Prints) are blocked by the ```adminApproved.js``` middleware until an Administrator manually grants access.
* **Authorized User Tier**: Once approved, users unlock:
    - **Home Dashboard**: View the latest live delivery document globally.
    - **Document Ownership**: Create, edit, delete, and print their own logistics manifests.
    - **Global Archive**: Access all historical tables with the ability to clone them into new working drafts.
* **Super Admin Tier**: Full system sovereignty. Beyond standard features, the Admin can:
    - Overwrite or delete any table in the database.
    - Manage the user registry (Approve/Block/Delete accounts).
    - Perform full CRUD on the Employee (Driver) database, including modifying core properties and status.

---

## 🏗️ Technical Architecture & Advanced Workflow

### Independent Backend Engine
The backend is designed as a **decoupled API service**. Its modular structure allows it to function independently of the React frontend, serving as a secure data provider for any external service. It utilizes a **Singleton Pattern** for MongoDB connections to ensure persistent, high-performance database pooling.

### Logistics Data Lifecycle
* **Smart Table Replication**: Users can utilize the ```getAndCopyTable``` controller. This logic performs a deep clone of previous route assignments, driver IDs, and commercial zones, migrating them to a new timestamp to eliminate manual daily entry.
* **Complex Data Aggregation**: The ```Tables.getOneByID``` model performs automated joins between the ```tables```, ```vraboteni```, and ```korisnici``` collections to deliver a complete manifest object in a single request.
* **State Synchronization**: The frontend utilizes a complex ```useReducer``` + ```Context API``` pattern. This ensures that when a dispatcher updates a driver's status or a delivery comment, the change is reflected instantly across all connected UI components.
* **High-Performance Middleware**: 
    - ```auth.js```: JWT verification layer.
    - ```adminApproved.js```: Permission-based gatekeeper for logistics data.
    - ```compression()```: Gzip encoding for large JSON table payloads.

---

## 🧪 Live Demo & Testing

The application is hosted and ready for verification.

<a href="http://213.199.63.251:3002/" target="_blank" rel="noopener noreferrer">
  🔗 Live Demo Link
</a>

### Test Credentials:
| User Role | Username | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Guest User** | ```guestuser``` | ```123456789``` | Unauthorized (Locked Routes) |
| **Auth User** | ```authuser``` | ```123456789``` | Authorized (Create, Copy, Print) |

---

## 📸 System Interface & Visuals

| **Logistics Archive** | **Dynamic Table Edit** |
|:---:|:---:|
| ![Archive](https://github.com/ivo-kalendar/food-delivery-logistics-solutions/blob/master/screenshots/scr_1.png) | ![Edit](https://github.com/ivo-kalendar/food-delivery-logistics-solutions/blob/master/screenshots/scr_5.png) |
| **Archive**: 500+ table records database. | **Editor**: Real-time route and driver input. |

| **Employee Registry** | **Operational Comments** |
|:---:|:---:|
| ![Employees](https://github.com/ivo-kalendar/food-delivery-logistics-solutions/blob/master/screenshots/scr_3.png) | ![Comments](https://github.com/ivo-kalendar/food-delivery-logistics-solutions/blob/master/screenshots/scr_6.png) |
| **HR**: Full driver fleet management. | **Notes**: Specialized logistics feedback. |

| **Visual Mapping** | **Shift Management** |
|:---:|:---:|
| ![Colors](https://github.com/ivo-kalendar/food-delivery-logistics-solutions/blob/master/screenshots/scr_2.png) | ![Shifts](https://github.com/ivo-kalendar/food-delivery-logistics-solutions/blob/master/screenshots/scr_7.png) |
| **Color Coding**: Product type differentiation. | **Shifts**: 1st and 2nd route segmentation. |

| **Print Manifest** | **Action Dashboard** |
|:---:|:---:|
| ![Print](https://github.com/ivo-kalendar/food-delivery-logistics-solutions/blob/master/screenshots/scr_4.png) | ![Actions](https://github.com/ivo-kalendar/food-delivery-logistics-solutions/blob/master/screenshots/scr_8.png) |
| **Print**: Printable logistics manifest. | **Actions**: Quick action buttons. |

---

## 📂 Project Architecture & Full-Stack Structure

The application follows a strictly organized, nested architecture. The ```client``` (React/Vite) is housed directly within the ```server``` (Node/Express) root, ensuring that the backend provides both the API services and the static asset serving logic.

```text
food-delivery-logistics-solutions/ (Server Root)
├── 📁 config/              # Server configuration and environment variables
│   ├── 📄 app.js            # Express application setup
│   ├── 📄 dbObjectIds.js    # Static MongoDB ObjectIDs for global options
│   ├── 📄 jwtSecret.js      # Key for JWT token signing
│   └── 📄 mongoUri.js       # Database connection strings
├── 📁 controllers/         # Functional logic and request handling
│   ├── 📄 korisnikController.js # Auth, User management, and Admin approvals
│   ├── 📄 optionsController.js  # Dynamic dropdown data (hours, drivers, zones)
│   ├── 📄 tablesControler.js    # Complex table CRUD, cloning, and sorting
│   ├── 📄 userController.js     # User-specific data retrieval
│   └── 📄 vraboteniController.js # Fleet/Employee management logic
├── 📁 middleware/          # Security and Role-Based Access Control (RBAC)
│   ├── 📄 admin.js          # Middleware for SuperAdmin restriction
│   ├── 📄 adminApproved.js  # Middleware for dispatcher-level approval
│   └── 📄 auth.js           # Primary JWT verification layer
├── 📁 models/              # Direct MongoDB collection interaction (Schema-less)
│   ├── 📄 Korisnik.js       # User model with Bcrypt hashing and validation
│   ├── 📄 Options.js        # Logic for fetching system-wide settings
│   ├── 📄 Tables.js         # Multi-collection joins (Tables + Workers + Users)
│   ├── 📄 User.js           # User identity profile models
│   └── 📄 Vraboteni.js      # Driver database logic and status sorting
├── 📁 routes/              # API Endpoint mapping
│   └── 📄 router.js         # Centralized route definitions for the entire API
├── 📄 server.js            # Entry point & MongoDB Singleton connection client
├── 📄 package.json         # Server-side dependencies (Bcrypt, JWT, Compression)
│
└── 📁 client/              # Nested React Frontend (Vite 7)
    ├── 📁 public/          # Static assets (logos, icons)
    ├── 📁 src/
    │   ├── 📁 components/  # Atomic and Composite UI components
    │   │   ├── 📁 auth/    # Login and Registration modules
    │   │   ├── 📁 layout/  # Navigation, Table Cards, and Loading Spinners
    │   │   ├── 📁 links/   # Dynamic route link components
    │   │   └── 📁 pages/   # Full views (Home, Archive, Profile, About)
    │   ├── 📁 context/     # State Management (useReducer + Context API)
    │   │   ├── 📄 AuthState.js      # Global user authentication state
    │   │   ├── 📄 KorisnikState.js  # User list and approval state
    │   │   ├── 📄 TablesState.js    # Real-time manifest and archive state
    │   │   └── 📄 VraboteniState.js  # Driver fleet and registry state
    │   ├── 📁 enums/       # Static variables and style constants
    │   ├── 📁 models/      # Client-side data models
    │   ├── 📁 utils/       # Axios interceptors and Auth token helpers
    │   ├── 📄 App.jsx      # Root component with Route Protected Wrappers
    │   └── 📄 index.js     # React 19 entry and DOM rendering
    ├── 📄 vite.config.js   # Frontend build tool and proxy settings
    └── 📄 package.json     # Frontend dependencies (React-to-print, Moment.js)
```

### 🛠️ Architectural Integrity
* **The Controller-Model Pattern**: The ```controllers/``` handle HTTP logic, while the ```models/``` handle the heavy-lifting of MongoDB queries (Native Driver). This ensures the backend remains decoupled and fast.
* **Nested Client Logic**: By keeping the ```client/``` within the server, the project can be deployed as a single unit where the backend serves the ```dist/``` folder in production.
* **Centralized State**: The ```context/``` folder in the client acts as the single source of truth, synchronized with the backend through RESTful calls defined in ```router.js```.
* **Singleton Database Pattern**: The database is initialized once in ```server.js``` and exported, preventing the "Too many connections" error in high-traffic logistics environments.

### 🧩 Deep Dive: Client Component Architecture

The frontend is built using a modular component pattern, where UI elements are separated by their functional responsibility (Auth, Layout, Navigation, and Views).

```text
client/src/components/
├── 📁 auth/                # Authentication & Session Management
│   ├── 📄 Login.jsx         # Интерфејс за најава и складирање на JWT во LocalStorage.
│   ├── 📄 Logout.jsx        # Логика за бришење токен и ресетирање на AuthState.
│   └── 📄 Register.jsx      # Форма за нови корисници со валидација на лозинки.
│
├── 📁 events/              # Global UI Event Handlers
│   └── 📄 Scroll.jsx        # Специјализирана компонента за менаџирање на скролинг кај големи табели.
│
├── 📁 layout/              # The Core Rendering Engine (UI Logic)
│   ├── 📄 Card.jsx          # Основен контејнер за приказ на податоци во вид на картичка.
│   ├── 📄 CardList.jsx      # Грид систем кој ги реди сите зачувани манифести.
│   ├── 📄 ComponentToPrint.jsx # Wrapper кој ја подготвува табелата за чист А4 принт.
│   ├── 📄 Copyright.jsx     # Мала компонента за приказ на лиценца и авторски права.
│   ├── 📄 EditCard.jsx      # Модален прозорец за брза измена на основни податоци на картичката.
│   ├── 📄 EditedTable.jsx   # Приказ на табела која е во фаза на промена пред зачувување.
│   ├── 📄 EditString.jsx    # Inline едитор за текстуални полиња во реално време.
│   ├── 📄 EditTableString.jsx # Специфичен едитор за вредности внатре во самата логистичка мрежа.
│   ├── 📄 Footer.jsx        # Статичен долен дел со информации за верзијата на софтверот.
│   ├── 📄 KorisniciView.jsx # Администраторски поглед за управување со корисничките профили.
│   ├── 📄 LocaleTime.jsx    # Компонента за конверзија и форматирање на време според локална зона.
│   ├── 📄 MainListView.jsx  # Главна компонента за приказ на листата со активни манифести.
│   ├── 📄 Navbar.jsx        # Навигација која се менува според ролјата (Admin/User).
│   ├── 📄 Permisions.jsx    # UI индикатори за тоа кој корисник какви дозволи има.
│   ├── 📄 Print.jsx         # Логика за повикување на системскиот дијалог за печатење.
│   ├── 📄 SelectedItem.jsx  # Клучна компонента за манипулација со податоци во еден ред (возач, зона).
│   ├── 📄 SelectedTable.jsx # "Мозокот" на апликацијата – интерактивна табела за распоред.
│   ├── 📄 Spinner.jsx       # Глобален лоадер за цела страница.
│   ├── 📄 spinner.svg       # Векторска анимација за Spinner компонентата.
│   ├── 📄 Spinner2.jsx      # Полесен, инлајн лоадер за мали транзиции на податоци.
│   ├── 📄 spinner2.svg      # Векторска анимација за Spinner2.
│   ├── 📄 TableCard.jsx     # Дизајниран приказ на табела во архивата.
│   ├── 📄 TableDelete.jsx   # Сигурносен модал за бришење на цели табели од базата.
│   ├── 📄 TableString.jsx   # Компонента за рендерирање на текстуални вредности во табелата.
│   ├── 📄 TableView.jsx     # Read-only поглед на табелата (за обични корисници).
│   ├── 📄 TextString.jsx    # Помошна компонента за форматирање на долги текстови/коментари.
│   └── 📄 VraboteniView.jsx # Комплетен менаџмент на флотата од возачи и нивниот статус.
│
├── 📁 links/               # Routing & Protection Layers
│   ├── 📄 AdminRoutes.jsx   # HOC кој ги блокира сите неовластени пристапи до админ панелот.
│   ├── 📄 GuestLinks.jsx    # Линкови видливи само за непотврдени корисници (Login/Register).
│   ├── 📄 GuestRoutes.jsx   # Заштита за гостински рути.
│   ├── 📄 ListsRoutes.jsx   # Дефинирани патеки за преглед на архивата.
│   ├── 📄 TableRoutes.jsx   # Динамични рути за пристап до специфични табели преку ID.
│   ├── 📄 UserLinks.jsx     # Навигација достапна за логирани диспечери.
│   └── 📄 UserRoutes.jsx    # Заштита за корисничкиот дел од апликацијата.
│
└── 📁 pages/               # High-Level View Containers
    ├── 📄 About.jsx         # Информации за проектот и упатство за користење.
    ├── 📄 EditProfile.jsx   # Страница за промена на лозинка и лични податоци.
    ├── 📄 Home.jsx          # Почетен дешборд со брз пристап до денешниот распоред.
    ├── 📄 Lists.jsx         # Централна архива на сите историски податоци.
    ├── 📄 Table.jsx         # Главната работна површина за уредување на специфичен распоред.
    └── 📄 UserProfile.jsx   # Преглед на деталите за најавениот корисник.
```

### 🛠️ Component Design Principles:

* **Granular Layout Logic**: The ```layout/``` folder contains the actual "engine" of the app. Components like ```SelectedTable``` and ```SelectedItem``` manage complex prop-drilling and state synchronization for every single cell in the logistics grid.
* **Role-Based Visibility**: The components in the ```links/``` folder dynamically render based on the ```AuthState```, ensuring users only see what they are authorized to access.
* **Declarative Routing**: The ```pages/``` directory contains the main "screens" of the app, which are wrapped in protection layers (e.g., ```AdminRoutes```) to prevent unauthorized DOM rendering.
* **Data-Driven UI**: ```CardList``` and ```CardTable``` work together to transform raw JSON data from the ```/api/tables``` endpoint into a searchable, interactive archive.
* **Optimized Printing**: The ```SelectedTable``` component is specifically styled to work with ```react-to-print```, ensuring a clean A4 export by hiding non-essential layout elements like the Navbar and Action buttons.

---

## 🚀 Quick Start & Installation

Ensure you have **Node.js v22+** installed for optimal performance and driver compatibility.

1. **Clone & Setup Environment**
```bash
git clone https://github.com/ivo-kalendar/food-delivery-logistics-solutions.git
cd food-delivery-logistics-solutions
cp .env.example .env
```

2. **Installation & Execution**
```bash
npm install          # Install server & client deps
npm run dev          # Run full-stack concurrently
```

3. **Production Deployment**
```bash
npm run build
npm start
```
---

## ⚙️ Business & Logistics Logic

The platform handles the complexity of a food delivery day through several specialized modules:

### 🛡️ Access Control Matrix

| Layer | Middleware | Responsibility |
| :--- | :--- | :--- |
| **Auth** | `auth.js` | JWT Extraction and basic identity verification. |
| **Approval** | `adminApproved.js` | Verifies the user is cleared by HQ to manage schedules. |
| **SuperAdmin** | `admin.js` | Critical operations: `/allusers`, `/korisnik/:id`, `/vraboten/nov`. |

### 📋 Logistics Entities

| Entity | Description | Attributes |
| :--- | :--- | :--- |
| **Table** | The daily manifest | `tableArr`, `tableComment`, `authorID`, `date`. |
| **Vraboten** | Employee Registry | `ime`, `prezime`, `pozicija`, `status`. |
| **Options** | Dynamic Dropdowns | `hours`, `comments`, `komercial`, `drivers`. |

---

## 🔚 Primary API Reference

### 🏗️ Logistics & Table Operations
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/api/table/new` | Initialize a fresh daily manifest. |
| **POST** | `/api/copytable/new` | Clone a previous table with all driver assignments. |
| **PUT** | `/api/table/removedrivers/:id` | Bulk remove driver assignments for a specific day. |
| **PUT** | `/api/table-comment/:id` | Append HQ operational comments to the schedule. |

### 👥 HR & User Management
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/vraboteni` | Fetch all active employees for assignment. |
| **PUT** | `/api/korisnik/:id` | Update user permissions/approval status *(Admin)*. |
| **DELETE** | `/api/deletetable/:id` | Wipe a manifest from history *(Admin)*. |

---

## 🛠️ Internal Workflow Examples

### 1. Generating a Daily Schedule
The frontend triggers `addNewTable`, which fetches active options for hours and commercial zones, creating a JSON manifest that is then distributed to all approved users.

### 2. The Printing Process
Utilizing `react-to-print` with `componentRef`:
```javascript
const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Dostava-Manifest-" + today
});
```
This ensures that the printed version hides navigation elements and optimizes the table for physical delivery logs.

---

## 🧪 Technical Implementation Highlights

* **MongoDB Singleton Pattern:** The database connection is established once in `server.js` and exported as a persistent client to prevent connection leaks.
* **Modern React Rendering:** Fully migrated to `createRoot` API (React 18/19 compatibility) for concurrent rendering.
* **Compression Middleware:** Backend uses `compression()` for Gzip encoding, significantly reducing the payload size of large logistics tables.
* **Moment.js Integration:** Deeply integrated with `moment/locale/mk` for localized Macedonian date formatting (e.g., "Понеделник", "Петок").

---

## 📝 License

MIT © 2026 **Ivo Kalendarov** - Food Delivery Logistics Solutions.