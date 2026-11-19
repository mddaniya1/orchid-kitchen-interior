import { useState, useEffect, useCallback } from 'react';
import { MotionConfig } from 'motion/react';
import { Navbar, RouteView } from './components/Navbar';
import { HeroSection, StudioSection } from './components/HeroAndStudio';
import { SelectedWorkSection, FeaturedProjectSection } from './components/SelectedWorkAndFeatured';
import { ExpertiseSection, ProcessSection } from './components/ExpertiseAndProcess';
import {
  TestimonialsSection,
  PhilosophySection,
  ContactCtaSection,
  Footer,
} from './components/TestimonialsPhilosophyCtaFooter';
import { ProjectsPage, ProjectDetailPage, ContactPage } from './components/SubPages';

function parseRouteFromPath(): RouteView {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  if (path === '/projects') {
    return { page: 'projects' };
  }
  if (path.startsWith('/projects/')) {
    const slug = path.replace('/projects/', '').trim();
    if (slug) return { page: 'project-detail', slug };
  }
  if (path === '/contact') {
    return { page: 'contact' };
  }
  return { page: 'home' };
}

function routeToPath(route: RouteView): string {
  switch (route.page) {
    case 'projects':
      return '/projects';
    case 'project-detail':
      return `/projects/${route.slug}`;
    case 'contact':
      return '/contact';
    case 'home':
    default:
      return '/';
  }
}

export default function App() {
  const [route, setRoute] = useState<RouteView>(() => parseRouteFromPath());

  useEffect(() => {
    const onPopState = () => {
      setRoute(parseRouteFromPath());
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback((nextRoute: RouteView, sectionId?: string) => {
    const targetPath = routeToPath(nextRoute);
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    setRoute(nextRoute);

    if (nextRoute.page === 'home' && sectionId) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 50);
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const handleExploreWork = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate({ page: 'projects' });
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen w-full bg-[#000000] text-[#e1e0cc]">
        <Navbar currentRoute={route} onNavigate={navigate} />

        <main>
          {route.page === 'home' && (
            <>
              <HeroSection onExploreWork={handleExploreWork} />
              <StudioSection />
              <SelectedWorkSection
                onSelectProject={(slug) => navigate({ page: 'project-detail', slug })}
              />
              <FeaturedProjectSection
                onDiscover={(slug) => navigate({ page: 'project-detail', slug })}
              />
              <ExpertiseSection
                onSelectService={(serviceTitle) =>
                  navigate({ page: 'contact', preselectedService: serviceTitle })
                }
              />
              <ProcessSection />
              <TestimonialsSection />
              <PhilosophySection />
              <ContactCtaSection />
            </>
          )}

          {route.page === 'projects' && (
            <ProjectsPage
              onSelectProject={(slug) => navigate({ page: 'project-detail', slug })}
              onBackHome={() => navigate({ page: 'home' })}
            />
          )}

          {route.page === 'project-detail' && (
            <ProjectDetailPage
              slug={route.slug}
              onSelectProject={(slug) => navigate({ page: 'project-detail', slug })}
              onBackToProjects={() => navigate({ page: 'projects' })}
            />
          )}

          {route.page === 'contact' && (
            <ContactPage
              preselectedService={route.preselectedService}
              onBackHome={() => navigate({ page: 'home' })}
            />
          )}
        </main>

        <Footer
          onNavigateSection={(sectionId) => navigate({ page: 'home' }, sectionId)}
          onOpenProjects={() => navigate({ page: 'projects' })}
          onOpenContact={() => navigate({ page: 'contact' })}
        />
      </div>
    </MotionConfig>
  );
}
