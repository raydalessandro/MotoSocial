// Storage abstraction layer
// Usa localStorage ora, switcherà a Supabase dopo

export class StorageService {
  private prefix = 'motosocial_';

  async get<T>(key: string): Promise<T | null> {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem(this.prefix + key);
    return data ? JSON.parse(data) : null;
  }

  async set<T>(key: string, value: T): Promise<void> {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.prefix + key, JSON.stringify(value));
  }

  async remove(key: string): Promise<void> {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.prefix + key);
  }
}

export const storage = new StorageService();
