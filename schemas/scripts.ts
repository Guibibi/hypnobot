import { z } from "zod";

export const createScriptSchema = z.string().min(20).max(2000);
