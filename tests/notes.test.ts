
import { describe, expect, it } from "vitest";
import { Cl } from "@stacks/transactions";

const accounts = simnet.getAccounts();
const address1 = accounts.get("wallet_1")!;
const address2 = accounts.get("wallet_2")!;

describe("Notes Contract Tests", () => {
  it("ensures simnet is well initialised", () => {
    expect(simnet.blockHeight).toBeDefined();
  });

  it("can add a note successfully", () => {
    const { result } = simnet.callPublicFn(
      "notes",
      "add-note",
      [Cl.stringAscii("Test note content")],
      address1
    );
    expect(result).toMatch(/ok/);
  });

  it("can get a note that was added", () => {
    // First add a note
    simnet.callPublicFn(
      "notes",
      "add-note",
      [Cl.stringAscii("My first note")],
      address1
    );

    // Then retrieve it
    const { result } = simnet.callReadOnlyFn(
      "notes",
      "get-note",
      [Cl.principal(address1), Cl.uint(1)],
      address1
    );
    expect(result).toMatch(/ok/);
  });

  it("can handle normal length notes", () => {
    const normalNote = "a".repeat(200); // Exactly 200 characters
    const { result } = simnet.callPublicFn(
      "notes",
      "add-note",
      [Cl.stringAscii(normalNote)],
      address1
    );
    expect(result).toMatch(/ok/);
  });

  it("allows different users to add notes", () => {
    // User 1 adds a note
    const { result: result1 } = simnet.callPublicFn(
      "notes",
      "add-note",
      [Cl.stringAscii("User 1 note")],
      address1
    );
    expect(result1).toMatch(/ok/);

    // User 2 adds a note
    const { result: result2 } = simnet.callPublicFn(
      "notes",
      "add-note",
      [Cl.stringAscii("User 2 note")],
      address2
    );
    expect(result2).toMatch(/ok/);
  });
});
