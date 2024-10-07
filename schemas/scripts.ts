import { z } from "zod";

export const createScriptSchema = z.string().min(10).max(2000);
