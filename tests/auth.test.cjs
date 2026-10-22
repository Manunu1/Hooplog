const { test } = require("node:test");
const assert = require("node:assert/strict");
const {
  validateCredentials,
  authErrorMessage,
} = require("../src/auth/errors.ts");

test("requires both fields and rejects malformed email addresses", () => {
  assert.ok(validateCredentials("", "example-password", true));
  assert.ok(validateCredentials("player@example.com", "", false));
  for (const email of [
    "player",
    "player@",
    "player @example.com",
    "@example.com",
  ]) {
    assert.ok(validateCredentials(email, "example-password", false));
  }
});

test("registration enforces eight characters without blocking existing login passwords", () => {
  assert.ok(validateCredentials("player@example.com", "1234567", true));
  assert.equal(
    validateCredentials(" player@example.com ", "12345678", true),
    null,
  );
  assert.equal(
    validateCredentials("player@example.com", "123456", false),
    null,
  );
});

test("provides Spanish guidance for credentials, confirmation, limits and network errors", () => {
  assert.match(
    authErrorMessage({ code: "invalid_credentials" }),
    /incorrectos/,
  );
  assert.match(authErrorMessage({ code: "email_not_confirmed" }), /Confirmá/);
  assert.match(authErrorMessage({ code: "weak_password" }), /requisitos/);
  assert.match(authErrorMessage({ code: "over_request_rate_limit" }), /Esperá/);
  const error = new Error("Private backend detail");
  error.name = "AuthRetryableFetchError";
  assert.match(authErrorMessage(error), /conexión/);
  assert.ok(
    !authErrorMessage(new Error("Private backend detail")).includes(
      "Private backend detail",
    ),
  );
});
