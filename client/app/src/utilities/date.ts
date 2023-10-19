export function timeSince(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours} horas atrás`;
  }

  if (minutes > 0) {
    return `${minutes} minutos atrás`;
  }

  if (seconds > 0) {
    return `${seconds} segundos atrás`;
  }

  return date.toLocaleDateString('pt-BR');
}