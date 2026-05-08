import { showNotification } from "../../lib/notifications"; 

export function initFormHandler() {
  const form = document.querySelector<HTMLFormElement>('#miFormulario');
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;


    const api = (form.querySelector('input[name="api"]') as HTMLInputElement)?.value || "clients-update";
    try {
      const res = await fetch(`/api/${api}`, {
        method: 'POST',
        body: new FormData(form),
      });

      const json = await res.json();

      if (res.ok && json?.success) {
        showNotification("✅ Data saved successfully.", "success");

        // 👉 Ir a la siguiente sección
        const current = document.querySelector("main .content.active");
        if (current) {
          const step = Number(current.getAttribute("data-step"));
          const next = document.querySelector<HTMLElement>(`main .content[data-step="${step + 1}"]`);

          if (next) {
            // Ocultar actual
            current.classList.add("hidden");
            current.classList.remove("active");

            // Mostrar siguiente
            next.classList.remove("hidden");
            next.classList.add("active");

            // Actualizar sidebar
            document.querySelectorAll("#sidebar a").forEach(a => a.classList.remove("selected"));

            const nextId = next.id;
            const link = Array.from(document.querySelectorAll("#sidebar a")).find(a => {
              const span = a.querySelector("span");
              return span && span.innerText.toLowerCase().replace(/\s+/g, "") === nextId;
            });

            if (link) link.classList.add("selected");
          }
        }

      } else {
        showNotification("❌ Could not save changes.", "error");
      }
    } catch (error) {
      showNotification("⚠️ Failed to connect to the server.", "error");
    }
  });
}
