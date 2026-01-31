# PRD.md — “QuizQuest” (nombre temporal)
**Versión:** 1.0  
**Fecha:** 30-ene-2026  
**Product Owner:** CCachero
**Objetivo:** Gamificar cuestionarios en el aula para aumentar participación, motivación y aprendizaje mediante retos en tiempo real y autoestudio.

---

## 1) Visión y Problema
En muchas aulas, los cuestionarios son poco atractivos y no aportan feedback inmediato. “QuizQuest” convierte cada repaso en un juego competitivo/cooperativo, con ranking, power-ups y analíticas para el/la docente. Resultado esperado: más atención, práctica espaciada y mejor retención.

## 2) Usuarios y Personas
- **Docente** (K-12/Universidad): crea/edita cuestionarios, elige modo de juego, ve reportes por estudiante y grupo.
- **Estudiante**: responde desde su dispositivo (móvil/PC), participa en vivo o de forma asincrónica, visualiza su progreso.


## 3) Alcance (MVP, 1er release)
### 3.1 Funcionalidad clave
- **Gestión de cuestionarios**: el profesor crea y edita cuestionarios en un editor web con tipos de pregunta (opción múltiple, verdadero/falso, respuesta corta, ordenar).
- **Juegos en vivo**: el/la docente lanza la sesión en tiempo real a partir de un cuestionario creado y los estudiantes ingresan con PIN e identificador único (pseudónimo); se muestra un ranking y temporizador en pantalla compartida.
- **Analíticas básicas**: ranking global después de acabar el cuestionario, aciertos/errores por pregunta, tiempos de respuesta, exportación CSV.
- **Acceso sin registro para estudiantes**: pseudónimo + PIN (privacidad por defecto).

### 3.2 Fuera de alcance (MVP)
- Integraciones LMS (Google Classroom, Moodle) → **fase 2**  
- Preguntas multimedia avanzadas (audio nativo, dibujo libre) → **fase 2**  
- Moderación de contenido generado por la comunidad a gran escala → **fase 3**

## 4) Diferenciadores
- **Modos cooperativos** además del ranking clásico (equipos, “construcción conjunta” del objetivo).
- **Feedback formativo** en contexto: explicación breve opcional por ítem tras responder.
- **Diseño accesible by default** (WCAG AA, lectura en voz, alto contraste).
- **Controles “anti-gaming”** (detección de tapping extremo, límites de cambio de respuesta).

## 5) Éxito (Métricas)
- **Engagement**: ≥80% de participación media por sesión, ≥3 sesiones/semana por docente activo.
- **Aprendizaje**: +15% en la puntuación media de revisión (pre/post) en 4 semanas.
- **Retención**: 60% DAU/WAU en estudiantes; NPS docente ≥40.
- **Calidad**: <1% sesiones fallidas; TTFB <200 ms en región.

## 6) Requisitos Funcionales
1. **Autenticación docente** (email/Social login); estudiantes ingresan con PIN y pseudónimo (sin cuenta.
2. **Editor de cuestionarios** con validación y vista previa (tiempo por ítem, puntos, barajar).
3. **Hosting de sesión**: generación de PIN, QR de pin (para escanear y entrar directamente) lobby, cuenta regresiva, ranking y animaciones ligeras. 
4. **Modos de juego**:  
   - Clásico (individual, velocidad+precisión)  
   - Precisión (prioriza respuestas correctas, menos peso al tiempo)  
   - Equipos (puntuación agregada por equipo)  

5. **Desafíos asincrónicos**: enlace/QR, fecha límite, intentos, feedback inmediato.
6. **Reportes**: resultados globales, resultados por estudiante, por ítem, exportación CSV/Excel; descarga desde panel.
7. **Soporte a sala híbrida**: latencia baja, reconexión automática, persistencia de estado.

## 7) Requisitos No Funcionales
- **Escalabilidad**: 200 participantes/sesión (MVP), arquitectura preparada para 500+.
- **Rendimiento**: render a 60 FPS en UI de alumno; cola de eventos en tiempo real (<200 ms p95).
- **Disponibilidad**: 99.9% mensual; tolerancia a fallos en orquestador de sesiones.
- **Seguridad/Privacidad**: GDPR; datos minimizados para estudiantes; cifrado en tránsito/rep.
- **Accesibilidad**: WCAG 2.1 AA, navegación teclado, texto alternativo, captions.
- **Compatibilidad**: navegadores modernos, iOS/Android WebView.

## 8) Suposiciones y Dependencias
- Dispositivos 1:1 o compartidos; proyector/pantalla en aula.
- Conectividad escolar estable (fallback degradado si hay latencia alta).


## 9) Riesgos y Mitigaciones
- **Conectividad** → caché local + reintentos + modo “buffer” de eventos.
- **Abuso/trolling en nicks** → filtro léxico y opción “solo nombres de lista”.
- **Sobrecarga servidor en horas pico** → auto-scaling y “pre-warm” por región.
- **Fatiga de juego** → alternar modos, micro-recompensas, preguntas de alta variedad.

## 10) Experiencia de Usuario (resumen)
- **Docente**: flujo “Crear → Probar → Lanzar en vivo / Asignar reto → Ver reportes”.  
- **Estudiante**: “Unirse con PIN → Responder → Ver feedback → Ver ranking/progreso”.

## 11) Medición y Analítica
- Eventos: unión a sesión, respuesta, corrección, abandono, reconexión, fin de juego.
- Tableros: tasa de acierto por ítem, tiempo medio, preguntas con mayor discriminación.


---

## 12) Feature Specs — Summaries

### Quiz Management & Editor
This feature enables teachers to design, edit, and organize quizzes. It provides the essential content creation workflow that powers tanto live sessions as asynchronous challenges.

#### 2. Core Entities / Roles / Actors
##### 2.1 Actors
- **Teacher (`TEACHER`)**: Full access to create, update, delete, and view their own quizzes. Can launch sessions from their quizzes.
- **Admin (`ADMIN`)**: Can view, delete, or manage any quiz for moderation or support purposes.

#### 3. High-Level Rules and Permissions
##### 3.1 Access Levels
- **Owner (Teacher+)**: Can manage (CRUD) their own quizzes.
- **Public**: No access to the editor. Quizzes are only accessible via PIN or shared link in "Play" mode.

#### 4. Requirements and Constraints
##### 4.1 Security / Compliance / Quality Requirements
- **Ownership Validation**: Every update/delete request must verify that the requesting user is the owner of the quiz (BOLA prevention).
- **Data Integrity**: A question of type 'Multiple Choice' must have between 2 and 6 options. 'True/False' must have exactly 2.
- **Validation**: Every question must have at least one correct answer marked before the quiz can be "Published".
- **Validation**: Every question must have at least one correct answer marked before the quiz can be "Published".
- **Performance**: Quiz saving should be asynchronous and non-blocking for the UI.

### User Authentication & Access Control
Provides the identity layer for the platform, ensuring teachers can securely manage their pedagogy while keeping student participation anonymous and friction-free.

#### 2. Core Entities / Roles / Actors
##### 2.1 Actors
- **Teacher (`TEACHER`)**: Authenticated user who can perform CRUD operations on their own quizzes and manage their profile.
- **Student (`STUDENT`)**: Public user who joins sessions via PIN and pseudonym. No authentication required.
- **Admin (`ADMIN`)**: Authenticated user with system-wide oversight and moderation capabilities.

#### 3. High-Level Rules and Permissions
##### 3.1 Access Levels
- **Public**: Can join and play quizzes via PIN. No access to the management dashboard.
- **Teacher+**: Can access the teacher dashboard, create quizzes, and manage their own content.
- **Admin**: Can manage all system content and user accounts.

#### 4. Requirements and Constraints
##### 4.1 Security / Compliance / Quality Requirements
- **Secure Authentication**: Authentication MUST be enforced for all `/api/v1/quizzes` (write) endpoints.
- **Password Safety**: Passwords MUST be hashed via Argon2id. Never store plain text.
- **Stateless Sessions**: Authentication MUST use JWT tokens with secure expiration policies.
- **Ownership (BOLA)**: The system MUST prevent a teacher from editing or deleting quizzes belonging to another teacher.
