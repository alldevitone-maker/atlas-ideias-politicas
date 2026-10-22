import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Confirm, ConceptDialog } from "../components/Shared";
import { ideologies } from "../domain/model";
describe("diálogos acessíveis", () => {
  it("cancelar preserva o estado e confirmar apaga", async () => {
    let count = 1;
    const user = userEvent.setup();
    render(
      <Confirm
        trigger="Apagar"
        title="Apagar respostas?"
        onConfirm={() => (count = 0)}
      >
        Seu teste será apagado.
      </Confirm>,
    );
    await user.click(screen.getByRole("button", { name: "Apagar" }));
    await user.click(screen.getByRole("button", { name: "Cancelar" }));
    expect(count).toBe(1);
    await user.click(screen.getByRole("button", { name: "Apagar" }));
    await user.click(screen.getByRole("button", { name: "Confirmar" }));
    expect(count).toBe(0);
  });
  it("verbete histórico fornece contexto e referência sem símbolo oficial falso", () => {
    render(
      <ConceptDialog
        item={ideologies.find((i) => i.id === "nazismo")!}
        onClose={() => {}}
      />,
    );
    expect(screen.getByText("Ícone editorial não oficial")).toBeVisible();
    expect(screen.getByRole("link", { name: "S14" })).toHaveAttribute(
      "href",
      expect.stringContaining("ushmm.org"),
    );
  });
});
