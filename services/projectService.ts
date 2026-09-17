import type { Project } from '@/types/product';
import { mockProjects } from '@/data/mock/projects';

function delay<T>(data: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

export const projectService = {
  async getFeaturedProjects(): Promise<Project[]> {
    return delay(mockProjects);
  },

  async getProjectBySlug(slug: string): Promise<Project | null> {
    const project = mockProjects.find((p) => p.slug === slug);
    return delay(project ?? null, 200);
  },
};
