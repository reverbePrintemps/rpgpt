import {
  LocalStorageItems,
  getFromLocalStorage,
  setToLocalStorage,
} from "@/app/utils/local-storage";

describe("getFromLocalStorage", () => {
  it("should return null if no value is stored", () => {
    expect(getFromLocalStorage(LocalStorageItems.TokenUsage, 0)).toBe(0);
  });
  it("should return stored value if it exists", () => {
    const tokenUsage = 500;
    setToLocalStorage({
      kind: LocalStorageItems.TokenUsage,
      value: tokenUsage,
    });
    expect(getFromLocalStorage(LocalStorageItems.TokenUsage, 0)).toBe(
      tokenUsage
    );
  });
});
