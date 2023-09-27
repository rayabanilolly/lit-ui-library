import "./basic";
import { fixture } from "@open-wc/testing-helpers";

describe("basic", () => {

  beforeEach(async () => {
    await fixture(`<basic name="World"></basic>`);
  });

  it("has a greeting", async () => {
    const greeting =
      window.document.body.getElementsByTagName("basic")[0].shadowRoot
        ?.textContent;
    expect(greeting.indexOf("Hello, World!")).not.toBe(-1);
  });
});
