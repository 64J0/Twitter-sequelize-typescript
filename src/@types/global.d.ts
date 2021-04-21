interface defaultReturn<T = null> {
  status: "SUCCESS" | "FAIL";
  content: Error | null | T;
}

export { defaultReturn };
