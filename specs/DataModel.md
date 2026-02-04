# Data Model

## Table: tasks
- `id`: UUID (Primary Key)
- `title`: String (Required)
- `description`: Text (Optional)
- `status`: Enum ('pendiente', 'en_progreso', 'completada') - Default: 'pendiente'
- `priority`: Enum ('baja', 'media', 'alta') - Default: 'media'
- `created_at`: DateTime (Auto)
- `updated_at`: DateTime (Auto)
- `completed_at`: DateTime (Optional)
