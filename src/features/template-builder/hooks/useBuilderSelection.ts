"use client";

import { useState } from "react";
import type { BuilderSelection } from "@/features/template-builder/types";

export function useBuilderSelection(initialSelection: BuilderSelection = null) {
  const [selection, setSelection] =
    useState<BuilderSelection>(initialSelection);

  function clearSelection() {
    setSelection(null);
  }

  return {
    selection,
    setSelection,
    clearSelection,
  };
}
