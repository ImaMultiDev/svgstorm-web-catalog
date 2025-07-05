import { IconData } from "@/interfaces";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://api-svgstorm-production.up.railway.app";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  count?: number;
}

interface IconWithSVG extends IconData {
  svg_code: string;
}

export const api = {
  /**
   * Fetch all icons from the API
   */
  fetchIcons: async (): Promise<IconData[]> => {
    try {
      console.log("Fetching icons from:", `${API_BASE_URL}/api/icons`);

      const response = await fetch(`${API_BASE_URL}/api/icons`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse<IconData[]> = await response.json();

      if (data.success) {
        return data.data;
      } else {
        throw new Error(data.message || "Unknown error");
      }
    } catch (error) {
      console.error("API fetchIcons error:", error);
      console.error("API URL:", `${API_BASE_URL}/api/icons`);
      throw error;
    }
  },

  /**
   * Fetch specific icon with SVG code
   */
  fetchIconByName: async (name: string): Promise<IconWithSVG> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/icons/${name}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse<IconWithSVG> = await response.json();

      if (data.success) {
        return data.data;
      } else {
        throw new Error(data.message || "Unknown error");
      }
    } catch (error) {
      console.error("API fetchIconByName error:", error);
      throw error;
    }
  },

  /**
   * Health check endpoint
   */
  healthCheck: async (): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/health`);
      const data = await response.json();
      return data.success && data.status === "healthy";
    } catch (error) {
      console.error("API health check error:", error);
      return false;
    }
  },
};
