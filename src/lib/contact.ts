export function compactPhone(value: string) {
  return value.replace(/[^\d+]/g, "");
}

export function whatsappHref(phone: string, message = "Hello Arpanam Kids School, I want to know about admissions.") {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
