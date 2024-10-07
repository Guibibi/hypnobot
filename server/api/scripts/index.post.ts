import { serverSupabaseUser, serverSupabaseClient } from "#supabase/server";
import { createScriptSchema } from "~/schemas/scripts";
import { Database } from "~/types/database.types";

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  const body = await readBody(event);
  const client = await serverSupabaseClient<Database>(event);

  if (!user) {
    return {
      error: "User not logged in",
    };
  }
  const parsedPrompt = await createScriptSchema.safeParseAsync(body);

  if (parsedPrompt.success) {
    // Add the script to the table and assign it to the user
    // Start the script generation routine
    const result = await client
      .from("hypnosis_scripts")
      .insert({ generation_prompt: parsedPrompt.data, user_id: user.id });

    if (result.error) {
      return { error: result.error };
    }

    console.log(result.data, result.count, result.status, result.statusText);
    return { success: "Sucessfully added the script" };
  } else {
    return { error: parsedPrompt.error };
  }

  return {
    validatedPrompt: parsedPrompt,
  };
});
