# 🏗️ Diagrama de Arquitectura — Proyecto Academia

> Plataforma de e-commerce académico construida con **Laravel 12 + Inertia.js + React (JSX)** y pagos vía **PayPal**.

---

## 1. Stack Tecnológico

| Capa | Tecnología |
|---|---|
| **Backend** | Laravel (PHP) |
| **Frontend** | React (JSX) vía Inertia.js |
| **Estilos** | Tailwind CSS |
| **Base de Datos** | SQLite |
| **Bundler** | Vite |
| **Pagos** | PayPal REST API |
| **Autenticación** | Laravel Breeze + Sanctum |

---

## 2. Arquitectura General (Flujo de Datos)

```mermaid
graph TB
    subgraph CLIENTE["🌐 Cliente (Browser)"]
        React["React + Inertia.js<br/>Pages & Components"]
    end

    subgraph SERVIDOR["⚙️ Servidor Laravel"]
        direction TB
        Middleware["Middleware<br/>HandleInertiaRequests<br/>AdminMiddleware"]
        Routes["Routes<br/>web.php / api.php / auth.php"]
        Controllers["Controllers<br/>Product · Cart · Order<br/>Profile · Favorite · Payment"]
        Models["Eloquent Models<br/>User · Product · Category<br/>Order · OrderItem · CartItem<br/>Payment · Favorite"]
    end

    subgraph DB["🗄️ Base de Datos (SQLite)"]
        Tables["users · products · categories<br/>orders · order_items · cart_items<br/>payments · favorites"]
    end

    subgraph EXTERNAL["🌍 Servicios Externos"]
        PayPal["PayPal REST API"]
    end

    React -->|"HTTP Request<br/>(Inertia Visit)"| Middleware
    Middleware --> Routes
    Routes --> Controllers
    Controllers --> Models
    Models -->|"Eloquent ORM"| Tables
    Controllers -->|"Inertia::render()"| React
    Controllers -->|"API Call"| PayPal
    PayPal -->|"Order ID / Capture"| Controllers
```

---

## 3. Modelo Entidad-Relación (Base de Datos)

```mermaid
erDiagram
    users {
        int id PK
        string name
        string email
        string password
        boolean is_admin
        timestamp email_verified_at
    }

    categories {
        int id PK
        string name
        string slug
    }

    products {
        int id PK
        int category_id FK
        string name
        string slug
        text description
        decimal price
        int stock
        string image
        string type
    }

    orders {
        int id PK
        int user_id FK
        decimal total
        string status
    }

    order_items {
        int id PK
        int order_id FK
        int product_id FK
        int quantity
        decimal price
    }

    cart_items {
        int id PK
        int user_id FK
        int product_id FK
        int quantity
    }

    payments {
        int id PK
        int order_id FK
        string transaction_id
        string payment_status
        decimal amount
    }

    favorites {
        int id PK
        int user_id FK
        int product_id FK
    }

    users ||--o{ orders : "tiene"
    users ||--o{ cart_items : "tiene"
    users ||--o{ favorites : "marca"
    categories ||--o{ products : "contiene"
    orders ||--o{ order_items : "incluye"
    orders ||--o| payments : "genera"
    products ||--o{ order_items : "aparece en"
    products ||--o{ cart_items : "agregado a"
    products ||--o{ favorites : "marcado como"
```

---

## 4. Mapa de Rutas y Controladores

```mermaid
graph LR
    subgraph PUBLIC["🟢 Rutas Públicas"]
        R1["/ → Welcome"]
        R2["/nosotros → About"]
        R3["/blog → Blog/Index"]
        R4["/cursos → ProductController::indexCourses"]
        R5["/libros → ProductController::indexBooks"]
        R6["/productos/{slug} → ProductController::ProductDetail"]
    end

    subgraph AUTH["🔵 Rutas Autenticadas"]
        R7["/dashboard → redirect profile"]
        R8["/perfil → ProfileController::index"]
        R9["/perfil/editar → ProfileController::edit"]
        R10["POST /favorites → FavoriteController::store"]
        R11["/carrito → CartController::index"]
        R12["POST /carrito → CartController::store"]
        R13["POST /carrito/comprar → OrderController::store"]
        R14["POST /carrito/paypal/create → OrderController::createPaypalOrder"]
        R15["POST /carrito/paypal/capture → OrderController::capturePaypalOrder"]
        R16["/mis-cursos → MyCourses"]
    end

    subgraph ADMIN["🔴 Rutas Admin"]
        R17["/admin/productos → ProductController::adminDashboard"]
        R18["GET /admin/{type}/crear → ProductController::create"]
        R19["POST /admin/{type} → ProductController::store"]
        R20["GET /admin/productos/{id}/editar → ProductController::edit"]
        R21["PUT /admin/productos/{id} → ProductController::update"]
        R22["DELETE /admin/productos/{id} → ProductController::destroy"]
    end

    subgraph API["🟡 API Routes"]
        A1["POST /api/paypal/order/create → PaymentController::createOrder"]
        A2["POST /api/paypal/order/capture → PaymentController::captureOrder"]
    end
```

---

## 5. Estructura del Frontend (React + Inertia)

```mermaid
graph TD
    subgraph LAYOUTS["📐 Layouts"]
        AL["AuthenticatedLayout.jsx"]
        GL["GuestLayout.jsx"]
    end

    subgraph PAGES["📄 Pages"]
        direction TB
        Welcome["Welcome.jsx"]
        About["About.jsx"]

        subgraph AUTH_PAGES["Auth"]
            Login["Login.jsx"]
            Register["Register.jsx"]
            ForgotPW["ForgotPassword.jsx"]
            ResetPW["ResetPassword.jsx"]
            ConfirmPW["ConfirmPassword.jsx"]
            VerifyEmail["VerifyEmail.jsx"]
        end

        subgraph PRODUCT_PAGES["Products"]
            StoreCatalog["StoreCatalog.jsx"]
            ProductDetail["ProductDetail.jsx"]
            Create["Create.jsx"]
            EditProd["Edit.jsx"]
        end

        subgraph CART_PAGES["Cart"]
            CartIndex["Index.jsx"]
        end

        subgraph PROFILE_PAGES["Profile"]
            ProfileIndex["Index.jsx"]
            ProfileEdit["Edit.jsx"]
        end

        subgraph ADMIN_PAGES["Admin"]
            AdminDash["AdminDashboard.jsx"]
        end

        subgraph BLOG_PAGES["Blog"]
            BlogIndex["Index.jsx"]
        end
    end

    subgraph COMPONENTS["🧩 Componentes Reutilizables"]
        Navbar["Navbar.jsx"]
        Footer["Footer.jsx"]
        ProductCard["ProductCard.jsx"]
        ProductForm["ProductForm.jsx"]
        Modal["Modal.jsx"]
        Dropdown["Dropdown.jsx"]
        AppLogo["ApplicationLogo.jsx"]
        UI["NavLink · PrimaryButton<br/>DangerButton · SecondaryButton<br/>TextInput · InputLabel<br/>InputError · Checkbox<br/>ResponsiveNavLink"]
    end

    AL --> PAGES
    GL --> AUTH_PAGES
    Navbar --> PAGES
    Footer --> PAGES
    ProductCard --> StoreCatalog
    ProductCard --> ProductDetail
    ProductForm --> Create
    ProductForm --> EditProd
```

---

## 6. Flujo de Compra (Carrito → PayPal → Orden)

```mermaid
sequenceDiagram
    actor U as Usuario
    participant F as Frontend (React)
    participant C as CartController
    participant O as OrderController
    participant PP as PayPal API
    participant DB as Base de Datos

    U->>F: Agrega producto al carrito
    F->>C: POST /carrito (product_id, qty)
    C->>DB: Crear CartItem
    C-->>F: Carrito actualizado

    U->>F: Clic "Comprar con PayPal"
    F->>O: POST /carrito/paypal/create
    O->>PP: Crear orden PayPal
    PP-->>O: PayPal Order ID
    O-->>F: Retorna Order ID

    F->>PP: Renderiza botón PayPal (approve)
    U->>PP: Aprueba pago
    PP-->>F: Pago aprobado (Order ID)

    F->>O: POST /carrito/paypal/capture
    O->>PP: Capturar pago
    PP-->>O: Confirmación
    O->>DB: Crear Order + OrderItems + Payment
    O->>DB: Vaciar CartItems del usuario
    O-->>F: Orden completada ✅
```

---

## 7. Middleware y Seguridad

```mermaid
graph LR
    REQ["Request HTTP"] --> HI["HandleInertiaRequests<br/>(Comparte datos globales:<br/>auth.user, flash, etc.)"]
    HI --> AUTH_MW["auth middleware<br/>(Laravel Breeze)"]
    AUTH_MW --> VERIFIED["verified middleware<br/>(Email verificado)"]
    VERIFIED --> ADMIN_MW["admin middleware<br/>(AdminMiddleware.php)<br/>Verifica is_admin"]
    ADMIN_MW --> CTRL["Controller"]
```

---

## 8. Estructura de Archivos (Resumen)

```
Academia/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Auth/              ← Breeze auth controllers
│   │   │   ├── CartController      ← CRUD carrito
│   │   │   ├── FavoriteController  ← Marcar favoritos
│   │   │   ├── OrderController     ← Crear órdenes + PayPal
│   │   │   ├── PaymentController   ← API PayPal (create/capture)
│   │   │   ├── ProductController   ← Catálogo + CRUD admin
│   │   │   └── ProfileController   ← Perfil de usuario
│   │   ├── Middleware/
│   │   │   ├── AdminMiddleware     ← Verifica is_admin
│   │   │   └── HandleInertiaRequests ← Datos compartidos
│   │   └── Requests/              ← Form Requests
│   └── Models/
│       ├── User                   ← hasMany: orders, cartItems
│       ├── Product                ← belongsTo: category
│       ├── Category               ← hasMany: products
│       ├── Order                  ← belongsTo: user, hasMany: orderItems
│       ├── OrderItem              ← belongsTo: order, product
│       ├── CartItem               ← belongsTo: user, product
│       ├── Payment                ← belongsTo: order
│       └── Favorite               ← user_id, product_id
├── resources/js/
│   ├── Components/                ← 16 componentes reutilizables
│   ├── Layouts/                   ← Authenticated + Guest
│   └── Pages/
│       ├── Welcome, About         ← Páginas públicas
│       ├── Auth/                  ← Login, Register, etc.
│       ├── Products/              ← Catálogo, Detalle, CRUD
│       ├── Cart/                  ← Carrito de compras
│       ├── Profile/               ← Perfil del usuario
│       ├── Admin/                 ← Dashboard administrador
│       └── Blog/                  ← Blog (placeholder)
├── routes/
│   ├── web.php                    ← Rutas principales
│   ├── api.php                    ← API PayPal
│   └── auth.php                   ← Rutas Breeze
└── database/
    ├── migrations/                ← 12 migraciones
    └── database.sqlite            ← BD SQLite
```

---

> [!TIP]
> El proyecto sigue el patrón **Monolito Moderno**: Laravel maneja todo el backend (rutas, controladores, modelos, auth) y sirve las vistas React vía **Inertia.js**, eliminando la necesidad de una API REST separada para el frontend. Solo PayPal usa rutas API dedicadas.
