const limits = {
  parentName: 80,
  phone: 10,
  childName: 80,
  program: 80,
  message: 600
};

const allowedPrograms = new Set(["Jr. KG.", "Sr. KG.", "Balvatika"]);

export type EnquiryInput = {
  parentName: string;
  phone: string;
  childName?: string;
  program?: string;
  message?: string;
  website?: string;
};

function clean(value: unknown, maxLength: number) {
  return String(value ?? "").trim().slice(0, maxLength);
}

export function validateEnquiryInput(body: Record<string, unknown> | null) {
  if (!body) {
    return { ok: false as const, message: "Invalid enquiry details." };
  }

  if (clean(body.website, 120)) {
    return { ok: false as const, message: "Unable to save enquiry." };
  }

  const input: EnquiryInput = {
    parentName: clean(body.parentName, limits.parentName),
    phone: clean(body.phone, limits.phone).replace(/\D/g, "").slice(0, limits.phone),
    childName: clean(body.childName, limits.childName),
    program: clean(body.program, limits.program),
    message: clean(body.message, limits.message)
  };

  if (!input.parentName || input.parentName.length < 2 || !/^[A-Za-z][A-Za-z .'-]*$/.test(input.parentName)) {
    return { ok: false as const, message: "Please enter a valid parent name using letters only." };
  }

  if (input.childName && !/^[A-Za-z][A-Za-z .'-]*$/.test(input.childName)) {
    return { ok: false as const, message: "Please enter a valid child name using letters only." };
  }

  if (input.phone.length !== 10) {
    return { ok: false as const, message: "Please enter a valid 10 digit phone number." };
  }

  if (!input.program || !allowedPrograms.has(input.program)) {
    return { ok: false as const, message: "Please select a valid programme." };
  }

  return { ok: true as const, input };
}
