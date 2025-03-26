import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./types";

/**
 * Use this instead of plain `useDispatch`.
 * This is properly typed for our Redux store.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Use this instead of plain `useSelector`.
 * This is properly typed for our Redux store.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
