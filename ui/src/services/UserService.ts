// src/model/auth/SessionData.ts
export interface UserProfile {
  name: string;
  avatar: string;
}

const USER_PROFILE_KEY = "user_profile";

export default class UserService {
  private static getStorage(): Storage {
    return localStorage;
  }

  static getProfile(): UserProfile | null {
    try {
      const storedData = this.getStorage().getItem(USER_PROFILE_KEY);
      if (!storedData) return null;

      const parsedData = JSON.parse(storedData);

      // Validación básica del tipo
      if (
        typeof parsedData?.name === "string" &&
        typeof parsedData?.avatar === "string"
      ) {
        return {
          name: parsedData.name,
          avatar: parsedData.avatar,
        };
      }

      this.clearProfile(); // Limpiar datos corruptos
      return null;
    } catch {
      console.error("Error al leer el perfil");
      this.clearProfile();
      return null;
    }
  }

  static saveProfile(profile: UserProfile): boolean {
    try {
      this.getStorage().setItem(
        USER_PROFILE_KEY,
        JSON.stringify({
          name: profile.name,
          avatar: profile.avatar,
        })
      );
      return true;
    } catch (error) {
      console.error("Error al guardar el perfil");
      return false;
    }
  }

  static clearProfile(): void {
    try {
      this.getStorage().removeItem(USER_PROFILE_KEY);
    } catch (error) {
      console.error("Error al limpiar el perfil:", error);
    }
  }
}
