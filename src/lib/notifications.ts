// src/lib/notifications.ts
export function showNotification(message: string, type: "success" | "error" = "success") {
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.className = `notification ${type}`;
  document.body.appendChild(notification);

  setTimeout(() => notification.remove(), 3000);
}