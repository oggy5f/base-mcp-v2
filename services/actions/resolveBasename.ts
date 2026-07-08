import publicClient from "@/lib/publicClient";

export interface ResolveBasenameResult {
  success: boolean;
  message: string;
  address?: `0x${string}`;
}

export async function resolveBasename(
  name: string
): Promise<ResolveBasenameResult> {
  try {
    const address = await publicClient.getEnsAddress({
      name,
    });

    if (!address) {
      return {
        success: false,
        message: "Basename not found.",
      };
    }

    return {
      success: true,
      message: "Basename resolved.",
      address,
    };
  } catch {
    return {
      success: false,
      message: "Failed to resolve Basename.",
    };
  }
}