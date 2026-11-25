let queue: Promise<unknown> = Promise.resolve();

/**
 * Operácie s notifikáciami (push aj lokálne) spúšťa po jednom, v poradí volania,
 * aby sa pri rýchlom odhlásení/prihlásení neprebehli. Úloha nesmie hádzať chybu.
 */
export function runNotificationTask(task: () => Promise<void>) {
  const next = queue.then(task);
  queue = next.catch(() => {});
  return next;
}
