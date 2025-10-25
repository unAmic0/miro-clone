import { create } from "zustand";

interface IRenameBoard {
  open: boolean;
  boardId: string;
  handleOpen: (boardId: string) => void;
  handleClose: () => void;
  setModalOpen: (open: boolean) => void;
}

export const useRenameBoard = create<IRenameBoard>((set) => ({
  open: false,
  boardId: "",
  handleOpen: (boardId) => set({ open: true, boardId }),
  handleClose: () => {
    setTimeout(() => set({ boardId: "", open: false }), 0);
  },
  setModalOpen: (open: boolean) => set({ open }),
}));
