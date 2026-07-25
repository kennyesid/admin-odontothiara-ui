# AGENT.MD: Memoria Persistente de Desarrollo

Este archivo documenta de forma estructurada el estado actual del proyecto de la clínica odontológica. Sirve como fuente de verdad (persistencia de contexto) para el desarrollo atómico y modular del frontend.

---

## 1. Stack Tecnológico

El proyecto está construido en **React.js** y utiliza **CRACO** para la resolución de rutas relativas y alias (`@/*` apunta a `src/*`).

### Dependencias Principales (`package.json`)
* **React Core**: `react` / `react-dom` `^18.0.0` (con configuración alternativa en `src/package.json` para react `^19.0.0`).
* **Routing**: `react-router-dom` `^7.9.4`.
* **Manejador de Estados**: `@reduxjs/toolkit` `^2.11.2` y `react-redux` `^9.2.0`.
* **Estilos y Layout**: 
  * `tailwindcss` `^3.4.1` con colores personalizados.
  * `autoprefixer` `^10.0.0` y `postcss` `^8`.
  * `tailwindcss-animate` `^1.0.7` y `tailwind-merge` `^2.4.0`.
* **Base de Datos / Cliente**: `@supabase/supabase-js` `^2.107.0`.
* **Validación de Datos**: `zod` `^4.4.3`.
* **Iconografía y Animaciones**:
  * `lucide-react` `^0.548.0` para iconos vectoriales.
  * `framer-motion` `^12.23.24` para transiciones y micro-animaciones interactivas.
* **Herramientas de Construcción**: `craco` `^0.0.3` (para aliases Webpack).

---

## 2. Arquitectura de Directorios (`src/`)

La estructura organizativa del código sigue un esquema orientado a servicios y modularidad:

* **`src/assets/`**: Recursos estáticos como imágenes y elementos multimedia.
* **`src/components/`**: Componentes reutilizables e independientes.
  * `DataTable/`: Tablas de datos de pacientes.
  * `Common/`: Componentes atómicos genéricos (botones, inputs).
  * `Layout/`: Envolturas estructurales de pantalla.
  * `DentalChart/`: Odontograma interactivo.
  * `NavBar/`: Barra de navegación de la aplicación (`NavBar2026.js`).
* **`src/constants/`**: Variables fijas del sistema (ej: `UserConstants.js`).
* **`src/contexts/`**: Contextos globales de React (vacío por el momento).
* **`src/features/`**: Reductores y lógica de Redux Toolkit (ej: slice de contador).
* **`src/hooks/`**: Ganchos de React (custom hooks) reutilizables.
* **`src/lib/`**: Configuraciones base e instancias de librerías externas.
  * `database/`: Declaración del cliente (`supabaseClient.js`) y clase CRUD genérica (`databaseService.js`).
* **`src/mock/`**: Datos de prueba locales (`patients.js` con datos simulados de citas, fichas y visitas).
* **`src/models/`**: Modelado o definiciones de tipos.
* **`src/pages/`**: Vistas completas de la aplicación:
  * `Dashboard/`: Inicio con contadores y métricas generales.
  * `CalendarPage/`: Gestión visual de citas médicas.
  * `CreateUser/`: Registro y listado de pacientes.
  * `HistoryPage/`: Buscador de historial clínico.
  * `VisitPage/`: Fichas clínicas y registro odontológico detallado.
  * `LoginPage/`: Pantalla de autenticación dividida en 2 columnas.
* **`src/routes/`**: Estructura de navegación (Vacía: el enrutamiento está centralizado directamente en `App.js`).
* **`src/schemas/`**: Esquemas de validación Zod.
  * `patient/`: Esquemas para datos del paciente, antecedentes personales, patológicos y consultas ginecológicas.
* **`src/services/`**: Capa de datos para comunicación con Supabase y persistencia de respaldo.
  * `calendar/`: `CalendarService.js` (Citas médicas).
  * `generics/`: `ParameterService.js`.
  * `medical/`: `medicalQuestionsService.js` (Cuestionarios médicos y joins).
  * `user/`: `UserService.js` (Pacientes).
  * `visit/`: `VisitService.js` (Visitas médicas y odontograma).
  * `index.js`: Archivo de barril (`export *`) para centralizar accesos.
* **`src/store/`**: Inicialización del almacén global de Redux (`store.js`).
* **`src/styles/`**: Definiciones visuales globales y estilos unificados (`styleGeneric.js` y `styleInternal.js`).
* **`src/utils/`**: Utilidades genéricas (ej: notificaciones toast).

---

## 3. Esquema y Lógica de Supabase Detectada

La comunicación con la base de datos se realiza a través de la clase genérica `DatabaseService`, la cual aplica filtros por `groupId` (por defecto `1`) para soportar multi-inquilinos en las tablas correspondientes, y evalúa la columna `state = true` para la exclusión de registros eliminados lógicamente.

### Tablas e Interacciones
1. **`patients`**:
   * Contiene los expedientes de pacientes.
   * Campos principales: `id`, `rol_id` (default 2), `group_id` (default 1), `name`, `first_surname`, `second_surname`, `age`, `sexo`, `birth_date`, `address`, `identity_card`, `email`, `phone`, `state`, y las preguntas de antecedentes (`personal_question`, `pathological_question`, `women_questions`) almacenadas en formato JSON o relacionadas.
2. **`appointments`**:
   * Almacena las citas médicas.
   * Campos principales: `id`, `patient_id` (relación a paciente), `date` (ISO string), `description`.
3. **`medical_visits`**:
   * Historial de visitas al consultorio.
   * Campos principales: `id`, `patient_id`, `patient_name`, `date` (ISO string), `pre_observations`, `post_observations`, `teeth_marks` (objeto JSON que representa el estado del odontograma por pieza dental).
4. **`medical_questions`**:
   * Catálogo maestro de preguntas de salud.
   * Campos: `id`, `question_text`, `requires_reason`, `reason_label`, `state`.
5. **`group_questions`**:
   * Relaciona grupos y preguntas maestros asignados por tipo (`question_type`).
   * Usado para realizar consultas estructuradas en combinación con `medical_questions` a través de joins internos.

---

## 4. Convenciones de Desarrollo y Diseño

### Estructura de Estilos (Tailwind CSS)
El proyecto utiliza un sistema de tokens unificado en `src/styles/` para evitar código duplicado:
* **Paleta de Colores Corporativa**:
  * Primary: `odont-primary` (`#052A3D` - Azul marino oscuro).
  * Secondary: `odont-secondary` (`#117192` - Azul intermedio).
  * Turquoise: `odont-turquoise` (`#19D1E6` - Turquesa / Celeste).
  * Skyblue: `odont-skyblue` (`#bde0eeff` - Azul cielo muy claro).
  * Gray: `odont-gray` (`#614943` - Marrón / Grisáceo).
* **Clases de diseño base**: Se deben importar `STYLE_ROOT` o `STYLE_INTERNAL` para botones, inputs y contenedores para asegurar la consistencia.

### Patrones de Programación y Refactorización
* **Transición a Funciones Modulares**: Existe un proceso activo para migrar de servicios orientados a clases con exportaciones por defecto (como `userService`) a funciones exportadas individualmente (como `getAllPatients`, `createPatient`).
* **Estructura de Retorno Estándar**: Los nuevos endpoints en los servicios devuelven objetos JSON estructurados con el siguiente formato para simplificar la captura de errores en el frontend:
  ```json
  {
    "code": 200,
    "message": "Mensaje descriptivo del resultado",
    "content": {} 
  }
  ```
* **Manejo Híbrido (Supabase + LocalStorage)**: Ante fallas de conexión o entornos locales sin variables de entorno configuradas (`REACT_APP_SUPABASE_URL`), los servicios capturan la excepción y realizan un fallback a datos cacheados en `localStorage` o arrays en `src/mock/`.

---

## 5. Compromisos para el Desarrollo Atómico y Seguro

1. **Modificación Modular y Progresiva**: Se realizarán cambios acotados en archivos específicos, ejecutando pruebas incrementales y evitando la inserción masiva de código no verificado.
2. **Seguridad y Control de Datos**: Toda operación de inserción o actualización de datos respetará el filtrado de grupos (`groupId`) y contemplará validación de datos del lado del cliente antes de enviarse a Supabase.
3. **Manejo de Errores Exhaustivo**: Uso constante de bloques `try-catch` y retornos de estados claros para prevenir caídas de aplicación en tiempo de ejecución.
