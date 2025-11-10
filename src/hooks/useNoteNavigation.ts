"use client"

import { useRouter } from 'next/navigation';

export function useNoteNavigation() {
  const router = useRouter();

  const navigateByAction = (action: number, noteId?: string) => {
    const routes: { [key: number]: string } = {
      0: '/notes',
      1: '/notes/new',
      2: noteId ? `/notes/${noteId}` : '/notes',
    };

    const targetRoute = routes[action] || '/notes';
    router.push(targetRoute);
  };

  return { navigateByAction };
}