export const formatDate = (dateStr: string): string => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

export const getDaysRemaining = (targetDateStr: string): number => {
  const target = new Date(targetDateStr).getTime();
  const now = new Date().setHours(0, 0, 0, 0);
  const diffTime = target - now;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const getSubjectColor = (subject: string): { bg: string; text: string; border: string; accent: string } => {
  switch (subject) {
    case 'Physics':
      return {
        bg: 'bg-blue-500/10',
        text: 'text-blue-400',
        border: 'border-blue-500/30',
        accent: 'bg-blue-500'
      };
    case 'Chemistry':
      return {
        bg: 'bg-emerald-500/10',
        text: 'text-emerald-400',
        border: 'border-emerald-500/30',
        accent: 'bg-emerald-500'
      };
    case 'Mathematics':
      return {
        bg: 'bg-amber-500/10',
        text: 'text-amber-400',
        border: 'border-amber-500/30',
        accent: 'bg-amber-500'
      };
    default:
      return {
        bg: 'bg-purple-500/10',
        text: 'text-purple-400',
        border: 'border-purple-500/30',
        accent: 'bg-purple-500'
      };
  }
};

export const getPriorityBadge = (priority: string): string => {
  switch (priority) {
    case 'High':
      return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
    case 'Medium':
      return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
    case 'Low':
      return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
    default:
      return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
  }
};
