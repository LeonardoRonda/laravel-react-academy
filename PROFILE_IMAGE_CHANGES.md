# Cambios en el perfil de usuario

Este documento explica los cambios realizados para permitir que los usuarios suban y actualicen una foto de perfil.

## 1. Base de datos

- Se agregó la migración `database/migrations/2026_07_01_000000_add_profile_photo_path_to_users_table.php`.
- Esta migración añade la columna `profile_photo_path` a la tabla `users`.
- Motivo: necesitamos almacenar la ruta del archivo cargado para poder mostrar la imagen después.

## 2. Modelo `User`

Archivo: `app/Models/User.php`

- Se agregó `profile_photo_path` a la lista de atributos `fillable`.
- Se creó el accesor `getProfilePhotoUrlAttribute()` para construir la URL pública `/storage/...`.
- Motivo: el modelo debe permitir asignar la ruta de la foto y también entregar una URL que el frontend pueda usar.

## 3. Validación de solicitudes

Archivo: `app/Http/Requests/ProfileUpdateRequest.php`

- Se añadió la regla de validación para el campo `photo`:
  - `nullable`
  - `image`
  - `max:2048`
- Motivo: asegurar que solo se acepten imágenes y que no superen 2 MB.

## 4. Controlador de perfil

Archivo: `app/Http/Controllers/ProfileController.php`

- Se modificó `update()` para:
  - almacenar la imagen con `$request->file('photo')->store('profile-photos', 'public')`
  - borrar la imagen anterior en caso de reemplazo
  - actualizar `profile_photo_path`
- Se ajustó `index()` para enviar `user.profile_photo_url` a la vista de perfil.
- Motivo: el controlador debe manejar la carga real del archivo y también enviar los datos necesarios para la vista.

## 5. Compartir usuario con Inertia

Archivo: `app/Http/Middleware/HandleInertiaRequests.php`

- Se actualizó la prop compartida `auth.user` para incluir explícitamente `profile_photo_url`.
- Motivo: asegurar que Inertia entregue la propiedad de la foto a todas las páginas donde se necesite.

## 6. Frontend de perfil

Archivo: `resources/js/Pages/Profile/Partials/UpdateProfileInformationForm.jsx`

- Se añadió un campo `<input type="file" />` para seleccionar la foto.
- Se habilitó `forceFormData: true` en la petición `patch()` para enviar archivo binario.
- Se agregó vista previa de la imagen seleccionada.
- Motivo: el frontend necesita enviar la imagen correctamente y mostrarla antes de guardar.

Archivo: `resources/js/Pages/Profile/Index.jsx`

- Se añadió una vista circular para mostrar `user.profile_photo_url`.
- Se aplicó `overflow-hidden` y `object-cover` para que la foto se vea bien dentro del círculo.
- Motivo: hacer que la imagen se adapte a cualquier tamaño y se muestre como avatar.

## 7. Pruebas

Archivo: `tests/Feature/ProfileTest.php`

- Se agregó una prueba para verificar que se puede subir una imagen de perfil.
- Motivo: confirmar que el flujo de carga funciona y que el archivo se guarda en disco público.

## Nota importante

- Asegúrate siempre de ejecutar:
  - `php artisan migrate`
  - `php artisan storage:link`
- Esto crea la columna nueva en la base de datos y el enlace simbólico que permite servir las imágenes desde `/storage`.

## Por qué no se veía antes

- La imagen se cargaba en el editor, pero el perfil no recibía la URL correcta desde el backend.
- También se corrigió el accessor para usar `/storage/...` en lugar de depender de una URL generada con un host que no coincidía con el servidor actual.
