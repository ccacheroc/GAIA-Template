# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - img [ref=e8]
      - generic [ref=e11]: Crear cuenta
      - generic [ref=e12]: Regístrate como profesor para empezar a crear cuestionarios
    - generic [ref=e14]:
      - generic [ref=e15]:
        - text: Nombre completo
        - textbox "Nombre completo" [active] [ref=e16]:
          - /placeholder: Ej. Álvaro Moya
        - paragraph [ref=e17]: El nombre debe tener al menos 2 caracteres
      - generic [ref=e18]:
        - text: Correo electrónico
        - textbox "Correo electrónico" [ref=e19]:
          - /placeholder: nombre@colegio.edu
          - text: duplicate@gaia.edu
      - generic [ref=e20]:
        - text: Contraseña
        - textbox "Contraseña" [ref=e21]:
          - /placeholder: ••••••••
          - text: securepassword123
      - generic [ref=e22]:
        - text: Confirmar contraseña
        - textbox "Confirmar contraseña" [ref=e23]:
          - /placeholder: ••••••••
          - text: securepassword123
      - button "Registrarse" [ref=e24]
    - generic [ref=e25]:
      - generic [ref=e28]: ¿Ya tienes cuenta?
      - link "Iniciar sesión" [ref=e29] [cursor=pointer]:
        - /url: /login
        - img
        - text: Iniciar sesión
  - region "Notifications alt+T"
```