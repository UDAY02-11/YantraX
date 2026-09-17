'use client';

import * as React from 'react';
import { Clock, ArrowRight, BookOpen, Cpu, CircuitBoard } from 'lucide-react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import { ErrorState } from '@/components/shared/ErrorState';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { projectService } from '@/services/projectService';
import type { Project, ProjectDifficulty } from '@/types/product';
import { cn } from '@/lib/utils';

const difficultyStyles: Record<ProjectDifficulty, string> = {
  Beginner: 'bg-learn/15 text-learn',
  Intermediate: 'bg-warning/15 text-warning',
  Advanced: 'bg-destructive/15 text-destructive',
};

export function LearningSection() {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const load = React.useCallback(() => {
    setIsLoading(true);
    setError(false);
    projectService.getFeaturedProjects().then((data) => {
      setProjects(data);
      setIsLoading(false);
    }).catch(() => {
      setError(true);
      setIsLoading(false);
    });
  }, []);

  React.useEffect(() => { load(); }, [load]);

  return (
    <section className="bg-learn/5 py-8">
      <div className="container-page">
        <SectionHeader
          title="Learn & Build"
          viewAllHref="/projects"
          icon={<BookOpen className="h-5 w-5 text-learn" />}
          accent="142 71% 45%"
          className="mb-4"
        />

        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-64 animate-shimmer rounded-xl" />
            ))}
          </div>
        ) : error ? (
          <ErrorState onRetry={load} />
        ) : projects.length === 0 ? (
          <EmptyState title="No projects available" description="New projects are being added soon." />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group flex flex-col overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg"
              >
                <div className="relative h-40 overflow-hidden">
                  <a href={`/projects/${project.slug}`}>
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </a>
                  <Badge
                    className={cn(
                      'absolute left-2 top-2 border-0 text-[10px] font-bold',
                      difficultyStyles[project.difficulty]
                    )}
                  >
                    {project.difficulty}
                  </Badge>
                </div>

                <div className="flex flex-1 flex-col gap-2 p-4">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <CircuitBoard className="h-3.5 w-3.5" />
                    {project.category}
                  </div>
                  <h3 className="font-semibold leading-snug">
                    <a href={`/projects/${project.slug}`} className="hover:text-primary">
                      {project.title}
                    </a>
                  </h3>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {project.estimatedTime}
                  </div>

                  <div className="mt-2">
                    <p className="mb-1 text-xs font-medium text-muted-foreground">
                      Required components:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {project.components.slice(0, 3).map((comp) => (
                        <span
                          key={comp.slug}
                          className="rounded-md bg-muted px-2 py-0.5 text-[11px] text-muted-foreground"
                        >
                          {comp.name}
                        </span>
                      ))}
                      {project.components.length > 3 && (
                        <span className="rounded-md bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                          +{project.components.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-auto pt-3">
                    <Button asChild variant="outline" size="sm" className="w-full gap-1">
                      <a href={`/projects/${project.slug}`}>
                        View Project
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
